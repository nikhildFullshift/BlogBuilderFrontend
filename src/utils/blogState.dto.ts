export interface BlogContextProps {
  state: {
    activeStep: 0;
    title: "";
    description: "";
    result: { title: ""; description: "" };
  };
  dispatch: ({ type: string, payload: any }) => void;
}
