import React, { useEffect, useState } from 'react'
import { Button, ButtonBase, Card, CardContent, CardHeader, CardMedia, Container, Grid,  Typography, useTheme, } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import axios from 'axios'
export const RentProperty = () => {

  let history=useNavigate()
  let status="1"
  const [project,setProject]=useState([])
  useEffect(()=>{
     getData()
  },[])
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
  
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const getData=async ()=>{
 
     await  axios.post("/user/get_rent_sale_properties_limit").then(function (res) {
         console.log(res.data.dataRent)
         if(res.data.status===1){
             setProject(res.data.dataRent)
             handleClick()
         }
           })
  }
  return (
    <div>
      <Container maxWidth="lg">  
        {/* <Typography variant='h4'>BHR Featured Projects</Typography> */}
       
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"        
     
        >
            <Typography variant='h4' sx={{color: "#060847"}} >Latest Properties For Rent</Typography>
       <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}  onClick={()=>history(`/rent_sale_property/all/${status}/all/all/rand`)}>View All Properties <ArrowForwardIcon /></Button>
        </Grid>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
        <p style={{color:"grey"}}>
        Find a perfect place for you.
        </p>
        </Grid>
        <br/>
        <div>
        {project && (<Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  spacing={5}
  className="text-center"
>
    <br/>
    <br/>
    {/* {JSON.stringify(project[0].feature)} */}

  {project && project.map((i,key) => (

    
<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"


    
    item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
     <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
      <Card
        sx={{
          // height:"400px",
          width:"250px",
          textAlign:"center",
          position:"relative",
           borderRadius:"25px",
           "&:hover":{boxShadow: "0 10px 15px 0 rgba(52, 51, 51, 0.08)"}
        }}
  
      >
 
   <CardMedia
          style={{
            height: "200px",
            width:"250px",          
            margin:"auto",
            // marginTop:"10px",
            // borderRadius:"18px"
           
          }}
          image={`/images/properties/${i.prop_images.split(',')[0]}`}
        />
        {/* {i.feature && ( // Add a condition to check for feature
        <div
          style={{
            position: "absolute",
            top: 15,
            left: 15,
            padding: "8px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            borderRadius:"10%",
            // fontSize: "15px",
            // fontWeight: "bold"
          }}
        >
          <Typography variant="body2">
            <b>Featured</b>
          </Typography>
        </div>
      )} */}
        
        <CardContent sx={{textAlign:"left"}}>
          
          <Typography variant="h6">
           <b>{i.prop_title} </b> 
          </Typography>
          <Typography variant="body2">
           <PlaceIcon sx={{fontSize:"medium"}}/>&nbsp;{i.city}
          </Typography> 
          <Typography variant="body2">
           <HomeIcon sx={{fontSize:"medium"}}/>&nbsp;{i.prop_cat} 
          </Typography> 
          <Typography variant="body2">
          <b>Rent / Sale: </b>&nbsp;{i.rent_sale===1 && "Rent" || i.rent_sale===2 && "Sale"} 
          </Typography> 
          {/* <Typography variant="body2">
          {i.bedrooms && <><BedIcon sx={{fontSize:"medium"}}/>&nbsp;{i.bedrooms}&nbsp;</>} 
          </Typography> 
          <Typography variant="body2">
          {i.bathrooms && <>   <ShowerIcon sx={{fontSize:"medium"}}/>&nbsp;{i.bathrooms}&nbsp; </>}
          </Typography> 
          <Typography variant="body2">
          {i.land_size && <>   <BorderOuterIcon sx={{fontSize:"medium"}}/>&nbsp;{i.land_size} </>}
          </Typography> */}
          <Typography variant="body2">
           <b>INR: {new Intl.NumberFormat("en-IN", {
                                  style: "decimal",
                                }).format(i.prop_price)} </b> 
          </Typography>
        </CardContent>
      </Card>
      </ButtonBase>
    </Grid>
  ))}
</Grid>)}
        </div>
          </Container>
    </div>
  )
}
