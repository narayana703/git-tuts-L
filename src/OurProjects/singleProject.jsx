import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import img from '../assets/jumbo3.jpg'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Container,
} from "@mui/material";
import parse from "html-react-parser";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { SnackbarContext, UserContext } from "../components/UserContext";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
 // ViberShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  
} from "react-share";
import { useTheme } from "@emotion/react";
export const SingleProject = () => {
  const url=window.location.href;
  console.log(url,"url")
  const theme=useTheme()
  const [data, setData] = useState([]);
  let id = useParams();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [enqOpen, setEnqOPen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const { user, token } = useContext(UserContext);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [projId, setProjId] = useState("");
  const [namee, setNamee] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [msg, setMsg] = useState("");
  const [wait, setWait] = useState(false);
  const [error, setError] = useState(0);
  // const [msgs,setMsgs]=useState("")
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const formdata = new FormData();
    console.log(id.id, "id.id");
    formdata.append("proj_id", id.id);
    await axios
      .post("/user/get_single_projects", formdata)
      .then(function (res) {
        console.log(res.data);
        if (res.data.status === 1) {
          setData(res.data.data);
          setImages(res.data.data.project_images?.split(","));
        }
      });
  };
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleImageClick1 = (index) => {
    setClickedIndex(index);
    setOpen(true);
  };

  const contactNow = (e) => {
    e.preventDefault();
    setError(0);
    if (namee === "") {
      setError(1);
      setSnack({
        message: "Please Enter your name..",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (mob.length !== 10) {
      setError(2);
      setSnack({
        message: "Please Enter a Valid 10-digit Mobile number..",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      setWait(true);

      const formData = new FormData();
      formData.append("cand_name", namee);
      formData.append("cand_mob", mob);
      formData.append("cand_email", email);
      formData.append("propid", id.id);
      formData.append("userid", user.user_id);
      formData.append("message", msg);

      axios
        .post(
          "/user/project_enquiry",
          formData
          //   , {
          //     headers: { tkn: token },
          //   }
        )
        .then((res) => {
          if (res.data.status) {
            setWait(false);

            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
              direction: "center",
            });
          } else {
            setWait(false);

            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
              direction: "center",
            });
          }
        });
    }
  };

  return (
    <div>
      <Box>
        <Box sx={{ objectFit: "cover" }}>
        <img
          src={`/images/projects/${data.banner_image}`}
          width="100%"
          height='800px'
          style={{ objectFit: "cover" }}
        />
        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="flex-end"
                          item
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          // sx={{backgroundColor:"#f7f2ec"}}
                        >
                           <Typography variant="body2" gutterBottom  style={{ backgroundColor:"none" }}>
                                      <b>Share via:  </b>
                        <FacebookShareButton url={url} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <FacebookIcon size={30} round={true}/>
                        </FacebookShareButton>      
                        <LinkedinShareButton url={url} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <LinkedinIcon size={30} round={true}/>
                        </LinkedinShareButton>   
                        <TwitterShareButton url={url} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <TwitterIcon size={30} round={true}/>
                        </TwitterShareButton>    
                         
                        <WhatsappShareButton url={url} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <WhatsappIcon size={30} round={true}/>
                        </WhatsappShareButton>
                        
                        </Typography>
                        </Grid>
        </Box>
        <Container maxWidth="lg"></Container>

            {/* </Container> */}
            <div >
            <Container maxWidth="lg">
            <Grid
             container
             direction="row"
             justifyContent="center"
             alignItems="center" 
            >
            {/* {JSON.stringify(data)} */}
            
            <Grid item xs={12} mt={7} mb={3}>
              <Typography variant="h4">{data.project_title}</Typography>
            </Grid>
            <Grid item  xs={12} md={4}>
              <Typography variant="body1">
                Project Type: &nbsp;{data.property_type}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Location: &nbsp;{data.location}
              </Typography>
            </Grid>
        
         
            {/* <Grid item xs={12} md={4}>
              <a 
              href={`/images/projects/${data.broacher}`} target="_blank" disabled
              >
                <Button>Download Broacher</Button>
              </a>
            </Grid> */}
            <br/>
            <br/>
            <Grid item xs={12}>
              <Typography variant="h5">Project Description</Typography>
            </Grid>
            <Grid item xs={12} textAlign={"justify"}>
            
              <Typography variant="body1">
                {data.project_desc && parse(data.project_desc)}
              </Typography>
            </Grid>
            
            </Grid>
            </Container>
            </div>

            <div style={{ backgroundColor: "#E8D7C5",}}
            //  style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${img}) `}}
             >
            {/* <Container maxWidth="lg"> */}
              <br/><br/><br/><br/><br/>
            <Grid item xs={12} >
              <Typography variant="h4">Project Highlights</Typography>
            </Grid><br/><br/>

            {/* <Container maxWidth="md" sx={{ color: '#ffff' }}> */}
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
          
            <Grid item xs={12} sm={12} md={5}>
              {/* <Container maxWidth="md" sx={{ p: 2, textAlign:'justify' }}> */}
              <Box
                sx={{
                  m: 7,
                  p: 2,
                  textAlign: "justify",
                  backgroundColor: "#ffff",
                  borderRadius: 2,
                 
                }}
              >
                {/* <Grid  p={2} textAlign={"justify"}> */}
                <Typography variant="body1">
                  {data.proj_highlights && parse(data.proj_highlights)}
                </Typography>
                {/* </Grid> */}
              </Box>
              {/* </Container> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src={`/images/projects/${data.proj_high_image}`} alt={data.project_title}
                height={"auto"}
                width={"80%"}
                style={{ borderRadius: 10,objectFit: 'cover',  }}
              />
            </Grid>
          </Grid>
 
  {/* <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Box sx={{ backgroundColor: "#c49a6c", m: 2, display: 'flex', alignItems: 'stretch', height: '100%' }}>
      <Grid item p={1} textAlign={"justify"}>
        <Typography variant="body1">
          {  data.proj_highlights && parse(data.proj_highlights)}
        </Typography>
      </Grid>
    </Box>
  </Grid>
  <Grid item xs={12} md={6}>
    <Box sx={{ backgroundColor: "#c49a6c", m: 2, display: 'flex', alignItems: 'stretch', height: '100%' }}>
      <Grid item p={1}>
     
        <img src={`/images/projects/${data.proj_high_image}`} alt={data.project_title} height="auto" style={{ width: '100%', height: '100%',objectFit: 'cover', }} />
      </Grid>
    </Box>
  </Grid>
</Grid> */}

{/* </Container> */}








            <br/><br/><br/> <br/> 
            </div>

            
{images && 
            <div style={{backgroundColor:'#ffffff'}}>
            
            <Container maxWidth="lg">
            <Grid item xs={12}>
            <br/><br/><br/>
              <Typography variant="h4">Project Gallery</Typography><br/><br/>
              
              <Grid item xs={12} md={6}>
              <Box
                  sx={{
                    width: "100%",
                    // paddingBottom: "70%",
                    position: "relative",
                  }}>  
  <Carousel
    showArrows={true}
    showStatus={false}
    onClickItem={(index) => handleImageClick1(index)}
    renderThumbs={() => null} // Hide thumbnail navigation
  >
    {images && images.map((src, index) => (
      <div key={index}>
        <img
          src={`/images/projects/${src}`}
          alt={`Image ${index}`}
          style={{
            objectFit: 'cover',
            width: '80%',
            height: '500px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
      </div>
    ))}
  </Carousel> </Box>
</Grid>
<Lightbox
  open={open}
  close={() => setOpen(false)}
  initialSlide={clickedIndex}
  slides={images.map((src) => ({
    src: `/images/projects/${src}`,
  }))}
/>
            </Grid>
            </Container>

         
            </div>}
<br/>
<br/>
            
            <div style={{ backgroundColor: "#E8D7C5",}}>
            {/* <Container maxWidth="lg"> */}
              <br/><br/><br/><br/><br/>
            <Grid item xs={12}>
              <Typography variant="h4"  >Location Highlights</Typography>
            </Grid><br/><br/>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
          
            <Grid item xs={12} sm={12} md={5}>
              {/* <Container maxWidth="md" sx={{ p: 2, textAlign:'justify' }}> */}
              <Box
                sx={{
                  m: 7,
                  p: 2,
                  textAlign: "justify",
                  backgroundColor: "#ffff",
                  borderRadius: 2,
                 
                }}
              >
                {/* <Grid  p={2} textAlign={"justify"}> */}
                <Typography variant="body1">
                {data.loc_highlights && parse(data.loc_highlights)}
                </Typography>
                {/* </Grid> */}
              </Box>
              {/* </Container> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src={`/images/projects/${data.loc_image}`} alt={data.project_title}
                height={"auto"}
                width={"80%"}
                style={{ borderRadius: 10,objectFit: 'cover',  }}
              />
            </Grid>
          </Grid>
            {/* <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Box sx={{ backgroundColor: "#c49a6c", m: 2, display: 'flex', alignItems: 'stretch', height: '100%' }}>
      <Grid item p={1} textAlign={"justify"}>
        <Typography variant="body1">
          {data.loc_highlights && parse(data.loc_highlights)}
        </Typography>
      </Grid>
    </Box>
  </Grid>
  <Grid item xs={12} md={6}>
    <Box sx={{ backgroundColor: "#c49a6c", m: 2, display: 'flex', alignItems: 'stretch', height: '100%' }}>
      <Grid item p={1}>
        <img src={`/images/projects/${data.loc_image}`} alt={data.project_title} height="auto" style={{ width: '100%', height: '100%' ,objectFit: 'cover',}} />
      </Grid>
    </Box>
  </Grid>
</Grid> */}


            {/* <Container
          maxWidth="md"  sx={{ p:2, color:'#ffff'}}  >
            <Box sx={{backgroundColor:"#c49a6c",m:2}}>
            <Grid item xs={12} p={2} textAlign={"justify"}>
              <Typography variant="body1">
                {data.loc_highlights && parse(data.loc_highlights)}
              </Typography>
            </Grid>
            </Box>
            </Container> */}
            <br/><br/><br/> <br/> 
            </div>
         
            <div style={{backgroundColor:'#f9f9f9'}}>
              <br/><br/><br/>
            <Grid item xs={12}>
              <Typography variant="h4">Contact Us</Typography>
              <Container maxWidth="sm">
              <form onSubmit={contactNow}>
                <Box  
                // sx={{border:"1px solid black"}}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    m={2}
                    p={3}
                    pr={6}
                  >
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Name *"
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        error={error === 1 && true}
                        type={"text"}
                        value={namee}
                        onChange={(e) => {
                          setNamee(e.target.value);
                        }}
                        sx={{backgroundColor:'#ffff'}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} mt={1}>
                      <TextField
                        label="Mobile *"
                        variant="outlined"
                        fullWidth
                        error={error === 2 && true}
                        type={"number"}
                        value={mob}
                        size="small"
                        onChange={(e) => {
                          setMob(e.target.value);
                        }}
                        sx={{backgroundColor:'#ffff'}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} mt={1}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type={"text"}
                        size="small"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        sx={{backgroundColor:'#ffff'}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} mt={1}>
                      <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type={"text"}
                        value={msg}
                        multiline
                        rows={3}
                        onChange={(e) => {
                          setMsg(e.target.value);
                        }}
                        sx={{backgroundColor:'#ffff'}}
                      />
                    </Grid>
                    <br />
                    <Grid item xs={12} sm={12} mt={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        
                        style={{
                          m: 2,
                          backgroundColor: wait ? "white" : "#060847",

                          color: wait ? "black" : "white",
                        }}
                      >
                        <SendIcon /> &nbsp; Submit Details
                      </Button>
                      <br/><br/>
                    </Grid>
                  </Grid>
                </Box>
                </form>
              </Container>
            </Grid>
            </div>
        
        
      </Box>
      <Dialog open={enqOpen} onClose={() => setEnqOPen(false)}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, color: "grey" }}
          onClick={() => {
            setEnqOPen(false);
            // handle close icon click event
            // deleteCard(i.search_hist_id)
          }}
        >
          <CloseIcon
            sx={{
              backgroundColor: "grey",
              color: "#ffff",
              borderRadius: "15px",
              padding: "1px",
              "&:hover": {
                backgroundColor: "grey",
                borderRadius: "15px",
                padding: "1px",
              },
            }}
          />
        </IconButton>
        <DialogContent>
          <Box m={3} p={3}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <Typography variant="h6" sx={{ color: "#060847" }}>
                  If you already have an account, please sign in...
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      backgroundColor: "#060847",
                      "&:hover": { backgroundColor: "#060847" },
                    }}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      backgroundColor: "#060847",
                      "&:hover": { backgroundColor: "#060847" },
                    }}
                    component={Link}
                    to="/signin"
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm">
        <DialogContent>
          <Box m={4}>
            <form onSubmit={contactNow}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ color: "#060847" }}
                    className="text-center"
                    gutterBottom
                  >
                    Enquiry Form
                  </Typography>
                  <hr style={{ color: "#060847" }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{ color: "#060847", pb: 1 }}
                  >
                    Please fill out the form below with your information.
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <TextField
                      label="Name *"
                      variant="outlined"
                      fullWidth
                      id="outlined-basic"
                      error={error === 1 && true}
                      type={"text"}
                      value={namee}
                      onChange={(e) => {
                        setNamee(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Mobile *"
                      variant="outlined"
                      fullWidth
                      error={error === 2 && true}
                      type={"number"}
                      value={mob}
                      onChange={(e) => {
                        setMob(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type={"text"}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      variant="outlined"
                      fullWidth
                      type={"text"}
                      value={msg}
                      multiline
                      rows={3}
                      onChange={(e) => {
                        setMsg(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      style={{
                        m: 2,
                        backgroundColor: wait ? "white" : "#060847",

                        color: wait ? "black" : "white",
                      }}
                    >
                      <SendIcon /> &nbsp; Submit Details
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {/* </Grid> */}
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};