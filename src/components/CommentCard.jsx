import {
  faCheck,
  faClose,
  faEllipsis,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Dropdown, Form } from "antd";
import moment from "moment";
import { useState } from "react";
import { roles } from "../constants/constant";
import AnnotationService from "../services/annotationService";
import ReactQuill from "react-quill";

function CommentCard({
  user,
  comment,
  comments,
  setComments,
  selectedCommentId,
  setSelectedCommentId,
  deleteComment,
}) {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const getRelativeTime = (timestamp) => {
    return moment(timestamp).fromNow();
  };
  const getUserName = (author_id) => {
    const user = roles.filter(({ userId }) => userId === author_id);
    return user[0].name;
  };
  const updateComments = (e) => {
    let payload = Object.assign({}, comment);
    payload.description = e.comment;
    AnnotationService.updateAnnotation(comment.id, payload).then((res) => {
      setComments([...comments.filter((e) => e.id !== comment.id), res.data]);
      setEditMode(false);
    });
  };
  const items = [
    {
      label: (
        <a
          onClick={() => {
            setEditMode(true);
            form.setFieldsValue({ comment: comment.description });
          }}
        >
          edit
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          onClick={() => {
            deleteComment(comment.id, comment.highlight_mark_id);
          }}
        >
          delete
        </a>
      ),
      key: "1",
    },
  ];
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
  return (
    <Card
      id={"card-" + comment.highlight_mark_id}
      onClick={() => {
        setSelectedCommentId(comment.highlight_mark_id);
        document.getElementById(comment.highlight_mark_id).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
      className="comment-card"
      style={
        selectedCommentId &&
        comment.highlight_mark_id === selectedCommentId && {
          borderColor: "green",
          boxShadow: "0 0 8px #444",
          margin: "0",
        }
      }
      title={
        <div className="comment-card-title-wrapper">
          <FontAwesomeIcon icon={faUserCircle} fontSize="28" />
          <div>
            <div className="comment-card-title">
              {getUserName(comment.author_id)}
            </div>
            <div className="comment-time">
              {getRelativeTime(comment.created_at)}
            </div>
          </div>
        </div>
      }
      extra={
        user.userId === comment.author_id ? (
          editMode ? (
            <Button
              onClick={() => {
                setEditMode(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </Button>
          ) : (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["hover"]}
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          )
        ) : null
      }
    >
      {editMode ? (
        <Form
          form={form}
          onFinish={updateComments}
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
              preserveWhitespace={false}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              key="save-comment"
              icon={<FontAwesomeIcon icon={faCheck} />}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div
          className="comment-text"
          dangerouslySetInnerHTML={{ __html: comment.description }}
        />
      )}
    </Card>
  );
}

export default CommentCard;
