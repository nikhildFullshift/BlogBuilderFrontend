import { Button, Container, Divider } from "@mui/material";
import React from "react";

function DraftSubmit() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "20px auto",
        }}
      >
        <Button>Move to Draft</Button>
        <Button variant="contained" sx={{ marginLeft: "10px", float: "right" }}>
          Send to Author
        </Button>
      </Container>
      <Divider />
    </>
  );
}

export default DraftSubmit;
