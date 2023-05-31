import React,{useState} from "react";
import { TextField, Button, Box, Grid, Container, Typography, MenuItem,Dialog, DialogContent,Card,CardMedia, useTheme, useMediaQuery } from "@mui/material";

import { useArticle } from "./AddArtFunction";
import { Articles } from "./Articles";
import { useCategoriesData } from "../Categories/Admin/categoriesFunction";
// import CKEditor from 'react-ckeditor-component';
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import "../App.css"
export const AddArticle = () => {
  const [ckdesc, setCkDesc] = useState("")
  const theme=useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [item, setItem,images, itemChange,imageChange, uploadwait, setImages,itemSubmit, err,open, setOpen,handleClickOpen,handleClose,setDesc,desc,wait, setWait,] = useArticle();
 const [catData]=useCategoriesData()
//  console.log(catData)
  return (
    <>
         <Helmet>
                
                <title>Add Article| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
   <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={3}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={9}>
            <Container maxWidth="md">
      <Box sx={{ m: 5, p: 5,textAlign:"center",border: "1px solid #060847" }}>
        <form onSubmit={itemSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" style={{ color: "#060847" }}>Add Article Details</Typography>
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
         
       
       {/* <div> */}
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
/>
       {/* <CKEditor
                                activeClass="p10"
                                content={desc}
                                placeholder=""
                                config={{
                                  toolbar: [
                                    {
                                      name: "document",
                                      items: [
                                        "Source",
                                        "-",
                                        "NewPage",
                                        "Preview",
                                        "-",
                                        "Templates",
                                      ],
                                    },
                                    {
                                      name: "clipboard",
                                      items: [
                                        "Cut",
                                        "Copy",
                                        "Paste",
                                        "PasteText",
                                        "-",
                                        "Undo",
                                        "Redo",
                                      ],
                                    },
                                    {
                                      name: "styles",
                                      items: ["Styles", "Format", "Font", "FontSize"],
                                    },
                                    {
                                      name: "colors",
                                      items: ["TextColor", "BGColor"],
                                    },
                                    {
                                      name: "tools",
                                      items: ["Maximize", "ShowBlocks"],
                                    },
                                    {
                                      name: "others",
                                      items: ["-"],
                                    },
                                  ],
                                 
                                  onBeforeSave: (editor) => {
                                    setCkDesc(editor.getData());
                                  },
                                }}
                                events={{
                                  change: (event) => {
                                    setDesc(event.editor.getData());
                                  },
                                }}
                              /> */}
                           {/* </div> */}
                            <br />
             <TextField
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth={true}
                            size="small"
                            value={item.date}
                            name="date"
                            placeholder="Date"
                            dateFormat="yyyy-mm-dd"
                            error={err == 4 && true}
                            onChange={itemChange}
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
                  sx={{ m: 2, width: "73%",color:"#060847","&:hover":{color:"#060847"} }}
                >
                  upload image
                  <input hidden type="file" multiple />
                </Button>
                {
                uploadwait ? (<span style={{ color: "white" }}><br /><br />Adding Images...</span>)
                  : (<>

                    {(images.length !== 0) ? (<Grid item xs={12}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={3}
                      >

                        {images.map((image) => {

                          return <Grid item>
                            <Card >
                              <CardMedia
                                  style={{ height: 200, width: 200 }}
                                image={image.preview}
                                title={image.preview}
                              />
                              <Button variant="outlined" color="primary" component="span" style={{ border: "1px solid black",color:"#060847","&:hover":{color:"#060847"}  }} fullWidth onClick={() => {

                                setImages(images.filter(item => item.preview !== image.preview));
                               
                              }}>
                                DELETE IMAGE
                              </Button>
                            </Card>
                          </Grid>
                        })}
                      </Grid>
                    </Grid>) : ""} </>)
              }




          

            <Button size="small" type="submit" disabled={wait}variant="contained" sx={{ m: 2,backgroundColor: wait ? "white" : "#060847",  color: wait ? "black" : "white","&:hover":{backgroundColor:wait? "wait":"#060847"} }}>
            {wait ? "Please Wait...." : "Add Article"}
              
            </Button>
          </Grid>
        </form>
      </Box>
    </Container> 
          </Grid> 
          </Grid>
    </>
  );
};
