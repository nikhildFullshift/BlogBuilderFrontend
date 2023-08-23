import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useRef, useState } from "react";
import "./ReviewAnnotations.css";
import BackdropLoader from "../loader/BackdropLoader";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear All Annotations
      </button>
    </>
  );
};

const ReviewAnnotations = () => {
  const [id, setId] = useState(1);
  const [addedComment, setAddedComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [lastHighlightedBorder, setLastHighlightedBorder] = useState(-1);

  const lastHightlighted = useRef(null);

  const eventHandleAndCommentBox = async (id, isNewComment) => {
    const prevInnerHTML = document.getElementById(id.toString()).innerHTML;

    if (document.getElementById(`tooltip`)) {
      document.getElementById(`tooltip`).remove();
    }
    document.getElementById(
      id.toString()
    ).innerHTML = `${prevInnerHTML}<div style="border:1px solid black;z-index:100;" id="tooltip">
            <input type="text" id="comment${id}" value="${
      isNewComment ? "" : comments[id - 1].comment
    }"/>
            <button id="submitComment">${
              isNewComment ? "Add" : "Update"
            } Comment</button>
            </div>`;

    document.getElementById(`comment${id}`).addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
      },
      { once: true }
    );

    document.getElementById("submitComment").addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        setAddedComment(true);

        if (isNewComment) {
          setComments([
            ...comments,
            {
              id,
              comment: (
                document.getElementById(`comment${id}`) as HTMLInputElement
              ).value,
              position: event.pageY,
              isFocused: false,
            },
          ]);

          document.getElementById("tooltip").style.display = "none";
          document.getElementById("addcomment").style.display = "none";
          document.getElementById(
            id.toString()
          ).innerHTML = `${prevInnerHTML} <div id="commentDiv12" class="commentDiv">${
            (document.getElementById(`comment${id}`) as HTMLInputElement).value
          }</div>`;

          document
            .getElementById("commentDiv12")
            .addEventListener("click", (event) => {
              console.log(typeof id, id);
              event.stopPropagation();
              togglehighlightComment(id, true);
            });
          setAddedComment(false);
          lastHightlighted.current = null;
          setId(id + 1);
        } else {
          setComments(
            comments.map((item) => {
              if (item.id == id) {
                return {
                  id,
                  comment: (
                    document.getElementById(`comment${id}`) as HTMLInputElement
                  ).value,
                  position: item.position,
                  isFocused: true,
                };
              } else {
                return { ...item, isFocused: false };
              }
            })
          );
          document.getElementById("tooltip").style.display = "none";
          document.getElementById("addcomment").style.display = "none";
          document.getElementById(id.toString()).innerHTML = prevInnerHTML;
          setAddedComment(false);
          lastHightlighted.current = null;
        }
      },
      { once: true }
    );
    document.getElementById("tooltip").style.display = "block";
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
          togglehighlightComment(lastHighlightedBorder, false, toAddComment);
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

  document.addEventListener("click", (e) => {
    const selection = window.getSelection();
    if (selection.type === "Range") {
      document.getElementById("addcomment").style.display = "block";
    } else {
      document.getElementById("addcomment").style.display = "none";

      //to avoid highlight if no comment was added
      if (!addedComment && lastHightlighted.current) {
        lastHightlighted.current.unsetHighlight().run();
        lastHightlighted.current = null;
      } else {
        lastHightlighted.current = null;
      }
      setAddedComment(false);
      if (document.getElementById("tooltip"))
        document.getElementById("tooltip").style.display = "none";

      if (lastHighlightedBorder)
        togglehighlightComment(lastHighlightedBorder, false, false);
    }
  });

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

  const [loader, setLoader] = useState(false);

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
    setComments(
      comments.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            isFocused: item.isFocused ? false : true,
          };
        } else {
          return { ...item, isFocused: false };
        }
      })
    );
    togglehighlightComment(id, true, false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          width: "50%",
        }}
      >
        <div>
          <button
            id="addcomment"
            onClick={(e) => handleComment(e)}
            style={{ display: "none" }}
          >
            Add Comment
          </button>
          <MenuBar editor={editor} />
          <EditorContent contentEditable={false} editor={editor} />
        </div>
        <div>
          {comments.map((item: any) => (
            <div
              className="commentDiv"
              id={"commentDiv" + item.id}
              onClick={(e) => handleFocus(e, item.id)}
              key={item.id}
              style={{
                top: `calc(${item.position}px - 65px)`,
                position: "absolute",
                right: `${item.isFocused ? "-240px" : "0px"}`,
                transition: "all 1s ease 0s",
                border: "1px solid",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "150px",
                  wordWrap: "break-word",
                }}
              >
                <p
                  style={{
                    maxHeight: "50px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  {item.comment}
                </p>
                {item.isFocused && (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      togglehighlightComment(item.id, true, true);
                    }}
                  >
                    edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BackdropLoader isOpen={loader} />
    </>
  );
};

export default ReviewAnnotations;
