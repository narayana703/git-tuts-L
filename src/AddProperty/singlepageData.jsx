import React from "react";
import react, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
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
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useParams } from "react-router-dom";
import axios from "axios";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import HouseIcon from "@mui/icons-material/House";
import BusinessIcon from "@mui/icons-material/Business";
import BedIcon from "@mui/icons-material/Bed";
import DoneIcon from "@mui/icons-material/Done";
import ShowerIcon from "@mui/icons-material/Shower";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Avatar from "@mui/material/Avatar";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import Bhrfotter from "../assets/bhrfooter.png";
import { UserContext, SnackbarContext } from "../components/UserContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Swipe } from "@mui/icons-material";
import { Carousel } from "bootstrap";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import StarsIcon from "@mui/icons-material/Stars";
import { Loading } from "../components/Loading";
import DOC from '../assets/DOC.jpg'
import { Helmet } from "react-helmet";
export default function Singlepropartylist() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [slideImages, setSlideImages] = useState();
  const [final, setFinal] = useState([]);
  // const [expanded, setExpanded] = useState(false);
  const [title,setTitle] = useState("Fetching Artilcle Details..  | Buy or Sell or Rent Property Online")
  const [name, setName] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [saleprice, setsaleprice] = useState("");
  const [DownPayment, setDownPayment] = useState("");
  const [Years, setYears] = useState("");
  const [Interest, setInterest] = useState("");
  const [data, setData] = useState();
  const [images, setImages] = useState();
  const [loading, setLoading] = useState();
  const [agentData, setAgentData] = useState([]);
  const [agentImage, setAgentImage] = useState([]);
  const { admin } = useContext(UserContext);
  const { tkn } = useContext(UserContext);
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

  const getAgentData = async (agent) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("agent_id", agent);

    console.log(id, "55555555555555555");
    await axios
      .post("/admin/get_single_agent", formdata)
      .then(function (response) {
        console.log(response.data, "109999999");
        if (response.data.status === 1) {
          setAgentData(response.data.data[0]);
          setLoading(false);
          setAgentImage(response.data.data[0].images);
        }
      });
  };
  const upDateProperty = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("id", id.id);

    console.log(id.id, "55555555555555555");
    await axios
      .post("/admin/get_single_property_view", formdata)
      .then(function (response) {
        console.log(response.data, "single property");
        if (response.data.status === 1) {
          setData(response.data.data);
          setTitle(response.data.data[0].title+" | Buy or Sell or Rent Property Online")
          console.log(response.data.data[0].user_id, "====id");
          getAgentData(response.data.data[0].user_id);
          console.log()
          setLoading(false);
          setImages(response.data.data[0]?.images?.split(","));
        }
      });
  };

  // const number = "";
  // const currency = new Intl.NumberFormat("en-IN", { style: "decimal" }).format(
  //   number
  // );
  // console.log(currency, "lllllllllllllllllllllllllllll");

  // this.state.open = true;
  let id = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    upDateProperty();
    upDateProperty1();
    // getdata();
  }, []);
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  // const handleChange = (panel) => (e) => {
  //   setExpanded(e ? panel : false);
  // };

  // const upDateProperty = async () => {
  //   setLoading(true);
  //   const formdata = new FormData();
  //   formdata.append("id", id.id);
  //   formdata.append("aid", admin.admin_id);
  //   console.log(id.id, "55555555555555555");
  //   await axios
  //     .post("/admin/get_single_property", formdata, {
  //       headers: { tkn: tkn },
  //     })
  //     .then(function (response) {
  //       console.log(response.data, "111111111111111111111");
  //       if (response.data.status === 1) {
  //         setData(response.data.data);
  //         setLoading(false);
  //         setImages(response.data.data[0]?.images?.split(","));
  //       }
  //     });
  // };

  const handleImageClick = (index) => {
    console.log(index + 1, "sssssssssssssssssssssssssssss");
    console.log(typeof index + 1, "type of index+1");
    setClickedIndex(index + 1);
    // var slideImages = data.images.split(",");
    var slideImages = data[0].images.split(",");
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



  const upDateProperty1 = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("id", id.id);
    console.log(id.id, "7777777777777777777777777");
    await axios
      .post(
        "/admin/get_floor_plans",
        formdata
        // , {
        //   headers: { tkn: tkn },
        // }
      )
      .then(function (response) {
        console.log(response.data.data, "22222222222222222222222");
        if (response.data.status === 1) {
          setData1(response.data.data);
          setLoading(false);

          if (response.data.data.length > 0) {
            setItems(
              response.data.data.map((item) => ({
                id: item.id,
                floor_name: item.floorName,
                floor_size: item.floorSize,
                floor_bedroom: item.floorBedroom,
                floor_bathroom: item.floorBathroom,
                floor_desc: item.floorDescription,
                floor_img: `/images/properties/${item.floorPlanImage}`,
                oldimage: item.floorPlanImage,
              }))
            );
            setLoading(false);
            handleClick()
          }
        }
      });
  };

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <div style={{ textAlign: "start" }}>
       <Helmet>
                
                <title>{title}</title>
                 
            </Helmet>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item xs={1}>
          <LeftDrawer />
        </Grid>
        <Grid item xs={11}>
          {loading ? <Loading />:(<>
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
                          {/* <Grid
                            sx={{
                              backgroundColor: "#ff6935",
                              width: 150,
                              height: 37,
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              display="block"
                              gutterBottom
                              sx={{ color: "white", ml: 2 }}
                            >
                              {i.feature && "FEATURED"}
                            </Typography>{" "}
                          </Grid> */}
                          <Grid
                            sx={{
                              backgroundColor: "#6178b6",
                              width: 150,
                              height: 36,
                              borderRadius: 2,

                            }}
                          >
                            <Typography
                              variant="h6"
                              display="block"
                              gutterBottom
                              sx={{ color: "white", textAlign: "center" }}
                            >
                              {i.property_status && i.property_status.toUpperCase()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <br />

                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Grid>
                          <Typography
                            variant="h3"
                          // sx={{ textAlign: "start", marginTop: "2", ml: 1 }}
                          >
                            <b>{i.title}</b>
                          </Typography>
                        </Grid>
                        <Grid sx={{ mr: "" }}>
                          <Typography variant="h4" sx={{ mr: "" }}>
                            {/* Intl.NumberFormat('en-IN', { style: 'decimal' }) */}
                            <b>
                              {" "}
                              INR{" "}
                              {new Intl.NumberFormat("en-IN", {
                                style: "decimal",
                              }).format(i.price)}
                            </b>
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* /////////////////////////////////////// */}
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "start", mt: 2, ml: 1 }}
                      >
                        {" "}
                        <LocationOnSharpIcon sx={{ fontSize: "medium" }} />
                        {i.address}
                      </Typography>
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
                                    src={`/images/properties/${data[0].images.split(",")[0]
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
                                {data[0].images &&
                                  data[0].images.split(",").length > 4 ? (
                                  <>
                                    <Grid container spacing={2}>
                                      {data[0].images &&
                                        data[0].images
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
                                      <Grid item xs={3} md={6} lg={6} key={4}>
                                        <Box
                                          sx={{
                                            width: "100%",
                                            paddingBottom: "70%",
                                            position: "relative",
                                          }}
                                        >
                                          <img
                                            src={`/images/properties/${data[0].images.split(",")[4]
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
                                                "@media (max-width: 960px)": {
                                                  fontSize: "3rem",
                                                },
                                                "@media (max-width: 600px)": {
                                                  fontSize: "2rem",
                                                },
                                              }}
                                            >
                                              {" "}
                                              +
                                              {data[0].images.split(",")
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
                                      {data[0].images &&
                                        data[0].images
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
                          {i.user_id === 0 && "BHR Groups" || agentData.role === 1 && "Owner" || agentData.role === 2 && "Agent" || agentData.role === 3 && "Builder"}


                        </Grid> &nbsp;&nbsp;


                      </Grid>
                    </div>
                  );
                })}
            </Box>
          </Container>

          <div style={{ backgroundColor: "#ECF0F1" }}>
            <Container maxWidth="lg">
              <br /> <br />

              <br />
              <br />
              <br />
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
                          {agentData.role === 0 && "BHR Groups " || agentData.role === 1 && "Owner " || agentData.role === 2 && "Agent " || agentData.role === 3 && "Builder "}
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
                            {agentData.role === 2 ?
                              <>
                                <Grid item lg={3} md={3}>
                                  <Typography variant="body1">
                                    <b> Designation:</b>
                                    <br /> {agentData.designation}
                                  </Typography>
                                </Grid>
                              </> : <> </>}

                            {/* <Grid item lg={3} md={3}>
                            <Typography variant="body1">
                            <b> Website:</b> <br/>{agentData.website}
                            </Typography>
                            </Grid> */}
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
                          {agentData === 0 && "BHR Groups " || agentData.role === 1 && "Owner " || agentData.role === 2 && "Agent " || agentData.role === 3 && "Builder "}
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

                              {agentData.role === 2 ?
                              <>
                                <Grid item lg={3} md={3}>
                                  <Typography variant="body1">
                                    <b> Designation:</b>
                                    <br /> {agentData.designation}
                                  </Typography>
                                </Grid>
                              </> : <> </>}

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
                              {i.desc}
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
                                    <b>{i.id} </b>
                                  </Typography>
                                </Grid>
                              </Grid>
                            ) : (
                              ""
                            )}

                            {data[0]["property_type"] ? (
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
                                      sx={{ fontSize: 50, color: "#060847" }}
                                    />
                                    {/* </Grid> */}
                                  </Card>
                                  <Grid ml={2}>
                                    Type <br />
                                    <Typography
                                      variant="body2"
                                      gutterBottom
                                      sx={{ mt: 1 }}
                                    >
                                      <b>{i.property_type}</b>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              ""
                            )}

                            {data[0]["bedrooms"] ? (
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
                                      sx={{ fontSize: 50, color: "#060847" }}
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
                                      <b>{i.bedrooms}</b>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              ""
                            )}

                            {data[0]["bathrooms"] ? (
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
                                        sx={{ fontSize: 50, color: "#060847" }}
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
                                      <b>{i.bathrooms}</b>
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

                            {data[0]["bathrooms"] ? (
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
                                        sx={{ fontSize: 50, color: "#060847" }}
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
                                      <b>{i.garages}</b>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              ""
                            )}

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
                              {(i.size!== "" && i.size !== undefined && i.size !== "undefined") && 
                              <Grid ml={2}>
                                Built Area
                                <Typography
                                  variant="body2"
                                  gutterBottom
                                  sx={{ mt: 1 }}
                                >
                                  <b>{i.size} sqft.</b>
                                </Typography>
                              </Grid>}{" "}
                            </Grid>
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
                                  <b> {parseInt(i.land_size)} sqft.</b>
                                </Typography>
                              </Grid>
                            </Grid>

                            {data[0]["bathrooms"] ? (
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
                                        sx={{ fontSize: 50, color: "#060847" }}
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
                                      <b> {parseInt(i.year_built)}</b>
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
                          <Grid m={2}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            <Grid item xs={6} md={1.5}>
                              <Typography
                                variant="subtitle1"
                                style={{ color: "", textAlign: 'justify' }}
                              >
                                <b>  Address  </b>
                              </Typography>
                            </Grid>

                            <Grid item xs={6} md={10}>
                              <Typography
                                variant="subtitle1"
                                style={{ color: "" }}
                              >


                                {i.address}
                              </Typography>
                            </Grid>
                            <br />


                            <Grid item xs={6} md={1.5}>
                              <Typography
                                variant="subtitle1"
                                style={{ color: "", textAlign: 'justify' }}
                              >
                                <b> Country  </b>
                              </Typography>
                            </Grid>

                            <Grid item xs={6} md={10}>
                              <Typography
                                variant="subtitle1"
                                style={{ color: "" }}
                              >


                                {i.country}
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
                                        {i.id}
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
                                        {i.property_type}
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

                                    {data[0]["Rooms"] ? (
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
                                            {i.Rooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {data[0]["bathrooms"] ? (
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
                                            {i.bathrooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {i.size !== "" &&
                                      i.size !== undefined &&
                                      i.size !== "undefined" && (
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
                                            {i.size} sqft.
                                          </Typography>
                                        </Grid>
                                      )}

                                    <br />
                                    {data[0]["garages"] ? (
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
                                            {i.garages}
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
                                        }).format(i.price)}
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
                                        {i.property_status}
                                      </Typography>
                                    </Grid>
                                    <br />
                                    {data[0]["bedrooms"] ? (
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
                                            {i.bedrooms}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {data[0]["year_built"] ? (
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
                                            {i.year_built}
                                          </Typography>
                                        </Grid>
                                        <br />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Typography
                                        variant="subtitle1"
                                        style={{ color: "" }}
                                      >
                                        <b>
                                          Land Area &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                          &nbsp;
                                        </b>
                                        {parseInt(i.land_size)} sqft.
                                      </Typography>
                                    </Grid>
                                    <br />
                                    {data[0]["year_built"] ? (
                                      <>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Typography
                                            variant="subtitle1"
                                            style={{ color: "" }}
                                          >
                                            <b>
                                              Garage Area &nbsp; &nbsp; &nbsp;
                                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            </b>
                                            {i.Garage_area}
                                          </Typography>
                                        </Grid>
                                      </>
                                    ) : (
                                      ""
                                    )}
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
                                    {data[0]["id"] ? (
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
                                              {i.id}{" "}
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

                                    {data[0]["price"] ? (
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
                                              {i.price}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["land_size"] ? (
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
                                              {i.land_size}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["bathrooms"] ? (
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
                                              {i.bathrooms}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["year_built"] ? (
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
                                              {i.year_built}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["bedrooms"] ? (
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
                                              {i.bedrooms}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["property_type"] ? (
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
                                              {i.property_type}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["size"] ? (
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
                                              {i.size} sqft.{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["property_status"] ? (
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
                                              {i.property_status}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["Rooms"] ? (
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
                                              {i.Rooms}{" "}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["garages"] ? (
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
                                              {i.garages}{" "}
                                            </Typography>{" "}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {data[0]["Garage_area"] ? (
                                      <>
                                        <TableRow>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              <b> Garage Area </b>
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{ borderBottom: "none" }}
                                          >
                                            {" "}
                                            <Typography variant="subtitle1">
                                              {" "}
                                              {i.Garage_area}{" "}
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

                        {data[0]["feature"] ? (
                          <>
                            <Grid>
                              <Typography
                                variant="h4"
                                // mt={5}
                                sx={{ color: "#060847" }}
                              >
                                Features
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
                                    data[0].feature.split(",").map((i) => {
                                      {
                                        JSON.stringify(
                                          data[0].feature.split(",")
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

{data[0]["video"] ? (
                        <>
                          <Typography
                            variant="h4"
                            // mt={5}
                            sx={{ color: "#001e95" }}
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
                                url={i.video}
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
                                url={i.video}
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
                        {items[0].id !== "" ? (
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
                                            sx={{ width: "33%", flexShrink: 0 }}
                                          >
                                            <b> {i.floor_name}</b>
                                          </Typography>
                                          <Typography
                                            sx={{ color: "text.secondary" }}
                                          >
                                            Size: <b>{i.floor_size} sqft.</b> &nbsp;
                                            Bedrooms: <b>{i.floor_bedroom}</b>{" "}
                                            &nbsp; Bathrooms:{" "}
                                            <b>{i.floor_bathroom}</b>{" "}
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
                        ) : (
                          ""
                        )}
                          {data[0]["virtual_tour"] ? (
                        <>
                          <Typography
                            variant="h4"
                            // mt={5}
                            sx={{ color: "#001e95" }}
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
                                url={i.virtual_tour}
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
                                url={i.virtual_tour}
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

{data[0]["attachment"] ? (
                        <>
                          <Typography variant="h4" sx={{ color: "#001e95" }}>
                            Attachment   
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
                                href={`/images/properties/${i.attachment}`}
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
                      </Grid>
                    );
                  })}
              </Grid>
              {/* ================================================================================= */}
              {/* {agentData &&
                  (agentData.role === 2 || agentData.role === 3) && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Card
                        sx={{
                          backgroundColor: "white",
                          height: "Auto",
                          width: "100%",
                          borderRadius: 2,
                          mt: 5,
                        }}
                      >
                        <Grid margin={2}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="space-around"
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
                            alignItems="center"
                          >
                            <Typography variant="h5">
                              {agentData.user_name}
                            </Typography>
                            <Typography variant="h6">
                              {agentData.company_name}
                            </Typography>
                            <Typography variant="h6">
                              {agentData.designation}
                            </Typography>
                            <Typography variant="h6">
                              {agentData.website}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  )} */}
            </Container>
          </div>
          </>)}
        </Grid>
      </Grid>
    </div>
  );
}
