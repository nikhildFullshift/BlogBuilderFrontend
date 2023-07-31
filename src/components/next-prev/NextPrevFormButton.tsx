import { Button, Container } from "@mui/material";
import { useContext } from "react";
import { Blogcontext } from "../../App";

function NextPrevFormButton(props: any) {
  const { state, dispatch } = useContext(Blogcontext);
  const handleSteps = async (step: number) => {
    try {
      if (step > 0) {
        await props.handleSubmit();
      }
      // dispatch({ type: "UPDATE_ACTIVE_STEP", payload: step });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button disabled={state?.activeStep === 0} onClick={() => handleSteps(0)}>
        Prev
      </Button>
      <Button onClick={() => handleSteps(1)}>
        {state.activeStep === 0 ? "Next" : "Send To Review"}
      </Button>
    </Container>
  );
}

export default NextPrevFormButton;
