import React, { useState, useContext, useEffect } from "react";
import { SnackbarContext, UserContext } from "../../components/UserContext";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField, Button, Box, Grid, Container, Typography, Dialog, DialogContent, Card, CardMedia, FormControl, MenuItem, Checkbox, Select, OutlinedInput, ListItemText, InputLabel, InputAdornment, FormControlLabel } from "@mui/material";
import { useEditProperty } from "./EditPropertyFunction";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Compressor from "compressorjs";
import { Loading } from '../../components/Loading'
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Location } from "../../components/AutoCompLoc";
const names = [
  'AC', 'Barbeque', 'Dryer', 'Gym', 'Laundry', 'Lawn', 'Microwave', 'Outdoor Shower', 'Fridge', 'Sauna', 'Swimming Pool', 'TV', 'Washer', 'WiFi', 'Window Coverings',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditProperty = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  const [prop, setProp] = useState({ title: "", desc: "", video: "", address: "", tour: "", city: "", ptype: "" })
  const [loc, setLoc] = useState("")
  let history = useNavigate()
  const [loading, setLoading] = useState(true)
  let { id } = useParams();
  const [wait, setWait] = useState(false)
  const { uid, setUId, user, token } = useContext(UserContext)
  const [doc, setDoc] = useState("")
  const [oldDoc, setOldDoc] = useState("")
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([]);
  const [oldProfile, setOldProfile] = useState([])
  const [imageids, setImageIds] = useState("");
  const [delImage, setDelImage] = useState("")
  const [uploadwait, setUploadWait] = useState(false);
  const [feature, setFeature] = useState([]);
  const { propId, setPropId } = useContext(UserContext)
  const [catId, setCatId] = useState("")
  console.log(propId)

  const [err, setErr] = useState(0);
  const handlePropChange = (e) => {
    setProp({ ...prop, [e.target.name]: e.target.value })
  }
  const handleChange = (event) => {
    const {
      target: { value, checked },
    } = event;
    if (value === "all") {
      if (checked) {
        setFeature(names);
      } else {
        setFeature([]);
      }
    } else {
      if (checked) {
        setFeature([...feature, value]);
      } else {
        setFeature(feature.filter((f) => f !== value));
      }
    }
  };
  const updateLoc = (loc) => {
    setLoc(loc);
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
  const fileChange = async (e) => {
    console.log(e.target.files)

    if (e.target.length !== 0) {
      setDoc(e.target.files[0]);
    }


  };

  const imageChange = async (e) => {
    if (e.target.files.length != 0) {

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
        setImages([...images, ...arr]);

      } else {
        alert("Maximum Image limit is 10.");

      }
    }
    e.target.value = ""

  }
  useEffect(() => {
    singlePropData();

  }, [])
  console.log(id)
  const singlePropData = () => {
    const formdata = new FormData()
    console.log(propId)
    formdata.append('id', localStorage.getItem('rowid'))
    formdata.append("uid", user.user_id);
    axios.post('/user/get_single_propertyy', formdata,
      {
        headers: { tkn: token },
      })
      .then(function (response) {
        console.log(response.data, "==================jjj")
        if (response.data.status === 1) {

          // setItem()
          setProp({


            title: response.data.data[0].title,
           
            // address:response.data.data[0].address,
            video: response.data.data[0].video,
            tour: response.data.data[0].virtual_tour,
            desc: response.data.data[0].desc,
            city: response.data.data[0].city,
            // feature:response.data.data[0].feature,
            ptype: response.data.data[0].property_type,

          })
          setLoc(response.data.data[0].address)
          // setFeature(response.data.data[0].feature)
          setDoc(response.data.data[0].attachment)
          setCatId(response.data.data[0].prop_cat_id);

          const array = response.data.data[0].feature.split(",")
          setFeature(array)
          setImageIds(response.data.data[0].images)
          setOldImages(response.data.images)
          setLoading(false);

        }

        console.log(response.data);
        console.log(prop, "==========ganiprassu=============")
      });

  }

  const itemSubmit = async (e) => {
    e.preventDefault();
    console.log(images)
    setErr(0)


    if (prop.title === "") {
      setErr(2)
      setSnack({
        message: "Please Enter Property Title",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
 
    else if (loc === "") {
      setErr(4)
      setSnack({
        message: "Please Enter Property Address",
        type: 'error',
        open: true,
        direction: "center"
      });
    }

    else if (prop.city === "") {
      setErr(10)
      setSnack({
        message: "Please Enter City",
        type: 'error',
        open: true,
        direction: "center"
      });
    }

    else if ((prop.ptype !== "Plot") && feature.length === 0) {
      setErr(8)
      setSnack({
        message: "Please Select Property Features",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (prop.desc === "") {
      setErr(7)
      setSnack({
        message: "Please Enter Property Description",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (doc.length === 0) {
      setErr(1);
      setSnack({
        message: "Please Choose PDF File",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (oldImages === "") {
      setErr(9);
      setSnack({
        message: "Please Choose Image",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else {
      setWait(true)
      const formdata = new FormData();
      formdata.append('id', localStorage.getItem('rowid'))
      console.log(localStorage.getItem('rowid'), "===========id")
      formdata.append("user_id", uid);
      formdata.append("title", prop.title);
      formdata.append("document", doc);
      formdata.append("desc", prop.desc);
      formdata.append("video", prop.video);
  
      formdata.append("address", loc);
      formdata.append("tour", prop.tour);
      formdata.append("city", prop.city);
      formdata.append("feature", feature);
      console.log(images, "ïmagessss")
      console.log(oldImages)
      console.log(images.length, "ïmagessss")
      formdata.append('images', imageids);
      for (var i = 0; i < images.length; i++) {

        formdata.append('images', images[i].raw);
      }

      formdata.append("uid", user.user_id);
      await axios.post("/user/edit_property", formdata,
        {
          headers: { tkn: token },
        }).then(function (res) {
          console.log("hiiiii");
          if (res.data.status === 1) {
            setWait(false)
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
            setLoading(false);
            history('/user_dashboard/all_properties')

          } else {
            setWait(false)
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
          }
        });
    }
  };
  const delete_image = async (image) => {
    // e.preventDefault();
    console.log(image, "=========ïmage==========")
    console.log(localStorage.getItem('rowid'), "======id======")
    console.log("=========gani=======")
    const formdata = new FormData();
    formdata.append("uid", user.user_id);
    // formdata.append("uid", user.admin_id);
    // formdata.append("images", imageids);
    formdata.append("image", image);
    formdata.append("id", localStorage.getItem('rowid'))
    await axios.post("/user/deleteimages", formdata, {
      headers: { tkn: token },
    }).then(function (res) {
      if (res.data.status === 1) {
        setSnack({
          message: res.data.msg,
          type: 'success',
          open: true,
          direction: "center"
        });
        setLoading(false);
        singlePropData()

      } else {

        setSnack({
          message: res.data.msg,
          type: 'error',
          open: true,
          direction: "center"
        });
        singlePropData()
      }


    });
  }


  return (
    <div>
      <Grid container justifyContent="center"
        alignItems="flex-start">

        {/* <Grid item xs={9}> */}
        {loading ? (
          <Loading />
        ) : (


          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom sx={{ color: "#001e95" }}>
              Update property
            </Typography>
            {/* {JSON.stringfy(fea)} */}
            <Box
              sx={{
                mt: 3,
                pt: 3,
                boxShadow: 5,
                borderRadius: "20px",
                backgroundColor: "white",
              }}
            >

              <form onSubmit={itemSubmit}>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} style={{ textAlign: 'center', margin: '0 auto' }}>

                  <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} >

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        type="text"
                        size="small"
                        name="title"
                        label="Property Title*"
                        value={prop.title}
                        onChange={handlePropChange}
                        error={err == 2 && true}
                        sx={{ m: 1, width: "80%" }}
                      />
                      {err === 2 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Property Title...</div>}
                    </Grid>

               
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        multiline
                        rows={4}
                        type="text"
                        size="small"
                        name="loc"
                        label="Address*"
                        value={loc}
                        onChange={(e) => setLoc(e.target.value)}
                        error={err == 4 && true}
                        sx={{ m: 1, width: "80%" }}
                      />
                      {/* <Location  error={err == 4 && true}  loc={loc} setloc={updateLoc} style={{ m: 1 }}/> */}
                      {err === 4 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Property Address...</div>}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        type="text"
                        size="small"
                        name="video"
                        label="Video URL"
                        value={prop.video}
                        onChange={handlePropChange}

                        sx={{ m: 1, width: "80%" }}
                      />

                    </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        type="text"
                        size="small"
                        name="tour"
                        label="Virtual Tour URL"
                        value={prop.tour}
                        onChange={handlePropChange}

                        sx={{ m: 1, width: "80%" }}
                      />
                      {err === 6 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Property Virtual tour URL...</div>}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        type="text"
                        size="small"
                        name="city"
                        label="City*"
                        value={prop.city}
                        onChange={handlePropChange}
                        error={err == 10 && true}
                        sx={{ m: 1, width: "80%" }}
                      >
                        <MenuItem value="Bangalore">Bangalore</MenuItem>
                        <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                        <MenuItem value="Tirupati">Tirupati</MenuItem>
                      </TextField>
                      {err === 10 && (
                        <div
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          Please Enter Property City...
                        </div>
                      )}

                    </Grid>

                  </Grid>
                  {prop.ptype !== "Plot" && (

                    // {catId === 3 ? <></> :
                    <>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        m={2}
                      >
                        {/* Grid containing the checkboxes */}
                        <Grid ml={10}>
                          <Typography variant="caption" display="block" gutterBottom>
                            <b> Features*</b>
                          </Typography>
                          {err === 8 && (
                            <div
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              Please Select Atleast One Feature...
                            </div>
                          )}
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          m={2}
                        >
                          {names.map((name) => (
                            <Grid
                              key={name}
                              textAlign={"start"}
                              item
                              xs={4}
                              sm={4}
                              md={2}
                              lg={1}
                              xl={1}
                              ml={8}
                              mt={0}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={feature.indexOf(name) !== -1}
                                    onChange={handleChange}
                                  />
                                }
                                error={err == 8 && true}
                                value={name}
                                label={name}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </>
                  )}



                  <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>
                      <TextField
                        multiline
                        rows={4}
                        type="text"
                        size="small"
                        name="desc"
                        label="Description*"
                        value={prop.desc}
                        onChange={handlePropChange}
                        error={err == 7 && true}
                        sx={{ m: 1, width: "80%" }}

                      />
                      {err === 7 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Property Description...</div>}
                    </Grid>
                  </Grid>

                  <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <br />
                      <Button variant="outlined" component="label" onChange={fileChange} error={err == 1 && true} sx={{ color: "#060847", width: "80%", "&:hover": { color: "#060847" } }}>Attachment File*
                        <input hidden type="file" />
                      </Button>

                      {doc.name ? <p style={{ fontSize: "10px" }}>{doc.name}</p> : <p style={{ fontSize: "10px" }}>{doc}</p>}
                      {err === 1 && <div style={{ fontSize: "12px", color: "red" }}>Please Choose PDF File...</div>}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >

                        {images.preview && <img src={images.preview} width='100' height='100' />}
                      </Grid>
                      <Button
                        variant="outlined"
                        size="small"
                        component="label"
                        onChange={imageChange}
                        error={err == 9 && true}
                        sx={{ width: "80%", color: "#060847", "&:hover": { color: "#060847" } }}
                      >
                        upload Property Images*
                        <input hidden type="file" multiple />
                      </Button>
                      {err === 9 && <div style={{ fontSize: "12px", color: "red" }}>Please Choose atleast Image...</div>}

                    </Grid>
                    <Grid item>
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
                                  image={`/images/properties/${image}`}

                                />

                                {oldImages.length !== 1 && (
                                  <Button variant="contained" color="primary" component="span" style={{ border: "1px solid black" }} fullWidth
                                    onClick={() => {

                                      delete_image(image);

                                    }}
                                  >
                                    {wait ? "Please Wait...." : "DELETE IMAGE"}

                                  </Button>)}
                              </Card>
                            </Grid>
                          })}
                        </Grid>
                      </Grid>
                      )}
                    </Grid>

                  </Grid>

                </Grid>
                <br />
                <br />
                <Button variant='contained' type='submit' disabled={wait} sx={{ backgroundColor: wait ? "white" : "#060847", color: wait ? "black" : "white", "&:hover": { backgroundColor: wait ? "white" : "#060847" } }}>{wait ? "Please Wait...." : "Update"}</Button>
              </form>
              <br />
              <br />
            </Box>
          </Container>
        )}
      </Grid>
      {/* </Grid> */}
    </div>
  )
}










