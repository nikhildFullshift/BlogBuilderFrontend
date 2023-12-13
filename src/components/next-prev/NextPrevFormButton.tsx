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
    <div className="next-prev-form-button-wrapper">
      {blogId && (
        <Button
          disabled={state?.activeStep === 0}
          onClick={() => handleSteps(0, false)}
        >
          Prev
        </Button>
      )}
      {state.activeStep === 0 && !blogId ? (
        <>
          <div className="next-prev-form-title">Create Blog</div>
          <Button sx={{textTransform:"none"}} onClick={() => handleSteps(1, false)} className="next-button">Next</Button>
        </>
      ) : (
        <DraftSubmit
          saveOnClick={(step, saveToDraft) => handleSteps(step, saveToDraft)}
          sendPlaceHolder="Send To Review"
        />
      )}
    </div>
  );
}

export default NextPrevFormButton;
