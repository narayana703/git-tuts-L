import {
    Box,
    IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem, Card, CardMedia
  } from "@mui/material";

  import { Loading } from "../components/Loading";
  import { useCategoriesData } from "../Categories/Admin/categoriesFunction";

  import react, { useState, useEffect, useContext } from "react";
  import axios from "axios";
  import { useNavigate, useParams } from 'react-router-dom';
  import { UserContext, SnackbarContext } from "../components/UserContext";
  import Compressor from 'compressorjs';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import parse from 'html-react-parser';

import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";
  // {parse(`${service.serv_desc}`)}
  var momentt = require("moment-timezone");
  export const EditArticles = () => {
  
    const [catData] = useCategoriesData()
    const { articleData, setArticleData } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(UserContext)
    const { tkn, } = useContext(UserContext)
    const [page, setPage] = useState(10);
    const [openE, setOpenE] = useState(false)
    const [ckdesc, setCkDesc] = useState("")
    const [wait, setWait] = useState(false)
    const [oldImages, setOldImages] = useState([]);
    const [imageids, setImageIds] = useState("");
 
    const history = useNavigate();
  
    // const [id, setId] = useState("")
    let id=useParams()
    console.log(id)
    console.log(id.id)
    const { snack, setSnack } = useContext(SnackbarContext);
  
    const [item, setItem] = useState({
      category: "",
      title: "",
  
  
    });
    const [desc, setDesc] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [images, setImages] = useState([])
    const [uploadwait, setUploadWait] = useState(false);
    const [err, setErr] = useState(0)
  
    useEffect(() => {
      getdata1();
    }, []);
    
  
    const getdata1 = async () => {

      const formdata = new FormData();
      formdata.append("id", id.id)
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/get_Single_articles", formdata , {
        headers: { tkn: tkn },
      }).then(function (res) {
        console.log(res.data)
        if (res.data.status === 1) {
          console.log(res)
          setItem({
            category: res.data.data.article_cat_id,
            title: res.data.data.article_title,
            // desc: res.data.data.article_desc,
          });
          setDesc(res.data.data.article_desc)
          var dateTime = String(momentt(res.data.data.added_date).format('YYYY-MM-DD'));
          console.log(dateTime)
          setDateTime(dateTime)
          setImageIds(res.data.data.article_images)
          setOldImages(res.data.images)
        //   setId(res.data.data.article_id)
         
          setLoading(false)
  
        } else {
          // setSnack({
          //   message: res.data.msg,
          //   type: "error",
          //   open: true,
          // });
          setLoading(false)
    
  
  
        }
  
      });
  
    }
  
    let compImage = (image) => {
      return new Promise((resolve, reject) => {
        new Compressor(image, {
          quality: 0.8,
          success: async (compressedResult) => {
            return resolve(compressedResult);
          }
        });
      })
  
    };
    const itemChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value })
    }
  
    const imageChange = async (e) => {
  
      if (e.target.files.length != 0) {
        // console.log(oldImages.split(",").length)
        // if (oldImages.split(",").length + images.length + e.target.files.length <= 3) {
        console.log(oldImages.length)
        if (oldImages.length + images.length + e.target.files.length <= 10) {
          var arr = [];
  
          for (var i = 0; i < e.target.files.length; i++) {
            var type = e.target.files[i].type;
  
            if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
              const image = e.target.files[i];
              var img = await compImage(image);
              arr.push({ raw: img, preview: URL.createObjectURL(img) });
            } else {
              alert("Please select only JPEG, JPG, PNG Images..")
            }
          }
          console.log("arr", arr)
          setImages([...images, ...arr]);
        } else {
          alert("Maximum Image limit is 5.");
  
        }
      }
      e.target.value = ""
    };
    console.log(images)
  
  
  
    const itemSubmit = async (e) => {
      e.preventDefault();
      setErr(0);
      console.log(dateTime, "=======darte")
      if (item.category === "") {
        setErr(1);
        setSnack({
          message: "Please Select Category",
          type: 'error',
          open: true,
          direction: "center"
        });
      }
      else if (item.title === "") {
        setErr(2);
        setSnack({
          message: "Please Enter Title Name",
          type: 'error',
          open: true,
          direction: "center"
        });
      }
      else if (desc === "") {
        setErr(3);
        setSnack({
          message: "Please Eneter Description",
          type: 'error',
          open: true,
          direction: "center"
        });
      }
      else if (dateTime === "") {
        setErr(4);
        setSnack({
          message: "Please Select Date",
          type: 'error',
          open: true,
          direction: "center"
        });
      }
      else if (oldImages.length === 0) {
        setErr(4);
        setSnack({
          message: "Please Choose Article Image",
          type: 'error',
          open: true,
          direction: "center"
        });
      }
      else {
  setWait(true)
        const formdata = new FormData();
        formdata.append("catid", item.category);
        formdata.append("id", id.id);
        formdata.append("aid", admin.admin_id);
        formdata.append("title", item.title);
        formdata.append("art_desc", desc);
        formdata.append("add_date", dateTime);
        console.log("images.length", images.length)
        formdata.append('images', imageids);
        for (var i = 0; i < images.length; i++) {
          console.log("i", i)
          formdata.append('images', images[i].raw);
        }
  
        await axios.post("/admin/edit_articles", formdata
          , {
            headers: { tkn: tkn },
          }
        ).then(function (res) {
          if (res.data.status === 1) {
            // /deletecatimage
            setWait(false)
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
      
            history("/dashboard/articles")
      
  
          } else {
            setWait(false)
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
      
          }
        });
      };
    }
  
  
    const delete_image = async (image) => {
      // e.preventDefault();
  
      console.log(id)
      console.log(image)
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
  
      formdata.append("image", image);
      formdata.append("id", id.id)
      await axios.post("/admin/delete_article_image", formdata , {
        headers: { tkn: tkn },
      }).then(function (res) {
        if (res.data.status === 1) {
          setSnack({
            message: res.data.msg,
            type: 'success',
            open: true,
            direction: "center"
          });
          getdata1();
  
        } else {
  
          setSnack({
            message: res.data.msg,
            type: 'error',
            open: true,
            direction: "center"
          });
          getdata1();
        }
  
  
      });
    }
  
    return (
      <>
       <Helmet>
                
                <title>Edit Article | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
         <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={3}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={9}>
        {loading ? (
          <Loading />
        ) : ( 
          <>
            <Container maxWidth="lg">
            <Box sx={{mt:5, pt: 3 }} >
  
  <Typography variant="h5" style={{ color: "#060847" }}>Update Article</Typography>
  <br/>
              
             
                  <Container maxWidth="md" >
  
                    <Box sx={{ m: 5, p: 3, textAlign: "center",border:"1px solid #060847" }}>
                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          <form onSubmit={itemSubmit}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                            >
                            
                              <TextField
                                select
                                fullwidth
                                type="text"
                                size="small"
                                name="category"
                                label="Category"
                                value={item.category}
                                onChange={itemChange}
                                error={err == 1 && true}
                                sx={{ m: 2, width: "100%" }}
                              >
                                {catData.map((i) => (
                                  <MenuItem value={i.article_cat_id}>{i.article_cat_name}</MenuItem>
  
                                ))}
  
                              </TextField>
                              <TextField
                                type="text"
                                size="small"
                                name="title"
                                label="Title"
                                value={item.title}
                                onChange={itemChange}
                                error={err == 2 && true}
                                sx={{ m: 2, width: "100%" }}
                              />
  
                              
                              <div>
                              <CKEditor
  editor={ClassicEditor}
  data={desc}
  onReady={(editor) => {
    console.log('Editor is ready to use!', editor);
  }}
  onChange={(event, editor) => {
    const data = editor.getData();
    setDesc(data);
  }}
  onBlur={(event, editor) => {
    console.log('Blur.', editor);
  }}
  onFocus={(event, editor) => {
    console.log('Focus.', editor);
  }}
/></div>
                              <br />
                             {/* {JSON.stringify(dateTime)} */}
                              <TextField
                                id="dateTime"
                                label="Date"
                                type="date"
                             
                                fullWidth={true}
                                size="small"
                                value={dateTime}
                                name="dateTime"
                                placeholder="Date"
                                dateFormat="yyyy-mm-dd"
                                error={err == 4 && true}
                                onChange={(e) => setDateTime(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                sx={{ m: 2, width: "100%" }}
                              />
  
                              <Button
                                variant="outlined"
                                size="small"
                                component="label"
                                onChange={imageChange}
                                error={err == 5 && true}
                                sx={{ m: 2, width: "73%", color: "#060847", "&:hover": { color: "#060847" } }}
                              >
                                upload image
                                <input hidden type="file" multiple />
                              </Button>
                              {
                                uploadwait ? (<span style={{ color: "white" }}><br /><br />Upload Images...</span>)
                                  : (<>
  
                                    {(images.length !== 0) ? (<Grid item xs={12}>
                                      <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        spacing={3}
                                      >
                                        {images.map((i) => {
  
                                          return <Grid item>
                                            <Card >
                                              <CardMedia
                                                style={{ height: 200, width: 200 }}
                                                image={i.preview}
                                                title={i.preview}
                                              />
                                              <Button variant="outlined" color="primary" component="span" style={{ border: "1px solid black", color: "#060847", "&:hover": { color: "#060847" } }} fullWidth onClick={() => {
  
                                                setImages(images.filter(item => item.preview !== i.preview));
  
                                              }}>
                                                DELETE IMAGE
                                              </Button>
                                            </Card>
                                          </Grid>
                                        })}
                                      </Grid>
                                    </Grid>) : ""} </>)
                              }
  
                              {oldImages.length !== 0 && (<Grid item xs={12}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="flex-start"
                                  spacing={3}
                                >
                                  {/* {JSON.stringify(oldImages)} */}
                                  {oldImages.map((image) => {
  
                                    return <Grid item>
  
                                      <Card style={{ border: "1px solid black", color: "#060847", "&:hover": { color: "#060847" } }}>
                                        <CardMedia
                                          style={{ height: 200, width: 200 }}
                                          image={`/images/articles/${image}`}
  
                                        />
  
                                        {oldImages.length !== 1 && (
                                          <Button variant="contained" color="primary" component="span" style={{ border: "1px solid black" }} fullWidth
                                            onClick={() => {
  
                                              delete_image(image);
  
                                            }}
                                          >
                                            DELETE IMAGE
                                          </Button>)}
                                      </Card>
                                     
                                    </Grid>
                                  })}
                                </Grid>
                              </Grid>
                              )}
  
  
  <br/>
  <br/>
                              <Button size="small" type="submit" variant="contained"  sx={{ m:2, backgroundColor: wait ? "white" : "#060847",  color: wait ? "black" : "white" ,"&:hover":{backgroundColor:wait?"wait":"#060847"} }}>{wait ? "Please Wait...." : "Update Article"}
                                
                              </Button>
                            </Grid>
                          </form>
                        </>)}
                    </Box></Container>
                
            </Box>
  
            </Container>
          </>
        )} 
        </Grid>
        </Grid>
        </>
    );
  };
  
  
  
  