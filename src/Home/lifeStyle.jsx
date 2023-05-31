import React, { useState,useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, CardMedia, Container, Grid,  Typography, useTheme ,CardActions} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios'
import life1 from '../assets/life1-1.png';
import life2 from '../assets/life2-1.png';
import life3 from '../assets/life3-1.png';
import life4 from '../assets/life4-1.png';


const data = [
    {
      id: "1",
      image: life1,     
      title:"Villa",
     
    },
    {
      id: "2",
      image: life2,    
      title:"Commercial", 
    
    },
    {
      id: "3",
      image: life3,  
      title:"Farmland",
    
    },
    {
      id: "4",
      image: life4,  
      title:"Apartment",
     
    },
    {
      id: "5",
      image: life3,  
      title:"House",
     
    },
    
  ];
export const LifeStyle = () => {
 const [data1,setData1]=useState([])
 useEffect(()=>{
    getData()
    handleClick()
 },[])
 const handleClick = () => {
  const anchor = document.querySelector("#back-to-top-anchor");

  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
 const getData=async ()=>{

    await  axios.post("/user/get_life_style_count").then(function (res) {
        console.log(res,"=====length life style")
        if(res.data.status===1){
            setData1(res.data.data)
            // handleClick()
        }
          })
 }
  return (
    <div style={{backgroundColor:"#060847",margin:"auto"}}>
      
       
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"        
     mt={2}
     pt={2}
        >
          <Grid item xs={12}>
            <Typography variant='h5' sx={{color:"#fff"}}
         
            >Explore New Lifestyles</Typography>
            </Grid>
            <Grid item xs={12}>
     <p style={{ color: "grey"}}>Find your next home, in any style you prefer.</p>
     </Grid>
   
      
        </Grid>
          {/* </Container> */}
          <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={2}
        pt={2}
        spacing={2} // set spacing between the Grid items
      >
        {/* {data.map(item => (
          <Grid item key={item.id} xs={12} sm={12} md={2} lg={2}>
            <Card sx={{ maxWidth: 180, margin: "auto", display: 'flex', flexDirection: 'column',backgroundColor: "#060847", }}>

              <CardMedia component="img" height={150} width={180}  image={item.image}  />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div" style={{ color: "#fff"}}>
                  {item.title}
                </Typography>
                {data1 && (
          <div style={{color:"grey"}}>
            {data1.filter((dataItem) => dataItem.property_type === item.title).length} Properties

          </div>
        )} */}
                {/* {data1 && data1.map((dataItem) => {
          // Filter the data1 array to find the item with propertyType equal to service.title and matching id
          const matchingItem = data1.find((matchingDataItem) => matchingDataItem.property_type === item.title && matchingDataItem.id === item.id);
          if (matchingItem) {
            return (
              <div key={matchingItem.id}>
                <Typography variant="p2" style={{ color: "grey" }}>
                  {matchingItem.property_type}: {matchingItem.id}
                </Typography>
              </div>
            );
          } else {
            return null;
          }
        })} */}

{data.map((item) => (
  <Grid item key={item.id} xs={12} sm={12} md={2} lg={2}>
    <Card sx={{ maxWidth: 180, margin: "auto", display: 'flex', flexDirection: 'column',backgroundColor: "#060847", }}>
      <CardMedia component="img" height={150} width={180}  image={item.image}  />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div" style={{ color: "#fff"}}>
          {item.title}
        </Typography>
        {data1 && (
          <div style={{ color: "grey" }}>
            {data1.filter((dataItem) => (
              item.title === "Commercial"
                ? (dataItem.prop_cat === "Office Space" || dataItem.prop_cat === "Shop")
                : dataItem.prop_cat === item.title
            )).length > 0 ? (
              // If the length of properties is greater than zero, display the count
              `${data1.filter((dataItem) => (
                item.title === "Commercial"
                  ? (dataItem.prop_cat === "Office Space" || dataItem.prop_cat === "Shop")
                  : dataItem.prop_cat === item.title
              )).length} Properties`
            ) : (
              // If the length of properties is zero, show an empty space
              <div style={{ height: '1em' }}></div>
            )}
          </div>
        )}
        {/* {data1 && (
           <div style={{color:"grey"}}>
            {data1.filter((dataItem) => (
              item.title === "Commercial" 
              ? (dataItem.property_type === "Office Space" || dataItem.property_type === "Shop")
              : dataItem.property_type === item.title
            )).length} Properties
          </div>
        )} */}
      </CardContent>
    </Card>
  </Grid>
))}


              {/* </CardContent>
            </Card>
          
          </Grid>
        ))} */}
      </Grid>
      <br/>  <br/>
    </div>
  )
}










