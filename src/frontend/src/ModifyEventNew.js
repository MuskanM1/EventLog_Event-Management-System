import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Field } from 'react-final-form';
//import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { TextField,InputLabel,Box,Select,Input,Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup,Radio, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';

import TopBar from './TopBar'
import DropDown from './base/DropDown';
import ContainerPanel from './base/ContainerPanel';
import addicon from './images/addicon.JPG';
import Footer from './Footer';

// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';


import login from './images/Modify_Event.png';
import CardMedia from '@material-ui/core/CardMedia';

const imageStyle = {
    width: "100px",
    height: "60% !important",
}



class ModifyEvent extends React.Component {    

    constructor(props){
        super(props);
        this.state={
            event:{
                event_name:'',
                club_id:'',
                event_type:'club',
                event_venue:'',
                event_desc:'',
                event_poster:'',
                event_link:'',
                event_paid:"false",
                event_seats:0,
                start_date:'',
                end_date:'',
                event_time:'',
                event_deadline:'',
                is_deleted:false,
                is_modified:false,
            },

            err:false,
            btnColor:"primary",
            error:{name:null,desc:null,venue:null,seat:null},
            req:{   
                event_name:'',
                club_id:'',
                event_type:'club',
                event_venue:'',
                event_desc:'',
                event_poster:'',
                event_link:'',
                event_paid:"false",
                event_seats:0,
                start_date:'',
                end_date:'',
                event_time:'',
                event_deadline:'',
                is_deleted:false,
                is_modified:true,
                added_by:this.props.cur_user,
            }
            
            
        }
    }

    reset(){
        this.setState({
                        event:{
                            event_name:'',
                            club_id:'',
                            event_type:'club',
                            event_venue:'',
                            event_desc:'',
                            event_poster:'',
                            event_link:'',
                            event_paid:"false",
                            event_seats:0,
                            start_date:'',
                            end_date:'',
                            event_time:'',
                            event_deadline:'',
                            is_deleted:false,
                            is_modified:false,
                        },
                        err:false,
                        btnColor:"primary",
                        error:{name:null,desc:null,venue:null},
                        req:{   
                                event_name:'',
                                club_id:'',
                                event_type:'club',
                                event_venue:'',
                                event_desc:'',
                                event_poster:'',
                                event_link:'',
                                event_paid:"false",
                                event_seats:0,
                                start_date:'',
                                end_date:'',
                                event_time:'',
                                event_deadline:'',
                                is_deleted:false,
                                is_modified:true,
                                added_by:this.props.cur_user,
                            }
        
        })
    }

    checkErr(){
        if(this.state.event_name===''||
        this.state.event_venue===''||
        this.state.event_poster===''||
        this.state.event_seats===0||
        this.state.start_date===''||
        this.state.event_time===''||
        this.state.event_deadline==='')
        {
            
            return true;
        }else{
            if(this.state.error.name!=null||
                this.state.error.desc!=null||
                this.state.error.venue!=null)
            {
                return true;
            }
            else{return false;}
        }
    }

    componentDidMount(){
        this.setState({event:{

            event_name:this.props.event.event_name,
            club_id:this.props.event.club_id,
            event_type:this.props.event.event_type,
            event_venue:this.props.event.event_venue,
            event_desc:this.props.event.event_desc,
            event_poster:this.props.event.event_poster,
            event_link:this.props.event.event_link,
            event_paid:this.props.event.event_paid,
            event_seats:this.props.event.event_seat,
            start_date:this.props.event.start_date,
            start_date2:this.props.event.start_date,
            end_date:this.props.event.end_date,
            end_date2:this.props.event.end_date,
            event_time:this.props.event.event_time,
            event_time2:this.props.event.event_time,
            event_deadline:this.props.event.event_deadline,
        }
        })
    }


    SubmitEvent(){
        let newDate = new Date()
        console.log(newDate.getDate()+'/'+newDate.getMonth()+'/'+newDate.getFullYear())
        if(!this.checkErr()){
            
            let copy=this.state.req;
            copy.is_modified=true;
            copy.modification_date=newDate.getDate()+'/'+newDate.getMonth()+'/'+newDate.getFullYear()
            copy.event_name=this.state.event.event_name
            copy.event_desc=this.state.event.event_desc
            copy.club_id=this.state.event.club_id
            copy.event_type=this.state.event.event_type
            copy.event_venue=this.state.event.event_venue
            copy.event_poster=this.state.event.event_poster
            copy.event_link=this.state.event.event_link
            copy.event_paid=this.state.event.event_paid
            copy.event_seats=this.state.event.event_seats
            copy.start_date=this.state.start_date
            copy.end_date=this.state.end_date
            copy.event_time=this.state.event.event_time
            copy.event_deadline=this.state.event.event_deadline
            copy.added_by=this.props.cur_user
            copy.is_deleted=false
            copy.is_modified=true
            this.setState({req:copy},()=>this.callApi())
            
            this.setState({btnColor:"primary"})

        }else{
            this.setState({btnColor:"secondary"})
        }
                
    }

    callApi(){
        fetch('http://localhost:8000/api/submitevent', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
        alert('event modified!')
        window.open("http://localhost:3000/dashboard","_self");

    }

    IsLinkOk(){
        if(this.state.event.event_link!=''){

        if(!this.validURL(this.state.event.event_link)){
            if(this.state.error.link===null){
                let copy=this.state.error
                copy.link="Invalid url"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
            
        }
        else{
            if(this.state.error.link!=null){
                let copy=this.state.error
                copy.link=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    
    }
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    isTypeOk(){
        if(this.state.event.event_type===null){
            let copy=this.state.error
            copy.type="error"
            this.setState({error:copy})
            return("error") 
        }
        else{
            return(null)
        }
    }
    IsNameOk(){
        if(this.state.event.event_name.length>=100){
            if(this.state.error.name===null){
                let copy=this.state.error
                copy.name="100 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.name!=null){
                let copy=this.state.error
                copy.name=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    IsDescOk(){
        if(this.state.event.event_desc.length>=200){
            if(this.state.error.desc===null){
                let copy=this.state.error
                copy.desc="200 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.desc!=null){
                let copy=this.state.error
                copy.desc=null
                this.setState({error:copy})
                return(false)
            }
        }
    }

    componentWillMount(){
        if(this.props.event===undefined){
            window.open("http://localhost:3000/dashboard","_self");
        }
    }
    IsPosterOk(){
        if(this.state.event.event_poster!=''){

        if(!this.validURL(this.state.event.event_poster)){
            if(this.state.error.poster===null){
                let copy=this.state.error
                copy.poster="Invalid url"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
            
        }
        else{
            if(this.state.error.poster!=null){
                let copy=this.state.error
                copy.poster=null
                this.setState({error:copy})
                return(false)
            }
        }
        }
    
    }
    IsSeatOk(){
        if(this.state.event_seat<0){
            if(this.state.error.seat===null){
                let copy=this.state.error
                copy.seat="Only positive values"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.seat!=null){
                let copy=this.state.error
                copy.seat=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    IsVenueOk(){
        if(this.state.event.event_venue.length>=200){
            if(this.state.error.venue===null){
                let copy=this.state.error
                copy.venue="200 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.venue!=null){
                let copy=this.state.error
                copy.venue=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    
    render() {
        return (
            
            <ContainerPanel>
            <TopBar />
        
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900, minHeight: "100vh" }}>
                    <CssBaseline />

                    <Paper style={{ padding: 50, minHeight: "89vh" }}>

                        <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "12% 0 7% 0"}}>

                    
                            <Grid item xs={6}>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    maxHeight="200"
                                    padding="20"
                                    style={{width: 400, height: "400%"}}
                                    image={login}
                                    title="Contemplative Reptile"
                                    />  
                                
                            </Grid>

                            <Grid item xs={6} align="center">
                                <Grid item xs={12}>
                                    <Typography variant="h4" align="center" component="h1" style={{paddingBottom: 20, paddingTop:20}} gutterBottom>
                                        Modify {this.state.event.event_name}
                                    </Typography>
                                </Grid>
                                
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={8}>

                                <TextField
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    required
                                    id="name"
                                    error={this.IsNameOk()}
                                    label="Event Name"
                                    helperText={this.state.error.name}
                                    value={this.state.event.event_name}
                                    fullWidth
                                    onChange={event=>{
                                        let copy=this.state.event
                                        copy.event_name=event.target.value
                                        this.setState({event:copy})
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        maxLength: 200,
                                    }}
                                    fullWidth multiline rows={2} rowsMax={4}
                                    error={this.IsDescOk()}
                                    helperText={this.state.error.desc}
                                    id="desc"
                                    label="Event Description"
                                    helperText={this.state.error.desc}
                                    value={this.state.event.event_desc}
                                    onChange={event=>{
                                        let copy=this.state.event
                                        copy.event_desc=event.target.value
                                        this.setState({event:copy})
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        maxLength: 200,
                                    }}
                                    fullWidth
                                    error={this.IsVenueOk()}
                                    helperText={this.state.error.venue}
                                    id="venue"
                                    label="Event Venue"
                                    helperText={this.state.error.venue}
                                    value={this.state.event.event_venue}
                                    onChange={event=>{
                                        let copy=this.state.event
                                        copy.event_venue=event.target.value
                                        this.setState({event:copy})
                                    }}                                />
                                </Grid>
                                <Grid item xs={6} style={{paddingTop: 20,marginLeft:-35}}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="label">Event Type</FormLabel>
                                        <Box textAlign="left"><RadioGroup 
                                            required
                                            error
                                            name="type" 
                                            value={this.state.event.event_type} 
                                            onChange={event=>{
                                                let copy=this.state.event
                                                copy.event_type=event.target.value
                                                this.setState({event:copy})
                                            }}
                                        >
                                            <FormControlLabel label="Technical" value="Technical" control={<Radio />} />
                                            <FormControlLabel label="Non Technical" value="Non Technical" control={<Radio />} />
                                        </RadioGroup></Box>
                                    </FormControl>
                                </Grid>
                                    <Grid item xs={5} align="right">
                                        <FormControl >
                                        <Box marginTop={2} width={120}>
                                            <InputLabel id="demo-controlled-open-select-label">Select Club</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.event.club_id}
                                                onChange={event=>{
                                                    let copy=this.state.event
                                                    copy.club_id=event.target.value
                                                    this.setState({event:copy})
                                                }}
                                            >
                                                <MenuItem value={1}>Workshops</MenuItem>
                                                <MenuItem value={2}>Talk</MenuItem>
                                                <MenuItem value={3}>IEEE AU SB</MenuItem>
                                                <MenuItem value={4}>IEEE AU WIE</MenuItem>
                                                <MenuItem value={5}>Social Service Forum</MenuItem>
                                                <MenuItem value={6}>Fitness Club</MenuItem>
                                                <MenuItem value={7}>Food Club</MenuItem>
                                                <MenuItem value={8}>Sports Club</MenuItem>
                                                <MenuItem value={9}>Photography Club</MenuItem>
                                                <MenuItem value={10}>Quiz Club</MenuItem>
                                            </Select>
                                        </Box>
                                            </FormControl>
                                    </Grid>
                                 
                                <Grid item xs={6} align="left">
                                <FormLabel component="label">Event Date</FormLabel>
                                    
                                        
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker 
                                                disablePast
                                                autoOk
                                                format="dd-MM-yyyy"
                                                value={this.state.event.start_date2} 
                                                onChange={date=>{
                                                    let copy=this.state.event
                                                    copy.start_date2=date
                                                    copy.start_date=date.toLocaleDateString('en-GB')
                                                    this.setState({event:copy})
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    
                                </Grid>
                                <Grid item xs={6} align="left">
                                <FormLabel component="label">Event End Date</FormLabel>
                                    
                                        
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker 
                                                disablePast
                                                autoOk
                                                format="dd-MM-yyyy"
                                                value={this.state.event.end_date2} 
                                                onChange={date=>{
                                                    let copy=this.state.event
                                                    copy.end_date2=date
                                                    copy.end_date=date.toLocaleDateString('en-GB')
                                                    this.setState({event:copy})
                                                }}                                            />
                                        </MuiPickersUtilsProvider>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                <FormLabel component="label">Event Time</FormLabel>
                                    
                                    
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <TimePicker 
                                            autoOk 
                                            ampm={false}
                                            value={this.state.event.time2}
                                            onChange={time=>{
                                                    let copy=this.state.event
                                                    copy.event_time2=time
                                                    copy.event_time=time.getHours()+':'+time.getMinutes()
                                                    this.setState({event:copy})
                                                }}
                                            />
                                    </MuiPickersUtilsProvider>
                                
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel component="label">Registration Deadline</FormLabel>
                                    
                                        
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker 
                                                disablePast
                                                autoOk
                                                format="dd-MM-yyyy"
                                                value={this.state.event.ddate2} 
                                                onChange={date=>{
                                                    let copy=this.state.event
                                                    copy.ddate2=date
                                                    copy.ddate=date.toLocaleDateString('en-GB')
                                                    this.setState({event:copy})
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <Box style={{paddingTop:20}}><FormControl component="fieldset">
                                        <FormLabel component="label">Paid Event?</FormLabel>
                                        <RadioGroup 
                                            row
                                            name="paid" 
                                            value={this.state.event.event_paid} 
                                            onChange={event=>{
                                                let copy=this.state.event
                                                copy.event_paid=event.target.value
                                                this.setState({event:copy})
                                            }}
                                        >
                                            <FormControlLabel label="Yes" value="true" control={<Radio />} />
                                            <FormControlLabel label="No" value="false" control={<Radio />} />
                                        </RadioGroup>
                                    </FormControl></Box>
                                
                                </Grid>
                                <Grid item xs={4}>
                                    <Box style={{paddingTop:20}}><TextField
                                        id="seats"
                                        type="number"
                                        label="Seats Available"
                                        //error={this.IsSeatOk()}
                                        helperText={this.state.error.seat}

                                        value={this.state.event.event_seats}
                                        onChange={event=>{
                                                let copy=this.state.event
                                                copy.event_seats=event.target.value
                                                this.setState({event:copy})
                                        }}
                                    /></Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="link"
                                        label="Registraion Link"
                                        error={this.IsLinkOk()}
                                        helperText={this.state.error.link}
                                        value={this.state.event.event_link}
                                        fullWidth
                                        onChange={event=>{
                                                let copy=this.state.event
                                                copy.event_link=event.target.value
                                                this.setState({event:copy})
                                            }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="posterlink"
                                        label="Poster Link"
                                        error={this.IsPosterOk()}

                                        helperText={this.state.error.poster}
                                        value={this.state.event.event_poster}
                                        fullWidth
                                        onChange={event=>{
                                                let copy=this.state.event
                                                copy.event_poster=event.target.value
                                                this.setState({event:copy})
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={()=>{this.reset()}}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color={this.state.btnColor}
                                        onClick={()=>this.SubmitEvent()}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>


                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                    
            </ContainerPanel>
            
            
            )
    }  
}

export default ModifyEvent;
