import { Button, Container } from "@mui/material";

function DraftSubmit(props: any) {
  const { margin, sendPlaceHolder, saveOnClick } = props;
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: margin ? margin : "0",
        backgroundColor: "transparent",
      }}
    >
      <Button onClick={() => saveOnClick()}>Move to Draft</Button>
      <Button
        variant="contained"
        sx={{ marginLeft: "10px", float: "right" }}
        onClick={() => saveOnClick(1)}
      >
        {sendPlaceHolder}
      </Button>
    </Container>
  );
}

export default DraftSubmit;
