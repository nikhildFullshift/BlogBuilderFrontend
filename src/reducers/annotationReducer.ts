export const initialAnnotationState = {
  id: 1,
  comments: [],
  isSelected: false,
  positionY: 0,
  isAddedComment: false,
  editCommentId: 0,
  versionId: 0,
  selectedComment: 0,
  toUpdateHTMLContent: false,
};

export const annotation_reducer = (state: any, action: any) => {
  if (action.type === "UPDATE_ID") {
    return { ...state, id: state.id + action.payload };
  } else if (action.type === "UPDATE_HTML_CONTENT") {
    return { ...state, toUpdateHTMLContent: action.payload };
  } else if (action.type === "UPDATE_SELECTED_COMMENT") {
    return { ...state, selectedComment: action.payload };
  } else if (action.type === "UPDATE_EDIT_COMMENT_ID") {
    return { ...state, editCommentId: action.payload };
  } else if (action.type === "UPDATE_EDIT_COMMENT_VALUE") {
    return { ...state, editCommentValue: action.payload };
  } else if (action.type === "UPDATE_Y_AXIS_OF_SELECTED_ELEMENT") {
    return { ...state, positionY: action.payload };
  } else if (action.type === "COMMENT_ADDED") {
    return { ...state, isAddedComment: action.payload };
  } else if (action.type === "UPDATE_TO_SHOW_COMMENT_BOX") {
    return { ...state, isSelected: action.payload };
  } else if (action.type === "UPDATE_VERSION_ID") {
    return { ...state, versionId: action.payload };
  } else if (action.type === "UPDATE_ANNOTATION_ID") {
    const { annotationId, commentId } = action.payload;
    const updatedComments = state.comments.map((item) => {
      if (item.id === commentId) {
        return { ...item, annotationId };
      } else {
        return item;
      }
    });
    return { ...state, comments: updatedComments };
  } else if (action.type === "UPDATE_COMMENTS") {
    const { id, value } = action.payload;
    const updateComments = state.comments.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: value,
        };
      } else {
        return item;
      }
    });

    return { ...state, comments: updateComments };
  } else if (action.type === "DELETE_COMMENTS") {
    const id = action.payload;
    const filteredComments = state.comments.filter((item) => item.id !== id);
    return {
      ...state,
      comments: filteredComments,
    };
  } else if (action.type === "ADD_COMMENTS") {
    const { id, value, positionY } = action.payload;
    const newState = {
      ...state,
      comments: [...state.comments, { id, value, positionY }],
    };
    newState.comments.sort(function (item1, item2) {
      return item1.positionY - item2.positionY;
    });
    return newState;
  } else if (action.type == "COMMENTS_STATE_UPDATE_DIRECTLY") {
    return { ...state, comments: action.payload };
  } else if (action.type == "CLEAR") {
    return initialAnnotationState;
  }
  return state;
};
