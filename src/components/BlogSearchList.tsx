import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Chip, Typography, Avatar, Box } from '@mui/material';
import { CardActionArea } from '@mui/material';

export default function BlogSearchList() {
  return (
    <Card sx={{ maxWidth: '53%', my: '5px', margin: '0px auto 5px' }}>
      <CardActionArea>
        <CardContent>
          <div style={{display: 'flex', flexWrap: "wrap"}}><Chip label={'react'} size="small" variant='outlined' /></div>
          <div style={{ display:'flex', alignItems: "center" }}>
            <div style={{ flex: 3 }}>
              <Typography gutterBottom variant="h5" component="div">
                React Blog
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The library for web and native user interfaces.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, illo nisi. Delectus aperiam quae dignissimos, libero saepe quidem officiis in iste!
              </Typography>
            </div>
            <img
            style={{flex: 1, borderRadius: "3%", height:"100px"}}
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
            />
          </div>
          <div style={{display: "flex", marginTop: "15px", justifyContent: "space-between", alignItems:"end"}}>
            <div style={{display: "flex"}}>
              <div>
                <Avatar
                  src={'https://i.pravatar.cc/300?img=13'}
                  style={{marginRight: "7px"}}
                />
              </div>
              <div>
                <Box sx={{ typography: 'subtitle2' }}>Nadine Petrolli</Box>
                <Typography variant="body2" color="text.secondary">Jun 20 2023 </Typography>
              </div>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Like: 123</Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

