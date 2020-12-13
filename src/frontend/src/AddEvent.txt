import React from 'react';
import './index.css';
import {Button,Box,Checkbox,FormLabel,Input} from '@material-ui/core/';
import TopBar from './TopBar';



class AddEvent extends React.Component{

    constructor(){
        super();
        this.state={
            name:null,
            date:null,
            time:null,
            venue:null,
            desc:null,
            poster:null,
            reglink:null,
            regfee:null,
            deadline:null,
        }
    }

    setTime = time => this.setState({time:time})
    setDate = date => this.setState({date:date})

    SubmitEvent(){
        this.setState({req:{name:this.state.name,date:this.state.date,time:this.state.time,venue:this.state.venue,
            desc:this.state.desc,poster:this.state.poster,reglink:this.state.reglink,regfee:this.state.regfee,
            deadline:this.state.deadline}})
        
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
        
    }

    render(){
        return(
            <div>
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                marginTop={20}

            >
                <form
                    id="club-select"
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.onSubmit}
                ></form>
                <Box
                    alignItems="center"
                >
                <FormLabel>Name</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({name:event.target.value})}></Input><br /><br />
                <FormLabel>Date</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({date:event.target.value})}></Input><br /><br />
                
                {/*<DatePicker
                    onChange={(date)=>this.setDate(date)}
                    value={this.state.date}
                    clearIcon={null}
                    calendarIcon={null}
                    />*/
                }
                
                <FormLabel>Time</FormLabel><br /> <Input type="text"
                    onChange={event=>this.setState({time:event.target.value})}></Input><br /><br />
                
                {/*<TimePicker
                    onChange={(time)=>this.setTime(time)}
                    value={this.state.time}
                    clearIcon={null}
                    clockIcon={null}
                    disableClock={true}
                    />*/
                }   
                <FormLabel>Venue</FormLabel> <br /><Input type="text" 
                    onChange={event=>this.setState({venue:event.target.value})}></Input><br /><br />
                <FormLabel>Type</FormLabel><br /> <Input type="text"
                    onChange={event=>this.setState({type:event.target.value})}></Input><br /><br />
                <FormLabel>Description</FormLabel><br /> <Input type="text"
                    onChange={event=>this.setState({desc:event.target.value})}></Input><br /><br />
                <FormLabel>Poster Link</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({poster:event.target.value})}></Input><br /><br />
                <FormLabel>Registraion Link</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({reglink:event.target.value})}></Input><br /><br />
                <FormLabel>Registraion Fee</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({regfee:event.target.value})}></Input><br /><br />
                <FormLabel>Registraion Deadline</FormLabel> <br /><Input type="text"
                    onChange={event=>this.setState({deadline:event.target.value})}></Input><br /><br />
                <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        margin={5}
                >
                    <Button variant="contained" color="primary" 
                        className="btnA"
                        onClick={()=>{this.SubmitEvent()}}
                    >Submit
                    </Button>
                </Box>
                
                </Box>
            </Box>
            </div>
        )

    }
}

export default AddEvent;