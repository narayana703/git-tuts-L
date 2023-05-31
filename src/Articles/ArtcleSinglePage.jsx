import {
  Box,
  IconButton,
  Typography,
  Container,
  Button,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Card,
  CardMedia,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import parse from "html-react-parser";
import one from "../assets/blog01.jpg";
import two from "../assets/blog02.jpg";
import three from "../assets/blog03.jpg";
import four from "../assets/blog04.jpg";
import five from "../assets/blog05.jpg";
//   import ModalImage from "react-modal-image";
import Lightbox from "yet-another-react-lightbox";
import parse from "html-react-parser";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "yet-another-react-lightbox/styles.css";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';
import {Helmet} from "react-helmet";
export function ArticleSinglePage() {
  var images1 = [one, two, three, four, five];
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [open1, setOpen1] = useState(false);
  const matches = useMediaQuery("(min-width:1100px)");
  const [data, setData] = useState("");
  const [slideImages, setSlideImages] = useState();
  const { admin } = useContext(UserContext);
  const { tkn } = useContext(UserContext);
  const [final, setFinal] = useState([]);
  let { id } = useParams();
  const [title,setTitle] = useState("Fetching Artilcle Details..  | Buy or Sell or Rent Property Online")

  useEffect(() => {
    getdata1();
  }, []);
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const getdata1 = async () => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("aid", admin.admin_id);
    await axios
      .post("/admin/get_Single_articles", formdata, {
        headers: { tkn: tkn },
      })
      .then(function (res) {
        console.log(res.data);
        if (res.data.status === 1) {
          console.log(res.data.data, "000000000000000000");
          setData(res.data.data);
          setTitle(res.data.data.article_title+" | Buy or Sell or Rent Property Online")
          handleClick()
        }
      });
  };

  const handleImageClick = (index) => {
    console.log(index + 1, "sssssssssssssssssssssssssssss");
    console.log(typeof (index + 1), "type of index+1");
    setClickedIndex(index + 1);

    var slideImages = data.article_images.split(",");

    var shiftImages = slideImages.splice(0, index + 1);
    slideImages.push(...shiftImages);
    console.log(slideImages);
    setFinal(slideImages);
    setOpen1(true);
  };

  const handleImageClick1 = () => {
    setClickedIndex(0);
    setOpen(true);
  };

  const handleClick1 = () => {
    console.info('You clicked the Chip.');
  };

  const images = data?.article_images?.split(",") || [];

  return (
  
      <div style={{ textAlign: "start" }}>
          <Helmet>
                
                <title>{title}</title>
                 
            </Helmet>
        <Grid container justifyContent="center" alignItems="flex-start">
          <Grid item xs={3}>
            <LeftDrawer />
          </Grid>
          <Grid item xs={9}>
            <Container
              maxWidth="lg"
              
              borderRadius={8}
            >
              <Box  sx={{ backgroundColor: "white", borderRadius:4, p:2, pl:4, pr:4 ,mt:10}}>
              {/* <br /> */}
              <Grid sx={{ ml: "", pt: 1 }}>
                <Typography variant="h3" gutterBottom>
                  <b>{data.article_title}</b>
                </Typography>
              </Grid>
              <br />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      width: "100%",
                      paddingBottom: "70%",
                      position: "relative",
                    }}
                  >
                    {data.article_images && (
                      <img
                        src={`/images/articles/${
                          data.article_images.split(",")[0]
                        }`}
                        // alt={images[0].alt}
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
                    )}
                  </Box>
                </Grid>
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={[
                    ...images
                      .slice()
                      .map((src) => ({ src: `/images/articles/${src}` })),
                  ]}
                />

                <Grid item xs={12} md={6}>
                  {data.article_images &&
                  data.article_images.split(",").length > 4 ? (
                    <>
                      <Grid container spacing={2}>
                        {data.article_images &&
                          data.article_images
                            .split(",")
                            .slice(1, 4)
                            .map((i, index) => (
                              <Grid item xs={3} md={6} lg={6} key={index}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    paddingBottom: "70%",
                                    position: "relative",
                                  }}
                                >
                                  <img
                                    src={`/images/articles/${i}`}
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
                              src={`/images/articles/${
                                data.article_images.split(",")[4]
                              }`}
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
                                console.log(4);
                              }}
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
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
                                +{data.article_images.split(",").length - 4}
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
                        {data.article_images &&
                          data.article_images
                            .split(",")
                            .slice(1, 4)
                            .map((i, index) => (
                              <Grid item xs={3} md={6} lg={6} key={index}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    paddingBottom: "70%",
                                    position: "relative",
                                  }}
                                >
                                  <img
                                    src={`/images/articles/${i}`}
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
                        src: `/images/articles/${src}`,
                        index,
                      }))}
                    />
                  )}
                </Grid>
              </Grid>

              {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Grid sx={{ padding: "3px", mt: 1 }}>
                <Chip label={data.article_cat_name}  color="warning" onClick={handleClick1} sx={{ backgroundColor: ""}}/>
                     
                </Grid>{" "}
                &nbsp;&nbsp;
                <Grid sx={{ mt: 1 }}>
                  <Typography variant="body1" gutterBottom>
                    {/* <CalendarMonthIcon    /> */}
                    <b>Posted Date : </b> {data.added_date}
                  </Typography>
                </Grid>
              </Grid>
              <br />

              <Grid ml={1}>
                <Typography  sx={{ textAlign:'justify' }}>
                  {data.article_desc && parse(data.article_desc)}
                </Typography>
              </Grid>
              <br />
              
<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>

           *********
              </Grid>
              <br />
             
              </Box>
            </Container>
            <br/>
            <br/>
          </Grid>
        </Grid>
      </div>

  );
}