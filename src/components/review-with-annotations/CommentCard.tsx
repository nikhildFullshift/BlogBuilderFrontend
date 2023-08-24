import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Container, TextField } from "@mui/material";

const CommentForm = () => (
  <>
    <TextField
      id="standard-basic"
      label="Comment"
      variant="standard"
      fullWidth
      onClick={(e) => e.stopPropagation()}
    />
    <Container sx={{ marginTop: "5px", paddingLeft: "0!important" }}>
      <Button sx={{ marginRight: "5px" }} variant="contained">
        Comment
      </Button>
      <Button variant="outlined">Cancel</Button>
    </Container>
  </>
);

export default function CommentCard(props: any) {
  const { isNewComment, textValue } = props;

  return (
    <Card
      sx={{
        maxWidth: 340,
        marginBottom: "1em",
        marginTop: `${props.y}px`,
        marginLeft: "55%",
        position: "absolute",
      }}
    >
      <CardHeader
        sx={{ padding: "1em 1em 0" }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            V
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Varun"
        subheader="Aug 23, 2023"
      />
      <CardContent sx={{ padding: "5px 15px 10px" }}>
        {isNewComment ? (
          <CommentForm />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {textValue}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
