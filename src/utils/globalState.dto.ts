export interface BlogContextProps {
  state: {
    activeStep: 0;
    title: "";
    description: "";
    result: { title: ""; description: "" };
    comments: [];
  };
  dispatch: ({ type, payload }) => void;
}

export interface AnnotationContextProps {
  annotationState: {
    id: 1;
    comments: [];
    isSelected: false;
    positionY: number;
  };
  dispatchAnnotation: ({ type, payload }) => void;
}
