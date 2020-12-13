import React from 'react';
import {Route,Redirect} from 'react-router-dom'

export const ProtectedRoute=({component:Component, ...rest})=>{
    
    return(
        <Route 
            {...rest}
            render={
                ()=>{
                    console.log(rest)
                    if(rest.is_auth){
                        return <Component {...rest} />
                    }
                    else{
                        return <Redirect to={{pathname: "/",}} />
                    }
                
                }
            }
        />
    )
}
