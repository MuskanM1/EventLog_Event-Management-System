import React from 'react';
import './index.css';
import {Button,Box,Checkbox,FormLabel} from '@material-ui/core/';
import { TextField, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, CssBaseline, RadioGroup, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';
import TopBar from './TopBar';
import {Redirect} from "react-router-dom";
import PosterComponent from './PosterComponent';
import ContainerPanel from './base/ContainerPanel';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AboutCard from './AboutCardNew';
import Footer from './Footer';

import login from './images/login.png';
import sumit from './images/sumit.jpg';
import arpit from './images/arpit.jpeg';
import krinali from './images/krinali.jpg';
import foram from './images/foram.png';
import dhruvil from './images/dhruvil.jpg';
import muskan from './images/muskan.jpg';
import vaishwi from './images/vaishwi.png';
import aboutimage1 from './images/aboutimage1.jpg';
import aboutimage2 from './images/aboutimage2.jpg';
import aboutimage3 from './images/aboutimage3.jpg';

class AboutUs extends React.Component{
    render() {
        return(
            <div>
            <TopBar />
             <ContainerPanel>
  
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 1000, minHeight: "100vh" }}>
                    <CssBaseline />

                    <Paper style={{ padding: 40, minHeight: "89vh" }}>

                        <Grid container alignItems="flex-start" spacing={2} minHeight="800px">

                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" component="h1" style={{ fontWeight: 700}} gutterBottom>
                                    About Us
                                </Typography>

                                <div style={{width: 80, height: 4, margin: "20px auto", backgroundColor: "#ee5935"}}>
                                </div>
                            </Grid>

                            <Grid item xs={6} style={{padding: "0% 0 7% 0"}}>
                                 <CardActionArea style={{border: "2px solid #fff"}}>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    maxHeight="200"
                                    padding="20"
                                    style={{width: 400, height: "400%"}}
                                    image={aboutimage3}
                                    title="Contemplative Reptile"
                                    />  
                                </CardActionArea>
                            </Grid>

                            <Grid item xs={6} align="center" style={{padding: "5% 0 7% 0"}}>
                                

                                <Box margin={2}>
                                    <FormLabel><h5>
                                        The team of EventLog has tried to work on the idea of making the life of event organizers and stuents.
                                        The goal was to have a organnized process which would allow the organizers and students to connect on a 
                                        single platform. The alternative of emails to connect with students needed an alternative. 
                                        Thus team EventLog has worked a way to allow the organizers to market their event and get registrations for their events.
                                        For the students it has solved the issue of going through hundreds of mail to find the event details.
                                      </h5></FormLabel>
                                </Box>
                                        
                                    
                            </Grid>

                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h4" component="h2" align="center" style={{fontWeight: "700"}}>
                                    Meet the Team
                                </Typography>
                                <div style={{width: 80, height: 4, margin: "20px auto", backgroundColor: "#ee5935"}}>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <AboutCard name="Muskan Matwani" email="muskan.m1@ahduni.edu.in" contact="7990682487" image={muskan} />
                            </Grid>

                            <Grid item xs={4}>
                                <AboutCard name="Sumit Pratihar" email="sumit.p@ahduni.edu.in" contact="7600952095" image={sumit} />
                            </Grid>

                            <Grid item xs={4}>
                                <AboutCard name="Arpit Patel" email="arpit.p@ahduni.edu.in" contact="8849744514" image={arpit} />
                            </Grid>

                            <Grid item xs={4}>
                                <AboutCard name="Vaishwi Patel" email="vaishwi.p@ahduni.edu.in" contact="9664554959" image={vaishwi} />
                            </Grid>

                            <Grid item xs={4}>
                                  <AboutCard name="Foram Vadher" email="foram.v@ahduni.edu.in" contact="9106542037" image={foram} />  
                            </Grid>

                            <Grid item xs={4}>
                                  <AboutCard name="Krinali Shah" email="krinali.s@ahduni.edu.in" contact="9909967118" image={krinali} />  
                            </Grid>

                            <Grid item xs={4}>
                                  
                            </Grid>

                            <Grid item xs={4}>
                                <AboutCard name="Dhruvil Shah" email="dhruvil.s@ahduni.edu.in" contact="9924397968" image={dhruvil} /> 
                            </Grid>

                        </Grid>
                    </Paper>
                </div>
                <Footer />
            </ContainerPanel>
            </div>
        )
  }
}

export default AboutUs;