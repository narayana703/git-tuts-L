
import React from 'react'
import { useTheme, Grid, CardMedia, Container, Typography, FormControl, OutlinedInput, Avatar, Button, useMediaQuery, Card, Paper, ButtonBase } from '@mui/material';
import { Header } from '../components/header';
import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';
import { useEffect } from 'react';
import {Helmet} from "react-helmet";
import img from '../assets/jumbo2.jpg'
export const WhatWeDo = () => {


const data=window.location.hash.substring(1);
console.log(data);
const theme = useTheme();
const isMatch = useMediaQuery(theme.breakpoints.down("md"));
const handleClick = () => {
  const anchor = document.querySelector("#back-to-top-anchor");

  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
useEffect(()=>{
  handleClick()
},[])
const jumbotroncss={
  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${img})`,
  opacity: 0.8,
  backgroundAttachment: 'fixed',
  color: '#fff',
  minHeight: "300px",
  // marginTop: "50px",
  marginBottom: "8px",
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 


};
  return (
    <div style={{ backgroundColor: "#faf9f6" }}>
      {/* <Header /> */}
      <Helmet>
                
                <title>What We Do | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
            <div className="jumbotron text-center" style={jumbotroncss} >
      {/* <Paper style={{opacity:"0.5",width: "80%",}}> */}
           
           <Typography variant="h2" >
           What We Do</Typography>
           {/* </Paper> */}
             
             
      </div>
 <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        // sx={{ backgroundColor: 'white', }}
      >


        <Card variant="outlined" sx={{ padding: '3%', marginTop: '1px', background: "none", border: "none" }}>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ marginTop: '10px', }}>
                <strong> What We Do </strong>
              </Typography></Grid> */}
            <Grid item xs={12} >
              <Typography variant="body1" gutterBottom paragraph sx={{ textAlign: 'justify' }}>
                &nbsp;&nbsp;&nbsp;We offer wide range of Residential Plots, Apartments/Villas, Farmland Plots in fast developing locations. We have associated with various developers to market and sell residential units and Farmlands in Hyderabad, Tirupati and Bengaluru.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
     
        <div id="service1">
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"

      >
       <Card variant="outlined" sx={{ padding: '3%', marginTop: '1px', background: "none", border: "none" }}>
  <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: '1%', textAlign: 'justify' }}>
        <strong>For Property Seeker:</strong>
      </Typography>
      <Typography variant="body2" gutterBottom paragraph sx={{ textAlign: 'justify' }}>
      &nbsp;&nbsp;&nbsp;We offer premium category residential units from renowned property developers and builders.Those we are looking to buy residential units, BHR Properties is the right choice.With our experience in real estate, we are sure that we will be able to find the right property at the right location, right time for the right deal for you. 
      </Typography>
      <Typography variant="body2" gutterBottom paragraph sx={{ textAlign: 'justify' }}>
      &nbsp;&nbsp;&nbsp;Our Main Focus is in Hyderabad, Tirupati and Bengaluru. Right from finding the property that suits your needs and desire to analyzing its appreciation value in the future to making sure the property is 100% ready for buying on all aspects, we will assist you through everything. We also take care post sale support for any concerns, Resale of your property.
      </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <img src={service1} alt="Service 1" style={{ marginTop: '5%',maxWidth: '100%', height: '180px' }} />
    </Grid>

  </Grid>
</Card>
<br/><br/>
<hr style={{width:"100%"}}/>


      </Grid>

        </div>
      <div id="service2">
      <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-start"
>
  {isMatch ? (<>
    
  <Grid item xs={12} md={6}>
    <Card variant="outlined" sx={{ padding: '3%', marginTop: '1%', background: "none", border: "none" }}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: '5%', textAlign: 'justify' }}>
        <strong>Marketing & Sales Support:</strong>
      </Typography>
      <Typography variant="body2" gutterBottom paragraph sx={{ textAlign: 'justify' }}>
      &nbsp;&nbsp;&nbsp;BHR Property provides professional sales and marketing support to Developers and Builders. We have a team of professionals to generate sales leads, build relationships, and close deals. We assess a customer's real need and strategically use competitive intelligence to generate sales leads. We promote the project with relevant online and offline marketing techniques.
      </Typography>
    </Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <img src={service2} alt="marketing image" style={{marginTop: '5%', maxWidth: '100%', height: '180px' }} />
  </Grid>
  </>):(
    <>
    <Grid item xs={12} md={6}>
    <img src={service2} alt="marketing image" style={{marginTop: '5%', maxWidth: '100%', height: '180px' }} />
  </Grid>
  <Grid item xs={12} md={6}>
    <Card variant="outlined" sx={{ padding: '5%', marginTop: '1%', background: "none", border: "none" }}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: '5%', textAlign: 'justify' }}>
        <strong>Marketing & Sales Support:</strong>
      </Typography>
      <Typography variant="body2" gutterBottom paragraph sx={{ textAlign: 'justify' }}>
      &nbsp;&nbsp;&nbsp;BHR Property provides professional sales and marketing support to Developers and Builders. We have a team of professionals to generate sales leads, build relationships, and close deals. We assess a customer's real need and strategically use competitive intelligence to generate sales leads. We promote the project with relevant online and offline marketing techniques.
      </Typography>
    </Card>
  </Grid>
    </>
  )}
  

</Grid>

<br/><br/>
<hr style={{width:"100%"}}/>
      </div>
      <div id="service3">
      
<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>


  <Grid item xs={12} md={6}>
    <Card variant="outlined" sx={{ padding: '3%', marginTop: '1px', background: "none", border: "none" }}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: '5%', textAlign: 'justify' }}>
            <strong> Property Sell or Rent </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'justify' }}>
          &nbsp;&nbsp;&nbsp;BHR Properties is a platform for anyone wanting to Sell, Buy or Rent out their property. We'll be with you all the way. Get the wide choice of projects to select from, with credible and updated listing. Here you'll always find approved and best properties only.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonBase href='/rent_sale_property/all/all/all/all'>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'justify',textDecoration:"underline",color:"blue" }}>
            <strong> Sell or Rent Your Property Directly: </strong>
          </Typography>
          </ButtonBase>
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'justify' }}>
            <ul>
              <li> List Property on BHR Properties directly</li>
              <li>Shortlist Clients from the Limited responses</li>
              <li>Connect, Manage and Showcase property yourself</li>
              <li>Negotiate directly without any mediator</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <ButtonBase href='/our_properties/all/all/all'>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'justify',textDecoration:"underline",color:"blue"}}>
            <strong> Sell or Rent Your Property with BHR Experts: </strong>
          </Typography>
          </ButtonBase>
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'justify' }}>
            <ul>
              <li>Pay Only When Deal Closes</li>
              <li>Assign Dedicated Expert till Deal Closer</li>
              <li>Showing, Negotiating, Closing on your Behalf</li>
              <li>Negotiate directly without any mediator</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <img src={service3} alt="property image" style={{marginTop:"5%", maxWidth: '100%', height: '180px' }} />
  </Grid>
</Grid>
<br/><br/>
<hr style={{width:"100%"}}/>
      </div>
<br/>
<br/><br/><br/>
      </Container>
    </div>
  )
}
