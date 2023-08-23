import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CommentCard() {

  return (
    <Card sx={{ maxWidth: 340, marginBottom: "1em" }}>
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
      <CardContent
        sx={{ padding: "1em!important" }}
      >
        <Typography variant="body1" color="text.secondary">
          This impressive card is a comment added as annotation by the reviewer on the blog content created by the author.
        </Typography>
      </CardContent>
    </Card>
  );
}