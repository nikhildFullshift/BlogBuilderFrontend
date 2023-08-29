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
    id: number;
    comments: any[];
    isSelected: false;
    isAddedComment: false;
    positionY: number;
  };
  dispatchAnnotation: ({ type, payload }) => void;
}
