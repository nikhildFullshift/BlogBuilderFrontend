import { Container, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Blogcontext } from "../App";
import BlogInput from "./blog-input/BlogInput";
import EditReview from "./edit-review/EditReview";
import NextPrevFormButton from "./next-prev/NextPrevFormButton";

export default function FormCreateBlog() {
  const steps = ["Create Blog", "Edit/Review"];
  const { state, dispatch } = useContext(Blogcontext);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    console.log("Called", activeStep);
    if (state?.activeStep !== null) {
      setActiveStep(state.activeStep);
    }
  }, [state.activeStep]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Container>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
      <Container>{activeStep === 0 ? <BlogInput /> : <EditReview />}</Container>
    </Paper>
  );
}
