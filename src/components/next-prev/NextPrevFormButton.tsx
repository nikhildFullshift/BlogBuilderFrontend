import { Button, Container } from "@mui/material";
import { useContext } from "react";
import { Blogcontext } from "../../App";
import DraftSubmit from "../draft-and-submit/DraftSubmit";

function NextPrevFormButton(props: any) {
  const { handleSubmit } = props;
  const { state, dispatch } = useContext(Blogcontext);
  const handleSteps = async (step: number) => {
    try {
      if (step > 0) {
        await handleSubmit();
      }
      dispatch({
        type: "UPDATE_ACTIVE_STEP",
        payload: step,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "2rem",
        fontWeight: "medium",
      }}
    >
      <Button disabled={state?.activeStep === 0} onClick={() => handleSteps(0)}>
        Prev
      </Button>
      {/* {state.activeStep === 0 ? (
        <Button onClick={() => handleSteps(1)}>Next</Button>
      ) : (
        <DraftSubmit
          saveOnClick={(step) => handleSteps(step)}
          sendPlaceHolder="Send To Review"
        />
      )} */}
      <Button onClick={() => handleSteps(1)}>
        {state.activeStep === 0 ? "Next" : "Send To Review"}
      </Button>
    </Container>
  );
}

export default NextPrevFormButton;
