import { useEditor, EditorContent } from "@tiptap/react";
import { findChildren } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { useContext, useEffect, useRef, useState } from "react";
import "./ReviewAnnotations.css";
import BackdropLoader from "../loader/BackdropLoader";
import CommentCard from "./CommentCard";
import { Card, CardContent, Tooltip, Fab, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AnnotationContext, Blogcontext } from "../../App";
import DraftSubmit from "../draft-and-submit/DraftSubmit";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Text from "@tiptap/extension-text";
import { useNavigate, useParams } from "react-router-dom";
import { blogStatus } from "../../utils/globalState.dto";

const API_URL = "http://localhost:3000";

const ReviewAnnotations = () => {
  const lastHightlighted = useRef(null);
  const navigate = useNavigate();
  const [lastHighlightedBorder, setLastHighlightedBorder] = useState(-1);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [loader, setLoader] = useState(false);
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);
  const { state } = useContext(Blogcontext);
  const {
    comments,
    id,
    positionY,
    isSelected,
    isAddedComment,
    editCommentId,
    toUpdateHTMLContent,
  } = annotationState;
  const { role } = state;

  const { versionId } = useParams();

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
      Text,
      CustomHighlight,
      Bold,
      Strike,
      Code,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
  });

  useEffect(() => {
    if (toUpdateHTMLContent) {
      fetch(`${API_URL}/version/update/${versionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          htmlFormat: editor.getHTML(),
        }),
      })
        .then((res) =>
          dispatchAnnotation({ type: "UPDATE_HTML_CONTENT", payload: false })
        )
        .catch((err) => console.log(err));
    }
  }, [toUpdateHTMLContent]);

  useEffect(() => {
    //here call the background api to get html data of version
    if (editor?.isEmpty) {
      setLoader(true);
      fetch(`${API_URL}/version/${versionId}`)
        .then((res) => res.json())
        .then((result) => {
          if (role !== "USER" && result.status > blogStatus.pending) {
            navigate("/blog/list");
          }

          editor.commands.setContent(result.htmlFormat);
          setLoader(false);
          dispatchAnnotation({ type: "UPDATE_VERSION_ID", payload: result.id });
        })
        .catch((err) => console.log(err));

      fetch(`${API_URL}/annotation/${versionId}`)
        .then((res) => res.json())
        .then((result) => {
          const parsedResult = result.map((item) => {
            return {
              annotationId: item.id,
              id: item.highlight_mark_id,
              positionY: item.position_y,
              value: item.description,
            };
          });
          dispatchAnnotation({
            type: "COMMENTS_STATE_UPDATE_DIRECTLY",
            payload: parsedResult,
          });
          setLoader(false);
          dispatchAnnotation({ type: "UPDATE_VERSION_ID", payload: result.id });
          dispatchAnnotation({
            type: "UPDATE_ID",
            payload: result.length,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [editor]);

  const highlightCommentOnClick = async (
    id: number,
    toaddBorder: boolean,
    unSetAllBorder: boolean
  ) => {
    const elements = document.getElementsByClassName("tooltip-parent");
    for (let item of elements) {
      if (Number(item.id) === id || unSetAllBorder) {
        if (toaddBorder && lastHighlightedBorder == id) {
          item.classList.remove("addBorder");
          setLastHighlightedBorder(-1);
        } else if (toaddBorder && lastHighlightedBorder != id) {
          highlightCommentOnClick(lastHighlightedBorder, false, false);
          item.classList.add("addBorder");
          setLastHighlightedBorder(id);
        } else {
          item.classList.remove("addBorder");
          setLastHighlightedBorder(-1);
        }
      }
    }
  };

  const handleComment = async (e) => {
    e.stopPropagation();

    setIsHighlighted(false);
    setIsNewComment(true);

    dispatchAnnotation({
      type: "UPDATE_TO_SHOW_COMMENT_BOX",
      payload: true,
    });

    editor
      .chain()
      .focus()
      .toggleHighlight({
        id,
        class: "tooltip-parent",
      })
      .run();

    lastHightlighted.current = editor.chain().focus();
  };

  const handleContentEvents = (e, toHandleClickHighlight) => {
    e.stopPropagation();
    const selection = window.getSelection();

    if (selection.type === "Range") {
      // // store the childNodes in state
      // if (selection.anchorNode.parentElement.innerHTML.includes("mark")) {
      //   // setCommentToBeRemoved(selection.anchorNode.parentElement);
      //   console.log("True");
      // }
      dispatchAnnotation({
        type: "UPDATE_Y_AXIS_OF_SELECTED_ELEMENT",
        payload: e.pageY,
      });
      dispatchAnnotation({
        type: "COMMENT_ADDED",
        payload: false,
      });
      setIsHighlighted(true);
    } else {
      setIsHighlighted(false);
      setIsNewComment(false);
      dispatchAnnotation({
        type: "UPDATE_TO_SHOW_COMMENT_BOX",
        payload: false,
      });

      if (toHandleClickHighlight) {
        focusCommentOnClickOfHighlight();
      }
      //to avoid highlight if no comment was added
      if (!isAddedComment) {
        lastHightlighted.current?.unsetHighlight().run();
        lastHightlighted.current = null;
      } else {
        if (!isAddedComment) {
          lastHightlighted.current?.unsetHighlight().run();
        }
        lastHightlighted.current = null;
      }

      // if (lastHighlightedBorder)
      // togglehighlightComment(lastHighlightedBorder, false, false);
    }
  };

  const calculateNetmargin = (differenceOfHeightOfPrevAndCurrentComment) => {
    //update the postionY for each comment with this result in margin property
    // new Position Y/margin will be previous elements Y + result of this.
    const fixedMargin = 10;

    if (differenceOfHeightOfPrevAndCurrentComment >= fixedMargin) {
      //when current comment Y is greater than Prevcomment + its height
      return differenceOfHeightOfPrevAndCurrentComment;
    } else {
      return fixedMargin;
    }
  };

  const handleMargin = (annotationState) => {
    const { comments } = annotationState;

    let offsetTop;
    for (let index = 0; index < comments.length; index++) {
      if (index === 0) {
        offsetTop = comments[index].positionY;
        comments[index] = {
          ...comments[index],
          marginY: comments[index].positionY,
          offsetTop: comments[index].positionY,
        };
        continue;
      }

      const prevHeight = comments[index - 1].height;

      const differenceOfHeightOfPrevAndCurrentComment =
        comments[index].positionY - offsetTop - prevHeight;

      const calculatedmargin = calculateNetmargin(
        differenceOfHeightOfPrevAndCurrentComment
      );

      comments[index] = {
        ...comments[index],
        marginY: calculatedmargin,
        offsetTop: calculatedmargin + offsetTop + prevHeight,
      };
      offsetTop = calculatedmargin + offsetTop + prevHeight;
    }

    dispatchAnnotation({
      type: "COMMENTS_STATE_UPDATE_DIRECTLY",
      payload: comments,
    });
  };

  const handleMarginOnCommentSelection = (commentId) => {
    let { comments } = annotationState;
    handleMargin(annotationState);

    let tobeTransitionedComment = comments
      .map((item, index) => {
        return { ...item, index };
      })
      .filter((item) => item.id === commentId)[0];

    if (!tobeTransitionedComment) return;

    if (tobeTransitionedComment.positionY === tobeTransitionedComment.marginY) {
      return;
    }

    let differenceAfterTransition;
    for (let i = tobeTransitionedComment.index; i >= 0; i--) {
      if (tobeTransitionedComment.id === comments[i].id) {
        differenceAfterTransition =
          tobeTransitionedComment.offsetTop - comments[i].positionY;
      }

      if (i === 0) {
        comments[i] = {
          ...comments[i],
          marginY: comments[i].marginY - differenceAfterTransition,
        };
      } else {
        const calculatedmargin = calculateNetmargin(
          comments[i].marginY - differenceAfterTransition
        );
        comments[i] = {
          ...comments[i],
          marginY: calculatedmargin,
        };
      }
    }

    dispatchAnnotation({
      type: "COMMENTS_STATE_UPDATE_DIRECTLY",
      payload: comments,
    });
  };

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
    handleMarginOnCommentSelection(highlightedCommentId);
    highlightCommentOnClick(highlightedCommentId, true, false);
  };

  const toggleHighlight = (commentId) => {
    const { tr } = editor.state;
    const item = findChildren(tr.doc, (node: any) => {
      return (
        node?.marks.length > 0 &&
        node?.marks.find((item) => item.attrs?.id == commentId)
      );
    });

    if (!item) {
      return;
    }

    item.forEach((eachItem) =>
      editor.chain().setNodeSelection(eachItem.pos).unsetAllMarks().run()
    );
  };

  const saveOnClick = async (toUpdateState) => {
    if (toUpdateState) {
      fetch(`${API_URL}/version/update/${versionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: blogStatus.reviewed,
        }),
      })
        .then((res) => {
          navigate("/blog/list");
        })
        .catch((err) => console.log(err));
    } else {
      dispatchAnnotation({ type: "UPDATE_HTML_CONTENT", payload: true });
    }
  };

  return (
    <>
      {isSelected && <CommentCard isNewComment={isNewComment} y={positionY} />}
      <div
        className={role === "USER" ? "unselectable" : ""}
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <Card sx={{ width: "75%" }}>
          <DraftSubmit
            margin="20px auto"
            sendPlaceHolder="Send To Author"
            saveOnClick={saveOnClick}
          />
          <Divider />
          <CardContent className="versionContent">
            <EditorContent
              onClick={(e) => handleContentEvents(e, true)}
              contentEditable={false}
              editor={editor}
            />
          </CardContent>
        </Card>
        <div
          style={{ width: "25%" }}
          onClick={(e) => handleContentEvents(e, false)}
        >
          {comments.map((item: any) => {
            return (
              <CommentCard
                highlightCommentOnClick={highlightCommentOnClick}
                annotationId={item.annotationId}
                commentId={item.id}
                key={item.id}
                textValue={item.value}
                y={item.marginY}
                isEditable={item.id === editCommentId}
                toggleHighlight={toggleHighlight}
              />
            );
          })}
        </div>
        {isHighlighted && (
          <Tooltip
            title="Add comment"
            arrow
            sx={{ position: "absolute", left: "74%", top: positionY - 75 }}
            id="addcomment"
            onClick={(e) => handleComment(e)}
          >
            <Fab size="medium" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </div>
      <BackdropLoader isOpen={loader} />
    </>
  );
};

export default ReviewAnnotations;
