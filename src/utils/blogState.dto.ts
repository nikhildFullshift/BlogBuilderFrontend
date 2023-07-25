export interface BlogContextProps {
  state: {
    activeStep: 0;
    title: "";
    description: "";
    result: {};
  };
  dispatch: ({ type: string, payload: any }) => void;
}
