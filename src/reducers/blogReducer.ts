export const initalState = {
  activeStep: 0,
  title: "",
  description: "",
  result: { title: "", description: "" },
  role: "",
  userId: 0,
};

export const blog_reducer = (state: any, action: any) => {
  if (action.payload === "UPDATE_BLOG_QUERY") {
    const { title, description } = action.payload;
    return { ...state, title, description };
  } else if (action.type === "UPDATE_BLOG_RESULT") {
    return { ...state, result: action.payload };
  } else if (action.type == "UPDATE_ACTIVE_STEP") {
    return { ...state, activeStep: action.payload };
  } else if (action.type == "CLEAR") {
    return initalState;
  } else if (action.type === "UPDATE_USER_DETAILS") {
    const { role, userId } = action.payload;
    return { ...state, role, userId };
  }
  return state;
};
