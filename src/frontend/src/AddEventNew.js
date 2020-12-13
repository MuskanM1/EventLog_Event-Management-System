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

import login from './images/Add_Event.png';
import CardMedia from '@material-ui/core/CardMedia';


const imageStyle = {
    width: "100px",
    height: "60% !important",
}



class AddEvent extends React.Component {    

    constructor(props){
        super(props);
        this.state={
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
            err:false,
            btnColor:"primary",
            error:{name:null,desc:null,venue:null,link:null,poster:null},
            req:{   event_name:null,
                    event_desc:null,
                    club_id:null,
                    event_type:null,
                    event_venue:null,
                    event_poster:null,
                    event_link:null,
                    event_paid:null,
                    event_seats:null,
                    start_date:null,
                    end_date:null,
                    event_time:null,
                    event_deadline:null,
                    added_by:this.props.cur_user,
                    is_deleted:false,
                }
            
        }
    }

    reset(){
        this.setState({event_name:'',
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
                        err:false,
                        btnColor:"primary",
                        error:{name:null,desc:null,venue:null,seat:null},
                        req:{   event_name:null,
                                event_desc:null,
                                club_id:null,
                                event_type:null,
                                event_venue:null,
                                event_poster:null,
                                event_link:null,
                                event_paid:null,
                                event_seats:null,
                                start_date:null,
                                end_date:null,
                                event_time:null,
                                event_deadline:null,
                                added_by:this.props.cur_user,
                                is_deleted:false,
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

    SubmitEvent(){
        console.log(this.checkErr())
        const temp=new Date()
        const today=temp.getDate()+'/'+temp.getMonth()+'/'+temp.getFullYear()
        console.log(today)
        if(!this.checkErr()){
            console.log("ran")
            this.setState({
                req:{event_name:this.state.event_name,
                    event_desc:this.state.event_desc,
                    club_id:this.state.club_id,
                    event_type:this.state.event_type,
                    event_venue:this.state.event_venue,
                    event_poster:this.state.event_poster,
                    event_link:this.state.event_link,
                    event_paid:this.state.event_paid,
                    event_seats:this.state.event_seats,
                    start_date:this.state.start_date,
                    end_date:this.state.end_date,
                    event_time:this.state.event_time,
                    event_deadline:this.state.event_deadline,
                    added_by:this.props.cur_user,
                    is_deleted:false,
                    is_modified:false,
                    modification_date:"\'"+temp.getDate()+'/'+temp.getMonth()+'/'+temp.getFullYear()+"\'",
                }
            },()=>this.callApi()
            )
            
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
        alert('event added!')
        window.open("http://localhost:3000/dashboard","_self");
    }
    
    isTypeOk(){
        if(this.state.event_type===null){
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
        if(this.state.event_name.length>=100){
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
        if(this.state.event_desc.length>=200){
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
        if(this.state.event_venue.length>=200){
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
    IsLinkOk(){
        if(this.state.event_link!=''){

            if(!this.validURL(this.state.event_link)){
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
    IsPosterOk(){
        if(this.state.event_poster!=''){

            if(!this.validURL(this.state.event_poster)){
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
    IsDateOk(){
        if(!this.validURL(this.state.event_poster)){
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
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    
    render() {
        return (
            
            <ContainerPanel>
            <TopBar />
        
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 1000, minHeight: "100vh" }}>
                    <CssBaseline />

                    <Paper style={{ padding: 50, minHeight: "89vh" }}>

                        <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "0% 0 7% 0"}}>

                            <Grid item xs={12}>
                                    <Typography variant="h4" align="center" component="h1" style={{paddingBottom: 0, paddingTop:0, fontWeight: 700}} gutterBottom>
                                        Add an Event
                                    </Typography>

                                    <div style={{width: 80, height: 4, margin: "20px auto", backgroundColor: "red"}}>
                                    </div>
                            </Grid>

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
                                    value={this.state.event_name}
                                    fullWidth
                                    onChange={event=>this.setState({event_name:event.target.value})}
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
                                    value={this.state.event_desc}
                                    onChange={event=>this.setState({event_desc:event.target.value})}
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
                                    value={this.state.event_venue}
                                    onChange={event=>this.setState({event_venue:event.target.value})}
                                />
                                </Grid>
                                <Grid item xs={6} style={{paddingTop: 20,marginLeft:-35}}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="label">Event Type</FormLabel>
                                        <Box textAlign="left"><RadioGroup 
                                            required
                                            error
                                            name="type" 
                                            value={this.state.event_type} 
                                            onChange={(event)=>{this.setState({event_type:event.target.value})}}>
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
                                                value={this.state.club_id}
                                                onChange={event=>{this.setState({club_id:event.target.value})}}
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
                                                error
                                                autoOk
                                                format="dd-MM-yyyy"
                                                value={this.state.start_date2} 
                                                onChange={date => this.setState({start_date2:date,start_date:date.toLocaleDateString('en-GB')})} 
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
                                                value={this.state.end_date2} 
                                                onChange={date => this.setState({end_date2:date,end_date:date.toLocaleDateString('en-GB')})} 
                                            />
                                        </MuiPickersUtilsProvider>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                <FormLabel component="label">Event Time</FormLabel>
                                    
                                    
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <TimePicker 
                                            autoOk 
                                            ampm={false}
                                            value={this.state.time2} 
                                            onChange={time=>this.setState({time2:time,event_time:time.getHours()+':'+time.getMinutes()})} 

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
                                                value={this.state.ddate2} 
                                                onChange={date => this.setState({ddate2:date,event_deadline:date.toLocaleDateString('en-GB')})} 
                                            />
                                        </MuiPickersUtilsProvider>
                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <Box style={{paddingTop:20}}><FormControl component="fieldset">
                                        <FormLabel component="label">Paid Event?</FormLabel>
                                        <RadioGroup 
                                            row
                                            name="paid" 
                                            value={this.state.event_paid} 
                                            onChange={(event)=>{console.log(event.target.value);this.setState({event_paid:event.target.value})}}>
                                            <FormControlLabel label="Yes" value="true" control={<Radio />} />
                                            <FormControlLabel label="No" value="false" control={<Radio />} />
                                        </RadioGroup>
                                    </FormControl></Box>
                                
                                </Grid>
                                <Grid item xs={4}>
                                    <Box style={{paddingTop:20}}><TextField
                                        id="seats"
                                        type="number"
                                        error={this.IsSeatOk()}
                                        helperText={this.state.error.seat}

                                        label="Seats Available"
                                        value={this.state.event_seats}
                                        onChange={event=>this.setState({event_seats:event.target.value})}
                                    /></Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="link"
                                        label="Registraion Link"
                                        error={this.IsLinkOk()}
                                        helperText={this.state.error.link}
                                        value={this.state.event_link}
                                        fullWidth
                                        onChange={event=>this.setState({event_link:event.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="posterlink"
                                        label="Poster Link"
                                        error={this.IsPosterOk()}
                                        helperText={this.state.error.poster}
                                        value={this.state.event_poster}
                                        fullWidth
                                        onChange={event=>this.setState({event_poster:event.target.value})}
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
            <Footer />
            </ContainerPanel>
            
            
            )
    } 
}

export default AddEvent;