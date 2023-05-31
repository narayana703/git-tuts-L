import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
  CardActions,
  ButtonBase,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import parse from 'html-react-parser'
export const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  let history=useNavigate()

  useEffect(() => {
    getData();
  }, []);
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const getData = async (e) => {
    await axios.post("/user/get_all_articles").then(function (res) {
      console.log(res);
      if (res.data.status === 1) {
        setBlogData(res.data.data);
        handleClick()
      }
    });
  };
  return (
    <div>
      <Container maxWidth="lg">
        {/* <Typography variant='h4'>BHR Featured Projects</Typography> */}

        {/* <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ color: "#060847" }}>
            New & Articles
          </Typography>
          <p style={{ color: "grey" }}>Check Out Recent News & Articles</p>
        </Grid> */}

        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"        
     
        >
            <Typography variant='h4' sx={{color: "#060847"}} > News & Blogs</Typography>
       <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}} onClick={()=>history('/our_articles/all')} >View All Articles <ArrowForwardIcon /></Button>
        </Grid>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
        <p style={{color:"grey"}}>
        Check Out Recent News & Articles
        </p>
        </Grid>
        <br />
        <div>

<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>

          {blogData && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={5}
              className="text-center"
            >
              <br />
              <br />
              {/* {JSON.stringify(project[0].feature)} */}

              {blogData &&
                blogData.map((i, key) => (
                  
<Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"


                  
                  item xs={12} sm={6} md={4} lg={3} xl={3} key={key}> 
                  <ButtonBase component={Link} to={`/article/${i.article_id}`}>
                    <Card
                      sx={{
                        height: "280px",
                        width: "250px",
                        textAlign: "center",
                        position: "relative",
                        borderRadius: "25px",
                        "&:hover": {
                          boxShadow: "0 10px 15px 0 rgba(52, 51, 51, 0.08)",
                        },
                      }}
                    >
                      <CardMedia
                        style={{
                          height: "220px",
                          width: "250px",
                          margin: "auto",
                          position: "relative", // Add relative positioning
                        }}
                        image={`/images/articles/${
                          i.article_images.split(",")[0]
                        }`}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 10, // Position at the top
                            left: 10, // Position at the left
                            padding: "8px",
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            borderRadius: "10%",
                          }}
                        >
                          <Typography variant="body2">
                            <b>{i.article_cat_name}</b>
                          </Typography>
                        </div>
                      </CardMedia>

                      <CardContent sx={{ textAlign: "left" }}>
                        <Typography variant="body2">
                          <b>{i.article_title} </b>
                        </Typography>
                      </CardContent>
                    </Card>
                    </ButtonBase>
                  </Grid>
                ))}
            </Grid>
          )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};