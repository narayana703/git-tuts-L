import React, { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../../components/UserContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
    TextField,
    Button,
    Box,
    Grid,
    Container,
    Typography,
    Card,
    CardMedia,
    MenuItem,
} from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from "react-router-dom";
import { LeftDrawer } from "../../Dashboard/Leftdrawer";
import { Location } from "../../components/AutoCompLoc";
import { Helmet } from "react-helmet";
import Compressor from "compressorjs";
import axios from "axios";


export const EditProject = () => {
    let id = useParams()
    const [wait, setWait] = useState(false)
    const [doc, setDoc] = useState("")
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([]);
    const [banner, setBanner] = useState([])
    const [uploadwaitt, setUploadWaitt] = useState(false);
    const [err, setErr] = useState(0);
    const [item, setItem] = useState({ projType: "", title: "", ptype: "", pstatus: "", })
    const [uploadwait, setUploadWait] = useState(false);
    const [loc, setLoc] = useState("")
    const { snack, setSnack } = useContext(SnackbarContext);
    const { admin, tkn } = useContext(UserContext)
    const [projdesc, setProjDesc] = useState("")
    const [ckdesc, setCkDesc] = useState("")
    const [locdesc, setLocDesc] = useState("")
    const [ckdesc1, setCkDesc1] = useState("")
    const [projHigh, setProjHigh] = useState("")
    const [ckdesc2, setCkDesc2] = useState("")
    const [imageids, setImageIds] = useState("");
    const [projImage, setProjImage] = useState([])
    const [locImage, setLocImage] = useState([])
    let history = useNavigate()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const formdata = new FormData()
        formdata.append('aid', admin.admin_id)
        formdata.append('proj_id', id.id)
        await axios.post("/admin/get_single_projects", formdata, {
            headers: { tkn: tkn },
        }).then(function (res) {
            console.log(res.data.data)
            if (res.data.status === 1) {
                setItem({
                    projType: res.data.data.project_type,
                    title: res.data.data.project_title,
                    ptype: res.data.data.property_type,
                    pstatus: res.data.data.project_status,
                })
                setLoc(res.data.data.location)
                setProjDesc(res.data.data.project_desc)
                setProjHigh(res.data.data.proj_highlights)
                setLocDesc(res.data.data.loc_highlights)
                setImageIds(res.data.data.project_images)
                setOldImages(res.data.data.project_images?.split(','))
                setDoc(res.data.data.broacher)
            }
        })
    }
    const fileChange = async (e) => {
        console.log(e.target.files)

        if (e.target.length !== 0) {

            setDoc(e.target.files[0]);

        }



    };
    const itemChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

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
    const imageChange1 = async (e) => {
        console.log(banner.length)
        if (banner.length + e.target.files.length <= 1) {
            console.log("===============")
            var arr = [];
            for (var i = 0; i < e.target.files.length; i++) {
                console.log("========fff=======")
                var type = e.target.files[i].type;
                if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
                    const image = e.target.files[i];
                    console.log(image)
                    var img = await compImage(image);
                    arr.push({ raw: img, preview: URL.createObjectURL(img) });
                    console.log(arr)
                } else {
                    alert("Please select only JPEG, JPG, PNG Images..")
                }
            }
            console.log(arr)
            setBanner([...banner, ...arr]);


            console.log(images)
            e.target.value = ""
        }
    }

    const projImageChange = async (e) => {
        console.log(projImage.length)
        if (projImage.length + e.target.files.length <= 1) {
          console.log("===============")
          var arr = [];
          for (var i = 0; i < e.target.files.length; i++) {
            console.log("========fff=======")
            var type = e.target.files[i].type;
            if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
              const image = e.target.files[i];
              console.log(image)
              var img = await compImage(image);
              arr.push({ raw: img, preview: URL.createObjectURL(img) });
              console.log(arr)
            } else {
              alert("Please select only JPEG, JPG, PNG Images..")
            }
          }
          console.log(arr)
          setProjImage([...projImage, ...arr]);
    
       
        // console.log(images)
        e.target.value = ""
      }
    }

    const locImageChange = async (e) => {
        console.log(locImage.length)
        if (locImage.length + e.target.files.length <= 1) {
          console.log("===============")
          var arr = [];
          for (var i = 0; i < e.target.files.length; i++) {
            console.log("========fff=======")
            var type = e.target.files[i].type;
            if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
              const image = e.target.files[i];
              console.log(image)
              var img = await compImage(image);
              arr.push({ raw: img, preview: URL.createObjectURL(img) });
              console.log(arr)
            } else {
              alert("Please select only JPEG, JPG, PNG Images..")
            }
          }
          console.log(arr)
          setLocImage([...locImage, ...arr]);
    
       
        // console.log(images)
        e.target.value = ""
      }
    }
    const updateLoc = (loc) => {
        setLoc(loc);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr(0)
        if (item.projType === "") {
            setErr(1)
            setSnack({
                message: "Please Select Project Type",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (item.title === "") {
            setErr(2)
            setSnack({
                message: "Please Select Project Title",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (item.ptype === "") {
            setErr(3)
            setSnack({
                message: "Please Select Property Type",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (loc === "") {
            setErr(4)
            setSnack({
                message: "Please Enter Location",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (doc.length === 0) {
            setErr(5)
            setSnack({
                message: "Please Choose Pdf file",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (item.pstatus === "") {
            setErr(11)
            setSnack({
                message: "Please Choose Project images",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (banner.length === 0) {
            setErr(6)
            setSnack({
                message: "Please Choose Banner Image",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (oldImages === "") {
            setErr(7)
            setSnack({
                message: "Please Choose Project images",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (projdesc === "") {
            setErr(8)
            setSnack({
                message: "Please Enter Project Description",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (projHigh === "") {
            setErr(9)
            setSnack({
                message: "Please Enter Project Highlights",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if (locdesc === "") {
            setErr(10)
            setSnack({
                message: "Please Enter Location Highlights",
                type: 'error',
                open: true,
                direction: "center"
            });
        }
        else if(projImage.length===0){
            setErr(11)
            setSnack({
                message: "Please Choose Project Highlights Image...",
                type: 'error',
                open: true,
                direction: "center"
              });
        }
        else if(locImage.length===0){
            setErr(12)
            setSnack({
                message: "Please Choose Location Highlights Image...",
                type: 'error',
                open: true,
                direction: "center"
              });
        }
        else {
            console.log(locImage,"locImage")
            const formdata = new FormData()
            formdata.append('aid', admin.admin_id)
            formdata.append('proj_title', item.title)
            formdata.append('prop_type', item.ptype)
            formdata.append('location', loc)
            formdata.append('proj_id', id.id)
            formdata.append('banner', banner[0].raw)
            formdata.append('broacher', doc)
            formdata.append('proj_desc', projdesc)
            formdata.append('proj_type', item.projType)
            formdata.append('proj_high_lights', projHigh)
            formdata.append('loc_highlights', locdesc)
            formdata.append('proj_status', item.pstatus)
            formdata.append('proj_high_image',projImage[0].raw) 
            formdata.append('loc_img',locImage[0].raw) 
            for (var i = 0; i < images.length; i++) {

                formdata.append('proj_images', images[i].raw);
            }
            formdata.append('proj_images', imageids);
            await axios.post("/admin/edit_project", formdata, {
                headers: { tkn: tkn },
            }).then(function (res) {
                if (res.data.status === 1) {
                    console.log("hiii")
                    setSnack({
                        message: res.data.msg,
                        type: 'success',
                        open: true,
                        direction: "center"
                    });
                      history('/Dashboard/all_projects')
                }
                else {
                    setSnack({
                        message: res.data.msg,
                        type: 'error',
                        open: true,
                        direction: "center"
                    });
                }
            })
        }

    }

    const delete_image = async (image) => {
        // e.preventDefault();
    
        console.log("=========gani=======")
        const formdata = new FormData();
 
        formdata.append("images", image);
        formdata.append("proj_id", id.id)
        await axios.post("/admin/delete_proj_images", formdata).then(function (res) {
          if (res.data.status === 1) {
            setSnack({
              message: res.data.msg,
              type: 'success',
              open: true,
              direction: "center"
            });
            // setLoading(false);
            getData()
    
          } else {
    
            setSnack({
              message: res.data.msg,
              type: 'error',
              open: true,
              direction: "center"
            });
            getData()
          }
    
    
        });
      }
    return (
        <div>
            <Helmet>

                <title>Add Project| Buy or Sell or Rent Property Online</title>

            </Helmet>
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={3}>
                    {/* <LeftDrawer /> */}
                </Grid>
                <Grid item xs={9}>
                    <Container maxWidth="lg">

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            mt={5}
                        >
                            <Typography variant="h4" style={{ color: "#060847" }}>
                                Edit Project
                            </Typography>
                        </Grid>
                        <br />


                        <Box
                            sx={{
                                mt: 3,
                                pt: 3,
                                p:3,
                                boxShadow: 5,
                                borderRadius: "20px",
                                backgroundColor: "white",
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{
                                        textAlign: "center",
                                        margin: "0 auto",
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            type="text"
                                            select
                                            size="small"
                                            name="projType"
                                            label="Project Type*"
                                            value={item.projType}
                                            onChange={itemChange}
                                            error={err == 1 && true}
                                            sx={{ m: 1, width: "80%" }}
                                        >
                                            <MenuItem value="1">On Going</MenuItem>
                                            <MenuItem value="2">Up Comming</MenuItem>
                                        </TextField>
                                        {err === 1 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please select Project Type...
                                            </div>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            type="text"
                                            size="small"
                                            name="title"
                                            label="Project Title*"
                                            value={item.title}
                                            onChange={itemChange}
                                            error={err == 2 && true}
                                            sx={{ m: 1, width: "80%" }}
                                        />
                                        {err === 2 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Enter Project Title...
                                            </div>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            type="text"
                                            size="small"
                                            select
                                            name="ptype"
                                            label="Property Type *"
                                            value={item.ptype}
                                            onChange={itemChange}
                                            error={err == 3 && true}
                                            sx={{ m: 1, width: "80%" }}
                                        >
                                            <MenuItem value="Apartment">Apartment</MenuItem>
                                            <MenuItem value="Farmland">Farmland</MenuItem>
                                            <MenuItem value="House">House</MenuItem>
                                            <MenuItem value="Villa">Villa</MenuItem>
                                        </TextField>
                                        {err === 3 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Select Property Type...
                                            </div>
                                        )}
                                    </Grid>


                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            select
                                            type="text"
                                            size="small"
                                            name="loc"
                                            label="Location*"
                                            value={loc}
                                            onChange={(e) => setLoc(e.target.value)}
                                            error={err == 4 && true}
                                            sx={{ m: 1, width: "80%" }}
                                        >
                                            <MenuItem value="Bangalore">Bangalore</MenuItem>
                                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                            <MenuItem value="Tirupati">Tirupati</MenuItem>
                                        </TextField>
                                        {/* <Location  error={err == 4 && true}  loc={loc} setloc={updateLoc} style={{ m: 1 }}/> */}
                                        {err === 4 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Enter Location...
                                            </div>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <br />
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            sx={{
                                                textAlign: "start",
                                                marginBottom: 0,
                                                marginLeft: 9,
                                            }}
                                        >
                                            <b> Attachment File* </b>
                                        </Typography>
{/* {JSON.stringify(doc)} */}
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            onChange={fileChange}
                                            error={err == 5 && true}
                                            sx={{
                                                color: "#060847",
                                                width: "80%",
                                                "&:hover": { color: "#060847" },
                                            }}
                                        >
                                            Upload Broacher*
                                            <input hidden type="file" />
                                        </Button>
                                      
                                        <p>{doc.name? <>{doc.name}</>:<>{doc}</>}</p>
                                        {/* {doc.preview && <img src={doc.preview} width='100' height='100' />} */}
                                        {err === 5 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Choose PDF File...
                                            </div>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            type="text"
                                            size="small"
                                            select
                                            name="pstatus"
                                            label="Property Status *"
                                            value={item.pstatus}
                                            onChange={itemChange}
                                            error={err == 11 && true}
                                            sx={{ m: 1, width: "80%" }}
                                        >
                                            <MenuItem value="1">Active</MenuItem>
                                            <MenuItem value="2">Inactive</MenuItem>

                                        </TextField>
                                        {err === 11 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Select Property Type...
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {banner.preview && (
                                                <img
                                                    src={banner.preview}
                                                    width="100"
                                                    height="100"
                                                />
                                            )}
                                        </Grid>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            sx={{
                                                textAlign: "start",
                                                marginBottom: 0,
                                                marginLeft: 9,
                                            }}
                                        >
                                            <b>Banner Images*: </b>
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component="label"
                                            onChange={imageChange1}
                                            error={err == 6 && true}
                                            sx={{
                                                width: "80%",
                                                height: 36,
                                                color: "#060847",
                                                "&:hover": { color: "#060847" },
                                            }}
                                        >
                                            Upload Banner *
                                            <input hidden type="file" />
                                        </Button>

                                        {err === 6 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Choose Banner Image...
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        {uploadwaitt ? (
                                            <span style={{ color: "white" }}>
                                                <br />
                                                <br />
                                                Adding Images...
                                            </span>
                                        ) : (
                                            <>
                                                {banner.length !== 0 ? (
                                                    <Grid item xs={12}
                                                        sm={6}
                                                        md={6}
                                                        lg={6}
                                                        xl={6} >
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justify="flex-start"
                                                            alignItems="flex-start"
                                                            spacing={3}
                                                            m={2}
                                                        >
                                                            {banner.map((image) => {
                                                                return (
                                                                    <Grid item>
                                                                        <Card>
                                                                            <CardMedia
                                                                                style={{
                                                                                    height: 200,
                                                                                    width: 200,
                                                                                    m: 2,
                                                                                    p: 2,
                                                                                }}
                                                                                image={image.preview}
                                                                                title={image.preview}
                                                                            />
                                                                            <Button
                                                                                variant="outlined"
                                                                                color="primary"
                                                                                component="span"
                                                                                style={{
                                                                                    border:
                                                                                        "1px solid black",
                                                                                    color: "#060847",
                                                                                    "&:hover": {
                                                                                        color: "#060847",
                                                                                    },
                                                                                }}
                                                                                fullWidth
                                                                                onClick={() => {
                                                                                    setBanner(
                                                                                        images.filter(
                                                                                            (item) =>
                                                                                                item.preview !==
                                                                                                image.preview
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            >
                                                                                DELETE IMAGE
                                                                            </Button>
                                                                        </Card>
                                                                    </Grid>
                                                                );
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    ""
                                                )}
                                            </>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {images.preview && (
                                                <img
                                                    src={images.preview}
                                                    width="100"
                                                    height="100"
                                                />
                                            )}
                                        </Grid>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            sx={{
                                                textAlign: "start",
                                                marginBottom: 0,
                                                marginLeft: 9,
                                            }}
                                        >
                                            <b>Project Images*: </b>
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component="label"
                                            onChange={imageChange}
                                            error={err == 7 && true}
                                            sx={{
                                                width: "80%",
                                                height: 36,
                                                color: "#060847",
                                                "&:hover": { color: "#060847" },
                                            }}
                                        >
                                            Upload*
                                            <input hidden type="file" multiple />
                                        </Button>

                                        {err === 7 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Choose Image...
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <br/>
                                        <br/>
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
                                mt={1}
                              >
                                {images.map((i) => {

                                  return <Grid item  mt={1}>
                                    <Card m={3} p={3}>
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
                                  image={`/images/projects/${image}`}

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
                                    <Grid
                                        container spacing={0}
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                    >

                                        <Grid
                                            item
                                            xs={11}
                                            sm={11}
                                            md={5}
                                            lg={5}
                                            xl={5}
                                            mt={2}

                                        >
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                gutterBottom
                                                sx={{
                                                    textAlign: "start",
                                                    marginBottom: 0,
                                                    marginLeft: 9,
                                                }}
                                                error={err == 8 && true}
                                            >
                                                <b>Project Description*: </b>
                                            </Typography>
                                            {err === 8 && (
                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "red",
                                                    }}
                                                >
                                                    Please Enter Project Description...
                                                </div>
                                            )}
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={projdesc}
                                                onReady={(editor) => {
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setProjDesc(data);
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={11}
                                            sm={11}
                                            md={5}
                                            lg={5}
                                            xl={5}
                                            mt={2}
                                        >
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                gutterBottom
                                                sx={{
                                                    textAlign: "start",
                                                    marginBottom: 0,
                                                    marginLeft: 9,
                                                }}
                                                error={err == 9 && true}
                                            >
                                                <b>Project Highlights*: </b>
                                            </Typography>
                                            {err === 9 && (
                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "red",
                                                    }}
                                                >
                                                    Please Enter Project Highlights...
                                                </div>
                                            )}
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={projHigh}
                                                onReady={(editor) => {
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setProjHigh(data);
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={11}
                                        sm={11}
                                        md={5}
                                        lg={5}
                                        xl={5}
                                        mt={2}

                                    >
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                            sx={{
                                                textAlign: "start",
                                                marginBottom: 0,
                                                marginLeft: 9,
                                            }}
                                            error={err == 10 && true}
                                        >
                                            <b>Location Highlights *: </b>
                                        </Typography>
                                        {err === 10 && (
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "red",
                                                }}
                                            >
                                                Please Enter Location Hightlights...
                                            </div>
                                        )}

                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={locdesc}
                                            onReady={(editor) => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setLocDesc(data);
                                            }}
                                            onBlur={(event, editor) => {
                                                console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                console.log('Focus.', editor);
                                            }}
                                        />
                                    </Grid>

                                    <Grid
                                   item
                                        xs={11}
                                        sm={11}
                                        md={5}
                                        lg={5}
                                        xl={6}
                                        mt={2}
                                        ml={3}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {projImage.preview && (
                                            <img
                                                src={projImage.preview}
                                                width="100"
                                                height="100"
                                            />
                                        )}
                                    </Grid>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        sx={{
                                            textAlign: "start",
                                            marginBottom: 0,
                                            marginLeft: 20,
                                        }}
                                    >
                                        <b>Project Highlights Image*: </b>
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component="label"
                                        onChange={projImageChange}
                                        error={err == 11 && true}
                                        sx={{
                                            width: "80%",
                                            height: 36,
                                            color: "#060847",
                                            "&:hover": { color: "#060847" },
                                        }}
                                    >
                                        Upload Project Image *
                                        <input hidden type="file"  />
                                    </Button>

                                    {err === 11 && (
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "red",
                                            }}
                                        >
                                            Please Choose Project Image...
                                        </div>
                                    )}
                                </Grid>
                                <Grid item>
                                    {uploadwaitt ? (
                                        <span style={{ color: "white" }}>
                                            <br />
                                            <br />
                                            Adding Images...
                                        </span>
                                    ) : (
                                        <>
                                            {projImage.length !== 0 ? (
                                                <Grid item  xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                xl={6} >
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-start"
                                                        alignItems="flex-start"
                                                        spacing={3}
                                                        m={2}
                                                    >
                                                        {projImage.map((image) => {
                                                            return (
                                                                <Grid item>
                                                                    <Card>
                                                                        <CardMedia
                                                                            style={{
                                                                                height: 200,
                                                                                width: 200,
                                                                                m: 2,
                                                                                p: 2,
                                                                            }}
                                                                            image={image.preview}
                                                                            title={image.preview}
                                                                        />
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            component="span"
                                                                            style={{
                                                                                border:
                                                                                    "1px solid black",
                                                                                color: "#060847",
                                                                                "&:hover": {
                                                                                    color: "#060847",
                                                                                },
                                                                            }}
                                                                            fullWidth
                                                                            onClick={() => {
                                                                                setProjImage(
                                                                                    images.filter(
                                                                                        (item) =>
                                                                                            item.preview !==
                                                                                            image.preview
                                                                                    )
                                                                                );
                                                                            }}
                                                                        >
                                                                            DELETE IMAGE
                                                                        </Button>
                                                                    </Card>
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    )}
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {locImage.preview && (
                                            <img
                                                src={locImage.preview}
                                                width="100"
                                                height="100"
                                            />
                                        )}
                                    </Grid>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        sx={{
                                            textAlign: "start",
                                            marginBottom: 0,
                                            marginLeft: 9,
                                        }}
                                    >
                                        <b>Location Highlights Image*: </b>
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component="label"
                                        onChange={locImageChange}
                                        error={err == 12 && true}
                                        sx={{
                                            width: "80%",
                                            height: 36,
                                            color: "#060847",
                                            "&:hover": { color: "#060847" },
                                        }}
                                    >
                                        Upload Location Image *
                                        <input hidden type="file"  />
                                    </Button>

                                    {err === 12 && (
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "red",
                                            }}
                                        >
                                            Please Choose Location Image...
                                        </div>
                                    )}
                                </Grid>
                                
                                <Grid item>
                                    {uploadwaitt ? (
                                        <span style={{ color: "white" }}>
                                            <br />
                                            <br />
                                            Adding Images...
                                        </span>
                                    ) : (
                                        <>
                                            {locImage.length !== 0 ? (
                                                <Grid item  xs={12}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                xl={6} >
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-start"
                                                        alignItems="flex-start"
                                                        spacing={3}
                                                        m={2}
                                                    >
                                                        {locImage.map((image) => {
                                                            return (
                                                                <Grid item>
                                                                    <Card>
                                                                        <CardMedia
                                                                            style={{
                                                                                height: 200,
                                                                                width: 200,
                                                                                m: 2,
                                                                                p: 2,
                                                                            }}
                                                                            image={image.preview}
                                                                            title={image.preview}
                                                                        />
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            component="span"
                                                                            style={{
                                                                                border:
                                                                                    "1px solid black",
                                                                                color: "#060847",
                                                                                "&:hover": {
                                                                                    color: "#060847",
                                                                                },
                                                                            }}
                                                                            fullWidth
                                                                            onClick={() => {
                                                                                setLocImage(
                                                                                    images.filter(
                                                                                        (item) =>
                                                                                            item.preview !==
                                                                                            image.preview
                                                                                    )
                                                                                );
                                                                            }}
                                                                        >
                                                                            DELETE IMAGE
                                                                        </Button>
                                                                    </Card>
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    )}
                                </Grid>


                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                    >
                                        <Button variant="contained" type="submit" sx={{ m: 1 }}>Submit Property</Button>
                                    </Grid>
                                </Grid>
                                {/* <br />
                          <br /> */}


                            </form>
                            <br />
                            <br />
                        </Box>

                    </Container>
                    <br/>
                    <br/>
                </Grid>
            </Grid>
        </div>
    );
};