import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

class AboutCard extends React.Component{

    render(){
        return(
            <Container margin={1}>
                <Card>
                <CardActionArea>
                    
                    <CardMedia
                        component="img"
                        height="140"
                        image={this.props.image}
                        style={{objectFit: "fill"}}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {this.props.name}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: 12}}>
                            <EmailIcon style={{fontSize: 17, color: "#00e6e6"}}/> {this.props.email}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            <PhoneIcon style={{fontSize: 17, color: "blue"}}/> {this.props.contact}
                        </Typography>

                    </CardContent>
                </CardActionArea>
                </Card>
            </Container>
        )

    }
}

export default AboutCard;