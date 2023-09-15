export interface BlogContextProps {
  state: {
    activeStep: 0;
    title: string;
    description: string;
    result: { title: string; description: string };
    comments: [];
    role: string;
    userId: number;
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
    selectedComment: number;
  };
  dispatchAnnotation: ({ type, payload }) => void;
}

export enum blogStatus {
  draft,
  pending, // blog submitted for review
  reviewed,
  published_kb, // blog published to knowledge base
  published_web,
  deleted,
}
