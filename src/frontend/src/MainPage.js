import React from 'react';
import './index.css';
import EventCard from './EventCard'
import {Button,Box,FormLabel} from '@material-ui/core/';
import TopBar from './TopBar';
import {
    Redirect
  } from "react-router-dom";
  import Footer from './Footer';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Typography, Paper, Link, Grid, CssBaseline, RadioGroup, FormGroup, FormControlLabel,
} from '@material-ui/core';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cur_user:this.props.cur_user,is_org:this.props.is_org,
            tab:0,
            club_id:null,
            events:[{
                event_id:null,
                club_id:null,
                event_name:null,
                event_time:null,
                start_date:null,
                end_date:null,
                event_venue:null,
                event_type:null,
                event_desc:null,
                event_poster:null,
                event_link:null,
                event_paid:false,
                event_deadline:null,
                is_modified:null,
                modification_date:null,
            }],
            red:null,
            overlay:"hidden",
        }
        
    }

    componentDidMount(){
        this.getEvents(0);
    }

    getEvents (val) {
        if(val===0){
            this.setState({tab:0})
            //get allevents

            fetch("http://localhost:8000/api/allevents")
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        
        }
        
        else if(val===1){
            //get events for me
            this.setState({tab:1})
            fetch("http://localhost:8000/api/myevents/?user_id="+this.props.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})

                //console.log(res.data);
            })
            .catch(err=>err);
        }
        else if(val===2){
            //get club events ----change
            this.setState({tab:2})
            fetch("http://localhost:8000/api/allevents")
            .then(res=>res.json())
            .then(res=>{
                var temp=[];
                res.data.map((event)=>{
                  if(event.club_id===this.state.club_id){
                    temp.push(event)
                  }
                })
                this.setState({events:temp})
            })
            .catch(err=>err);
        }
        else if(val===3){
            this.setState({tab:3})
            //get registered events
            fetch("http://localhost:8000/api/regevents/?user_id="+this.props.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }
        else if(val===4){
            this.setState({tab:4})
            //get registered events
            fetch("http://localhost:8000/api/addedevents/?user_id="+this.props.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }

        
    }
    
    addedEvents(){
        if(this.props.is_org===true){
            return(
                <Button variant={this.state.tab===4?"contained":""} color={this.state.tab===4?"primary":""} onClick={()=>{this.getEvents(4)}}>Added Events</Button>    
            )
        }
        else{
            return(null)
        }
    }

    addEventToggle(){
        if(this.props.is_org){
            return(
                <Fab onClick={()=>this.setState({red:<Redirect to={{pathname: "/addevent",}} />})} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            )
        }
        else{
            return(null)
        }
    }

    dropDown(){
        if(this.state.tab===2){

            return(
                <Box
                    display="flex"
                    justifyContent="center"
                    marginTop={1}
                >
                <Box width={150}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" value={this.state.club_id}>Select Club</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.club_id}
                        onChange={event=>{this.setState({club_id:event.target.value});this.getEvents(2)}}
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
                </FormControl>
                </Box>
                </Box>
            )
        }
        else{
            return(null)
        }
    }

    renderOverlay(){
        return(<div className={this.state.overlay}>

            <Box
                
            display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
            <Box 
                width={400}
                display="flex"
                height={200}
                justifyContent="center"
                alignItems="center"
                
               
            >   <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"white",width:"100%",height:"100%"}}>
                
                    <Box marginTop={-5}>
                    <FormLabel><h5>Are you sure ?</h5></FormLabel>
                    </Box>
                    <Box margin={1} marginTop={10}>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            color="primary"
                            onClick={()=>{
                                this.deleteEvent(this.state.delete_id)
                                this.setState({overlay:"hidden"})
                            }}
                        >
                        Yes
                        </Button>
                    </Box>
                
                    <Box margin={1} marginTop={10}>
                            <Button 
                                hidde
                                variant="contained" 
                                size="small" 
                                color="secondary"
                                onClick={()=>{this.setState({overlay:"hidden"})}}
                            >
                                No
                            </Button>
                        </Box>
                 

                </div>
                </Box>
            </Box>
        </div>)
    }

    deleteEvent(event_id){
        fetch("http://localhost:8000/api/eventdelete/?event_id="+event_id)
            .then(res=>res.json())
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>err);
    }

    renderCard(){
        const myData = [].concat(this.state.events).sort((a, b) => a.modification_date > b.modification_date ? 1 : -1)
        //const myData2 = [].concat(myData).sort((a, b) => a.is_modified < b.is_modified ? 1 : -1)
        
        return(

            myData.map((item, index) => (
                <Box key={index} marginBottom={2}>
                <GridListTile cols={1} key={index}>
                    <EventCard 
                        key={index}
                        resp={item}
                        added={this.state.tab}
                        isAuth={this.props.is_auth}
                        cur_user={this.props.cur_user}
                        onRed={(redevent)=>{
                            this.props.onRed(redevent)
                        }}
                        onConfirm={(val)=>{
                            this.setState({overlay:val,delete_id:item.event_id})
                        }}
                    />
                    
                </GridListTile>
            </Box>
        ))
        )
    }
    
    render(){
       // console.log(this.state.resp[1]);
       return(

            <div>
                {this.renderOverlay()
                }
            <TopBar cur_user={this.props.cur_user} isAuth={this.props.is_auth} />
             <div style={{ paddingTop: "0%", margin: 'auto', maxWidth: 1000 }}>
                    <CssBaseline />

                    <Paper style={{ padding: 40, height: "100%"}}>

                    <Box
                        display="flex"
                        justifyContent="center"
                        marginTop={15}
                        >
                        <Button variant={this.state.tab===0?"contained":""} color={this.state.tab===0?"primary":""} onClick={()=>{this.getEvents(0)}}>All Events</Button>
                        <Button variant={this.state.tab===1?"contained":""} color={this.state.tab===1?"primary":""} onClick={()=>{this.getEvents(1)}}>Events for me</Button>
                        <Button variant={this.state.tab===2?"contained":""} color={this.state.tab===2?"primary":""} onClick={()=>{this.getEvents(2)}}>Clubwise Events</Button>
                        <Button variant={this.state.tab===3?"contained":""} color={this.state.tab===3?"primary":""} onClick={()=>{this.getEvents(3)}}>Registered Events</Button>
                        
                        {this.addedEvents()}
                        <Box width={20}></Box>
                
                        {this.addEventToggle()}
                        
                    </Box>
                    {this.dropDown()}
                    <Box
                        padding={5}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box width={900} >
                                    <GridList cols={3} cellHeight="50%">
                                        {   /*
                                            this.state.events.map((item, index) => (
                                            <Box key={index} marginBottom={2}>
                                            <GridListTile cols={1} key={index}>
                                                <EventCard 
                                                    key={index}
                                                    resp={item}
                                                    added={this.state.tab}
                                                    is_auth={this.props.is_auth}
                                                    cur_user={this.props.cur_user}
                                                    onRed={(redevent)=>{
                                                        this.props.onRed(redevent)
                                                    }}
                                                    onConfirm={(val)=>{
                                                        this.setState({overlay:val,delete_id:item.event_id})
                                                    }}
                                                />
                                                
                                            </GridListTile>
                                            </Box>
                                            ))
                                           */ 
                                           this.renderCard()
                                        }
                                    </GridList>
                        </Box>
                        
                 </Box>  
               
                 </Paper>
                   
                 {this.state.red}
                  </div> 
                 <Footer />

        </div>
        )    
    }
}
export default MainPage;