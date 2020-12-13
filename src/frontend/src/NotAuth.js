import React from 'react';
import {Box} from '@material-ui/core';
import TopBar from './TopBar';
import { Redirect } from 'react-router-dom';

const NotAuth=()=>{
    return(
        <div>
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >    
                Not Authorized. Redirecting...
                <Redirect  to={{pathname: "/",}} />
            </Box>
        </div>
    )
}
export default NotAuth;