import React from 'react';
import './index.css';
import {Button,Box,Checkbox,FormLabel} from '@material-ui/core/';
import TopBar from '../TopBar';
import {
    Redirect
  } from "react-router-dom";
 

class SelectClub extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cur_user:this.props.cur_user,
            clubs:[{
                club_id:0,
                club_name:"",
                is_checked:false
            }],
            red:null
        }
    }
    
    componentDidMount(){
        this.getClubs();
    }
    getClubs(){
        //get clublist

        fetch("http://localhost:8000/api/getclubs")
        .then(res=>res.json())
        .then(res=>{
            let clubs=[];
            res.data.map((club,index)=>{
                clubs.push({club_id:club.club_id,club_name:club.club_name,is_checked:false})
            })
            this.setState({clubs});
        })
        .catch(err=>err);
    }

    submitClub(){
        let req=[];
        this.state.clubs.map((club)=>{
            if(club.is_checked===true){
                req.push({cur_user:this.state.cur_user,club_id:club.club_id})
            }
        })
        
        fetch('http://localhost:8000/api/submitclub', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
            this.setState({red:<Redirect to={{pathname: "/dashboard",}} />})
        
            
            
    }
  
    handleCheck(id){
        let clubs=this.state.clubs;
        clubs.map((club)=>{
            if(club.club_id===id){
                club.is_checked=!club.is_checked;
            }
        })
        this.setState({clubs});
    }

    render(){
        return(
            <div className="bg">
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                >
                <div className="appContainer">
                
                <form
                    id="club-select"
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.onSubmit}
                >
                    <Box margin={2}>
                        <FormLabel><h5>Select your preferred Clubs: </h5></FormLabel>
                    </Box>
                    
                    {
                        //console.log(this.state.clubs)
                        this.state.clubs.map((club, index) => (
                            <Box
                                display="flex"
                                alignItems="center"
                                marginLeft={5}
                                key={index}
                            >
                                <Checkbox 
                                    value={club.club_id}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}

                                    key={index}

                                    onChange={()=>{this.handleCheck(club.club_id)}}
                                ></Checkbox>
                                
                                <Box marginTop={0.5}><FormLabel>{club.club_name}</FormLabel></Box>
                            </Box>                            
                        ))
                        
                    }
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        margin={5}
                    >
                        <Button variant="contained" color="primary" 
                            
                            onClick={()=>{this.submitClub()}}
                        >
                            Submit
                        </Button>
                        </Box>   
                </form>

                
                </div>
                {this.state.red}
            </Box>
            </div>
        )


  }
}


export default SelectClub;