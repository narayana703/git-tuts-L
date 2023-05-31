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
    CardMedia,CardContent
  } from "@mui/material";
  import react, { useState, useEffect, useContext } from "react";
  import axios from "axios";
  import { useNavigate, useParams } from "react-router-dom";
  import { UserContext, SnackbarContext } from "../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";
  var momentt = require("moment-timezone");
  export function ArticalsList() {
    let history = useNavigate();
    const [data, setData] = useState("");
    const { admin,editID,setEditID } = useContext(UserContext);
    const { tkn } = useContext(UserContext);
    const { snack, setSnack } = useContext(SnackbarContext);
    useEffect(() => {
      getdata();
    }, []);
    const handleClick = () => {
      const anchor = document.querySelector("#back-to-top-anchor");
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    const getdata = async () => {
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
      await axios
        .post("/admin/get_all_articles", formdata, {
          headers: { tkn: tkn },
        })
        .then((res) => {
          if (res.data.status === 1) {
            console.log(res.data.data, "sai_______");
            setData(res.data.data);
            handleClick()
          }
        });
    };
    const deletedata = async (id) => {

      const formdata = new FormData();
      formdata.append("id", id)
  
      formdata.append("aid", admin.admin_id);
  
      await axios.post("/admin/delete_article", formdata,
        {
          headers: { tkn: tkn },
        }
      ).then(function (res) {
        if (res.data.status === 1) {
          console.log(res)
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          getdata();
        }
      })
    }
   
  
    return (
      <div>
         <Helmet>
                
                <title>My Articles | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
           <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={1.5}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={10.5}>
        <Container maxWidth="lg" >
          <Typography variant="h4" sx={{ color: "#060847", mt: 2 }}>
            My Articles 
          </Typography>
          <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  spacing={5}
  className="text-center"
  mt={2}
  p={3}
>
            {data &&
              data.map((i) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}
                  >

<Card
        sx={{
          // height:"350px",
          width:"280px",
          pb:3,
          textAlign:"center",
          position:"relative",
          backgroundColor: "#bbdefb",
           borderRadius:"25px",
           "&:hover":{boxShadow: "0 10px 15px 0 rgba(52, 51, 51, 0.08)"}
        }}
      
      >
 
   <CardMedia
          style={{
            height: "160px",
            width:"280px",          
            margin:"auto",
            // marginTop:"10px",
            // borderRadius:"18px"
    
           
          }}
          image={`/images/articles/${i.article_images.split(',')[0]}`}
        />
        {i.article_cat_name && ( // Add a condition to check for feature
        <div
          style={{
            position: "absolute",
            top: 15,
            left: 15,
            padding: "8px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            borderRadius:"10%",
           
          }}
        >
          <Typography variant="body2">
            <b>{i.article_cat_name}</b>
          </Typography>
        </div>
      )}
        
        <CardContent sx={{textAlign:"left"}}>
          <Typography  variant="body2">
          
                            <b>Title: </b> 
                            {i.article_title} <br />
                            <b>Date: </b> 
                            {String(momentt(i.added_date).format('YYYY-MM-DD'))}
                          
                            <br />
          </Typography>
        
         
          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            mt={1}
                            spacing={1}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                history(
                                  `/Dashboard/article_single_page/${i.article_id}`
                                );
                              }}
                              //   article_id     article_single_page
                              sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}
                            >
                              View
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setEditID(i.article_id)
                                history(
                                  `/Dashboard/edit_articles/${i.article_id}`
                                );
                              }}
                              sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                deletedata(i.article_id)
                              }}
                              sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}
                            >
                              Delete
                            </Button>
                          </Grid>

        </CardContent>
      </Card>
    

                    {/* <Card
                      sx={{
                        width: 450,
                        height: 270,
                        m: 2,
                        mt: 3,
                        borderRadius: 4,
                        textAlign: "start",
                        backgroundColor: "#bbdefb",
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        
                      >
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                          <img
                            src={`/images/articles/${
                              i.article_images.split(",")[0]
                            }`}
                            height={270}
                            width={"90%"}
                          />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginTop: "", ml: 1, textAlign: "start" }}
                          >
                            <b>Category Name:</b> <br />
                            {i.article_cat_name} <br />
                            <b>Title:</b> <br />
                            {i.article_title} <br />
                            <b>Added Date:</b> <br />
                            {i.added_date} <br />
                          </Typography>
  
                          <br />
                          <br />
                          <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            mt={1}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                history(
                                  `/Dashboard/article_single_page/${i.article_id}`
                                );
                              }}
                              //   article_id     article_single_page
                              sx={{ mr: 1 }}
                            >
                              View
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                history(
                                  `/Dashboard/edit_articles/${i.article_id}`
                                );
                              }}
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
  
                      <Typography
                        variant="subtitle1"
                        sx={{ textDecoration: "underline", ml: 1 }}
                      ></Typography>
  
                      <Typography variant="subtitle2" sx={{ ml: 1 }}></Typography>
  
                      <Typography variant="subtitle2" sx={{ ml: 1 }}></Typography>
  
                      <Typography variant="subtitle2" sx={{ ml: 1 }}></Typography>
  
                      <Typography variant="subtitle2" sx={{ ml: 1 }}></Typography>
  
                      <Typography variant="subtitle2" sx={{ ml: 1 }}></Typography>
  
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        mt={1}
                      >
                        
                      </Grid>
                    </Card> */}
                  </Grid>
                );
              })}
          </Grid>
        </Container></Grid>
        </Grid>
      </div>
    );
  }