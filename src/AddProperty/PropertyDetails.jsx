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
var momentt = require("moment-timezone");
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


export const PropertyDetails = () => {
  let history = useNavigate();
  const { user,admin,tkn } = useContext(UserContext);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [wait, setWait] = useState(false)
const [item,setItem]=useState({prop_facing:"",rent_sale:"",sale_type:"",rooms:"",bedrooms:"",bathrooms:"",garages:"",unit_no:"",})
const [images,setImages]=useState([])
const [prop_type,setProp_type]=useState("")
const [prop_cat,setPropCat]=useState("")
const [err,setErr]=useState(0)
let id=useParams()
const [broucher,setBroucher]=useState([])
const [amenities,setAmenities]=useState([])
const [approvals,setApprovals]=useState("")
const [proj_overview,setProjOverview]=useState("")
const [proj_highlights,setProjHighlights]=useState("")
const [proj_overall_area,setProjOverallArea]=useState()
const [proj_min_area,setProjMinArea]=useState()
const [proj_max_area,setProjMaxArea]=useState()
const [selectedValue, setSelectedValue] = useState();
const [sqftvalue, setSqftValue] = useState();
const [proj_size,setProj_size]=useState("")
const [avgPrice,setAvgPrice]=useState("")
const [possession_status,setPossessionStatus]=useState("")
const [config,setConfig]=useState("")
const [launch_date,setLanunchDate]=useState("")
const [furnished,setFurnished]=useState("")
const [parking,setParking]=useState("")
const [washroom,setWashroom]=useState("")
const [floor_num,setFloorNum]=useState("")
const [selectedValueMin, setSelectedValueMin] = useState();
const [sqftvalueMin, setSqftValueMin] = useState();
const [selectedValueMax, setSelectedValueMax] = useState();
const [sqftvalueMax, setSqftValueMax] = useState();
const [landArea,setLandArea]=useState()
const [selectedValueLand, setSelectedValueLand] = useState();
const [sqftvalueLand, setSqftValueLand] = useState();
const [builtArea,setBuiltArea]=useState()
const [selectedValueBuilt, setSelectedValueBuilt] = useState();
const [sqftvalueBuilt, setSqftValueBuilt] = useState();
const [landLength,setLandLength]=useState("")
const [landWidth,setLandWidth]=useState("")
const [builtLength,setBuiltLength]=useState("")
const [builtWidth,setbuiltWidth]=useState("")
const [userdata,setUserData]=useState("")
useEffect(()=>{
  getData()
},[]);
const getData=()=>{
  console.log(id.id,"id")
  const formdata=new FormData()
  formdata.append("prop_id",id.id)
  formdata.append("aid", admin.admin_id);
  axios.post("/admin/get_single_property_new", formdata , {
    headers: { tkn: tkn },
  }).then(function (res) {
      console.log(res.data.data)
      if(res.data.status===1){
    setItem({
     
      rooms:res.data.data.no_of_rooms,
      bedrooms:res.data.data.no_of_bedrooms,
      bathrooms:res.data.data.no_of_bathrooms,
      garages:res.data.data.no_of_garages,
      unit_no:res.data.data.flat_or_unit_no,
    })
    setUserData(res.data.data.role)
    setBuiltLength(res.data.data.built_area_length)
    setbuiltWidth(res.data.data.built_area_width)
    setLandLength(res.data.data.land_area_length)
    setLandWidth(res.data.data.land_area_width)
    setProp_type(res.data.data.prop_type)
    var dob=String(momentt(res.data.data.year_of_built).format('YYYY-MM-DD'));
    setLanunchDate(dob);
setLandArea(res.data.data.land_area.slice("")[0])
setSelectedValueLand(res.data.data.land_area.slice("")[1])
setBuiltArea(res.data.data.built_area.slice("")[0])
setSelectedValueBuilt(res.data.data.built_area.slice("")[1])
setProjOverallArea(res.data.data.project_overall_area.slice("")[0])
setSelectedValue(res.data.data.project_overall_area.slice("")[1])
setProjMinArea(res.data.data.project_size_min.slice("")[0])
setSelectedValueMin(res.data.data.project_size_min.slice("")[1])
setProjMaxArea(res.data.data.project_size_max.slice("")[0])
setSelectedValueMax(res.data.data.project_size_max.slice("")[1])
           
setProjOverview(res.data.data.project_overview)
setProjHighlights(res.data.data.project_highlights)
setProj_size(res.data.data.project_size)
setAvgPrice(res.data.data.project_avg_price)
setConfig(res.data.data.project_configuration)
setPossessionStatus(res.data.data.possession_status)
}
  })
}

console.log(landArea)
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
    console.log(images.length)
     if (images.length + e.target.files.length <= 10) {
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
       setImages([...images, ...arr]);
  
     } else {
       alert("Maximum Image limit is 10.");
  
     }
     console.log(images)
     e.target.value = ""
   }
   const handleSubmit=(e)=>{
     
      e.preventDefault()
      // window.alert(prop_type)
      setErr(0)
      if(userdata===3 && proj_overview===""){
        setErr(12)
        
          setSnack({
            message: "Please Enter Project Overview",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && proj_highlights===""){
        setErr(13)
        
          setSnack({
            message: "Please Enter Project Highlights",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && proj_overall_area===undefined){
        setErr(14)
        
          setSnack({
            message: "Please Enter Project Overall Area",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && selectedValue===undefined){
        setErr(14)
        
          setSnack({
            message: "Please Enter Project Overall Area Unit",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && proj_min_area===undefined){
        setErr(15)
        
          setSnack({
            message: "Please Enter Project Minimum Area",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && selectedValueMin===undefined){
        setErr(15)
        
          setSnack({
            message: "Please Enter Project Minimum Area Unit",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && proj_max_area===undefined){
        setErr(16)
        
          setSnack({
            message: "Please Enter Project Max Area",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && selectedValueMax===undefined){
        setErr(16)
        
          setSnack({
            message: "Please Enter Project Max Area Unit",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && proj_size===""){
        setErr(17)
        
          setSnack({
            message: "Please Enter Project Size",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && avgPrice===""){
        setErr(18)
        
          setSnack({
            message: "Please Enter Project avgPrice",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && possession_status===""){
        setErr(19)
        
          setSnack({
            message: "Please Select Possession Status",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata===3 && config===""){
        setErr(20)
        
          setSnack({
            message: " Please Enter Configuration...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(launch_date===""){
        setErr(21)
        
          setSnack({
            message: " Please Enter Launch/Year of Built Date...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && furnished===""){
        setErr(22)
        
          setSnack({
            message: " Please Select Furnished Status",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && parking===""){
        setErr(23)
        
          setSnack({
            message: " Please Enter Closed Parking",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && washroom===""){
        setErr(24)
        
          setSnack({
            message: " Please Enter Personal Washroom...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata !== 3 && item.unit_no===""){
        setErr(25)
        
          setSnack({
            message: " Please Enter Plot or Unit Number...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata !== 3 && item.rooms===""){
        setErr(26)
        
          setSnack({
            message: " Please Enter Number of Rooms...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata !== 3 && item.bedrooms===""){
        setErr(27)
        
          setSnack({
            message: " Please Enter Number of BedRooms...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata !== 3 && item.bathrooms===""){
        setErr(28)
        
          setSnack({
            message: " Please Enter Number of Bathrooms...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(userdata !== 3 && item.garages===""){
        setErr(29)
        
          setSnack({
            message: " Please Enter Number of Garages...",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(landArea===undefined){
        setErr(30)
        
          setSnack({
            message: " Please Enter LandArea",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(selectedValueLand===undefined){
        setErr(30)
        
          setSnack({
            message: " Please Enter LandArea Unit",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(builtArea===undefined){
        setErr(31)
        
          setSnack({
            message: " Please Enter LandArea",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else  if(selectedValueBuilt===undefined){
        setErr(31)
        
          setSnack({
            message: " Please Enter LandArea Unit",
            type: 'error',
            open: true,
            direction: "center"
        });
      }
      else{
    


    e.preventDefault()


    const formdata=new FormData();

    formdata.append("prop_id",id.id)
      formdata.append("no_rooms",item.rooms)
      formdata.append("no_bedrooms",item.bedrooms)
      formdata.append("no_bathrooms",item.bathrooms)
      formdata.append("no_garages",item.garages) 
      formdata.append("land_area",landArea)
      formdata.append("land_area_length",landLength)
      formdata.append("land_area_width",landWidth)
      formdata.append("built_area",builtArea)
      formdata.append("built_area_length",builtLength)
      formdata.append("built_area_width",builtWidth)
      formdata.append("built_year",launch_date)
      formdata.append("proj_overview",proj_overview)
      formdata.append("proj_highlights",proj_highlights)
      formdata.append("proj_overall_area",proj_overall_area)
      formdata.append("proj_size_min",proj_min_area)
      formdata.append("proj_size_max",proj_max_area)
      formdata.append("proj_size",proj_size)
      formdata.append("proj_avg_price",avgPrice)
      formdata.append("possession_status",possession_status)
      formdata.append("proj_config",config) 
      formdata.append("furnished_status",furnished) 
      formdata.append("closed_parking",parking) 
      formdata.append("personal_washroom",washroom) 
      formdata.append("no_floors",floor_num) 
      formdata.append("flat_unit_no",item.unit_no) 
      formdata.append("aid", admin.admin_id);
      axios.post("/admin/edit_property_details_id", formdata , {
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
  }else{
    setSnack({
      message: res.data.msg,
      type: "error",
      open: true,
    });
  }
      })
    
  }

    }
  return (
    <div>
  <Container maxWidth="md">
                     
                     <Box
                       sx={{
                         mt: 3,
                         pt: 3,
                         boxShadow: 5,
                         borderRadius: "20px",
                         backgroundColor: "white",
                       }}
                     >
                       {/* <form onSubmit={propData}> */}

                       <Typography variant="h5" sx={{ color: "#060847" }}>
                         Property Details
                       </Typography>
                       <Grid
                         container
                         direction="row"
                         justifyContent="flex-start"
                         alignItems="center"
                         spacing={1}
                         style={{
                           textAlign: "center",
                           margin: "0 auto",
                         }}
                       >
                     
                     {userdata === 3 && <>

<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  Project Overview*
  {err === 12 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Property Overview...
    </div>
  )}
  <br />
  <CKEditor
    editor={ClassicEditor}
    data={proj_overview}
    onReady={(editor) => {
      console.log(
        "Editor is ready to use!",
        editor
      );
    }}
    onChange={(event, editor) => {
      const data = editor.getData();
      setProjOverview(data);
    }}
    onBlur={(event, editor) => {
      console.log("Blur.", editor);
    }}
    onFocus={(event, editor) => {
      console.log("Focus.", editor);
    }}
  />
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  Project Highlights*
  {err === 13 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project Highlights...
    </div>
  )}
  <br />
  <CKEditor
    editor={ClassicEditor}
    data={proj_highlights}
    onReady={(editor) => {
      console.log(
        "Editor is ready to use!",
        editor
      );
    }}
    onChange={(event, editor) => {
      const data = editor.getData();
      setProjHighlights(data);
    }}
    onBlur={(event, editor) => {
      console.log("Blur.", editor);
    }}
    onFocus={(event, editor) => {
      console.log("Focus.", editor);
    }}
  />
</Grid>
<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
  Project Details
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <FormControl
    sx={{ m: 1, width: "90%" }}
    variant="outlined"
    size="small"
  >
    <InputLabel>Project Overall Area*</InputLabel>
    <OutlinedInput
      value={proj_overall_area}
      error={err == 14 && true}
      onChange={(e) => setProjOverallArea(e.target.value)}
      endAdornment={
        <InputAdornment>
          <TextField
            id="standard-select-currency"
            select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            variant="standard"
            size="small"
            error={err == 14 && true}
            defaultValue={2}
          >
            {length.map((option) => (
              <MenuItem
                key={option.value}
                value={option.label}
                error={err == 14 && true}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </InputAdornment>
      }
      label="Project Overall Area"
    />
  </FormControl>
  {err === 14 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project Overall Area...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <FormControl
    sx={{ m: 1, width: "90%" }}
    variant="outlined"
    size="small"
  >
    <InputLabel>Project Min Area</InputLabel>
    <OutlinedInput
      value={proj_min_area}
      error={err == 15 && true}
      onChange={(e) => setProjMinArea(e.target.value)}
      endAdornment={
        <InputAdornment>
          <TextField
            id="standard-select-currency"
            select
            value={selectedValueMin}
            onChange={(e) => setSelectedValueMin(e.target.value)}
            variant="standard"
            size="small"
            error={err == 15 && true}
            defaultValue={2}
          >
            {length.map((option) => (
              <MenuItem
                key={option.value}
                value={option.label}
                error={err == 15 && true}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </InputAdornment>
      }
      label="Project Min Area"
    />
  </FormControl>
  {err === 15 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project Minimum Area...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <FormControl
    sx={{ m: 1, width: "90%" }}
    variant="outlined"
    size="small"
  >
    <InputLabel>Project Max Area</InputLabel>
    <OutlinedInput
      value={proj_max_area}
      error={err == 16 && true}
      onChange={(e) => setProjMaxArea(e.target.value)}
      endAdornment={
        <InputAdornment>
          <TextField
            id="standard-select-currency"
            select
            value={selectedValueMax}
            onChange={(e) => setSelectedValueMax(e.target.value)}
            variant="standard"
            size="small"
            defaultValue={2}
            error={err == 16 && true}
          >
            {length.map((option) => (
              <MenuItem
                key={option.value}
                value={option.label}
                error={err == 16 && true}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </InputAdornment>
      }
      label="Project Max Area"
    />
  </FormControl>
  {err === 16 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project Maximum Area...
    </div>
  )}
</Grid>

<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <TextField
    multiline
    rows={4}
    type="text"
    size="small"
    name="proj_size"
    label="Project size*"
    value={proj_size}
    error={err == 17 && true}
    onChange={(e) => {
      setProj_size(e.target.value);
    }}
    sx={{
      m: 1,
      width: { sm: "90%", xs: "80%" },
    }}
  />
  {err === 17 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project Size...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  <TextField
    type="number"
    size="small"
    name="avgPrice"
    label="Average Price (in INR)*"
    value={avgPrice}
    error={err == 18 && true}
    onChange={(e) => setAvgPrice(e.target.value)}
    sx={{ m: 2, width: "90%" }}
  />
  {err === 18 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Project avgPrice...
    </div>
  )}
</Grid>


<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  <TextField
    select
    size="small"
    name="possession_status"
    label="Possession Status*"
    value={possession_status}
    error={err == 19 && true}
    onChange={(e) =>
      setPossessionStatus(e.target.value)
    }
    sx={{ m: 2, width: "90%" }}
  >
    <MenuItem value="1">
      Under Construction
    </MenuItem>
    <MenuItem value="2">Ready To Occupy</MenuItem>
  </TextField>
  {err === 19 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Select Possession Status...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <TextField
    multiline
    rows={4}
    type="text"
    size="small"
    name="config"
    label="Configuration *"
    value={config}
    error={err == 20 && true}
    onChange={(e) => {
      setConfig(e.target.value);
    }}
    sx={{
      m: 1,
      width: "90%",
    }}
  />
  {err === 20 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Configuration...
    </div>
  )}
</Grid>
</>}
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
{/* {JSON.stringify(size)} */}
<TextField
  id="date"
  label="Date"
  type="date"
  error={err == 21 && true}
  fullWidth={true}
  size="small"
  value={launch_date}
  name="launch_date"
  placeholder="Launch Date / Year Of Built"
  dateFormat="yyyy-mm-dd"
  onChange={(e) => setLanunchDate(e.target.value)}
  InputLabelProps={{
    shrink: true,
  }}
  sx={{ m: 1, width: "90%" }}
/>
{err === 21 && (
  <div
    style={{
      fontSize: "12px",
      color: "red",
    }}
  >
    Please Enter Launch/Year of Built Date...
  </div>
)}
</Grid>
{prop_type === "2" && (item.prop_cat === "Office" || item.prop_cat === "Shop") && <>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  {/* {JSON.stringify(size)} */}
  <TextField
    select
    size="small"
    name="furnished"
    label="Furnished Status*"
    value={furnished}
    error={err == 22 && true}
    onChange={(e) =>
      setFurnished(e.target.value)
    }
    sx={{ m: 2, width: "90%" }}
  >
    <MenuItem value="1">Furnished</MenuItem>
    <MenuItem value="2">UnFurnished</MenuItem>
  </TextField>
  {err === 22 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Select Furnished Status...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  <TextField
    size="small"
    name="parking"
    label="Closed Parking"
    value={parking}
    error={err == 23 && true}
    onChange={(e) => setParking(e.target.value)}
    sx={{ m: 2, width: "90%" }}
  />
  {err === 23 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
    Please Enter Closed Parking...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  <TextField
    size="small"
    name="washroom"
    label="Personal Washroom"
    value={washroom}
    error={err == 24 && true}
    onChange={(e) => setWashroom(e.target.value)}
    sx={{ m: 2, width: "90%" }}
  />
  {err === 24 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
    Please Enter Personal Washroom...
    </div>
  )}
</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
  <TextField
    type="number"
    size="small"
    name="floor_num"
    label="Number Of Floors"
    value={floor_num}
    onChange={(e) => setFloorNum(e.target.value)}
    sx={{ m: 2, width: "90%" }}
  />
</Grid>
</>}


{userdata !== 3 &&
<>
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
    <TextField
      size="small"
      name="unit_no"
      label="Unit Number"
      error={err == 25 && true}
      value={item.unit_no}
      onChange={handleChange}
      sx={{ m: 2, width: "90%" }}
    />
    {err === 25 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
    Please Enter Plot or Unit Number...
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
      type="number"
      size="small"
      name="rooms"
      label="Number of Rooms*"
      value={item.rooms}
      onChange={handleChange}
      error={err == 26 && true}
      sx={{ m: 2, width: "90%" }}
    />
{err === 26 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Number of Rooms...
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
      type="number"
      size="small"
      name="bedrooms"
      label="Number of BedRooms *"
      value={item.bedrooms}
      onChange={handleChange}
      error={err == 27 && true}
      sx={{ m: 2, width: "90%" }}
    />
{err === 27 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Number of BedRooms...
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
      type="number"
      size="small"
      name="bathrooms"
      label="Number of Bathrooms *"
      value={item.bathrooms}
      onChange={handleChange}
      error={err == 28 && true}
      sx={{ m: 2, width: "90%" }}
    />
{err === 28 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Number of Bathrooms...
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
      type="number"
      size="small"
      name="garages"
      label="Number of Garages *"
      value={item.garages}
      onChange={handleChange}
      error={err == 29 && true}
      sx={{ m: 2, width: "90%" }}
    />
{err === 29 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Number of Garages...
    </div>
  )}
  </Grid>
</>}



<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
{/* {JSON.stringify(`${landArea} ${selectedValueLand}`)} */}
<FormControl
  sx={{ m: 1, width: "90%" }}
  variant="outlined"
  size="small"
>
  <InputLabel>Land Area</InputLabel>
  <OutlinedInput
    value={landArea}
    error={err == 30 && true}
    onChange={(e) => setLandArea(e.target.value)}
    endAdornment={
      <InputAdornment>
        <TextField
          id="standard-select-currency"
          select
          value={selectedValueLand}
          onChange={(e) => setSelectedValueLand(e.target.value)}
          variant="standard"
          size="small"
          error={err == 30 && true}
        >
          {length.map((option) => (
            <MenuItem
              key={option.value}
              value={option.label}
              error={err == 30 && true}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </InputAdornment>
    }
    label="Land Area"
  />
</FormControl>
{err === 30 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Land Area ...
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

  size="small"
  name="landLength"
  label="Land Area Length"
  value={landLength}
  onChange={(e) => setLandLength(e.target.value)}

  sx={{ m: 2, width: "90%" }}
/>

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

  size="small"
  name="landWidth"
  label="Land Area Width"
  value={landWidth}
  onChange={(e) => setLandWidth(e.target.value)}

  sx={{ m: 2, width: "90%" }}
/>

</Grid>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
{/* {JSON.stringify(builtArea,"builtArea")} */}
<FormControl
  sx={{ m: 1, width: "90%" }}
  variant="outlined"
  size="small"
>
  <InputLabel>Built Area</InputLabel>
  <OutlinedInput
    value={builtArea}
    onChange={(e) => setBuiltArea(e.target.value)}
    error={err == 31 && true}
    endAdornment={
      <InputAdornment>
        <TextField
          id="standard-select-currency"
          select
          value={selectedValueBuilt}
          onChange={(e) => setSelectedValueBuilt(e.target.value)}
          variant="standard"
          size="small"
          defaultValue={2}
          error={err == 31 && true}
        >
          {length.map((option) => (
            <MenuItem
              key={option.value}
              value={option.label}
              error={err == 31 && true}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </InputAdornment>
    }
    label="Built Area"
  />
</FormControl>
{err === 31 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
   Please Enter Built Area ...
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

  size="small"
  name="builtLength"
  label="Built Area Length"
  value={builtLength}
  onChange={(e) => setBuiltLength(e.target.value)}

  sx={{ m: 2, width: "90%" }}
/>

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

  size="small"
  name="builtWidth"
  label="Built Area Width"
  value={builtWidth}
  onChange={(e) => setbuiltWidth(e.target.value)}

  sx={{ m: 2, width: "90%" }}
/>
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
