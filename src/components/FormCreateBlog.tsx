import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Blogcontext } from "../App";
import BlogInput from "./blog-input/BlogInput";
import EditReview from "./edit-review/EditReview";

export default function FormCreateBlog() {
  const steps = ["Create Blog", "Edit/Review"];
  const { state, dispatch } = useContext(Blogcontext);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setActiveStep(state.activeStep);
  }, [state.activeStep]);

  return (
    <>
      <Container sx={{ margin: "3rem auto" }}>
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
