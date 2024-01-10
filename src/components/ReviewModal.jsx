import React, { useEffect, useRef, useState } from "react";
import BlogService from "../services/blogService";
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Modal,
  Result,
  notification,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faInbox } from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css";
import { EditorContent, findChildren, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { v4 as uuidv4 } from "uuid";
import CommentCard from "./CommentCard";
import AnnotationService from "../services/annotationService";
import ReactQuill from "react-quill";

function ReviewBlog({
  target,
  setTarget,
  setRefresh,
  refresh,
  open,
  setOpen,
  currentTheme,
}) {
  const lastHightlighted = useRef(null);
  const [form] = Form.useForm();
  const commentInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [comments, setComments] = useState([]);
  const [positionY, setPositionY] = useState(0);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const CustomHighlight = Highlight.extend({
    addAttributes() {
      return {
        id: {
          default: null,
          // Take the attribute values
          renderHTML: (attributes) => {
            // … and return an object with HTML attributes.
            return {
              id: attributes.id,
            };
          },
        },
        class: {
          default: null,
          // Take the attribute values
          renderHTML: (attributes) => {
            // … and return an object with HTML attributes.
            return {
              class: attributes.class,
            };
          },
        },
      };
    },
  }).configure({ multicolor: true });

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      CustomHighlight,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
  });
  const updateVersion = (statusId) => {
    setButtonLoading(true);
    let payload = Object.assign({}, data);
    payload.htmlFormat = editor.getHTML();
    payload.updated_at = new Date();
    payload.status = statusId;
    BlogService.updateVersion(data.id, payload)
      .then((res) => {
        notification.success({
          message:
            statusId === 2
              ? "Review added successfully"
              : "Blog Published successfully",
        });
        closeModal();
        setButtonLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message:
            "Something went wrong while updating the data. Please try again later...",
        });
        setButtonLoading(false);
      });
  };

  const closeModal = () => {
    lastHightlighted.current = null;
    setOpen(false);
    setComments([]);
    setSelectedCommentId(null);
    form.resetFields();
    setIsHighlighted(false);
    setLoading(true);
    setTarget(null);
    setData({});
  };

  const handleContentEvents = (e, toHandleClickHighlight) => {
    const selection = window.getSelection();
    if (selection.type === "Range") {
      setSelectedCommentId(null);
      setPositionY(
        e.pageY +
          document.getElementsByClassName("editor-card-wrapper")[0].scrollTop
      );
      setIsHighlighted(true);
      form.resetFields();
    } else {
      setIsHighlighted(false);
      focusCommentOnClickOfHighlight();
    }
  };
  useEffect(() => {
    if (isHighlighted) {
      commentInputRef.current.focus();
    }
  }, [isHighlighted]);
  const focusCommentOnClickOfHighlight = () => {
    const { state } = editor;

    const selectedOffset = state.selection.$head.parentOffset;

    const totalChild = state.selection.$head.parent.childCount;
    let count = 0,
      index;
    for (index = 0; index < totalChild; index++) {
      if (
        selectedOffset >= count &&
        selectedOffset <=
          count + state.selection.$head.parent.child(index).text.length
      ) {
        break;
      }
      count += state.selection.$head.parent.child(index).text.length;
    }

    const highlightedCommentId =
      state.selection.$head.parent.child(index).marks[0]?.attrs?.id || null;
    setSelectedCommentId(highlightedCommentId);
    if (highlightedCommentId) {
      document.getElementById("card-" + highlightedCommentId).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleComment = (e) => {
    const id = uuidv4();
    let payload = {
      highlightMarkId: id,
      description: e.comment,
      positionY: positionY,
      authorId: user.userId,
    };
    AnnotationService.createAnnotation(data.id, payload).then(() => {
      editor
        .chain()
        .focus()
        .toggleHighlight({
          id,
          class: "tooltip-parent",
        })
        .run();
      lastHightlighted.current = editor.chain().focus();
      let blog = Object.assign({}, data);
      blog.htmlFormat = editor.getHTML();
      BlogService.updateVersion(data.id, blog);
      AnnotationService.getAnnotations(data.id).then((res) => {
        setComments(res.data);
        form.resetFields();
        setIsHighlighted(false);
      });
    });
  };

  const toggleHighlight = (commentId) => {
    const { tr } = editor.state;
    const item = findChildren(tr.doc, (node) => {
      return (
        node?.marks.length > 0 &&
        node?.marks.find((item) => item.attrs?.id === commentId)
      );
    });

    if (item) {
      item.forEach((eachItem) => {
        tr.removeMark(
          eachItem.pos,
          eachItem.pos + eachItem.node.nodeSize,
          editor.schema.marks.highlight
        );
      });
      editor.view.dispatch(tr);
    }
  };

  const deleteComment = (commentId, highlight_mark_id) => {
    AnnotationService.deleteAnnotation(commentId).then(() => {
      toggleHighlight(highlight_mark_id);
      let blog = Object.assign({}, data);
      blog.htmlFormat = editor.getHTML();
      BlogService.updateVersion(data.id, blog);
      AnnotationService.getAnnotations(data.id).then((res) => {
        setComments(res.data);
        form.resetFields();
        setIsHighlighted(false);
      });
    });
  };
  const validateComment = (_, value) => {
    if (
      !value ||
      value.trim() === "" ||
      value.replace(/<[^>]*>/g, "").trim() === ""
    ) {
      return Promise.reject("Suggestions cannot be empty!");
    }
    return Promise.resolve();
  };
  useEffect(() => {
    if (lastSelected && document.getElementById(lastSelected)) {
      const elements = document.querySelectorAll(`[id="${lastSelected}"]`);
      elements.forEach((element) => {
        element.removeAttribute("style");
      });
    }
    if (selectedCommentId && document.getElementById(selectedCommentId)) {
      const elements = document.querySelectorAll(`[id="${selectedCommentId}"]`);
      elements.forEach((element) => {
        element.style.backgroundColor = "#ffc800";
      });
      setLastSelected(selectedCommentId);
    }
  }, [selectedCommentId]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("role"));
    if (user) {
      setUser(user);
    }
    if (target) {
      BlogService.getLatestVersion(target)
        .then((res) => {
          setData(res.data);
          editor.commands.setContent(res.data.htmlFormat);
          AnnotationService.getAnnotations(res.data.id).then((res2) => {
            setComments(res2.data);
            form.resetFields();
            setIsHighlighted(false);
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message:
              "Something went wrong while fetching the data. Please try again later...",
          });
          setOpen(false);
        });
    }
  }, [open]);
  return (
    <Modal
      title={user.role === "LEAD" ? "Review Blog" : "Suggestions"}
      destroyOnClose
      maskClosable={false}
      open={open}
      footer={
        loading
          ? false
          : [
              <Button
                key="back"
                type="link"
                disabled={buttonLoading}
                onClick={() => {
                  closeModal();
                }}
                danger
              >
                Return
              </Button>,
              user.role === "LEAD" &&
              data &&
              data.status &&
              data.status !== 2 ? (
                <>
                  <Button
                    key="submit"
                    loading={buttonLoading}
                    onClick={() => {
                      updateVersion(2);
                    }}
                  >
                    Submit Review
                  </Button>

                  <Button
                    key="publish"
                    type="primary"
                    loading={buttonLoading}
                    onClick={() => {
                      updateVersion(3);
                    }}
                  >
                    Publish
                  </Button>
                </>
              ) : null,
            ]
      }
      onCancel={closeModal}
      closeIcon={buttonLoading ? null : <FontAwesomeIcon icon={faClose} />}
      width={1200}
      style={{
        top: 18,
      }}
    >
      {loading ? (
        <Card loading />
      ) : (
        <>
          <h1>{data.title}</h1>
          <div className="review-card">
            <div className="editor-card-wrapper">
              <EditorContent
                onClick={(e) => handleContentEvents(e, true)}
                contentEditable={false}
                editor={editor}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
            <div className="comment-card-wrapper">
              <div className="comment-tite">Suggestions</div>
              {!isHighlighted && comments.length === 0 && (
                <ConfigProvider
                  theme={{
                    components: {
                      Result: {
                        titleFontSize: 16,
                      },
                    },
                  }}
                >
                  <Result
                    icon={<FontAwesomeIcon icon={faInbox} fontSize={40} />}
                    title="No Suggestions added Yet !!"
                  />
                </ConfigProvider>
              )}
              {isHighlighted && (
                <Card
                  className="add-comment-card"
                  style={{ borderColor: "green" }}
                >
                  <Form
                    form={form}
                    onFinish={handleComment}
                    layout="vertical"
                    requiredMark={false}
                  >
                    <Form.Item
                      name="comment"
                      rules={[
                        {
                          validator: validateComment,
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        modules={{
                          toolbar: ["bold", "italic", "underline", "strike"],
                        }}
                        placeholder="Enter suggestions"
                        ref={commentInputRef}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        key="save-comment"
                        disabled={buttonLoading}
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              )}
              {comments &&
                comments.length !== 0 &&
                comments
                  .sort((a, b) => a.position_y - b.position_y)
                  .map((comment) => {
                    return (
                      <CommentCard
                        user={user}
                        key={comment.id}
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                        selectedCommentId={selectedCommentId}
                        setSelectedCommentId={setSelectedCommentId}
                        deleteComment={deleteComment}
                      />
                    );
                  })}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

export default ReviewBlog;
