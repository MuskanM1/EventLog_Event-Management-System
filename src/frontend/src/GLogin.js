import React from 'react';

import './index.css';
import {Button,Box,Checkbox,FormLabel, Typography} from '@material-ui/core/';
import TopBar from './TopBar';
import Footer from './Footer';
import ContainerPanel from './base/ContainerPanel';
import login from './images/login.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Redirect
} from "react-router-dom";
import {Paper, Grid, CssBaseline } from '@material-ui/core';


class GLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          int:"",
          fname:null,
          lname:null,
          mail:"",
          resp:[{id:null,name:null,email:null}],
          is_auth:false,
          cur_user:0,
          is_new:false,
          is_org:false,
        }
      }

    render() {
        return(
          <div>
            <ContainerPanel>
            <TopBar />
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900, minHeight: "100vh" }}>
                    <CssBaseline />

                    <Paper style={{ padding: 50, minHeight: "89vh" }}>

                        <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "12% 0 7% 0"}}>
                             <Grid item xs={12}>
                                <Typography variant="h4" align="center" component="h1" style={{ fontWeight: 700}} gutterBottom>
                                    Welcome to AU EventLog
                                </Typography>

                                <div style={{width: 80, height: 4, margin: "20px auto", backgroundColor: "#ee5935"}}>
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                    <CardMedia
                                    component="img"
                                    maxHeight="200"
                                    padding="20"
                                    style={{width: 400, height: "400%"}}
                                    image={login}
                                    />  
                            </Grid>

                            <Grid item xs={6} align="center">
                            <Box marginTop={10}> 
                                {/* <FormLabel><h5>Welcome to</h5></FormLabel> */}
                                <FormLabel><h4>Find your events just One-Click away. Click on the button <br/> to Sign in with Google.</h4>
                            
                                </FormLabel>
                              
                                <Box marginTop={6}>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" ref="gButton">
                                    Login with Google</Button>
                                </Grid>
                                    
                                    <Grid item xs={6}>{this.state.int}</Grid>
                                </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                    {this.state.redir}
            </ContainerPanel>
            <Footer />
            </div>
        )


    }
    

    renderAuth (){

      if(this.state.is_auth){
        localStorage.setItem('document',JSON.stringify(this.state));
        if(this.state.is_new){
              window.open("http://localhost:3000/selectclubs","_self");
          }
        
        else{
              window.open("http://localhost:3000/dashboard","_self");
        }
      }
      else{
        //this.setState({redir:<Redirect to={{pathname: "/",}} />})
      }
    }

    postAPI(){
        
        const reqs={user_mail:this.state.user_mail,name:this.state.fname+' '+this.state.lname};
        //console.log(reqs);

        fetch('http://localhost:8000/api/userauth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqs)
            })
            .then((res) => res.json())
            .then((data) =>  {
              console.log(data)
              this.setState({cur_user:data.id})
              this.setState({is_new:data.is_new})
              this.setState({is_org:data.is_org})

              if(data.id!=0){
                this.setState({is_auth:true})
              }
              this.props.onLogin(this.state.cur_user,this.state.is_new,this.state.is_auth,this.state.is_org,this.state.fname);
              this.renderAuth()
              //return <Redirect to={{pathname: "/",}} />
            })

            .catch((err)=>console.log(err))
            
    }
    googleSDK() {
   
          window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
              this.auth2 = window['gapi'].auth2.init({
                client_id: '21903730875-hql4p4h91bni869f4gevmutn5bta7v1t.apps.googleusercontent.com',  //ext
                //client_id: '413833473817-2mvctgjlcfp6015mqh8df3p3bd60757d.apps.googleusercontent.com', //au_internal
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
                prompt: 'select_account'
              });
              this.prepareLoginButton();
            });
          }
         
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'google-jssdk'));
    }
    componentDidMount() {
        this.googleSDK();
        //this.postAPI();
        this.renderAuth()
    }
  
    prepareLoginButton = () => {
   
          //console.log(this.refs.gButton);
          this.auth2.attachClickHandler(this.refs.gButton, {},
            (googleUser) => {
           
              let profile = googleUser.getBasicProfile();
              this.setState({fname: profile.getGivenName()});
              this.setState({lname: profile.getFamilyName()});
              this.setState({user_mail: profile.getEmail()});
              if(!profile.getEmail().includes('@ahduni.edu.in')){
                this.setState({int:'Please Login with University Mail to continue'})
              }
              else{
                this.setState({int:''})
                this.postAPI();
              }
              //YOUR CODE HERE
              //console.log("logged in!");
              //this.props.history.push("/dashboard");
              
              
            }, (error) => {
              
          });

    }
  

}

export default GLogin;