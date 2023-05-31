import React, { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../components/UserContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Compressor from "compressorjs";
import {
  TextField,
  Button,
  Box,
  Grid,
  Container,
  Typography,
  Dialog,
  DialogContent,
  Card,
  CardMedia,
  FormControl,
  MenuItem,
  Checkbox,
  Select,
  OutlinedInput,
  ListItemText,
  InputLabel,
  InputAdornment,
  FormControlLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  DialogContentText,
  DialogActions,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useNavigate, useParams } from "react-router-dom";

import { Location } from "../components/AutoCompLoc";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios'
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
const names = [
  "24 * 7 Security",
  "CCTV Security",
  "Kids Play Area",
  "Multiplex",
  "Power Backup",
  "Security Staff",
  "Swimming Pool",
];
const length = [
  {
    value: 1,
    label: "Sqyard",
  },
  {
    value: 2,
    label: "Sqfeet",
  },
  {
    value: 3,
    label: "Acre",
  },
  {
    value: 4,
    label: "Cent",
  },
  {
    value: 5,
    label: "Ankanam",
  },
  {
    value: 6,
    label: "Cunta",
  },
];


export const EditProperty = () => {
  let history = useNavigate();
  const { user,admin,tkn } = useContext(UserContext);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [wait, setWait] = useState(false)
const [item,setItem]=useState({prop_cat:"",title:"",prop_desc:"",loan_availability:"",prop_facing:"",prop_price:"",prop_approved_by:"",rera_num:"",video:"",tour:"",rent_sale:"",sale_type:"",rooms:"",bedrooms:"",bathrooms:"",garages:"",unit_no:"",})
const [images,setImages]=useState([])
const [prop_type,setProp_type]=useState("")
const [err,setErr]=useState(0)
const [loc,setLoc]=useState("")
const [locality,setLocality]=useState("")
const [area,setArea]=useState("")
const [city,setCity]=useState("")
const [state,setState]=useState("")
const [broucher,setBroucher]=useState([])
const [amenities,setAmenities]=useState([])
const [approvals,setApprovals]=useState("")
const [imageids, setImageIds] = useState("");
const [delImage, setDelImage] = useState("")
const [uploadwait, setUploadWait] = useState(false);
const [oldImages, setOldImages] = useState([]);
const [userdata,setUserData]=useState("")
const [userid,setUserId]=useState("")
const [otherApproval,setOtherApproval]=useState("")
let id=useParams()
useEffect(()=>{
    getData()
},[]);
const getData=()=>{
    console.log(id.id,"id")
    const formdata=new FormData()
    formdata.append("prop_id",id.id)
    formdata.append("aid", admin.admin_id);
    axios.post("/admin/get_single_property_new", formdata, {
      headers: { tkn: tkn },
    }).then(function (res) {
        console.log(res.data.data)
        if(res.data.status===1){
            setItem({
                prop_cat:res.data.data.prop_cat,
                title:res.data.data.prop_title,
                prop_desc:res.data.data.prop_desc,
                loan_availability:res.data.data.loan_available,
                prop_facing:res.data.data.prop_facing,
                prop_price:res.data.data.prop_price,
                prop_approved_by:res.data.data.property_approved_by,
                rera_num:res.data.data.rera_no,
                video:res.data.data.video_url,
                tour:res.data.data.tour_url,
                rent_sale:res.data.data.rent_sale,
                sale_type:res.data.data.sale_type,
                rooms:res.data.data.no_of_rooms,
                bedrooms:res.data.data.no_of_bedrooms,
                bathrooms:res.data.data.no_of_bathrooms,
                garages:res.data.data.no_of_garages,
                unit_no:res.data.data.flat_or_unit_no,
            })
            setUserId(res.data.data.user_ids)
            setUserData(res.data.data.role)
            setProp_type(res.data.data.prop_type)
            setApprovals(res.data.data.property_approved_by)
              setLocality(res.data.data.locality)
            setArea(res.data.data.area)
            setCity(res.data.data.city)
            setState(res.data.data.state)
            const array = res.data.data.amenities.split(",")
            setAmenities(array)
          
            setImageIds(res.data.data.prop_images)
            setOldImages(res.data.data.prop_images.split(','))
        }
    })
}
const handleChangeAmenities = (event) => {
  const {
    target: { value, checked },
  } = event;
  if (value === "all") {
    if (checked) {
      setAmenities(names);
    } else {
      setAmenities([]);
    }
  } else {
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((f) => f !== value));
    }
  }
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
  const handleChange=(e)=>{
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  const fileChange = async (e) => {
    console.log(e.target.files)
    
    if (e.target.length !== 0) {
     
      setBroucher(e.target.files[0]);
     
    }
  }
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
  const updateLoc = (loc) => {
    var loc_data = loc.split(", ");
    if (loc_data.length >= 5) {
      // alert("Success");
      setState(loc_data[loc_data.length - 2]);
      setCity(loc_data[loc_data.length - 3]);
      setArea(loc_data[loc_data.length - 4]);
      setLocality(loc_data[loc_data.length - 5]);
    } else {
      setSnack({
        message: "Please Choose Location with Locality and Area...",
        type: 'error',
        open: true,
        direction: "center"
    }); 
    }
    setLoc(loc);
  };
const handleSubmit=async(e)=>{
    e.preventDefault()
 
      // window.alert(prop_type)
      setErr(0)
      if(item.prop_cat===""){
        setErr(2)
        
          setSnack({
            message: "Please Select Property Category",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.title===""){
        setErr(3)
        
          setSnack({
            message: "Please Enter Property Title",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.prop_desc===""){
        setErr(4)
        
          setSnack({
            message: "Please Enter Property Description",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.loan_availability===""){
        setErr(5)
        
          setSnack({
            message: "Please Select if Loan is Available Or Not?",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(user.role==="3" && item.rent_sale===""){
        setErr(6)
        
          setSnack({
            message: "Please Select Rent /Sale",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.rent_sale === "2" && item.sale_type===""){
        setErr(7)
        
          setSnack({
            message: "Please Select Sale Type",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(locality===""){
        setErr(8)
        
          setSnack({
            message: "Please Select Location",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.prop_facing===""){
        setErr(9)
        
          setSnack({
            message: "Please Select Property Facing",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(item.prop_price===""){
        setErr(10)
        
          setSnack({
            message: "Please Enter Property Price",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else if(oldImages===""){
        setErr(11)
        
          setSnack({
            message: "Please Choose Property Images",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else{
     


    const formdata=new FormData();
    formdata.append("userid",userid)
    formdata.append("prop_id",id.id)
    formdata.append("title",item.title)
     for (var i = 0; i < images.length; i++) {
    
      formdata.append('images', images[i].raw);
    }
  
    formdata.append('images', imageids);
    formdata.append("prop_desc",item.prop_desc)
   
    formdata.append("locality",locality)
    formdata.append("area",area)
    formdata.append("city",city)
     formdata.append("state",state)
     formdata.append("approved_by",item.prop_approved_by)
     formdata.append("rera_no",item.rera_num)
     formdata.append("video_url",item.video)
     formdata.append("tour_url",item.tour)
     formdata.append("loan_available",item.loan_availability)
     formdata.append("broucher",broucher)
     formdata.append("amenities",amenities)
     formdata.append("prop_type",prop_type)
     formdata.append("prop_cat",item.prop_cat)
     formdata.append("rent_sale",item.rent_sale)
     formdata.append("prop_facing",item.prop_facing)
     formdata.append("prop_price",item.prop_price)
     formdata.append("sale_type",item.sale_type)
      formdata.append("no_rooms",item.rooms)
      formdata.append("no_bedrooms",item.bedrooms)
      formdata.append("no_bathrooms",item.bathrooms)
      formdata.append("no_garages",item.garages) 
      formdata.append("aid", admin.admin_id);
      formdata.append("flat_unit_no",item.unit_no) 
    await axios.post("/admin/edit_property_by_id", formdata, {
      headers: { tkn: tkn },
    }).then(function (res) {
  console.log(res)
  if(res.data.status===1){
    setSnack({
      message: res.data.msg,
      type: "success",
      open: true,
    });
    history('/Dashboard/property_details')
  }
  else{
    setSnack({
      message: res.data.msg,
      type: "error",
      open: true,
    });
  }
      })
    
  }
}
const delete_image = async (image) => {
  // e.preventDefault();
  console.log(image, "=========ïmage==========")

  console.log("=========gani=======")
  const formdata = new FormData();
  // formdata.append("uid", user.user_id);
  // formdata.append("images", imageids);
  formdata.append("image", image);
  // formdata.append("userid",user.user_id)
  formdata.append("prop_id",id.id)
  await axios.post("/admin/deleteimages", formdata
  // , {
  //   headers: { tkn: tkn },
  // }
  ).then(function (res) {
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
    <Container maxWidth="md">
                        {/* {JSON.stringify(userdata,"userdata")} */}
                        <Box
                          sx={{
                            mt: 3,
                            pt: 3,
                            boxShadow: 5,
                            borderRadius: "20px",
                            backgroundColor: "white",
                          }}
                        >
                        
                          <Typography variant="h5" sx={{ color: "#060847" }}>
                            Edit Property
                          </Typography>

                          <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="prop_cat"
                                label="Property Category*"
                                select
                                value={item.prop_cat}
                                onChange={handleChange}
                                error={err == 2 && true}
                                sx={{ m: 2, width: "90%" }}
                              >
                                {prop_type === 1 && prop_type !== 2 && (
                                  <MenuItem value="House">House</MenuItem>
                                )}
                                {prop_type === 1 && prop_type !== 2 && (
                                  <MenuItem value="Apartment">
                                    Apartment
                                  </MenuItem>
                                )}
                                {prop_type === 1 && prop_type !== 2 && (
                                  <MenuItem value="Farmlands">
                                    Farmlands
                                  </MenuItem>
                                )}

                                <MenuItem value="Plot">Plot</MenuItem>

                                {prop_type !== 1 && prop_type === 2 && (
                                  <MenuItem value="Office Space">
                                    Office Space
                                  </MenuItem>
                                )}
                                {prop_type !== 1 && prop_type === 2 && (
                                  <MenuItem value="Shop">Shop</MenuItem>
                                )}
                                {prop_type === 1 && (
                                  <MenuItem value="Villa">Villa</MenuItem>
                                )}
                              </TextField>
                              {err === 2 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Select Property Category...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="title"
                                label="Property Title *"
                                value={item.title}
                                onChange={handleChange}
                                error={err == 3 && true}
                                sx={{ m: 1, width: "90%" }}
                              />
                              {err === 3 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Enter Property Title...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                multiline
                                rows={4}
                                type="text"
                                size="small"
                                name="prop_desc"
                                label="Description *"
                                value={item.prop_desc}
                                onChange={handleChange}
                                error={err == 4 && true}
                                sx={{
                                  m: 1,
                                  width: "90%",
                                }}
                              />
                              {err === 4 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Enter Property Description...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                select
                                type="text"
                                size="small"
                                name="loan_availability"
                                label="Loan Availability *"
                                value={item.loan_availability}
                                onChange={handleChange}
                                error={err == 5 && true}
                                sx={{
                                  m: 1,
                                  width: "90%",
                                }}
                              >
                                <MenuItem value="1">YES</MenuItem>
                                <MenuItem value="2">NO</MenuItem>
                              </TextField>
                              {err === 5 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Select Loan Availability...
                                </div>
                              )}
                            </Grid>
                            {userdata !== 3 && (
                              <>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <TextField
                                    select
                                    type="text"
                                    size="small"
                                    name="rent_sale"
                                    label="Rent / Sale *"
                                    value={item.rent_sale}
                                    onChange={handleChange}
                                    error={err == 6 && true}
                                    sx={{
                                      m: 1,
                                      width: "90%",
                                    }}
                                  >
                                    <MenuItem value="1">Rent</MenuItem>
                                    <MenuItem value="2">Sale</MenuItem>
                                  </TextField>
                                  {err === 6 && (
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                      }}
                                    >
                                      Please Select Rent / Sale...
                                    </div>
                                  )}
                                </Grid>
                                {item.rent_sale === "2" && (
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
                                      name="sale_type"
                                      label="Resale / New *"
                                      value={item.sale_type}
                                      onChange={handleChange}
                                      error={err == 7 && true}
                                      sx={{
                                        m: 1,
                                        width: "90%",
                                      }}
                                    >
                                      <MenuItem value="1">Resale</MenuItem>
                                      <MenuItem value="2">New</MenuItem>
                                    </TextField>
                                    {err === 7 && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                        }}
                                      >
                                        Please Select Resale / New...
                                      </div>
                                    )}
                                  </Grid>
                                )}
                              </>
                            )}
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <Location
                                error={err == 8 && true}
                                loc={loc}
                                setloc={updateLoc}
                                style={{ m: 1 }}
                              />
                               {/* <div
                                  style={{
                                    fontSize: "12px",
                                    color: "green",
                                    ml: 2,
                                    pl: 3
                                  }}
                                >
                                Location: {locality},{area},{city},{state}
                                </div> */}
                              {err === 8 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    ml: 2,
                                    pl: 3
                                  }}
                                >
                                  Enter Property Address like "Jayabheri
                                  Enclave, Gachibowli, Hyderabad, Telangana,
                                  India"
                                </div>
                              )}
                            </Grid>
                            {locality   && (<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <p><b>Locality:</b> {locality}</p>
                            </Grid>)}
                            {area  && (<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <p><b>Area:</b> {area}</p>
                            </Grid>)}      
                            {city   && (<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <p><b>City:</b> {city}</p>
                            </Grid>)}      
                            {state   && (<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <p><b>State:</b> {state}</p>
                            </Grid>)}    
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="prop_facing"
                                select
                                label="Property Facing *"
                                value={item.prop_facing}
                                onChange={handleChange}
                                error={err == 9 && true}
                                sx={{ m: 2, width: "90%" }}
                              >
                                <MenuItem value="East">East</MenuItem>
                                <MenuItem value="West">West</MenuItem>

                                <MenuItem value="North">North</MenuItem>
                                <MenuItem value="South">South</MenuItem>

                                <MenuItem value="North-East">
                                  North-East
                                </MenuItem>
                                <MenuItem value="North-West">
                                  North-West
                                </MenuItem>
                                <MenuItem value="South-East">
                                  South-East
                                </MenuItem>
                                <MenuItem value="South-West">
                                  South-West
                                </MenuItem>
                              </TextField>
                              {err === 9 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Select Property Facing...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="number"
                                size="small"
                                name="prop_price"
                                label="Property Price (in INR) *"
                                value={item.prop_price}
                                onChange={handleChange}
                                error={err == 10 && true}
                                sx={{ m: 2, width: "90%" }}
                              />
                              {err === 10 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                >
                                  Please Enter Property Price...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="video"
                                label="Video URL"
                                value={item.video}
                                onChange={handleChange}

                                sx={{ m: 2, width: "90%" }}
                              />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="tour"
                                label="Virtual Tour URL"
                                value={item.tour}
                                onChange={handleChange}

                                sx={{ m: 2, width: "90%" }}
                              />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <Button
                                variant="outlined"
                                component="label"
                                onChange={fileChange}

                                sx={{
                                  color: "#060847",
                                  width: "90%",
                                  "&:hover": { color: "#060847" },
                                }}
                              >
                                Upload Broucher
                                <input hidden type="file" />
                              </Button>
                              <p>{broucher.name}</p>

                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} mt={2} >
                            <FormControl>
  <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:'start'}}>
    <Typography variant="ps2" sx={{color:'black'}}> Approved By</Typography>
    <Typography variant="ps2" sx={{color:'gray'}}>&nbsp;(Optional) </Typography>
  </FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    
    name="radio-buttons-group"
  >
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div>
      <FormControlLabel
        value="GHMC"
        control={<Radio />}
        label="GHMC"
        onChange={(e) => setApprovals(e.target.value)}
       
      />
    </div>
    <div>
      <FormControlLabel
        value="HMDA"
        control={<Radio />}
        label="HMDA"
        onChange={(e) => setApprovals(e.target.value)}
      
      />
    </div>
    <div>
      <FormControlLabel
        value="DTCP"
        control={<Radio />}
        label="DTCP"
        onChange={(e) => setApprovals(e.target.value)}
      
      />
    </div>
   
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div>
      <FormControlLabel
        value="TUDA"
        control={<Radio />}
        label="TUDA"
        onChange={(e) => setApprovals(e.target.value)}
      
      />
    </div>
    <div>
      <FormControlLabel
        value="NUDA"
        control={<Radio />}
        label="NUDA"
        onChange={(e) => setApprovals(e.target.value)}
      
      />
    </div>
    <div>
      <FormControlLabel
        value="Others"
        control={<Radio />}
        label="Others"
        onChange={(e) => setApprovals(e.target.value)}
      
      />
    </div>
  </div>
  </RadioGroup>
</FormControl>
                              {/* {approvals==="Others"} */}

                            </Grid>
                            {approvals==="Others" &&  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                      <TextField
                                type="text"
                                size="small"
                                name="otherApproval"
                                value={otherApproval}
                                onChange={(e)=>setOtherApproval(e.target.value)}
                                label="Approved By (optional)"
                              
                                sx={{ m: 2, width: "90%" }}
                              />
    </Grid>}         
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              <TextField
                                type="text"
                                size="small"
                                name="rera_num"
                                label="RERA No "
                                value={item.rera_num}
                                onChange={handleChange}
                                sx={{ m: 2, width: "90%" }}
                              />
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              m={2}
                            >
                              <Grid ml={10}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  <b>Amenities:</b>
                                </Typography>
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
                                          checked={
                                            amenities.indexOf(name) !== -1
                                          }
                                          onChange={handleChangeAmenities}
                                        />
                                      }
                                      value={name}
                                      label={name}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
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
                        error={err == 11 && true}
                        sx={{ width: "90%", color: "#060847", "&:hover": { color: "#060847" } }}
                      >
                        upload Property Images*
                        <input hidden type="file" multiple />
                      </Button>
                      {err === 11 && <div style={{ fontSize: "12px", color: "red" }}>Please Choose atleast Image...</div>}

                    </Grid>
                    <Grid item >
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
                          ml={3}
                          mt={2}
                        >

                          {/* {JSON.stringify(oldImages)} */}
                          {oldImages.map((image) => {

                            return <Grid item >

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

                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            mt={3}
                            spacing={1}
                          >
                          
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
                                  fontSize: 14,
                                  color: "white",
                                  backgroundColor: "#060847",
                                }}
                                onClick={handleSubmit}
                                className="linkstyle"
                              >
                                <b>Update</b>
                                <KeyboardArrowRightIcon />
                              </Button>
                            </Grid>
                          </Grid>

                          <br />
                          <br />
                        </Box>
                      </Container>
    </div>
  );
};
