import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Blog({id,byme,title,content,author,user,deleteBlog}) {
  React.useEffect(()=>{
    console.log(deleteBlog)
  },[])
  return (
    <Card sx={{ }} style={{width:'100%',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',margin:'20px'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          by {byme? 'me': author?author:user}
          
          </Button>
          {deleteBlog?<Button size="small" onClick={()=>deleteBlog(id)}>Delete</Button>:<></>}
        
      </CardActions>
    </Card>
  );
}

