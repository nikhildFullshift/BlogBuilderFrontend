import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { AnnotationContext } from "../../App";
import { Button, Container, Menu, MenuItem, TextField } from "@mui/material";

const API_URL = "http://localhost:3000";

const CommentForm = (props: any) => {
  const { isNewComment, annotationId } = props;
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);

  const {
    id: commentId,
    positionY,
    editCommentValue,
    editCommentId,
    versionId,
  } = annotationState;
  const [commentValue, setCommentValue] = useState(editCommentValue || "");

  const addComment = (event) => {
    event.stopPropagation();
    dispatchAnnotation({
      type: "COMMENT_ADDED",
      payload: true,
    });

    if (isNewComment) {
      dispatchAnnotation({
        type: "UPDATE_TO_SHOW_COMMENT_BOX",
        payload: false,
      });
      dispatchAnnotation({
        type: "ADD_COMMENTS",
        payload: { id: commentId, value: commentValue, positionY },
      });
      dispatchAnnotation({ type: "UPDATE_ID", payload: 1 });
      fetch(`${API_URL}/annotation/create/${versionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          highlightMarkId: commentId,
          description: commentValue,
          positionY,
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      dispatchAnnotation({
        type: "UPDATE_COMMENTS",
        payload: {
          id: editCommentId,
          value: commentValue,
        },
      });
      dispatchAnnotation({
        type: "UPDATE_EDIT_COMMENT_ID",
        payload: 0,
      });
      dispatchAnnotation({
        type: "UPDATE_EDIT_COMMENT_VALUE",
        payload: "",
      });

      fetch(`${API_URL}/annotation/update/${annotationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: commentValue,
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label="Comment"
        variant="standard"
        value={commentValue}
        fullWidth
        multiline
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <Container sx={{ marginTop: "5px", paddingLeft: "0!important" }}>
        <Button
          sx={{ marginRight: "5px" }}
          variant="contained"
          onClick={(e) => addComment(e)}
        >
          Comment
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            dispatchAnnotation({
              type: "UPDATE_EDIT_COMMENT_ID",
              payload: 0,
            });
          }}
        >
          Cancel
        </Button>
      </Container>
    </>
  );
};

export default function CommentCard(props: any) {
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);
  const { positionY } = annotationState;
  const {
    isNewComment,
    textValue,
    y,
    commentId,
    annotationId,
    highlightCommentOnClick,
    isEditable,
    toggleHighlight,
  } = props;
  const elementRef = useRef(null);
  const [isSelectedComment, setIsSelectedComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          height: elementRef.current.offsetHeight,
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
        height: elementRef.current.offsetHeight,
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
    setIsSelectedComment(false);
  };

  const handleSelectionOnCard = (e) => {
    e.stopPropagation();
    if (isNewComment) {
      return;
    }
    highlightCommentOnClick(commentId, true);
    setIsSelectedComment(true);
    handleMarginOnCommentSelection(commentId);
  };

  useLayoutEffect(() => {
    if (isSelectedComment) {
      handleMarginOnCommentSelection(commentId);
      return;
    }

    if (!isNewComment && !isSelectedComment) {
      handleMargin(annotationState);
    }
  }, [annotationState.comments, isSelectedComment]);

  const handleEdit = (event, commentId) => {
    event.stopPropagation();
    dispatchAnnotation({ type: "UPDATE_EDIT_COMMENT_ID", payload: commentId });
    dispatchAnnotation({
      type: "UPDATE_EDIT_COMMENT_VALUE",
      payload: textValue,
    });
    handleClose();
  };

  const handleDelete = (event, commentId, annotationId) => {
    event.stopPropagation();
    toggleHighlight(commentId);
    dispatchAnnotation({ type: "DELETE_COMMENTS", payload: commentId });
    fetch(`${API_URL}/annotation/delete/${annotationId}`, {
      method: "DELETE",
    });
    handleClose();
  };

  return (
    <Card
      onClick={(e) => handleSelectionOnCard(e)}
      ref={elementRef}
      id={`${isNewComment ? "" : `comment${commentId}`}`}
      sx={{
        width: "340px",
        marginTop: `${isNewComment ? positionY : y}px`,
        marginLeft: `${isNewComment ? "50%" : "2%"}`,
        position: `${isNewComment ? "absolute" : ""}`,
        background: "#edf2fa",
        borderRadius: `${!isNewComment ? "10px" : ""}`,
        zIndex: `${isNewComment ? 10 : 0}`,
        transition: "all 0.5s ease 0s",
      }}
      className="commentDiv"
      elevation={0}
    >
      <CardHeader
        sx={{ padding: "1em 1em 0" }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            V
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={(e) => handleEdit(e, commentId)}>
                Edit
              </MenuItem>
              <MenuItem
                onClick={(e) => handleDelete(e, commentId, annotationId)}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        }
        title="Varun"
        subheader="Aug 23, 2023"
      />
      <CardContent sx={{ padding: "5px 15px 10px" }}>
        {isNewComment || isEditable ? (
          <CommentForm
            isNewComment={isNewComment}
            annotationId={annotationId}
          />
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ wordWrap: "break-word" }}
          >
            {textValue}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
