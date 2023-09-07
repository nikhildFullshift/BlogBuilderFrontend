export interface BlogContextProps {
  state: {
    activeStep: 0;
    title: string;
    description: string;
    result: { title: string; description: string };
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
    editCommentId: number;
    editCommentValue: string;
    versionId: number;
    toUpdateHTMLContent: boolean;
  };
  dispatchAnnotation: ({ type, payload }) => void;
}
