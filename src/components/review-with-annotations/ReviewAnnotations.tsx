import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useRef, useState } from "react";
import "./ReviewAnnotations.css";

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
            },
          ]);
          document.getElementById("tooltip").style.display = "none";
          document.getElementById("addcomment").style.display = "none";
          document.getElementById(id.toString()).innerHTML = prevInnerHTML;
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
                };
              } else {
                return item;
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

  const togglehighlightComment = async (id: number, toaddBorder: boolean) => {
    if (id < 0) {
      return;
    }
    const elements = document.getElementsByClassName("tooltip-parent");
    for (let item of elements) {
      if (Number(item.id) === id) {
        if (toaddBorder && lastHighlightedBorder != id) {
          togglehighlightComment(lastHighlightedBorder, false);
          eventHandleAndCommentBox(id, false);
          item.classList.add("addBorder");
          setLastHighlightedBorder(id);
        } else if (lastHighlightedBorder != id) {
          item.classList.remove("addBorder");
        } else {
          item.classList.remove("addBorder");
          setLastHighlightedBorder(-1);
        }
      }
    }
  };

  const handleComment = async () => {
    editor
      .chain()
      .focus()
      .toggleHighlight({ id: id.toString(), class: "tooltip-parent" })
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
        togglehighlightComment(lastHighlightedBorder, false);
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

  if (true && editor?.isEmpty) {
    //here call the background api to get html data of version
    setTimeout(() => {
      editor.commands.setContent(`<p>Hello World! 🌎️</p>
        <h3 >
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
    }, 1000);
  }

  if (!editor) return null;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <button
          id="addcomment"
          onClick={handleComment}
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
            onClick={(event) => {
              event.stopPropagation();
              togglehighlightComment(item.id, true);
            }}
            className="commentDiv"
            key={item.id}
          >
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAnnotations;
