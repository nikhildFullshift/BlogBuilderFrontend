export const initialAnnotationState = {
  id: 1,
  comments: [],
  isSelected: false,
  positionY: 0,
};

const calculateNetmargin = (differenceOfHeightOfPrevAndCurrentComment) => {
  //update the postionY for each comment with this result in margin property
  // new Position Y/margin will be previous elements Y + result of this.
  const fixedMargin = 10;

  if (differenceOfHeightOfPrevAndCurrentComment >= fixedMargin) {
    //when current comment Y is greater than Prevcomment + its height
    return differenceOfHeightOfPrevAndCurrentComment;
  } else if (differenceOfHeightOfPrevAndCurrentComment >= 0) {
    //when current comment Y is greater than Prevcomment + its height ,but less than our fixed margin
    return fixedMargin;
  } else {
    return fixedMargin;
  }
};

const handleMargin = (state) => {
  const { comments } = state;
  let offsetTop, prevHeight;
  const updatedComments = comments.map((item, index) => {
    if (index === 0) {
      offsetTop = item.positionY;
      prevHeight = document.getElementById(
        "comment" + comments[index].id
      )?.offsetHeight;
      return { ...item, marginY: item.positionY, offsetTop: item.positionY };
    }

    console.log(
      "🚀 ~ file: annotationReducer.ts:38 ~ updatedComments ",
      index,
      offsetTop
    );
    const differenceOfHeightOfPrevAndCurrentComment =
      comments[index].positionY - offsetTop - prevHeight;

    console.log(
      "🚀 ~ file: annotationReducer.ts:41 ~ updatedComments ~ differenceOfHeightOfPrevAndCurrentComment:",
      differenceOfHeightOfPrevAndCurrentComment
    );

    const calculatedmargin = calculateNetmargin(
      differenceOfHeightOfPrevAndCurrentComment
    );
    console.log(
      "🚀 ~ file: annotationReducer.ts:48 ~ updatedComments ~ calculatedmargin:",
      calculatedmargin,
      Number(differenceOfHeightOfPrevAndCurrentComment),
      prevHeight
    );

    const newItem = {
      ...item,
      marginY: calculatedmargin,
      offsetTop: calculatedmargin + offsetTop + prevHeight,
    };
    offsetTop = calculatedmargin + offsetTop + prevHeight;
    prevHeight = document.getElementById(
      "comment" + comments[index].id
    )?.offsetHeight;

    return newItem;
  });

  return { ...state, comments: updatedComments };
};

export const annotation_reducer = (state: any, action: any) => {
  if (action.type === "UPDATE_ID") {
    return { ...state, id: state.id + action.payload };
  } else if (action.type === "UPDATE_Y_AXIS_OF_SELECTED_ELEMENT") {
    return { ...state, positionY: action.payload };
  } else if (action.type === "UPDATE_TO_SHOW_COMMENT_BOX") {
    return { ...state, isSelected: action.payload };
  } else if (action.type === "UPDATE_COMMENTS") {
    const { id, value } = action.payload;
    const filterComments = state.comments.map((item) => {
      if (item.id == id) {
        return {
          id,
          comment: value,
        };
      } else {
        return item;
      }
    });
    return { ...state, comment: filterComments };
  } else if (action.type === "ADD_COMMENTS") {
    const { id, value, positionY } = action.payload;
    const newState = {
      ...state,
      comments: [...state.comments, { id, value, positionY }],
    };
    newState.comments.sort(function (item1, item2) {
      return item1.positionY - item2.positionY;
    });
    return handleMargin(newState);
  } else if (action.type == "CLEAR") {
    return initialAnnotationState;
  }
  return state;
};
