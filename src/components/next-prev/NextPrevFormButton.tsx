import { Button, Container } from "@mui/material";
import React, { useContext } from "react";
import { Blogcontext } from "../../App";

function NextPrevFormButton(props: any) {
  const { state, dispatch } = useContext(Blogcontext);
  const handleSteps = async (step: number) => {
    await props.handleSubmit();
    dispatch({ type: "UPDATE_ACTIVE_STEP", payload: state.activeStep + step });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        disabled={state?.activeStep === 0}
        onClick={() => handleSteps(-1)}
      >
        Prev
      </Button>
      <Button onClick={() => handleSteps(1)}>
        {state.activeStep === 0 ? "Next" : "Send To Review"}
      </Button>
    </Container>
  );
}

export default NextPrevFormButton;
