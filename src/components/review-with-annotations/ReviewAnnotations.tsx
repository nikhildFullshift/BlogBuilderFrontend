import { useEditor, EditorContent } from "@tiptap/react";
import { findChildren } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useContext, useRef, useState } from "react";
import "./ReviewAnnotations.css";
import BackdropLoader from "../loader/BackdropLoader";
import CommentCard from "./CommentCard";
import { Card, CardContent, Tooltip, Fab, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AnnotationContext } from "../../App";
import DraftSubmit from "../draft-and-submit/DraftSubmit";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Text from "@tiptap/extension-text";

const ReviewAnnotations = () => {
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);
  const { comments, id, positionY, isSelected, isAddedComment, editCommentId } =
    annotationState;

  const [lastHighlightedBorder, setLastHighlightedBorder] = useState(-1);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [commentToBeRemoved, setCommentToBeRemoved] = useState();

  const lastHightlighted = useRef(null);

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

  const handleContentEvents = (e) => {
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

      highlightCommentOnClick(null, false, true);
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

  if (editor?.isEmpty) {
    //here call the background api to get html data of version
    setTimeout(() => {
      setLoader(true);
      editor.commands.setContent(`<p>Hello World! 🌎️</p>
        <h3>
            Devs Just Want to Have Fun by Cyndi Lauper
          </h3>
          <p>
            I come home in the morning light
            My mother says, “When you gonna live your life right?”
            Oh mother dear we’re not the fortunate ones
            And devs, they wanna have fun
            Oh devs just want to have fun</p>
          <p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p>
          <p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p><p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p><p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p><p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p><p>
            The phone rings in the middle of the night
            My father yells, "What you gonna do with your life?"
            Oh daddy dear, you know you’re still number one
            But <s>girls</s>devs, they wanna have fun
            Oh devs just want to have
          </p>
          <p>
            That’s all they really want
            Some fun
            When the working day is done
            Oh devs, they wanna have fun
            Oh devs just wanna have fun
            (devs, they wanna, wanna have fun, devs wanna have)
          </p>`);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }, 1000);
  }

  if (!editor) return null;

  const handleHighlightedText = (e) => {
    e.stopPropagation();
    dispatchAnnotation({
      type: "UPDATE_TO_SHOW_COMMENT_BOX",
      payload: false,
    });

    if (!isAddedComment && lastHightlighted.current) {
      lastHightlighted.current.unsetHighlight().run();
      lastHightlighted.current = null;
    } else {
      if (!isAddedComment) {
        lastHightlighted.current?.unsetHighlight().run();
      }
      highlightCommentOnClick(null, false, true);
      lastHightlighted.current = null;
    }
  };

  const toggleHighlight = (commentId) => {
    editor.commands.forEach(
      Array.from({ length: id - 1 }, (_, i) => i + 1),
      (_id, { tr, chain }) => {
        const item = findChildren(tr.doc, (node: any) => {
          return (
            node?.marks.length > 0 &&
            node?.marks.find((item) => item.attrs?.id === commentId)
          );
        });

        if (!item) {
          return true;
        }

        item.forEach((eachItem) =>
          chain().setNodeSelection(eachItem.pos).unsetAllMarks().run()
        );
        return true;
      }
    );
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
        }}
      >
        <Card sx={{ width: "75%" }}>
          <DraftSubmit margin="20px auto" sendPlaceHolder="Send To Author" />
          <Divider />
          <CardContent className="versionContent">
            <EditorContent
              onClick={(e) => handleContentEvents(e)}
              contentEditable={false}
              editor={editor}
            />
          </CardContent>
        </Card>
        <div style={{ width: "25%" }} onClick={(e) => handleContentEvents(e)}>
          {comments.map((item: any) => {
            return (
              <CommentCard
                highlightCommentOnClick={highlightCommentOnClick}
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
