import { useEffect, useRef } from 'react';

import React from 'react'
import { Button, ButtonBase, Card, CardContent, CardHeader, CardMedia, Container, Grid,  Typography, useTheme } from '@mui/material'
import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Service = () => {
  const mySectionRef = useRef(null);
let history=useNavigate()
  const serviceData = [
    {
      id: "service1",
      image: service1,
      title:"For Property Seeker",
      desc: "We offer premium category residential units from renowned property developers and builders.",
    },
    {
      id: "service2",
      image: service2,
      title:"Marketing & Sales Support",
      desc: "BHR Property provides professional sales and marketing support to Developers and Builders.",
    },
    {
      id: "service3",
      image: service3,
      title:"Property Sell or Rent",
      desc: "BHR Properties is a platform for anyone wanting to Sell, Buy or Rent out their property. We’ll be with you all the way.",
    },
  ];

  useEffect(()=>{
  handleClick()
  },[])
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
  
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant='h4' sx={{color: "#060847"}}>Our Services</Typography>
        <div>
        {serviceData && (<Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
        className="text-center"
        >
            {serviceData.map((service,key)=>{
                            return (<Grid item xs={12} sm={12} md={4} lg={4} xl={4}> 
                            {/* <a href={`/what_we_do#${service.id}`} style={{textDecoration:"none"}}> */}
                            {/* <Button> */}
                            <Button href={`/what_we_do#${service.id} `} >
                           
               
                            <Card sx={{width:"300px",
                            "&:hover":{boxShadow: "0 10px 15px 0 rgba(52, 51, 51, 0.08)"}
                            }}
                          onClick={()=>history(`/what_we_do#${service.id}`)}
                            >
                                
                                <CardMedia
                                style={{height: "62px",width:"93px",margin:"auto",marginTop:"40px"}}
                                image={service.image}
                                
                                />
                                <CardContent style={{textAlign:"center",marginLeft:"5px",marginRight:"5px"}}>
                                <Typography variant="p1" >
                                <br/>
                                <b>{service.title} </b>
                                
                                  </Typography>
                                  <br/>
                                <Typography variant="body2" style={{color:"grey",textAlign:"justify",textTransform:"capitalize"}}>
                                <br/>
                                {service.desc} 
                                  </Typography>
                                  <br/>

                                  <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        
                        // pr={1}
                      >
                        {/* <Button href={`/what_we_do#${service.id} `} >gg</Button> */}
                      {/* <ButtonBase href={`/what_we_do#${service.id.toLowerCase()}`}>hello</ButtonBase> */}
                        
                        <Button
                          size="small"
                          sx={{ backgroundColor: "#060847", borderRadius: 10, marginLeft: "5px", 
                          marginRight: "5px", '&:hover':{backgroundColor:'#060847'}}}
                          variant="contained"
                        type='button'
                          // href={`/what_we_do#${service.id.toLowerCase()}`}
                        >
                          {" "}
                          &nbsp;Know More&nbsp;&nbsp;{" "}
                          <ChevronRightIcon
                            sx={{
                              borderRadius: "50%",
                              backgroundColor: "white",
                              color: "#060847",
                              height: 18,
                              width: 18,
                            }}
                          />{" "}
                        </Button>
                        {/* {/* <Stack direction="row" spacing={1}> */}

                        {/* <Chip
                                  component="a"
                                  href={`/what_we_do#${service.id} `}
                                  label="Know More"
                                  onDelete={handleDelete}
                                  deleteIcon={<ChevronRightIcon  sx={{backgroundColor:'white', color:'#090e73', borderRadius:'50%', m:2 }}/>}
                                  variant="outlined"
                                  // clickable
                                  sx={{backgroundColor:'#090e73',"&:hover":{backgroundColor:"#090e73"}, color:'white', cursor: "pointer" }}
                                /> */}
                        {/* </Stack> */}
                      </Grid>
                                </CardContent>
                            </Card>
                            </Button>
                            {/* </a> */}
                            </Grid> );
                        })}
                       
            
        </Grid>)}
        </div>
          </Container>
    </div>
  )
}
