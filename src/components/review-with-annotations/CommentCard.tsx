import { styled } from "@mui/material/styles";
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
import { Button, Container, TextField } from "@mui/material";

const CommentForm = (props: any) => {
  const { isNewComment } = props;
  const [commentValue, setCommentValue] = useState("");
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);

  const { id: commentId, positionY } = annotationState;

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
    } else {
      dispatchAnnotation({
        type: "UPDATE_COMMENTS",
        payload: {
          id: commentId,
          value: commentValue,
        },
      });
    }
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label="Comment"
        variant="standard"
        fullWidth
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
        <Button variant="outlined">Cancel</Button>
      </Container>
    </>
  );
};

export default function CommentCard(props: any) {
  const { annotationState, dispatchAnnotation } = useContext(AnnotationContext);
  const { positionY } = annotationState;
  const { isNewComment, textValue, y, commentId, highlightCommentOnClick } =
    props;
  const elementRef = useRef(null);

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
      console.log(
        "🚀 ~ file: annotationReducer.ts:38 ~ updatedComments ",
        index,
        comments[index].positionY
      );
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

    dispatchAnnotation({ type: "COMMENTS_STATE_UPDATE", payload: comments });
  };

  const handleSelectionOnCard = (e) => {
    e.stopPropagation();
    highlightCommentOnClick(commentId, true);
  };

  useLayoutEffect(() => {
    if (!isNewComment) {
      handleMargin(annotationState);
    }
  }, [annotationState.comments]);

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Varun"
        subheader="Aug 23, 2023"
      />
      <CardContent sx={{ padding: "5px 15px 10px" }}>
        {isNewComment ? (
          <CommentForm isNewComment={isNewComment} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {textValue}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
