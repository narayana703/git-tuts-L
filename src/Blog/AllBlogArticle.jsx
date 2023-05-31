import Divider from "@mui/material/Divider";

import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {Helmet} from "react-helmet";


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import parse from "html-react-parser";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "bootstrap";

export const AllBlogArticle = () => {
  let { cat } = useParams()
  const [data, setData] = useState([]);
  const [catsData, setCatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ddata, setDData] = useState([])
  const theme = useTheme();
  let history = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    getData();
    catData();
    getSearchData()
  }, []);
  const getData = async () => {
    const formdata = new FormData();

    await axios
      .post(
        "/user/get_all_articless",
        formdata
      )
      .then((res) => {
        if (res.data.status === 1) {
          setDData(res.data.data);
          // setOldImages()
          setLoading(false);
          console.log(res.data.data);
        }
      });
  };
  const catData = async () => {
    const formdata = new FormData();

    await axios
      .post(
        "/user/get_all_cats",
        formdata

      )
      .then((res) => {
        if (res.data.status === 1) {
          setCatsData(res.data.data);
          // setOldImages()
          setLoading(false);
          console.log(res.data.data);
        }
      });
  };
  console.log(cat)
  const getSearchData = async (e) => {
    console.log(e)
    setLoading(true);
    const formdata = new FormData()
    formdata.append("article_cat_name", e)
    await axios.post("/user/get-search-article-data", formdata).then(function (res) {
      console.log(res, "===res");
      if (res.data.status === 1) {

        setData(res.data.data)
        setLoading(false);
      }

    });
  }

  return (
    <div>
      <Helmet>
                
                <title>Our Blogs | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="md">
            <Box m={4}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ color: "#7b7b7b" }}
                    className="text-center"
                    gutterBottom
                  >
                    BLOGS
                  </Typography>
                  <hr style={{ color: "#7b7b7b", width: "50%" }} />
                </Grid>
              </Grid>
            </Box>
          </Container>

          <Container maxWidth="xl" sx={{ textAlign: "left" }}>
            <Box m={4}>
              <Grid container spacing={0} alignItems="flex-start">
                {/* Main content */}
                <Grid item xs={12} md={12} sm={12} lg={9} xl={9}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                    {/* {JSON.stringify(data.length)} */}
                    {data.length !==0 ?(<>
                      {data.map((i) => {
                        return (
                          <>
                            <ButtonBase
                              component={Link}
                              to={`/article/${i.article_id}`}
                            >
                              <Grid container spacing={1} mt={3}>
                                {/* Article image */}
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <Card
                                    sx={{ background: "none", boxShadow: "none" }}
                                  >
                                    <CardMedia>
                                      {isMatch ? (
                                        <img
                                          src={`/images/articles/${i.article_images.split(",")[0]
                                            }`}
                                          alt="No Image"
                                          width="100%"
                                          style={
                                            {
                                              objectFit: "cover",
                                              borderRadius:"10px"
                                              //   position: "absolute",
                                            }
                                          }
                                        />
                                      ) : (
                                        <img
                                          src={`/images/articles/${i.article_images.split(",")[0]
                                            }`}
                                          alt="No Image"
                                          width="90%"
                                          style={{
                                            position: "static",
                                            height: "400px",
                                            borderRadius:"10px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      )}
                                    </CardMedia>
                                    <CardContent
                                      sx={{ paddingLeft: "0px" }}
                                    ></CardContent>
                                  </Card>
                                </Grid>
                                {/* Article title */}
                                <Grid item xs={10.8} sm={10.8} md={10.8} lg={10.8} xl={10.8}>
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={1}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{ display: "inline", color: "#53494c" }}
                                    >
                                      <b>{i.article_title}</b>
                                    </Typography>
                                    <Typography variant="body1" gutterBottom >
                                      {/* <CalendarMonthIcon    /> */}
                                      <b>Posted Date : </b> {i.added_date}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {/* Article description */}
                                <Grid item xs={10.8} sm={10.8} md={10.8} lg={10.8} xl={10.8}>
                                  <Typography
                                    // variant="body2"
                                    style={{
                                      // fontWeight: "normal",
                                      color: "#53494c",
                                      textAlign: "justify",
                                    }}
                                  >
                                    {i.article_desc && (
                                      <>
                                        {parse(
                                          i.article_desc
                                            .slice(0, 350)
                                            .concat(["..."])
                                            // .replace(
                                            //   /<(strong|h1)>/g,
                                            //   '<span style="font-weight: normal;">'
                                            // )
                                            // .replace(/<\/(strong|h1)>/g, "</span>")
                                        )}
                                        {/* {i.article_desc.length > 450 ? "..." : null} */}
                                      </>
                                    )}

                                    <br/>

                                  </Typography>
                                  <hr style={{ width: "100%" }} />
                                </Grid>

                                {/* <Divider/> */}
                              </Grid>
                            </ButtonBase>
                          </>
                        );
                      })}</>):<p>
                      No Results Found.....
                      </p>}
                    </>
                  )}
                </Grid>
                {/* Sidebar */}
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  {/* <Box
                    mt={2}
                    p={3}
                    sx={{
                      backgroundColor: "#fff",
                      height: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Grid container spacing={2}>
                    
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h6" sx={{ color: "#53494c" }}>
                          Search
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          placeholder="Enter Your Keyword..."
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          style={{ paddingBottom: "10px" }}
                        />
                      </Grid>
                    </Grid>
                  </Box> */}
                  <Box
                    mt={5}
                    p={3}
                    sx={{
                      backgroundColor: "#fff",
                      height: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h6" sx={{ color: "#53494c" }}>
                          Categories
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography sx={{ color: "#53494c", textDecoration: "none" }} component={Link} to={`/our_articles/${"all"}`} onClick={() => getSearchData("all")}>
                          {cat === "all" ? <b>View All</b> : <>View All</>}

                        </Typography>
                      </Grid>
                      {catsData &&
                        catsData.map((i) => {
                          return (
                            <>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Typography
                                  sx={{ color: "#53494c", textDecoration: "none" }}
                                  component={Link}
                                  to={`/our_articles/${i.article_cat_name}`}
                                  onClick={() => getSearchData(i.article_cat_name)}
                                >
                                  {cat === i.article_cat_name ? <b> {i.article_cat_name}</b> : <> {i.article_cat_name}</>}
                                  {/* {i.article_cat_name} */}
                                </Typography>
                              </Grid>
                            </>
                          );
                        })}


                    </Grid>
                  </Box>
                  <Box
                    mt={2}
                    p={3}
                    sx={{
                      backgroundColor: "#fff",
                      height: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h6" sx={{ color: "#53494c" }}>
                          Latest Posts
                        </Typography>
                      </Grid>

                      {ddata
                        .filter((i) => i.article_id < 3)
                        .sort((a, b) => b.article_id - a.article_id)
                        .map((j, key) => (
                          <>
                            <Grid item spacing={2}>
                              <ButtonBase
                                component={Link}
                                to={`/article/${j.article_id}`}
                              >
                                <Card
                                  sx={{ background: "none", boxShadow: "none" }}
                                >
                                  <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="flex-start"
                                  >
                                    <Grid item>
                                      <CardMedia
                                        style={{
                                          height: "62px",
                                          width: "93px",
                                          margin: "auto",
                                          marginTop: "10px",
                                        }}
                                        image={`/images/articles/${j.article_images.split(",")[0]
                                          }`}
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          sx={{ color: "#53494c" }}
                                        >
                                          <b>{j.article_title}</b>
                                        </Typography>
                                      </CardContent>

                                    </Grid>
                                  </Grid>
                                </Card>
                              </ButtonBase>
                              <hr style={{ width: "100%" }} />
                            </Grid>
                            <br />
                          </>
                        ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
     
        </>)}
    </div>
  );
};