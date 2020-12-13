import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small">
      <MDBContainer fluid className="text-center text-md-left" style={{backgroundColor: "#3f51b5", color: "#fff", paddingTop: "1.5rem"}}>
        <MDBRow>
          <MDBCol md="4">
            <h5 className="title" style={{color: "#000", fontWeight: 700}}>EventLog</h5>
            <p>
            we create possibility for a bridge between the organizers and the attendes and make their life a bit organized by providing every detail of every events on campus.
            </p>
          </MDBCol>

          <MDBCol md="1">

          </MDBCol>
          <MDBCol md="3">
            
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title" style={{color: "#000", fontWeight: 700}}>Ahmedabad University</h5>
                Ahmedabad University is a private, non-profit university that offers students a liberal education focused on research and interdisciplinary learning.
                <br/>
                Connect with us: <Button
                                    variant="link"
                                    color="#fff"
                                    style={{color: "#fff"}}
                                    startIcon={<FacebookIcon />}
                                    href="https://www.facebook.com/AhmedabadUniversity"
                                    />

                                    <Button
                                    variant="link"
                                    color="#fff"
                                    style={{color: "#fff"}}
                                    startIcon={<TwitterIcon />}
                                    href="https://twitter.com/AhdUniv"
                                    />

                                    <Button
                                    variant="link"
                                    color="#fff"
                                    style={{color: "#fff"}}
                                    startIcon={<YouTubeIcon />}
                                    href="https://www.youtube.com/user/AhdUniVideos"
                                    />

                                    <Button
                                    variant="link"
                                    color="#fff"
                                    style={{color: "#fff"}}
                                    startIcon={<LinkedInIcon />}
                                    href="https://www.linkedin.com/edu/school?id=372040"
                                    />

                                    <Button
                                    variant="link"
                                    color="#fff"
                                    style={{color: "#fff"}}
                                    startIcon={<InstagramIcon />}
                                    href="https://www.instagram.com/ahduniv/"
                                    />
               
                
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3" style={{backgroundColor: "#000", color: "#fff"}}>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href=""> EventLog </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;