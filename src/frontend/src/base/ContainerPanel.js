import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "react-grid-system";
import MainPage from '../MainPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    paddingTop: "85px",
    paddingLeft: "0px",
    paddingRight: "0px"
  }
}));



function ContainerPanel(props) {
  return ( 
      <Fragment>
        <Container maxWidth="xl">
          <div className="app-content">{props.children}</div>
        </Container>
      </Fragment>
  );
}


export default ContainerPanel;
