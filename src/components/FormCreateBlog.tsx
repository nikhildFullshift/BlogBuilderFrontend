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
    setActiveStep(state.activeStep);
  }, [state.activeStep]);

  return (
    <>
      <Container sx={{ marginTop: "1rem" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
      <Container>{activeStep === 0 ? <BlogInput /> : <EditReview />}</Container>
    </>
  );
}
