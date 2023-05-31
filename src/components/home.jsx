import React from 'react'
import Logo from '../assets/logo.png'
import {Button, Box, Grid, Typography } from "@mui/material";

export const HomePage=()=> {
  return (
    <div>

<Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
  item xl={12} lg={12} md={12} sm={12} xs={12}
  sx={{ minHeight:'90vh'  }}
>

       {/* <Box sx={{marginTop:35}}> */}
      <Grid  sx={{textAlign:'center'}}>  <Typography variant="h3" gutterBottom  sx={{fontSize:'4vw',color:"grey"}}>
       <b> Welcome to </b>
      </Typography> </Grid>
     
       <Grid sx={{textAlign:'center'}}> <img src={Logo} alt="logo" width="45%"/><br/>
        </Grid>
       {/* </Box> */}
        </Grid>
        

    </div>
  )
}
