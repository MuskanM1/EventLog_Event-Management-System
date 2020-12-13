import React from 'react';
import ReactDOM from 'react-dom';

import {
   BrowserRouter,
   Route,
   Redirect,
//   browserHistory,
 } from "react-router-dom";

import './index.css';
import GLogin from './GLogin'
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import EventDetails from './EventDetails';
import AddEvent from './AddEventNew';
import AboutUs from './AboutUsNew';
import AboutCard from './AboutCardNew';
import Footer from './Footer';

import ModifyEvent from './ModifyEventNew';
import { ProtectedRoute } from './protected.route';

//import Test from './test';


import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class BasicExample extends React.Component {
  constructor(){
    super()
    this.state={
      cur_user:0,
      is_new:false,
      is_auth:false,
      is_org:false,
      name:'',
    }
    
  }
/*
  renderAuth = ()=>{

    
    if(this.state.is_auth){
      localStorage.setItem('document',JSON.stringify(this.state));
      if(this.state.is_new){
        this.setState({redir:<Redirect to={{pathname: "/selectclubs",}} />})
      }
      else{
        this.setState({redir:<Redirect to={{pathname: "/dashboard",}} />})
      }
    }
    else{
      //this.setState({redir:<Redirect to={{pathname: "/",}} />})
    }
  }
*/

  componentWillMount() {
      this.documentData = JSON.parse(localStorage.getItem('document'));
      if (localStorage.getItem('document')) {
          this.setState({
            cur_user:this.documentData.cur_user,
            is_new:this.documentData.is_new,
            is_auth:this.documentData.is_auth,
            is_org:this.documentData.is_org,
            name:this.documentData.name,
        })
      } else {
          this.setState({
            cur_user:0,
            is_new:false,
            is_auth:false,
            is_org:false,
            name:'',
          })
      }
  }

  render(){
    
    return (
      <div>

        <Route
          exact path='/'
          render={(props) => <GLogin {...props} onLogin={(cur_user,is_new,is_auth,is_org,name)=>{this.setState({cur_user:cur_user,is_new:is_new,is_auth:is_auth,is_org:is_org,name:name})}} />}
        />
        <ProtectedRoute
          exact path='/dashboard'
          component={MainPage}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
          is_org={this.state.is_org}
          onRed={(redevent)=>this.setState({redevent})}
        />
        <ProtectedRoute
          exact path='/selectclubs'
          component={SelectClub}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/addevent'
          component={AddEvent}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/modifyevent'
          component={ModifyEvent}
          event={this.state.redevent}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/event'
          component={EventDetails}
          event={this.state.redevent}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
        />
        <Route
          exact path='/aboutus'
          component={AboutUs}
          is_auth={this.state.is_auth}
          cur_user={this.state.cur_user}
        />
        
        {
          //this.renderAuth()
          //this.state.redir
        }
        
        

      </div>
    )}
  componentDidMount() {
    //this.renderAuth()
  }
};
export default BasicExample;




  // ========================================
  
 ReactDOM.render(
    <BrowserRouter><BasicExample /></BrowserRouter>,
    //<GLogin />,
    //<AboutUs />,
    //<EventCard />,
    //<SelectClub />,
    //<Test />,
    //<BrowserRouter><MainPage /></BrowserRouter>,
    //<EventDetails />,
    //<AddEvent />,
    //<TopBar />,
    //<ModifyEvent event_id={1}/>,
    //<NotAuth />,
    document.getElementById('root')
 );
  