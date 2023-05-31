import React from "react";
import image from "../assets/blog01.jpg";
import { Carousel } from "react-responsive-carousel";
import {Accordion,AccordionSummary,AccordionDetails, Card, AppBar, Hidden, Toolbar, Tab, ListItemText, ListItemButton, List, Button, Drawer, Typography, useTheme, Dialog, DialogContent, Box, Container, Grid, TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const corosel =[
{
  img: image
},{
  img: image
},{
  img: image
}
]
export default function WabPage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  //  1 Sqyard = 9 Square Feet
  //  1 Acre = 43560.057264 Square Feet
  //  1 Cent = 435.508003 Square Feet
  //  1 Ankanam = 72 sqfeet
  //  1 Cunta = 1089.000463 Square Feet

  return (
    <div>
      <Box>
      <img src={image} alt={image} />
      <Box
                                            
                                            
                                            sx={{
                                              position: "absolute",
                                              // top: 0,
                                              left: 0,
                                              bottom: 210,
                                              right: 100,
                                              // backgroundColor:
                                              //   "rgba(0, 0, 0, 0.7)",
                                              borderRadius: "8px",
                                              display: "flex",
                                              justifyContent: "flex-end",
                                              alignItems: "center",
                                              // cursor: "pointer",
                                            }}
                                          >
                                            {/* <Typography
                                              variant="h2"
                                              sx={{
                                                color: "#fff",
                                                fontSize: "4rem",
                                                "@media (max-width: 960px)": {
                                                  fontSize: "3rem",
                                                },
                                                "@media (max-width: 600px)": {
                                                  fontSize: "2rem",
                                                },
                                              }}
                                            >
                                             
                                            </Typography> */}
                                             <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search about Arawinz"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
                                          </Box>
      </Box>
      <div style={{ textAlign: "center", backgroundColor: "#f7f2ec" }}>
        <Container
          maxWidth="sm"
          sx={{ textAlign: "center", backgroundColor: "#f7f2ec" }}
        >
          <br />
          <br />
          <br />
          <br />
          <Typography variant="h4"> Praneeth Pranav Townsquare</Typography>
          <br />
          <br />
          <Typography variant="body1">
            {" "}
            Currently only 2 &amp; 2.5 BHK Apartments Available.
          </Typography>  <br />
          <Typography variant="body2">
            {" "}
            Praneeth Pranav Townsquare is a flagship residential apartment
            project of Praneeth Group, Bachupally, Hyderabad. Townsquare project
            comes with the most elegant and premium features for a happy &
            comfortable living.
          </Typography>
          <br />
          <Typography variant="body2">
            You are at your happiest when you’re a part of a community that has
            your back. With our flats for sale in Bachupally at Praneeth Pranav
            Townsquare, you will join an affluent apartment community that
            enjoys great access to IT hubs, educational institutions and
            happening places in the city. Live a complete life at our 3BHKs for
            sale in Bachupally. And our 2BHKs for sale in Bachupally boast the
            best amenities for a growing, modern family!
          </Typography>
          <br />
          <Typography variant="body2">RERA Regd. No. : P02200001090</Typography>
          <br />
          <Typography variant="body2">
            HMDA Approved No. : 011807/ZOC/R1/U6/HMDA/18052018
          </Typography>
          <br />
          <Typography variant="body2">Project funded by BHFL</Typography>
          <br /> <br />
        </Container>
        <Container maxWidth="lg">
            
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        >
          <Grid>
          <Card sx={{ height: 150, width: 210, border:'1px solid #c49a6c' }}><img src='https://praneeth.com/praneethpranavtownsquare/images/Flats.png' style={{marginTop:25}} /><br/><br/>527 Flats </Card><br /><br />
          <Button variant='outlined' sx={{color: '#c49a6c', border:'1px solid #c49a6c' }}>Latest project image</Button></Grid>
          <Grid>
          <Card sx={{ height: 150, width: 210, border:'1px solid #c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/Flats.png' style={{marginTop:25}} /><br/><br/>527 Flats </Card><br /><br />
          <Button variant='outlined' sx={{color: '#c49a6c', border:'1px solid #c49a6c'}}>Latest project image</Button></Grid>
          <Grid>
          <Card sx={{ height: 150, width: 210, border:'1px solid #c49a6c' }}><img src='https://praneeth.com/praneethpranavtownsquare/images/Flats.png' style={{marginTop:25}} /><br/><br/>527 Flats </Card><br /><br />
          <Button variant='outlined' sx={{color: '#c49a6c', border:'1px solid #c49a6c'}}>Latest project image</Button></Grid>
        </Grid>
        </Container> <br /> <br />
      </div>
<Grid 
container
direction="row"
justifyContent="center"
alignItems="center"
p={1}
>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.140765971994!2d80.4437573258514!3d16.315750184400077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a751f59227917%3A0x2efc2343369fe22c!2sSri%20Padam!5e0!3m2!1sen!2sin!4v1684323164969!5m2!1sen!2sin" 
      style={{height:400, width:'50%' }}></iframe>
      </Grid>

      <div style={{ textAlign: "center", backgroundColor: "#f7f2ec" }}>
      <Container
          maxWidth="md"
          sx={{ textAlign: "center", backgroundColor: "" }}
        >
       <br /> <br /> <br /> <br />
       <Typography variant="h4">Contact Us</Typography><br />
       <Grid
       container
       direction="row"
       justifyContent="center"
       alignItems="center"
       spacing={2}
       >
<Grid item xs={12} sm={6}><TextField id="outlined-basic" label="Enter your name" variant="outlined" size="small"  fullWidth sx={{backgroundColor:"#ffff"}}/> </Grid>
<Grid item xs={12} sm={6}><TextField id="outlined-basic" label="Enter email address" variant="outlined" size="small"  fullWidth sx={{backgroundColor:"#ffff"}}/> </Grid>
<Grid item xs={12} sm={6}><TextField id="outlined-basic" label="Enter your name" variant="outlined" size="small"  fullWidth sx={{backgroundColor:"#ffff"}}/> </Grid>
<Grid item xs={12} sm={6}><TextField id="outlined-basic" label="Enter your name" variant="outlined" size="small"  fullWidth sx={{backgroundColor:"#ffff"}}/> </Grid>
<Grid item xs={12} sm={12}><TextField multiline rows={4} id="outlined-basic" label="Enter your name" variant="outlined" size="small"  fullWidth sx={{backgroundColor:"#ffff"}}/> </Grid>
<Typography variant="body2" sx={{mt:4, p:1}}><b>Disclaimer:I</b> authorize Praneeth Group and its representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DND / NDNC.</Typography>
<Button variant='outlined' sx={{color: '#c49a6c', border:'1px solid #c49a6c',mt:4}}>Submit</Button>

       </Grid>
       <br /><br /><br /><br />
       </Container>
       </div>
       <div>
       <Grid
       container
       direction='column'
       justifyContent="center"
       alignItems="center"
       ><br /><br /><br /><br />
       <Typography variant="h4">Project Gallery</Typography><br /><br />
<img src="https://praneeth.com/praneethpranavtownsquare/images/townsquare/PPT3.png"
height={'50%'} width={'57%'} />
      <br /><br />
       </Grid>
       </div>

       <div style={{ backgroundImage:`url(https://praneeth.com/praneethpranavtownsquare/images/townsquare/PPT3.png)` }}>
       {/* <Grid
       container
       direction='column'
       justifyContent="center"
       alignItems="center"
       > */}
        <br /><br /><br /><br />
        <Typography variant="h3"sx={{textAlign:'center', color:'#ffff'}}>Project highlights</Typography><br /><br />
        <Container
          maxWidth="md"  sx={{backgroundColor:"#c49a6c", p:2, color:'#ffff'}} >
            <br />
            <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        ml={2}
        >

            <Grid item sm={6}>
       <li>HMDA Approved Project</li><br />
       <li>Well planned 6 Acres Community with 527 Flats of various sizes (1160 - 1655 sft areas)</li><br />
       <li>2 & 3 Bedroom Apartments</li><br />
       <li>Spacious Floor Plans</li><br />
       <li>No Common Walls</li><br />
       <li>Excellent Ventilation</li><br />
       <li>24x7 Security</li><br />
       </Grid>
       <Grid item sm={6}>
       <li> Vaastu Compliant </li><br />
       <li> Landscaping </li><br />
       <li> Solar Power plant </li><br />
       <li> Power Backup </li><br />
       <li> Solar fencing wherever required </li><br />
       <li> Sewage Treatment Plant </li><br />
       <li> Conforming to Green Building Norms </li><br />
       
       </Grid>
       </Grid>
       </Container>
       <br /><br /><br />
       {/* </Grid> */}
       </div>
       <div> <br /><br /><br /> <br />
       <Typography variant="h3"sx={{textAlign:'center'}}>Master Plan</Typography><br /><br />
       <Container
          maxWidth="lg">
       <img src='https://praneeth.com/praneethpranavtownsquare/images/master.jpg'  alt="no image" height={''} width={'100%'}/>
       </Container>
       </div>
       <div style={{backgroundColor:"#f9f9ff"}}>
        <br/><br/><br/><br/><br/><br/>
        <Typography variant="h3"sx={{textAlign:'center'}}>Project Floor Plans</Typography>
        <Container maxWidth="lg">        
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Container>

       </div>
       <div style={{backgroundColor:"#ffffff"}}>
       <br/><br/><br/><br/>
       <Typography variant="h3"sx={{textAlign:'center'}}>Project Amenities</Typography>
       <Container maxWidth="lg">
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        p={1}
        >
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}> <img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography> </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#f7f2ec'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icon/Reception.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#c49a6c ',mt:1}}>Club House</Typography></Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2} mt={3}>
          <Card sx={{height:150, width:165, backgroundColor:'#c49a6c'}}><img src='https://praneeth.com/praneethpranavtownsquare/images/icons/club-house.png'  alt='no image'  style={{ marginLeft:50,marginTop:25  }}    />  <Typography variant="body1"sx={{textAlign:'center', color:'#ffff',mt:1}}>Club House</Typography></Card>
        </Grid>
        
        
        </Grid><br/><br/><br/><br/>
          </Container>
       </div>

       <div style={{backgroundColor:"#f9f9ff"}}>
       <br/><br/><br/><br/><br/><br/>
       <Typography variant="h3"sx={{textAlign:'center'}}>Project Specifications</Typography>
       <Container maxWidth="lg">
       <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </Container>
          </div>

          <div style={{ backgroundImage:`url(https://praneeth.com/praneethpranavtownsquare/images/townsquare/PPT3.png)` }}>
          <br/><br/><br/><br/>
          <Typography variant="h3"sx={{textAlign:'center', color:'#ffff'}}>Project highlights</Typography><br /><br />
        <Container
          maxWidth="md"  sx={{backgroundColor:"#c49a6c", p:2, color:'#ffff'}} >
            <br />
            <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        ml={2}
        >

            <Grid item sm={6}>
       <li>HMDA Approved Project</li><br />
       <li>Well planned 6 Acres Community with 527 Flats of various sizes (1160 - 1655 sft areas)</li><br />
       <li>2 & 3 Bedroom Apartments</li><br />
       <li>Spacious Floor Plans</li><br />
       <li>No Common Walls</li><br />
       <li>Excellent Ventilation</li><br />
       <li>24x7 Security</li><br />
       </Grid>
       <Grid item sm={6}>
       <li> Vaastu Compliant </li><br />
       <li> Landscaping </li><br />
       <li> Solar Power plant </li><br />
       <li> Power Backup </li><br />
       <li> Solar fencing wherever required </li><br />
       <li> Sewage Treatment Plant </li><br />
       <li> Conforming to Green Building Norms </li><br />
       
       </Grid>
       </Grid>
       </Container>
       <br /><br /><br />
            </div>
        <div>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bajaj-finserv.png" alt="no image"   width={'100%'}/>
        </div>
        <div style={{backgroundColor:"#ffffff"}}>
       <br/><br/><br/><br/><br/><br/>
       <Typography variant="h3"sx={{textAlign:'center'}}>Approved Banks</Typography>
       <Container maxWidth="lg">
        <br/><br/>
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        >
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/axis.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/sbi.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/bhfl-bank.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/hdfc.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/icici.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/idbi-bank.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/lic-p.png" alt="no image"   height={100} width={165} />
        </Grid>
        <Grid item xs={6} sm={4} md={3} mt={3}>
          <img src="https://praneeth.com/praneethpranavtownsquare/images/bank/union-bank.png" alt="no image"   height={100} width={165} />
        </Grid>

        </Grid>
        </Container>
        </div>
        <div style={{padding:50  }}>
        <br/><br/><br/><br/><br/><br/>
       <Typography variant="h3"sx={{textAlign:'center'}}>FAQS</Typography>
       <br/><br/>
       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <b>1. Why is Bachupally considered a prime location for residential projects?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          A: Apartments in Bachupally offer easy access to important destinations in Hyderabad. Be it work or leisure, you are at an easy driving distance if you stay at Bachupally. Also, Bachupally hosts several prominent educational institutions, this will help your children in reducing the travel strain and time. If you are looking for flats for sale in bachupally, you should consider Praneeth Group’s Townsquare project, it is located on the Bachupally main road.


          </Typography>
        </AccordionDetails>
      </Accordion>
      <br/><br/>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <b>2. Why should you invest in Townsquare?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion><br/><br/>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <b>3. What is the current status of the Town Square project?</b>
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion><br/><br/>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <b>4. 2BHK vs 3BHK, which should you buy?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}
