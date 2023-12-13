import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Blogcontext } from "../App";
import BlogInput from "./blog-input/BlogInput";
// import EditReview from "./edit-review/EditReview";
import PreviewBlog from "./preview-blog/PreviewBlog";

export default function FormCreateBlog() {
  const steps = ["Create Blog", "Edit/Review"];
  const { state, dispatch } = useContext(Blogcontext);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setActiveStep(state.activeStep);
  }, [state.activeStep]);

  return (
    <>
      <Container>{activeStep === 0 ? <BlogInput /> : <PreviewBlog />}</Container>
    </>
  );
}
