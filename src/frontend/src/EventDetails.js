import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';
import TopBar from './TopBar'
import DropDown from './base/DropDown';
import ContainerPanel from './base/ContainerPanel';
import addicon from './images/addicon.JPG';
import PosterComponent from './PosterComponent';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import MoneyIcon from '@material-ui/icons/Money';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';

import {ProtectedRoute} from './protected.route'

// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';


class EventDetails extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            event:{
                event_id:null,
                club_id:null,
                event_name:null,
                start_time:null,
                end_time:null,
                event_venue:null,
                event_type:null,
                event_desc:null,
                event_poster:null,
                event_reg_link:null,
                paid:false,
                event_reg_deadline:null,
            }
        }
        
    }
    componentDidMount(){
        
        this.setState({event:this.props.event})
    }
    componentWillMount(){
        if(this.props.event===undefined){
            window.open("http://localhost:3000/dashboard","_self");
        }
    }
    redirect(){
        if(this.props.event===undefined){
            window.open("http://localhost:3000/dashboard","_self");
        }
    }

    getClubName(club_id){
        if(club_id===1){
            return("Workshop")
        }
        else if(club_id===2){
            return("Talk")
        }
        else if(club_id===3){
            return("IEEE SB")
        }
        else if(club_id===4){
            return("IEEE WIE")
        }
        else if(club_id===5){
            return("Social Service Forum")
        }
        else if(club_id===6){
            return("Fitness Club")
        }
        else if(club_id===7){
            return("Food Club")
        }
        else if(club_id===8){
            return("Sports Club")
        }
        else if(club_id===9){
            return("Photography Club")
        }
        else if(club_id===10){
            return("Quiz Club")
        }
    }
    renderRegBtn(){
        if(this.state.reg){
            return(
                <Button variant="contained" size="small" color="secondary" onClick={()=>this.unregister(this.props.event.event_id)}>
                        Unregister
                </Button>
            )
        }else{
            return(
                <Button variant="contained" size="small" color="primary" onClick={()=>this.register(this.props.event.event_id)}>
                        Register
                </Button>
            )
        }
    }
    isRegistered(){
        const req={user_id:this.props.cur_user,event_id:this.props.event.event_id}
        fetch('http://localhost:8000/api/getregs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((data)=>this.setState({reg:data.reg}))
        .catch((err)=>console.log(err))
    }

    register(event_id){
        const req={user_id:this.props.cur_user,event_id:event_id}
        fetch('http://localhost:8000/api/eventregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            .catch((err)=>console.log(err))
            this.setState({temp:!this.state.temp},()=>this.isRegistered())
        }

    unregister(event_id){
        const req={user_id:this.props.cur_user,event_id:event_id}
        fetch('http://localhost:8000/api/unregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            .catch((err)=>console.log(err))
        this.setState({temp:!this.state.temp},()=>this.isRegistered())
    }

    render() {
        return(
                
            <ContainerPanel>
            <TopBar />

            <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900, minHeight: "100vh" }}>
                <CssBaseline />

                <Paper style={{ padding: 50, minHeight: "89vh" }}>

                <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "0 0 7% 0"}}>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" component="h1" style={{paddingBottom: 10, fontWeight: 700, fontSize: "35px"}} gutterBottom>
                                 {this.getClubName(this.state.event.club_id)} : {this.state.event.event_name}

                                <div style={{width: 80, height: 4, margin: "20px auto", backgroundColor: "#ee5935"}}>
                                </div>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        maxHeight="200"
                                        padding="20"
                                        //style={{width: 400, height: "400%"}}
                                        image={this.state.event.event_poster}
                                    />  
                                    </CardActionArea>
                            </Grid>
                        <Grid item xs={12} align="center">
                        <Grid container alignItems="flex-start" spacing={2}>

                            <Grid item xs={12} align="left" style={{marginLeft: "5%", marginRight: "5%"}}>

                                <Typography align="left" component="h1" style={{ paddingTop:10, fontSize: "20px", fontWeight: 600}}>
                                    Type Of Event: 
                                </Typography>

                                <Typography align="left" component="h1" style={{paddingBottom: 10, fontSize: "15px"}} gutterBottom>
                                    {this.state.event.event_type} Event :  
                                 {this.getClubName(this.state.event.club_id)}
                                </Typography>
                                {/* <Typography align="left" component="h1" style={{paddingBottom: 10, paddingTop:10,}} gutterBottom>
                                    {this.getClubName(this.state.event.club_id)}
                                </Typography> */}
                                <Typography align="left" component="h1" style={{paddingTop:10, fontSize: "20px", fontWeight: 600}}>
                                    Description: 
                                </Typography>
                                <Typography align="left" component="h2" style={{paddingBottom: 10,}} gutterBottom>
                                {this.state.event.event_desc}
                                </Typography>
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingLeft: "7%", fontSize: "20px", fontWeight: 600}}>
                                <LocationOnIcon /> Venue: 
                                 {this.state.event.event_venue} 
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingRight: "0%", fontSize: "20px", fontWeight: 600}}>
                                <EventIcon /> Date: 
                                {this.state.event.start_date} {this.state.event.end_date} 
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingLeft: "7%", fontSize: "20px", fontWeight: 600}}>
                                Number of Seats: {this.state.event.seats}
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingRight: "0%", fontSize: "20px", fontWeight: 600}}>
                            <AccessTimeIcon /> Time: 
                            {this.state.event.event_time}
                            
                        </Grid>
                        
                        </Grid>
                        <Box marginTop={10} display="flex" align="right">
                            <Grid item xs={6} >
                                
                            </Grid>
                            <Grid item xs={6} align="left" style={{marginLeft: "2%"}}>

                                    {this.renderRegBtn()}

                            </Grid>
                            </Box>
                        </Grid>
                </Grid>
                </ Paper>
                 </div>
            </ContainerPanel>

        )
    }
}


export default EventDetails;
