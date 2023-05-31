import React from "react";
import react, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  Box,
  AppBar,
  TextField,
  useTheme,
  DialogContent,
  Dialog,
  ButtonBase,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import HouseIcon from "@mui/icons-material/House";
import BusinessIcon from "@mui/icons-material/Business";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BorderLeftIcon from "@mui/icons-material/BorderLeft";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Avatar from "@mui/material/Avatar";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext, SnackbarContext } from "../components/UserContext";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Swipe } from "@mui/icons-material";
import { Carousel } from "bootstrap";
import useMediaQuery from "@mui/material/useMediaQuery";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import DoneIcon from "@mui/icons-material/Done";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import ReactPlayer from "react-player";
import { Loading } from "../components/Loading";
import DOC from '../assets/DOC.jpg'
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
export const SinglePropertyView = () => {
  const url=window.location.href;
  console.log(url,"url")
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [slideImages, setSlideImages] = useState();
  const [final, setFinal] = useState([]);
  const { user, token } = useContext(UserContext);
  const [name, setName] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [saleprice, setsaleprice] = useState("");
  const [DownPayment, setDownPayment] = useState("");
  const [Years, setYears] = useState("");
  const [Interest, setInterest] = useState("");
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agentData, setAgentData] = useState([]);
  const [agentImage, setAgentImage] = useState([]);
  const [enqOpen, setEnqOPen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [propid, setPropid] = useState("");
  const [searchId, setSearchId] = useState("");
  let history = useNavigate();
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const [items, setItems] = useState([
    {
      id: "",
      floor_name: "",
      floor_size: "",
      floor_bedroom: "",
      floor_bathroom: "",
      floor_desc: "",
      floor_img: { preview: "", raw: "" },
      oldimage: "",
    },
  ]);

  const [data1, setData1] = useState();
  const [expanded, setExpanded] = useState(false);
  // this.state.open = true;
  let id = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    upDateProperty();
    // getdata();
    // getAgentData()
    // upDateProperty1();
  }, []);

  const upDateProperty = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("prop_id", id.id);
    // formdata.append("userid", user.user_id);
    console.log(id.id, "55555555555555555");
    await axios
      .post("/user/get_single_property_new_view_with_status", formdata)
      .then(function (response) {
        console.log(response.data, "single property");
        if (response.data.status === 1) {
          setData(response.data.data);
          console.log(response.data.data[0].user_ids, "====id");
          getAgentData(response.data.data[0].user_ids);
          setLoading(false);
          setImages(response.data.data[0]?.prop_images?.split(","));
          setItems(
            response.data.plan.map((item) => ({
              id: item.prop_id,
              floor_name: item.floorName,
              
              floor_desc: item.floorDescription,
              floor_img: `/images/properties/${item.floorPlanImage}`,
              oldimage: item.floorPlanImage,
            }))
          );
        }
      });
  };
  const upDateFavProperty = async () => {
    const formdata = new FormData();
    formdata.append("id", id.id);
    formdata.append("userid", user.user_id);
    console.log(id.id, "55555555555555555");
    await axios
      .post("/user/get_favourites", formdata)
      .then(function (response) {
        console.log(response.data, "single property");
        if (response.data.status === 1) {
          upDateProperty();
          console.log("====favorite");
        }
      });
  };

  const getAgentData = async (agent) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("agent_id", agent);

    console.log(id, "55555555555555555");
    await axios
      .post("/user/get_single_agent", formdata)
      .then(function (response) {
        console.log(response.data, "109999999");
        if (response.data.status === 1) {
          setAgentData(response.data.data[0]);
          setLoading(false);
          setAgentImage(response.data.data[0].prop_images);
        }
      });
  };
  const handleImageClick = (index) => {
    console.log(index + 1, "sssssssssssssssssssssssssssss");
    console.log(typeof index + 1, "type of index+1");
    setClickedIndex(index + 1);
    // var slideImages = data.images.split(",");
    var slideImages = data[0].prop_images.split(",");
    console.log("slideImages", slideImages);
    var shiftImages = slideImages.splice(0, index + 1);
    slideImages.push(...shiftImages);
    console.log(slideImages);
    setFinal(slideImages);
    setOpen1(true);
    console.log(final);
  };
  const handleImageClick1 = () => {
    setClickedIndex(0);
    setOpen(true);
  };
  // const images = data[0]?.images?.split(",") || [];

  // const upDateProperty1 = async () => {
  //   setLoading(true);
  //   const formdata = new FormData();
  //   formdata.append("id", id.id);
  //   console.log(id.id, "7777777777777777777777777");
  //   await axios
  //     .post(
  //       "/user/get_floor_plans",
  //       formdata
  //       // , {
  //       //   headers: { tkn: tkn },
  //       // }
  //     )
  //     .then(function (response) {
  //       console.log(response.data.data, "22222222222222222222222");
  //       if (response.data.status === 1) {
  //         setData1(response.data.data);
  //         setLoading(false);

  //         if (response.data.data.length > 0) {
  //           setItems(
  //             response.data.data.map((item) => ({
  //               id: item.id,
  //               floor_name: item.floorName,
  //               floor_size: item.floorSize,
  //               floor_bedroom: item.floorBedroom,
  //               floor_bathroom: item.floorBathroom,
  //               floor_desc: item.floorDescription,
  //               floor_img: `/images/properties/${item.floorPlanImage}`,
  //               oldimage: item.floorPlanImage,
  //             }))
  //           );
  //           setLoading(false);
  //         }
  //       }
  //     });
  // };

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const { tkn, setTkn } = useContext(UserContext);
  const [namee, setNamee] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [msg, setMsg] = useState("");
  const [wait, setWait] = useState(false);
  const [error, setError] = useState(0);

  const { snack, setSnack } = useContext(SnackbarContext);
  const { propCat, setPropCat, uid, setUId } = useContext(UserContext);
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

      // formData.message = msg;
      axios
        .post("/user/contact_enquiry", formData, {
          headers: { tkn: token },
        })
        .then((res) => {
          if (res.data.status === 1) {
            setWait(false);

            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
              direction: "center",
            });
            setOpenForm(false);
          } else {
            setWait(false);

            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
              direction: "center",
            });
            setOpenForm(true);
          }
        });
    }
  };

  return (
    <div style={{ textAlign: "start" }}>
      <Grid container justifyContent="center" alignItems="flex-start">
       
        <Grid item xs={10}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Container maxWidth="lg">
                <Box sx={{ mt: 1, backgroundColor: "", mb: 10 }}>
                  {data &&
                    data.map((i) => {
                      return (
                        <div>
                          <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            mt={8}
                          >
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              item
                              xl={12}
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                            >
                                   {i.rent_sale !==0 && 
                              <Grid
                                sx={{
                                  backgroundColor: "#6178b6",
                                  width: 150,
                                  height: 36,
                                  borderRadius: 2,
                                  // ml: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  display="block"
                                  gutterBottom
                                  sx={{ color: "white", textAlign: "center" }}
                                >
                                  {i.rent_sale &&
                                    i.rent_sale===1 && "FOR RENT"|| i.rent_sale===2 && "FOR SALE"}
                                </Typography>
                              </Grid> }
                            </Grid>
                            <ButtonBase onClick={(e) => upDateFavProperty(e)}>
                              <FavoriteIcon sx={{ mr: 2, color: "#ef0000" }} />
                            </ButtonBase>
                          </Grid>
                          <br />

                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Grid sm={12} md={9}>
                              <Typography
                                variant="h3"
                                // sx={{ textAlign: "start", marginTop: "2", ml: 1 }}
                              >
                                <b>{i.prop_title}</b>
                              </Typography>
                            </Grid>
                            <Grid sm={12} md={3}>
                              <Typography variant="h4" sx={{ mr: "" }}>
                                {/* Intl.NumberFormat('en-IN', { style: 'decimal' }) */}
                                <b>
                                  {" "}
                                  INR{" "}
                                  {new Intl.NumberFormat("en-IN", {
                                    style: "decimal",
                                  }).format(i.prop_price)}
                                </b>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                      <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          item
                          xl={9}
                          lg={9}
                          md={9}
                          sm={12}
                          xs={12}
                        >
                          {/* /////////////////////////////////////// */}
                          <Typography
                            variant="subtitle2"
                            sx={{ textAlign: "start", mt: 2, ml: 1 }}
                          >
                            {" "}
                            <LocationOnSharpIcon sx={{ fontSize: "medium" }} />
                            {i.city}
                          </Typography>
                          </Grid>
                          <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          item
                          xl={3}
                          lg={3}
                          md={3}
                          sm={12}
                          xs={12}
                        >
                   
                        <Typography variant="body2" gutterBottom  style={{color:theme.palette.secondary.main   }}>
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
                        </Grid>
                          <br />
                          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                          <div style={{ textAlign: "start" }}>
                            {loading == false && (
                              <>
                                {/* {JSON.stringify(data[0].images.split(",")[0])} */}
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={6}>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        paddingBottom: "70%",
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        src={`/images/properties/${
                                          data[0].prop_images.split(",")[0]
                                        }`}
                                        onClick={() => {
                                          handleImageClick1();
                                          console.log();
                                        }}
                                        style={{
                                          objectFit: "cover",
                                          position: "absolute",
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "8px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Lightbox
                                    open={open}
                                    close={() => setOpen(false)}
                                    slides={[
                                      ...images.slice().map((src) => ({
                                        src: `/images/properties/${src}`,
                                      })),
                                    ]}
                                  />

                                  <Grid item xs={12} md={6}>
                                    {data[0].prop_images &&
                                    data[0].prop_images.split(",").length > 4 ? (
                                      <>
                                        <Grid container spacing={2}>
                                          {data[0].prop_images &&
                                            data[0].prop_images
                                              .split(",")
                                              .slice(1, 4)
                                              .map((i, index) => (
                                                <Grid
                                                  item
                                                  xs={3}
                                                  md={6}
                                                  lg={6}
                                                  key={index}
                                                >
                                                  <Box
                                                    sx={{
                                                      width: "100%",
                                                      paddingBottom: "70%",
                                                      position: "relative",
                                                    }}
                                                  >
                                                    <img
                                                      src={`/images/properties/${i}`}
                                                      // alt={images[index].alt}
                                                      onClick={() => {
                                                        handleImageClick(index);
                                                        console.log(index);
                                                      }}
                                                      style={{
                                                        objectFit: "cover",
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                  </Box>
                                                </Grid>
                                              ))}
                                          <Grid
                                            item
                                            xs={3}
                                            md={6}
                                            lg={6}
                                            key={4}
                                          >
                                            <Box
                                              sx={{
                                                width: "100%",
                                                paddingBottom: "70%",
                                                position: "relative",
                                              }}
                                            >
                                              <img
                                                src={`/images/properties/${
                                                  data[0].prop_images.split(",")[4]
                                                }`}
                                                // alt={images[4].alt}
                                                style={{
                                                  objectFit: "cover",
                                                  position: "absolute",
                                                  width: "100%",
                                                  height: "100%",
                                                  borderRadius: "8px",
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <Box
                                                onClick={() => {
                                                  handleImageClick(3);
                                                  console.log(3);
                                                }}
                                                sx={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  bottom: 0,
                                                  right: 0,
                                                  backgroundColor:
                                                    "rgba(0, 0, 0, 0.7)",
                                                  borderRadius: "8px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                <Typography
                                                  variant="h2"
                                                  sx={{
                                                    color: "#fff",
                                                    fontSize: "4rem",
                                                    "@media (max-width: 960px)":
                                                      {
                                                        fontSize: "3rem",
                                                      },
                                                    "@media (max-width: 600px)":
                                                      {
                                                        fontSize: "2rem",
                                                      },
                                                  }}
                                                >
                                                  {" "}
                                                  +
                                                  {data[0].prop_images.split(",")
                                                    .length - 4}
                                                </Typography>
                                              </Box>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ) : (
                                      <>
                                        {/* {images.length-1} */}
                                        <Grid container spacing={2}>
                                          {data[0].prop_images &&
                                            data[0].prop_images
                                              .split(",")
                                              .slice(1, 4)
                                              .map((i, index) => (
                                                <Grid
                                                  item
                                                  xs={3}
                                                  md={6}
                                                  lg={6}
                                                  key={index}
                                                >
                                                  <Box
                                                    sx={{
                                                      width: "100%",
                                                      paddingBottom: "70%",
                                                      position: "relative",
                                                    }}
                                                  >
                                                    <img
                                                      src={`/images/properties/${i}`}
                                                      // alt={images[index].alt}
                                                      onClick={() => {
                                                        handleImageClick(index);
                                                        console.log(index);
                                                      }}
                                                      style={{
                                                        objectFit: "cover",
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                  </Box>
                                                </Grid>
                                              ))}
                                        </Grid>
                                      </>
                                    )}

                                    {open1 && (
                                      <Lightbox
                                        open={open1}
                                        close={() => setOpen1(false)}
                                        slides={final.map((src, index) => ({
                                          src: `/images/properties/${src}`,
                                          index,
                                        }))}
                                      />
                                    )}
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </div>
                          <br/>
                    <br/>
                          <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  mt={1}
>
  <Grid sx={{ padding: "3px", mt: 1 }}>
    {/* {data.article_cat_name} */}
    <b>Property Listed By: </b>
    {(i.user_ids === 0 && "BHR Groups") ||
      (agentData.role === 1 && "Owner") ||
      (agentData.role === 2 && "Agent") ||
      (agentData.role === 3 && "Builder")}
  </Grid>
  <Grid container item xs={12} sm={6} direction="row" justifyContent="flex-end" alignItems="center">
    <Button
      variant="contained"
      size="medium"
      sx={{
        backgroundColor: "#060847",
        "&:hover": { backgroundColor: "#060847" },
      }}
      onClick={() => {
        setPropid(i.id);
        user
          ? handleOpenForm(i.id)
          : setEnqOPen(true);
      }}
    >
      Enquiry Now
    </Button>
  </Grid>
</Grid>

                        </div>
                      );
                    })}
                </Box>
              </Container>

              <div style={{ backgroundColor: "#ECF0F1" }}>
                <Container maxWidth="lg">
                 

                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  {matches ? (
                    <>
                      {agentData &&
                        (agentData.role === 2 || agentData.role === 3) && (
                          <Grid item lg={12} xl={12}>
                            <Typography
                              variant="h4"
                              sx={{ color: "#060847", mt: "" }}
                            >
                              {(agentData.role === 0 && "BHR Groups ") ||
                                (agentData.role === 1 && "Owner ") ||
                                (agentData.role === 2 && "Agent ") ||
                                (agentData.role === 3 && "Builder ")}
                              Details
                            </Typography>
                            <br />
                            <Card
                              sx={{
                                backgroundColor: "white",
                                height: "Auto",
                                width: "100%",
                                borderRadius: 2,
                                // mt: 5,
                              }}
                            >
                              <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                pl={1}
                                margin={2}
                              >
                                <Grid item lg={3} md={3}>
                                  {agentData.profile_image ? (
                                    <Avatar
                                      alt={agentData.user_name.toUpperCase()}
                                      src={`/images/profiles/${agentData.profile_image}`}
                                      sx={{ width: 100, height: 100 }}
                                    />
                                  ) : (
                                    <AccountCircleIcon
                                    // sx={{ width: "45%", height: "45%" }}
                                    />
                                  )}
                                </Grid>
                                <br />
                                <Grid item lg={3} md={3}>
                                  <Typography variant="body1">
                                    <b> Name: </b>
                                    <br />
                                    {agentData.user_name}
                                  </Typography>
                                </Grid>
                                <Grid item lg={3} md={3}>
                                  <Typography variant="body1">
                                    <b> Company:</b> <br />
                                    {agentData.company_name}
                                  </Typography>
                                </Grid>
                                {agentData.role === 2 ? (
                                  <>
                                    <Grid item lg={3} md={3}>
                                      <Typography variant="body1">
                                        <b> Designation:</b>
                                        <br /> {agentData.designation}
                                      </Typography>
                                    </Grid>
                                  </>
                                ) : (
                                  <> </>
                                )}

                              
                              </Grid>
                            </Card>
                            <br />
                            <br />
                            <br />
                          </Grid>
                        )}
                    </>
                  ) : (
                    <>
                      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                      {agentData &&
                        (agentData.role === 2 || agentData.role === 3) && (
                          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Typography
                              variant="h4"
                              sx={{ color: "#060847", mt: "" }}
                            >
                              {(agentData === 0 && "BHR Groups ") ||
                                (agentData.role === 1 && "Owner ") ||
                                (agentData.role === 2 && "Agent ") ||
                                (agentData.role === 3 && "Builder ")}
                              Details
                            </Typography>
                            <br />
                            <Card
                              sx={{
                                backgroundColor: "white",
                                height: "Auto",
                                width: "100%",
                                borderRadius: 2,
                                // mt: 5,
                              }}
                            >
                              <Grid margin={2}>
                                <Grid
                                  container
                                  direction="column"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                >
                                  {agentData.profile_image ? (
                                    <Avatar
                                      alt={agentData.user_name.toUpperCase()}
                                      src={`/images/profiles/${agentData.profile_image}`}
                                      sx={{ width: 100, height: 100 }}
                                    />
                                  ) : (
                                    <AccountCircleIcon
                                    // sx={{ width: "45%", height: "45%" }}
                                    />
                                  )}
                                </Grid>
                                <br />
                                <Grid
                                  container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="flex-start"
                                  pl={4}
                                  // textAlign={'center'}
                                >
                                  <Typography variant="body1">
                                    <b> Name: </b> {agentData.user_name}
                                  </Typography>
                                  <Typography variant="body1">
                                    <b>Company: </b> {agentData.company_name}
                                  </Typography>

                                  {agentData.role === 2 ? (
                                    <>
                                      <Grid item lg={3} md={3}>
                                        <Typography variant="body1">
                                          <b> Designation:</b>
                                          <br /> {agentData.designation}
                                        </Typography>
                                      </Grid>
                                    </>
                                  ) : (
                                    <> </>
                                  )}

                                  {/* <Typography variant="body1">
                            <b> Website: </b>{agentData.website}
                            </Typography> */}
                                </Grid>
                              </Grid>
                            </Card>
                            <br />
                            <br />
                            <br />
                          </Grid>
                        )}
                    </>
                  )}
                  {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{ textAlign: "start" }}
                  >
                    {data &&
                      data.map((i) => {
                        return (
                          <Grid mt={""}>
                            <Typography variant="h4" sx={{ color: "#060847" }}>
                              Description
                            </Typography>
                            <br />

                            <Card
                              sx={{
                                backgroundColor: "white",
                                heigt: "Auto",
                                width: "100%",
                                borderRadius: 2,
                                mt: "",
                              }}
                            >
                              <Grid ml={""}>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  sx={{ m: 3 }}
                                >
                                  {i.prop_desc}
                                </Typography>
                              </Grid>
                            </Card>
                            <br />
                            <br />
                            <br />
                            <Typography
                              variant="h4"
                              sx={{ color: "#060847", mt: "" }}
                            >
                              Overview
                            </Typography>
                            <br />
                            <Card
                              sx={{
                                backgroundColor: "white",
                                heigt: "Auto",
                                width: "100%",
                                borderRadius: 2,
                                // mt: 2,
                                pb: 2,
                                pr: 1,
                              }}
                            >
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                mt={2}
                                ml={3}
                              >
                                {i["id"] ? (
                                  <Grid
                                    container
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={3}
                                    xl={3}
                                    sx={{ textAlign: "center", mt: 2 }}
                                  >
                                    <Card sx={{ height: 50 }}>
                                      <HouseIcon
                                        sx={{ fontSize: 50, color: "#060847" }}
                                      />
                                    </Card>
                                    <Grid ml={2}>
                                      Id <br />
                                      <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{ mt: 1 }}
                                      >
                                        <b>{i.prop_id} </b>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  ""
                                )}

                                {data[0]["prop_cat"] ? (
                                  <>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {/* <Grid> */}{" "}
                                        <BusinessIcon
                                          sx={{
                                            fontSize: 50,
                                            color: "#060847",
                                          }}
                                        />
                                        {/* </Grid> */}
                                      </Card>
                                      <Grid ml={2}>
                                        Category <br />
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b>{i.prop_cat}</b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}

                                {data[0]["no_of_bedrooms"] ? (
                                  <>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {/* <Grid> */}{" "}
                                        <BedIcon
                                          sx={{
                                            fontSize: 50,
                                            color: "#060847",
                                          }}
                                        />
                                        {/* </Grid> */}
                                      </Card>
                                      <Grid ml={2}>
                                        Bedrooms
                                        <br />
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b>{i.no_of_bedrooms}</b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}

                                {data[0]["no_of_bathrooms"] ? (
                                  <>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {" "}
                                        <Grid>
                                          {" "}
                                          <ShowerIcon
                                            sx={{
                                              fontSize: 50,
                                              color: "#060847",
                                            }}
                                          />{" "}
                                        </Grid>
                                      </Card>
                                      <Grid ml={2}>
                                        {" "}
                                        Bathrooms
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b>{i.no_of_bathrooms}</b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}
                                {/* <Grid
                            container
                            direction="row"
                            // justifyContent="space-evenly"
                            alignItems="center"
                            // mt={2}
                            ml={3}
                            mb={2}
                          > */}

                                {data[0]["no_of_garages"] ? (
                                  <>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {" "}
                                        <Grid>
                                          {" "}
                                          <ElectricCarIcon
                                            sx={{
                                              fontSize: 50,
                                              color: "#060847",
                                            }}
                                          />{" "}
                                        </Grid>
                                      </Card>
                                      <Grid ml={2}>
                                        {" "}
                                        Garages
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b>{i.no_of_garages}</b>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}

                              
                                  {i.built_area !== "" &&
                                    i.built_area !== undefined &&
                                    i.built_area !== "undefined" && (
                                      <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {" "}
                                        <Grid>
                                          {" "}
                                          <ApartmentIcon
                                            sx={{ fontSize: 50, color: "#060847" }}
                                          />{" "}
                                        </Grid>
                                      </Card>
                                      <Grid ml={2}>
                                        Built Area
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b>{i.built_area} </b>
                                        </Typography>
                                      </Grid>
                                      </Grid>
                                    )}{" "}
                             {i.land_area && i.land_area!=="undefined undefined" &&  <Grid
                                  container
                                  item
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={3}
                                  xl={3}
                                  mt={2}
                                >
                                  <Card sx={{ height: 50 }}>
                                    {" "}
                                    <Grid>
                                      {" "}
                                      <AspectRatioIcon
                                        sx={{ fontSize: 50, color: "#060847" }}
                                      />{" "}
                                    </Grid>
                                  </Card>
                                  <Grid ml={2}>
                                    Land Area{" "}
                                    <Typography
                                      variant="body2"
                                      gutterBottom
                                      sx={{ mt: 1 }}
                                    >
                                      <b> {parseInt(i.land_area)} sqft.</b>
                                    </Typography>
                                  </Grid>
                                </Grid>
} 
                               
                                {data[0]["year_of_built"] ? (
                                  <>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                      mt={2}
                                    >
                                      <Card sx={{ height: 50 }}>
                                        {" "}
                                        <Grid>
                                          {" "}
                                          <UTurnLeftIcon
                                            sx={{
                                              fontSize: 50,
                                              color: "#060847",
                                            }}
                                          />{" "}
                                        </Grid>
                                      </Card>
                                      <Grid ml={2}>
                                        Year Built{" "}
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                          sx={{ mt: 1 }}
                                        >
                                          <b> {parseInt(i.year_of_built)}</b>
                                        </Typography>
                                      </Grid>
                                      {/* </Grid> */}
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Grid>
                            </Card>
                            <br />
                            <br />
                            <br />

                            <Typography
                              variant="h4"
                              sx={{ color: "#060847", mt: "" }}
                            >
                              Address
                            </Typography>
                            <br />
                            <Card
                              sx={{
                                backgroundColor: "white",
                                height: "Auto",
                                width: "100%",
                                borderRadius: 2,
                                mt: "",
                              }}
                            >
                              <Grid
                                m={2}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid item xs={6} md={1.5}>
                                  <Typography
                                    variant="subtitle1"
                                    style={{ color: "", textAlign: "justify" }}
                                  >
                                    <b> Address </b>
                                  </Typography>
                                </Grid>

                                <Grid item xs={6} md={10}>
                                  <Typography
                                    variant="subtitle1"
                                    style={{ color: "" }}
                                  >
                                    {i.city}
                                  </Typography>
                                </Grid>
                                <br />

                                <Grid item xs={6} md={1.5}>
                                  <Typography
                                    variant="subtitle1"
                                    style={{ color: "", textAlign: "justify" }}
                                  >
                                    <b> State </b>
                                  </Typography>
                                </Grid>

                                <Grid item xs={6} md={10}>
                                  <Typography
                                    variant="subtitle1"
                                    style={{ color: "" }}
                                  >
                                    {i.state}
                                  </Typography>
                                </Grid>
                                <br />

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
                              </Grid>
                            </Card>
                            <br />
                            <br />
                            <br />

                            <Typography
                              variant="h4"
                              // mt={5}
                              style={{ color: "#060847" }}
                            >
                              Details
                            </Typography>
                            <br />

                            {matches ? (
                              <>
                                <Card
                                  sx={{
                                    backgroundColor: "white",
                                    height: "Auto",
                                    width: "100%",
                                    borderRadius: 2,
                                    // mt: 1,
                                  }}
                                >
                                  <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    // m={1}
                                    p={3}
                                  >
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          Property ID &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp;
                                        </b>
                                        {i.prop_id}
                                      </Typography>
                                    </Grid>

                                    <br />
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          Property Type &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp; &nbsp;
                                        </b>
                                        {i.prop_cat}
                                      </Typography>
                                    </Grid>
                                    <br />

                                    {data[0]["prop_facing"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Facing &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp;
                                            </b>
                                            {i.prop_facing}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["no_of_rooms"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Rooms &nbsp;&nbsp; &nbsp; &nbsp;
                                              &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            </b>
                                            {i.no_of_rooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {data[0]["no_of_bathrooms"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Bathrooms &nbsp;&nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp;
                                            </b>
                                            {i.no_of_bathrooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {i.built_area !== "" &&
                                      i.built_area !== undefined &&
                                      i.built_area !== "undefined" && (
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Built Area &nbsp;&nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp;
                                            </b>
                                            {i.built_area} 
                                          </Typography>
                                        </Grid>
                                      )}

                                    <br />
                                    {data[0]["no_of_garages"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Garages &nbsp;&nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp;
                                            </b>
                                            {i.no_of_garages}
                                          </Typography>
                                        </Grid>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {/* ============== */}
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          Price &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp;
                                        </b>
                                        {new Intl.NumberFormat("en-IN", {
                                          style: "decimal",
                                        }).format(i.prop_price)}
                                      </Typography>
                                    </Grid>
                                    <br />
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          {" "}
                                          Property Status &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp;{" "}
                                        </b>
                                        {i.rent_sale===1 && "Rent" || i.rent_sale===2 && "Sale"}
                                      </Typography>
                                    </Grid>
                                    <br />
                                    {data[0]["no_of_bedrooms"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Bedrooms &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp;
                                            </b>
                                            {i.no_of_bedrooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {data[0]["year_of_built"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Year Built &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp;
                                            </b>
                                             {parseInt(i.year_of_built)}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  {i.land_area && i.land_area!=="undefined undefined" &&   <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          Land Area &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp;
                                        </b>
                                        {parseInt(i.land_area)} 
                                      </Typography>
                                    </Grid>
                      }
                                    <br />
                                 
                                  </Grid>
                                </Card>
                              </>
                            ) : (
                              <>
                                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <Card
                                  sx={{
                                    backgroundColor: "white",
                                    height: "Auto",
                                    width: "100%",
                                    borderRadius: 2,
                                    // mt: 1,
                                    p: 2,
                                  }}
                                >
                                  <TableContainer>
                                    {data[0]["prop_id"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{
                                              borderBottom: "none",
                                              width: 97,
                                            }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b>Property ID</b>
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {i.prop_id}{" "}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["prop_facing"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b>Facing</b>
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {i.prop_facing}{" "}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["prop_price"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b> Price </b>{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.prop_price}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["land_area"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b> Land Area </b>{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.land_area}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["no_of_bathrooms"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b>Bathrooms</b>
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {i.no_of_bathrooms}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["year_of_built"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              <b> Year Built </b>{" "}
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.year_of_built}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["no_of_bedrooms"] ? (
                                      <>
                                        {" "}
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b> Bedrooms </b>{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {i.no_of_bedrooms}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["prop_cat"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b>Property Type </b>
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {i.prop_cat}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["built_area"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {" "}
                                              <b> Built Area </b>{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.built_area} {" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["rent_sale"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b> Property Status </b>
                                            </Typography>{" "}
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.rent_sale===1 && "Rent" || i.rent_sale==="Sale"}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["no_of_rooms"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b>Rooms </b>
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {i.no_of_rooms}{" "}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["no_of_garages"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              <b> Garages </b>{" "}
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.no_of_garages}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                   

                                    {/* /////////////////////////////////////////////// */}

                                    {/* {data[0]["garages"] ? (
                                <>
                                
                                </>
                              ) : (
                                ""
                              )} */}

                                    {/* ////////////////////////////////////////////////////// */}
                                  </TableContainer>
                                </Card>
                              </>
                            )}

                            <br />
                            <br />
                            <br />

                            {data[0]["amenities"] ? (
                              <>
                                <Grid>
                                  <Typography
                                    variant="h4"
                                    // mt={5}
                                    sx={{ color: "#060847" }}
                                  >
                                    Amenities
                                  </Typography>
                                  <br />
                                  <Card
                                    sx={{
                                      backgroundColor: "white",
                                      height: "Auto",
                                      width: "100%",
                                      borderRadius: 2,
                                      // mt: 1,
                                    }}
                                  >
                                    <Grid
                                      container
                                      direction="row"
                                      alignItems="flex-start"
                                      m={2}
                                    >
                                      {data &&
                                        data[0].amenities.split(",").map((i) => {
                                          {
                                            JSON.stringify(
                                              data[0].amenities.split(",")
                                            );
                                          }

                                          return (
                                            <Grid
                                              sx={{ fontSize: 17, m: 2, pl: 3 }}
                                              container
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                              lg={2}
                                              xl={2}
                                            >
                                              <DoneIcon /> {i}
                                            </Grid>
                                          );
                                        })}
                                    </Grid>
                                  </Card>
                                </Grid>
                                <br />
                                <br />
                                <br />
                              </>
                            ) : (
                              ""
                            )}

{data[0]["video_url"] ? (
                        <>
                          <Typography
                            variant="h4"
                            // mt={5}
                            sx={{ color: "#060847" }}
                          >
                            Video
                          </Typography>
                          <br />
                          {matches ? <>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              height: "auto",
                              width: "50%",
                              borderRadius: 2,
                              // mt: 1,
                            }}
                          >
                            <Grid sx={{ m: 1, p: 1 }}>
                              {" "}
                              <ReactPlayer
                                url={i.video_url}
                                height={"20vw"}
                                width={"100%"}
                              />
                            </Grid>
                          </Card>
                          </> : <>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              // height: "auto",
                              // width: "100%",
                              borderRadius: 2,
                              // mt: 1,
                            }}
                          >
                            <Grid sx={{ m: 1, p: 1 }}>
                              {" "}
                              <ReactPlayer
                                url={i.video_url}
                                // height={"20vw"}
                                width={"100%"}
                              />
                            </Grid>
                          </Card>
                          
                          </>}
                          <br />
                          <br />
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                            {/* {JSON.stringify(items[0].id)} */}
                            {items.length !==0 &&   (
                              <>
                                {" "}
                                <Typography
                                  variant="h4"
                                  // mt={5}
                                  sx={{ color: "#060847" }}
                                >
                                  Floor Plans
                                </Typography>
                                <br />
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  // spacing={4}
                                >
                                  {items &&
                                    items.map((i, index) => (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                      >
                                        {i.floor_name === "" ? (
                                          ""
                                        ) : (
                                          //  <Card></Card>
                                          <Accordion
                                            expanded={expanded === index}
                                            onChange={handleChange(index)}
                                          >
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-controls="panel1bh-content"
                                              id="panel1bh-header"
                                            >
                                              <Typography
                                                sx={{
                                                  width: "33%",
                                                  flexShrink: 0,
                                                }}
                                              >
                                                <b> {i.floor_name}</b>
                                              </Typography>
                                              
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <img
                                                src={i.floor_img}
                                                height="100%"
                                                width="100%"
                                              />
                                            </AccordionDetails>
                                          </Accordion>
                                        )}
                                      </Grid>
                                    ))}
                                </Grid>
                                <br />
                                <br />
                                <br />
                              </>
                           
                            )}
                            {data[0]["tour_url"] ? (
                        <>
                          <Typography
                            variant="h4"
                            // mt={5}
                            sx={{ color: "#060847" }}
                          >
                            Virtual Tour
                          </Typography>
                          <br />
                          {matches ? <>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              height: "auto",
                              width: "50%",
                              borderRadius: 2,
                              // mt: 1,

                              mb: 5,
                            }}
                          >
                            <Grid sx={{ m: 1, p: 1 }}>
                              {" "}
                              <ReactPlayer
                                url={i.tour_url}
                                height={"20vw"}
                                width={"100%"}
                              />
                            </Grid>
                          </Card>
                          </> : <>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              // height: "auto",
                              // width: "50%",
                              borderRadius: 2,
                              // mt: 1,

                              mb: 5,
                            }}
                          >
                            <Grid sx={{ m: 1, p: 1 }}>
                              {" "}
                              <ReactPlayer
                                url={i.tour_url}
                                // height={"20vw"}
                                width={"100%"}
                              />
                            </Grid>
                          </Card>

                          </>}
                        </>
                      ) : (
                        ""
                      )}

{data[0]["broucher"] ? (
                        <>
                          <Typography variant="h4" sx={{ color: "#060847" }}>
                          Broucher   
                          </Typography>
                         
                          <br />
                          <Grid item sm={12} md={3}>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              // height: "auto",
                              // width: "100%",
                              borderRadius: 2,
                              mb: 5,
                            }}
                          >
                            

 <Grid
  container
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-start"
 sx={{ m:2 }}
 >
<Grid  ml={5.5}>
<img src={DOC} height={150} width={150}/>
</Grid>
<Grid ml={5}>
                              <a
                                href={`/images/properties/${i.broucher}`}
                                target="_blank"
                              >
                               
                                <Button variant="contained" size="medium" sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}>
                                  View Document
                                </Button>
                              </a>
                            </Grid>
                            </Grid>
                          </Card>
                          </Grid>
                        </>
                      ) : (
                        ""
                      )}

                            {/* ================ */}
                        
                            <br />
                            <br />
                          </Grid>
                        );
                      })}
                  </Grid>
                  <br />
                  <br />
                  <Dialog open={enqOpen} onClose={() => setEnqOPen(false)}>
                    <DialogContent>
                      <Box m={3} p={3}>
                      <Grid
  container
  direction="column"
  alignItems="center"
  spacing={3}
>
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
                
                </Container>
              </div>
            </>
          )}
            <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm">
          
        <DialogContent>
          <Box m={4}>
            <form onSubmit={contactNow}>
              <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" style={{ color: "#060847" }} className="text-center" gutterBottom>
                    Enquiry Form
                  </Typography>
                  <hr style={{ color: "#060847" }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" style={{ color: "#060847", pb: 1 }}>
                    Please fill out the form below with your information.
                  </Typography>
                </Grid>
                </Grid>
                <Box mt={3}>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
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
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{
                      m: 2,
                      mt:5,
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
        </Grid>
      </Grid>
    </div>
  );
};
