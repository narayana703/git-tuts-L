import React from 'react'
import { Header } from '../components/header'
import { HomePage } from '../components/home'
import { Banner } from './banners'
import { Service } from './services'
import { Container, Typography,Grid } from '@mui/material'
import {Projects} from './projects'
import { LifeStyle } from './lifeStyle'

import { Blog } from './blog'
import { RentProperty } from './propertyRent'
import { SaleProperty } from './propertySale'

import { useEffect } from 'react'
import {Helmet} from "react-helmet";


export const Home=()=> {

  useEffect(()=>{
    handleClick()
  },[document])

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
    console.log("===========");
console.log(document,"===============1111")
console.log(anchor,"=========2")
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <div>
       <Helmet>
                
                <title>BHR Properties | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
        {/* <Header /> */}
        {/* <HomePage /> */}
        <Banner />
        <br/>
        <br/>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant='h4' sx={{color: "#060847"}}>
              Welcome to BHR Properties
            </Typography>
            <Typography variant='body2' style={{ color:"grey" }}>
              BHR Properties is a emerging real estate company with expertise in sales and marketing focusing on assisting customers, investors and developers with aim to maximize returns
            </Typography>
          </Grid>
        </Container>
        <br/>
        <br/>
        <Service />
        <br/>
        <br/>
      <Projects />
      <br/>
      <br/>
      <LifeStyle />
      <br />
      <br/>
      <RentProperty />
      <br/>
      <br/>
      <SaleProperty />
      <br/>
      <br/>
      <Blog />
      <br/>
      <br/>
    </div>
  )
}
