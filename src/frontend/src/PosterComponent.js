import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    width: 400,
    height: "100%",
  },
});



class PosterComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      poster:null,
      deadline:null,
    }
  }

  componentDidMount(){
    this.setState({poster:this.props.poster,deadline:this.props.deadline})
  }
  
  render(){

  
    return (
        <Card //className={classes.root}
        >
          <CardActionArea style={{border: "2px solid #f1f1f1"}}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              maxHeight="200"
              padding="20"
              //className={classes.media}
              image={this.state.poster}
              title="Contemplative Reptile"
              
            />
          </CardActionArea>
          <CardActions style={{backgroundColor: "#f1f1f1"}}>
            <Button size="small" color="primary" style={{backgroundColor :"grey", color: "white"}}>
              Register
            </Button>

            <Button size="small" color="primary" style={{backgroundColor :"white", color: "black", border:"1px solid grey", display: "flex",
              justifyContent: "flex-end"}}>
              Deadline: {this.state.deadline}
            </Button>
          </CardActions>
        </Card>
      );
    }
}

export default PosterComponent;
