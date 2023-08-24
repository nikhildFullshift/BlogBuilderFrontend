export const initialAnnotationState = {
  id: 1,
  comments: [],
  isSelected: false,
  positionY: 0,
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
    const { id, value } = action.payload;
    return { ...state, comments: [...state.comments, { id, value }] };
  } else if (action.type == "CLEAR") {
    return initialAnnotationState;
  }
  return state;
};