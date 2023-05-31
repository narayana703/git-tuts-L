import React,{useState,useEffect} from 'react'
import { Button, ButtonBase, Card, CardContent, CardHeader, CardMedia, Container, Grid,  Typography, useTheme } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios'
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import life1 from '../assets/life1-1.png';
import life2 from '../assets/life2-1.png';
import life3 from '../assets/life3-1.png';
import life4 from '../assets/life4-1.png';
import { Link, useNavigate } from 'react-router-dom';
export const Projects = () => {
 let history=useNavigate()
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

    await  axios.post("/user/get_all_projects_limit").then(function (res) {
        console.log(res)
        if(res.data.status===1){
            setProject(res.data.data)
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
            <Typography variant='h4' sx={{color: "#060847"}}>Projects</Typography>
       <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}} onClick={()=>{history('/our_properties/all/all')}}>View All Projects <ArrowForwardIcon /></Button>
        </Grid>
        <br/>
        <div>
        {project && (<Grid
  container
  direction="row"
  justify="center"
  alignItems="flex-start"
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
     <ButtonBase component={Link} to={`/project/${i.project_id}`}>
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
          image={`/images/projects/${i.project_images.split(',')[0]}`}
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
      {/* Project Name: Green Fields  

Type: Residential Plots 

City/Location icon: Hyderabad  */}
        
        <CardContent sx={{textAlign:"left"}}>
          {/* <Typography variant="h6"> */}
          <h4>Project Name: &nbsp;{i.project_title}</h4>
          
          {/* </Typography> */}
         
          <Typography variant="body2">
          <b>Type:&nbsp;{i.property_type} </b>
          </Typography> 
          <Typography variant="body2">
          <b>City/Location&nbsp;<PlaceIcon sx={{fontSize:"medium"}}/>: &nbsp;{i.location}</b> 
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