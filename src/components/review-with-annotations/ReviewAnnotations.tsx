import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./ReviewAnnotations.css";
import BackdropLoader from "../loader/BackdropLoader";
import CommentCard from "./CommentCard";
import { Button, Card, CardContent, Tooltip, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { AnnotationContext } from "../../App";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        id="addcomment"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        variant="outlined"
      >
        Clear All Annotations
      </Button>
    </>
  );
};

const ReviewAnnotations = () => {
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);
  const { comments, id, positionY, isSelected, isAddedComment } =
    annotationState;

  const [lastHighlightedBorder, setLastHighlightedBorder] = useState(-1);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [loader, setLoader] = useState(false);

  const lastHightlighted = useRef(null);

  const eventHandleAndCommentBox = async (id, isNewComment) => {
    if (document.getElementById(`tooltip`)) {
      document.getElementById(`tooltip`).remove();
    }

    document.getElementById(`comment${id}`)?.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
      },
      { once: true }
    );
  };

  const togglehighlightComment = async (
    id: number,
    toaddBorder: boolean,
    toAddComment: boolean
  ) => {
    const elements = document.getElementsByClassName("tooltip-parent");
    for (let item of elements) {
      if (Number(item.id) === id) {
        if (toaddBorder && lastHighlightedBorder == id) {
          setLastHighlightedBorder(id);
          if (toAddComment) {
            eventHandleAndCommentBox(id, false);
          }
        } else if (toaddBorder && lastHighlightedBorder != id) {
          // togglehighlightComment(lastHighlightedBorder, false, toAddComment);
          if (toAddComment) {
            eventHandleAndCommentBox(id, false);
          }
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
    dispatchAnnotation({
      type: "UPDATE_TO_SHOW_COMMENT_BOX",
      payload: true,
    });
    setIsNewComment(true);
    editor
      .chain()
      .focus()
      .toggleHighlight({
        id,
        class: "tooltip-parent",
      })
      .run();

    lastHightlighted.current = editor.chain().focus();
    eventHandleAndCommentBox(id, true);
  };

  // document.addEventListener(
  //   "click",
  //   ,
  //   { once: true }
  // );

  const handleContentEvents = (e) => {
    e.stopPropagation();

    const selection = window.getSelection();

    if (selection.type === "Range") {
      dispatchAnnotation({
        type: "UPDATE_Y_AXIS_OF_SELECTED_ELEMENT",
        payload: e.pageY,
      });
      setIsHighlighted(true);
    } else {
      setIsNewComment(false);
      dispatchAnnotation({
        type: "UPDATE_TO_SHOW_COMMENT_BOX",
        payload: false,
      });

      setIsHighlighted(false);
      //to avoid highlight if no comment was added
      if (!isAddedComment && lastHightlighted.current) {
        lastHightlighted.current.unsetHighlight().run();
        lastHightlighted.current = null;
      } else {
        lastHightlighted.current = null;
      }
      if (document.getElementById("tooltip"))
        document.getElementById("tooltip").style.display = "none";

      // if (lastHighlightedBorder)
      // togglehighlightComment(lastHighlightedBorder, false, false);
    }
  };

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
  });

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "strong"],
      }),
      CustomHighlight,
    ],
  });

  if (editor?.isEmpty) {
    //here call the background api to get html data of version
    setTimeout(() => {
      setLoader(true);
      editor.commands.setContent(`<p>Hello World! 🌎️</p>
        <h3>
            Devs Just Want to Have Fun by Cyndi Lauper
          </h3>
          <p>
            I come home in the morning light<br>
            My mother says, “When you gonna live your life right?”<br>
            Oh mother dear we’re not the fortunate ones<br>
            And devs, they wanna have fun<br>
            Oh devs just want to have fun</p>
          <p>
            The phone rings in the middle of the night<br>
            My father yells, "What you gonna do with your life?"<br>
            Oh daddy dear, you know you’re still number one<br>
            But <s>girls</s>devs, they wanna have fun<br>
            Oh devs just want to have
          </p>
          <p>
            That’s all they really want<br>
            Some fun<br>
            When the working day is done<br>
            Oh devs, they wanna have fun<br>
            Oh devs just wanna have fun<br>
            (devs, they wanna, wanna have fun, devs wanna have)
          </p>`);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }, 1000);
  }

  if (!editor) return null;

  const handleFocus = (e, id) => {
    e.stopPropagation();
    // setComments(
    //   comments.map((item) => {
    //     if (item.id == id) {
    //       return {
    //         ...item,
    //         isFocused: item.isFocused ? false : true,
    //       };
    //     } else {
    //       return { ...item, isFocused: false };
    //     }
    //   })
    // );
    // togglehighlightComment(id, true, false);
  };

  const handleHighlightedText = (e) => {
    e.stopPropagation();
    setIsHighlighted(false);
  };

  return (
    <>
      {isSelected && <CommentCard isNewComment={isNewComment} y={positionY} />}
      <div
        onClick={(e) => handleHighlightedText(e)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
          // height: "100vh",
        }}
      >
        <Card sx={{ width: "75%" }}>
          <CardContent>
            <div>
              <MenuBar editor={editor} />
              <EditorContent
                style={{ overflowY: "auto" }}
                onClick={(e) => handleContentEvents(e)}
                contentEditable={false}
                editor={editor}
              />
            </div>
          </CardContent>
        </Card>
        <div style={{ width: "25%" }}>
          {comments.map((item: any) => {
            return (
              <CommentCard
                commentId={item.id}
                key={item.id}
                textValue={item.value}
                y={item.marginY}
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
            <Fab
              size="medium"
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Tooltip>)}
      </div>
      <BackdropLoader isOpen={loader} />
    </>
  );
};

export default ReviewAnnotations;
