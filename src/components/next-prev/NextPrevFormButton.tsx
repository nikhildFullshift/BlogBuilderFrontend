import { Button, Container } from "@mui/material";
import { useContext } from "react";
import { Blogcontext } from "../../App";
import DraftSubmit from "../draft-and-submit/DraftSubmit";
import { useParams } from "react-router-dom";

function NextPrevFormButton(props: any) {
  const { handleSubmit } = props;
  const { state, dispatch } = useContext(Blogcontext);
  const { blogId } = useParams();

  const handleSteps = async (step: number, saveToDraft: boolean) => {
    try {
      if (saveToDraft) {
        await handleSubmit(true);
        return;
      }
      if (step > 0) {
        await handleSubmit(false);
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
      {blogId && (
        <Button
          disabled={state?.activeStep === 0}
          onClick={() => handleSteps(0, false)}
        >
          Prev
        </Button>
      )}
      {state.activeStep === 0 && !blogId ? (
        <Button onClick={() => handleSteps(1, false)}>Next</Button>
      ) : (
        <DraftSubmit
          saveOnClick={(step, saveToDraft) => handleSteps(step, saveToDraft)}
          sendPlaceHolder="Send To Review"
        />
      )}
    </Container>
  );
}

export default NextPrevFormButton;
