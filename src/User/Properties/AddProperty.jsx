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
  FormControlLabel,  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useProperty } from "./AddPropFunction";
import { Properties } from "./AllProperties";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Location } from "../../components/AutoCompLoc";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const steps = ["Create/Add Property", "Property Details",];

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
  "AC",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Outdoor Shower",
  "Fridge",
  "Sauna",
  "Swimming Pool",
  "TV",
  "Washer",
  "WiFi",
  "Window Coverings",
];
const length = [
  {
    value: 1,
    label: 'Sqyard',
  },
  {
    value: 2,
    label: 'Sqfeet',
  },
  {
    value: 3,
    label: 'Acre',
  },
  {
    value: 4,
    label: 'Cent',
  },
  {
    value: 5,
    label: 'Ankanam',
  },
  {
    value: 6,
    label: 'Cunta',
  },
];
  const length9 = [
    {
      value: 1,
      label: 'Sqyard',
    },
    {
      value: 2,
      label: 'Sqfeet',
    },
    {
      value: 3,
      label: 'Acre',
    },
    {
      value: 4,
      label: 'Cent',
    },
    {
      value: 5,
      label: 'Ankanam',
    },
    {
      value: 6,
      label: 'Cunta',
    },
  ];

export const AddProperty = () => {
  let history = useNavigate();
  const { catU, setcatU } = useContext(UserContext);


  // const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());


  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    itemSubmit();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const [
    activeStep, setActiveStep, item, setItem, setProfile, images, setImages, uploadwait, itemChange, itemSubmit, imageChange, imageChange1, profile, imageChange2, floor_img, doc, setDoc, fileChange, open, setOpen, handleClickOpen, handleClose, feature, handleChange, numFloors, setNumFloors, handleNumFloorsChange, items, setItems, numPages, setNumPages, handleNumPagesChange, handleItemChange, handleImageChange, err, propData, propData1, propData2, propCat, cat, setCat, landsize, setLandsize, size, setSize, wait, setWait, sqyard, setSqyard, sqfeet, setSqfeet, acre, setAcre, cent, setCent, ankanam, setAnkanam, cunta, setCunta, sqyard1, setSqyard1, sqfeet1, setSqfeet1, acre1, setAcre1, cent1, setCent1, ankanam1, setAnkanam1, cunta1, setCunta1,sqyard2, setSqyard2,sqfeet2, setSqfeet2,acre2, setAcre2,cent2, setCent2,ankanam2, setAnkanam2,cunta2, setCunta2,loc,setLoc,city,setCity,sqftvalue,handleChange1,selectedValue,handleChangeSelected,sqftvalue9,handleChange19,selectedValue9,handleChangeSelected9,desc,setDesc,handleSubmit,fname,setFname,fImage,setFImage,fdata,setFData,openf,setOpenf,handleCloseF,deleteFloor,planImageChange
  ] = useProperty();
  const handleNumPagesChange1 = (event) => {
    console.log("=-====", items.length);
    if (items.length > 1) {
      // Copy the current items array
      const newItems = [...items];

      // Remove the last item
      newItems.pop();

      // Update the items state
      setItems(newItems);

      // Update the numPages state
      setNumPages(numPages - 1);
    }
  };

  console.log(catU);

  if (

    item.ptype !== "Plot" &&
    !steps.includes("Floor Details")
  ) {
    steps.push("Floor Details");
  } else if (
    (item.ptype === "Plot") &&
    steps.includes("Floor Details")
  ) {
    steps.splice(steps.indexOf("Floor Details"), 1);
  }

  const [locLocality, setLocLocality] = useState("")
  const [locArea, setLocArea] = useState("")
  const [locCity, setLocCity] = useState("")
  const [locState, setLocState] = useState("")

  const updateLoc = (loc) => {
    var loc_data = loc.split(", ")
    if(loc_data.length>=5){
      alert("Success")
      setLocState(loc_data[loc_data.length-2])
      setLocCity(loc_data[loc_data.length-3])
      setLocArea(loc_data[loc_data.length-4])
      setLocLocality(loc_data[loc_data.length-5])
    }else{
      alert("Error")
    }
    setLoc(loc);
  }
  const handleChangeCity = (event) => {
    const loc = event.target.value;
    setCity(loc.split(",")[0]);
  }
  return (
    <div>
      <Grid container justifyContent="center"
        alignItems="flex-start">
        {/* <Grid item xs={1}>
          <LeftDrawer /></Grid> */}
        <Grid item xs={10}>
          <Container maxWidth="lg">
            <Box>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={5}
              >
                <Typography variant="h4" style={{ color: "#001e95" }}>
                  Add Property
                </Typography>
              </Grid>
              <br />
            </Box>
            {/* {JSON.stringify(catU)} */}
            <Box sx={{ marginBottom: "10px" }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ width: "100%" }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption"></Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              <Box>
                {activeStep === steps.length ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    {/* <form onSubmit={itemSubmit}> */}
                    {activeStep === 0 && (
                      <>
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
                            <Typography
                              variant="h5"
                              sx={{ color: "#060847" }}
                            >
                              Create Property
                            </Typography>
                            <br />

                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
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
                                    size="small"
                                    name="ptype"
                                    label="Property Category*"
                                    select
                                    value={item.ptype}
                                    onChange={itemChange}
                                    error={err == 1 && true}
                                    sx={{ m: 2, width: "80%" }}
                                  >
                                    {catU === "1" && catU !== "2" && (
                                      <MenuItem value="House">
                                        House
                                      </MenuItem>
                                    )}
                                    {catU === "1" && catU !== "2" && (
                                      <MenuItem value="Apartment">
                                        Apartment
                                      </MenuItem>
                                    )}
                                    {catU === "1" && catU !== "2" && (
                                      <MenuItem value="Farmlands">
                                        Farmlands
                                      </MenuItem>
                                    )}

                                    <MenuItem value="Plot">Plot</MenuItem>

                                    {catU !== "1" && catU === "2" && (
                                      <MenuItem value="Office Space">
                                        Office Space
                                      </MenuItem>
                                    )}
                                    {catU !== "1" && catU === "2" && (
                                      <MenuItem value="Shop">Shop</MenuItem>
                                    )}
                                    {catU === "1" && (
                                      <MenuItem value="Villa">Villa</MenuItem>
                                    )}
                                  </TextField>
                                  {err === 1 && (
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
                                    name="price"
                                    label="Property Price (in INR)*"
                                    value={item.price}
                                    onChange={itemChange}
                                    error={err == 2 && true}
                                    sx={{ m: 2, width: "80%" }}
                                  />
                                  {err === 2 && (
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
                             
                              { item.ptype !== "Plot" && (
                                <>
                                  
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
                                        name="room"
                                        label="Number of Rooms*"
                                        value={item.room}
                                        onChange={itemChange}
                                        error={err == 3 && true}
                                        sx={{ m: 2, width: "80%" }}
                                      />
                                      {err === 3 && (
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
                               {catU !== "2" && 
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
                                          name="bedroom"
                                          label="Number of Bedrooms*"
                                          value={item.bedroom}
                                          onChange={itemChange}
                                          error={err == 4 && true}
                                          sx={{ m: 2, width: "80%" }}
                                        />
                                        {err === 4 && (
                                          <div
                                            style={{
                                              fontSize: "12px",
                                              color: "red",
                                            }}
                                          >
                                            Please Enter Number of
                                            BedRooms...
                                          </div>
                                        )}
                                      </Grid>
}
                                 
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
                                        name="bathroom"
                                        label="Number of Bathrooms*"
                                        value={item.bathroom}
                                        onChange={itemChange}
                                        error={err == 5 && true}
                                        sx={{ m: 2, width: "80%" }}
                                      />
                                      {err === 5 && (
                                        <div
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                          }}
                                        >
                                          Please Enter Number of
                                          BathRooms...
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
                                        name="garage"
                                        label="Number of Garages*"
                                        value={item.garage}
                                        onChange={itemChange}
                                        error={err == 6 && true}
                                        sx={{ m: 2, width: "80%" }}
                                      />
                                      {err === 6 && (
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
                                 
                                </>
                              )}
                              {item.ptype !== "Plot" &&
                                <>
                                  {/* <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                  // spacing={1}
                                  >
                                    <Typography ml={12}>Built Area*:</Typography>
                                    {err === 7 && (
                                      <div
                                        style={{ fontSize: "12px", color: "red" }}
                                      >
                                        Please Enter Built Area...
                                      </div>
                                    )}
                                  </Grid> */}
                                  <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={6}
                                      xl={6}
                                    >
                                      {/* {JSON.stringify(size)} */} 
                                       <FormControl sx={{ m: 1,width: "80%"  }} variant="outlined" size="small">
                                       <InputLabel >Built Area</InputLabel>
          <OutlinedInput
            value={sqftvalue}
            onChange={handleChange1} 
            error={err == 7 && true}
            endAdornment={
              <InputAdornment>
                <TextField
                  id="standard-select-currency"
                  error={err == 7 && true}
                  select
                  value={selectedValue}
                  onChange={handleChangeSelected}
                  variant="standard"
                  size="small"
                 
                >
                  {length.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </InputAdornment>
            }
            label="Built Area"
          />
        </FormControl>
        {err === 7 && (
                                      <div
                                        style={{ fontSize: "12px", color: "red" }}
                                      >
                                        Please Enter Built Area...
                                      </div>
                                    )}
                                      </Grid>
                                    
                                  
                                    
                                    {/* <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={6}
                                      xl={6}
                                    >
                                      <TextField
                                        label="Sq Yards*"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        error={err == 7 && true}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={sqyard}
                                        sx={{ m: 2, width: "80%" }}
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setSqyard(val1);
                                          val = val1 * 9;
                                          setSize(val);
                                          val = val1 / 4840;
                                          setAcre(val);
                                          val = val1 / 48.395556259;
                                          setCent(val);
                                          val = val1 * 0.125;
                                          setAnkanam(val);
                                          val = val1 / 121;
                                          setCunta(val);
                                        }}
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
                                        label="Sq Feet*"
                                        size="small"
                                        variant="outlined"
                                        error={err == 7 && true}
                                        fullWidth
                                        type="number"
                                        // value={size}
                                        sx={{ m: 2, width: "80%" }}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={size}
                                        name="size"
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setSize(val1);
                                          // setSqfeet(val1);
                                          val = val1 / 9;
                                          setSqyard(val);
                                          val = val1 / 4356000;
                                          setAcre(val);
                                          val = val1 / 435.6;
                                          setCent(val);
                                          val = val1 / 72;
                                          setAnkanam(val);
                                          val = val1 / 1089;
                                          setCunta(val);
                                        }}
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
                                        label="Cent*"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        error={err == 7 && true}
                                        sx={{ m: 2, width: "80%" }}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={cent}
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setCent(val1);
                                          val = val1 * 435.6;
                                          setSize(val);
                                          val = val1 * 48.395556259;
                                          setSqyard(val);
                                          val = val1 / 100.021260479;
                                          setAcre(val);
                                          val = val1 * 6.05;
                                          setAnkanam(val);
                                          val = val1 / 2.50023;
                                          setCunta(val);
                                        }}
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
                                        label="Acre*"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        error={err == 7 && true}
                                        sx={{ m: 2, width: "80%" }}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={acre}
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setAcre(val1);
                                          val = val1 * 43560;
                                          setSize(val);
                                          val = val1 * 4840;
                                          setSqyard(val);
                                          val = val1 * 100.021260479;
                                          setCent(val);
                                          val = val1 * 605;
                                          setAnkanam(val);
                                          val = val1 * 40;
                                          setCunta(val);
                                        }}
                                      />
                                    </Grid>
                              
                                  <br />
                                 
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={6}
                                      xl={6}
                                    >
                                      <TextField
                                        label="Ankanam*"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        error={err == 7 && true}
                                        sx={{ m: 2, width: "80%" }}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={ankanam}
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setAnkanam(val1);
                                          val = val1 * 72;
                                          setSize(val);
                                          val = val1 * 8;
                                          setSqyard(val);
                                          val = val1 / 6.05;
                                          setCent(val);
                                          val = val1 / 605;
                                          setAcre(val);
                                          val = val1 / 15.125;
                                          setCunta(val);
                                        }}
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
                                        label="Cunta*"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        error={err == 7 && true}
                                        sx={{ m: 2, width: "80%" }}
                                        InputProps={{
                                          style: {
                                            // color: "#FFBF00"
                                          },
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                          focused: true,
                                        }}
                                        value={cunta}
                                        onChange={(e) => {
                                          var val = parseFloat(e.target.value);
                                          var val1 = parseFloat(e.target.value);
                                          setCunta(val1);
                                          val = val1 * 1089;
                                          setSize(val);
                                          val = val1 * 121;
                                          setSqyard(val);
                                          val = val1 * 2.50023;
                                          setCent(val);
                                          val = val1 / 40;
                                          setAcre(val);
                                          val = val1 * 15.125;
                                          setAnkanam(val);
                                        }}
                                      />
                                    </Grid> */}
                                  
                                </>}
                              {/* <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                              // spacing={1}
                              >
                                <Typography ml={12}>Land Area*:</Typography>
                                {err === 8 && (
                                  <div
                                    style={{ fontSize: "12px", color: "red" }}
                                  >
                                    Please Enter Land Size...
                                  </div>
                                )}
                              </Grid> */}

                           
                                {/* <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                >
                                  <TextField
                                    label="Sq Yards*"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={err == 8 && true}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={sqyard1}
                                    sx={{ m: 2, width: "80%" }}
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setSqyard1(val1);
                                      val = val1 * 9;
                                      setLandsize(val);
                                      val = val1 / 4840;
                                      setAcre1(val);
                                      val = val1 / 48.395556259;
                                      setCent1(val);
                                      val = val1 * 0.125;
                                      setAnkanam1(val);
                                      val = val1 / 121;
                                      setCunta1(val);
                                    }}
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
                                    label="Sq Feet*"
                                    size="small"
                                    variant="outlined"
                                    error={err == 8 && true}
                                    fullWidth
                                    type="number"
                                    // value={size}
                                    sx={{ m: 2, width: "80%" }}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={landsize}
                                    name="size"
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setLandsize(val1);
                                      // setSqfeet(val1);
                                      val = val1 / 9;
                                      setSqyard1(val);
                                      val = val1 / 4356000;
                                      setAcre1(val);
                                      val = val1 / 435.6;
                                      setCent1(val);
                                      val = val1 / 72;
                                      setAnkanam1(val);
                                      val = val1 / 1089;
                                      setCunta1(val);
                                    }}
                                    
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
                                    label="Cent*"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={err == 8 && true}
                                    sx={{ m: 2, width: "80%" }}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={cent1}
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setCent1(val1);
                                      val = val1 * 435.6;
                                      setLandsize(val);
                                      val = val1 * 48.395556259;
                                      setSqyard1(val);
                                      val = val1 / 100.021260479;
                                      setAcre1(val);
                                      val = val1 * 6.05;
                                      setAnkanam1(val);
                                      val = val1 / 2.50023;
                                      setCunta1(val);
                                    }}
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
                                    label="Acre*"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={err == 8 && true}
                                    sx={{ m: 2, width: "80%" }}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={acre1}
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setAcre1(val1);
                                      val = val1 * 43560;
                                      setLandsize(val);
                                      val = val1 * 4840;
                                      setSqyard1(val);
                                      val = val1 * 100.021260479;
                                      setCent1(val);
                                      val = val1 * 605;
                                      setAnkanam1(val);
                                      val = val1 * 40;
                                      setCunta1(val);
                                    }}
                                  />
                                </Grid>
                              
                              <br />
                             
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                >
                                  <TextField
                                    label="Ankanam*"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={err == 8 && true}
                                    sx={{ m: 2, width: "80%" }}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={ankanam1}
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setAnkanam1(val1);
                                      val = val1 * 72;
                                      setLandsize(val);
                                      val = val1 * 8;
                                      setSqyard1(val);
                                      val = val1 / 6.05;
                                      setCent1(val);
                                      val = val1 / 605;
                                      setAcre1(val);
                                      val = val1 / 15.125;
                                      setCunta1(val);
                                    }}
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
                                    label="Cunta*"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    error={err == 8 && true}
                                    sx={{ m: 2, width: "80%" }}
                                    InputProps={{
                                      style: {
                                        // color: "#FFBF00"
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      focused: true,
                                    }}
                                    value={cunta1}
                                    onChange={(e) => {
                                      var val = parseFloat(e.target.value);
                                      var val1 = parseFloat(e.target.value);
                                      setCunta1(val1);
                                      val = val1 * 1089;
                                      setLandsize(val);
                                      val = val1 * 121;
                                      setSqyard1(val);
                                      val = val1 * 2.50023;
                                      setCent1(val);
                                      val = val1 / 40;
                                      setAcre1(val);
                                      val = val1 * 15.125;
                                      setAnkanam1(val);
                                    }}
                                  />
                                </Grid> */}
                             
                             <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                > 
                                  <FormControl sx={{ m: 1, width: '80%' }} variant="outlined" size="small">
                                 <InputLabel  >Land Area</InputLabel>
          <OutlinedInput
            value={sqftvalue9}
            onChange={handleChange19} 
            error={err == 8 && true}
            endAdornment={
              <InputAdornment>
                <TextField
                  id="standard-select-currency"
                  select
                  value={selectedValue9}
                  onChange={handleChangeSelected9}
                  error={err == 8 && true}
                  variant="standard"
                >
                  {length9.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </InputAdornment>
            }
            label="Land Area"
          />
        </FormControl>
                                </Grid>
                             

                              {item.ptype !== "Plot" && (
                              <>
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
                                      name="year_built"
                                      label="Built Year*"
                                      value={item.year_built}
                                      error={err == 9 && true}
                                      onChange={itemChange}
                                      sx={{ m: 2, width: "80%" }}
                                    />
                                    {err === 9 && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                        }}
                                      >
                                        Please Enter Built Year...
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
                                      name="garage_area"
                                      label="Garage Area*"
                                      value={item.garage_area}
                                      onChange={itemChange}
                                      error={err == 10 && true}
                                      sx={{ m: 2, width: "80%" }}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="start">
                                            sqft
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    {err === 10 && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                        }}
                                      >
                                        Please Enter Area of Garage...
                                      </div>
                                    )}
                                  </Grid>
                                  </>
                              )}
                             
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
                                    name="status"
                                    select
                                    label="Property For Rent/Sale*"
                                    value={item.status}
                                    onChange={itemChange}
                                    error={err == 11 && true}
                                    sx={{ m: 2, width: "80%" }}
                                  >
                                    <MenuItem value="For Rent">
                                      For Rent
                                    </MenuItem>
                                    <MenuItem value="For Sale">
                                      For Sale
                                    </MenuItem>
                                  </TextField>
                                  {err === 11 && (
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                      }}
                                    >
                                      Please Select Property Status...
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
                                    name="face"
                                    select
                                    label="Property Facing*"
                                    value={item.face}
                                    onChange={itemChange}
                                    error={err == 12 && true}
                                    sx={{ m: 2, width: "80%" }}
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
                                  {err === 12 && (
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                      }}
                                    >
                                      Please Enter Property Facing...
                                    </div>
                                  )}
                                </Grid>
                             
                            </Grid>
                            {/* <Grid item xs={6}> */}
                            {/* //////////////////////////////////////////////////////////////////////////////////// */}
                            <Grid
                              container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              mt={3}
                              spacing={1}
                            >
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    // width: 180,
                                    color: "white",
                                    backgroundColor: "#060847",
                                    fontSize: 14,
                                  }}
                                  className="linkstyle"
                                  onClick={() => {
                                    history("/user_dashboard/property_types");
                                  }}
                                >
                                  <KeyboardArrowLeftIcon />
                                  <b> Back </b>
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    // width: 180,
                                    fontSize: 14,
                                    color: "white",
                                    backgroundColor: "#060847",
                                  }}
                                  onClick={propData1}
                                  className="linkstyle"
                                >
                                  <b>Next</b>
                                  <KeyboardArrowRightIcon />
                                </Button>
                              </Grid>
                            </Grid>

                            <br />
                            <br />
                          </Box>
                        </Container>
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
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


                            <Typography
                              variant="h5"
                              sx={{ color: "#060847" }}
                            >
                              Property Details
                            </Typography>

                            <br />
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
                              {/* {JSON.stringify(catU)} */}
                              
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
                                    label="Property Title*"
                                    value={item.title}
                                    onChange={itemChange}
                                    error={err == 13 && true}
                                    sx={{ m: 1, width: "80%" }}
                                  />
                                  {err === 13 && (
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

                             
                             
                              
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                >
                                  {/* <TextField
                                    multiline
                                    rows={4}
                                    type="text"
                                    size="small"
                                    name="loc"
                                    label="Address*"
                                    value={loc}
                                    onChange={(e)=>setLoc(e.target.value)}
                                    error={err == 4 && true}
                                    sx={{ m: 1, width: "80%" }}
                                  /> */}
                                   <Location  error={err == 4 && true}  loc={loc} setloc={updateLoc} style={{ m: 1 }}/>
                                  {err === 4 && (
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                      }}
                                    >
                                      Please Enter Property Address...
                                    </div>
                                  )}
                                </Grid>
                                {/* {JSON.stringify(loc.split(',')[0])} */}
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
                                    name="video"
                                    label="Video URL"
                                    value={item.video}
                                    onChange={itemChange}
                                    sx={{ m: 1, width: "80%" }}
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
                                      type="text"
                                      size="small"
                                      name="tour"
                                      label="Virtual Tour URL"
                                      value={item.tour}
                                      onChange={itemChange}
                                      sx={{ m: 1, width: "80%" }}
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
                                    select
      type="text"
      size="small"
      name="city"
      label="City*"
      value={city}
      onChange={handleChangeCity}
      error={err == 16 && true}
      sx={{ m: 1, width: "80%" }}
    >
<MenuItem value="Bangalore">Bangalore</MenuItem>
<MenuItem value="Hyderabad">Hyderabad</MenuItem>
<MenuItem value="Tirupati">Tirupati</MenuItem>
    </TextField>
     
                                    {/* <TextField
                                      type="text"
                                      size="small"
                                      name="city"
                                      label="City*"
                                      
                                      value={city}
                                      onChange={()=>setCity(loc.split(',')[0])}
                                      error={err == 16 && true}
                                      sx={{ m: 1, width: "80%" }}
                                    /> */}
                                    {err === 16 && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                        }}
                                      >
                                        Please Enter Property City...
                                      </div>
                                    )}
                                  </Grid>
                               
                                {item.ptype !== "Plot" && (
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
                                        <b> Features*</b>
                                      </Typography>
                                      {err === 17 && (
                                        <div
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                          }}
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
                                                checked={
                                                  feature.indexOf(name) !==
                                                  -1
                                                }
                                                onChange={handleChange}
                                              />
                                            }
                                            error={err == 17 && true}
                                            value={name}
                                            label={name}
                                          />
                                        </Grid>
                                      ))}
                               
                                    </Grid>
                                  </Grid>
                                )}
                           
                            
                           <Grid
  item
  xs={12}
  sm={5}
  md={5}
  lg={5}
  xl={5}
  sx={{
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
<TextField
                                  multiline
                                  rows={4}
                                  type="text"
                                  size="small"
                                  name="desc"
                                  label="Description*"
                                  value={desc}
                                  onChange={(e)=>{setDesc(e.target.value)}}
                                  error={err == 18 && true}
                                  sx={{
                                    m: 1,
                                    width: { sm: "90%", xs: "80%" },
                                  }}
                                />
                                {err === 18 && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                    }}
                                  >
                                    Please Enter Property Description...
                                  </div>
                                )}
  {/* <Typography
    variant="caption"
    display="block"
    gutterBottom
    sx={{
      textAlign: "start",
      marginBottom: 0,
      marginLeft: 9,
    }}
    error={err == 18 && true}
  >
    <b>Property Description *: </b>
  </Typography>
  {err === 18 && (
    <div
      style={{
        fontSize: "12px",
        color: "red",
      }}
    >
      Please Enter Property Description...
    </div>
  )}
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
  /> */}
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

                                  <Button
                                    variant="outlined"
                                    component="label"
                                    onChange={fileChange}
                                    error={err == 19 && true}
                                    sx={{
                                      color: "#060847",
                                      width: "80%",
                                      "&:hover": { color: "#060847" },
                                    }}
                                  >
                                    Upload Broucher*
                                    <input hidden type="file" />
                                  </Button>
                                  <p>{doc.name}</p>
                                  {/* {doc.preview && <img src={doc.preview} width='100' height='100' />} */}
                                  {err === 19 && (
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
                                    <b>Property Images*: </b>
                                  </Typography>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    component="label"
                                    onChange={imageChange}
                                    error={err == 20 && true}
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

                                  {err === 20 && (
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
                                  {uploadwait ? (
                                    <span style={{ color: "white" }}>
                                      <br />
                                      <br />
                                      Adding Images...
                                    </span>
                                  ) : (
                                    <>
                                      {images.length !== 0 ? (
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="flex-start"
                                            spacing={3}
                                            m={2}
                                          >
                                            {images.map((image) => {
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
                                                        setImages(
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
                             
                            </Grid>

                            <Grid
                              container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              mt={3}
                            >
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    // width: 180,
                                    color: "white",
                                    backgroundColor: "#060847",
                                    fontSize: 14,
                                  }}
                                  className="linkstyle"
                                  onClick={handleBack}
                                >
                                  <KeyboardArrowLeftIcon />
                                  <b> Back </b>
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                {item.ptype !== "Plot" ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                      // width: 180,
                                      fontSize: 14,
                                      color: "white",
                                      backgroundColor: "#060847",
                                    }}
                                    onClick={propData}
                                    className="linkstyle"
                                  >
                                    <b>Next</b>
                                    <KeyboardArrowRightIcon />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    // type="submit"
                                    disabled={wait}
                                    onClick={propData}
                                    sx={{
                                      backgroundColor: wait
                                        ? "white"
                                        : "#060847",
                                      color: wait ? "black" : "white",
                                    }}
                                  >
                                    {wait
                                      ? "Please Wait...."
                                      : "Submit Property"}
                                  </Button>
                                )}
                              </Grid>
                            </Grid>

                            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                            {/* <Button
                            variant="contained"
                            color="primary"
                            style={{
                              width: 180,
                              fontSize: 14,
                              backgroundColor: "#060847",
                              color: "white",
                            }}
                            onClick={propData}
                            className="linkstyle"
                          >
                            <b>Next</b> <KeyboardArrowRightIcon />
                          </Button> */}
                            {/* </form> */}
                            <br />
                            <br />
                          </Box>
                        </Container>
                      </>
                    )}

                      {(item.ptype !== "Plot") && (
                        <>
                          {activeStep === 2 && (
                            <>
                              <Container maxWidth="md">
                              {
                                item.ptype !== "Plot" && (
                                    <Box
                                      sx={{
                                        mt: 3,
                                        pt: 3,
                                        boxShadow: 5,
                                        borderRadius: "20px",
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#001e95" }}
                                      >
                                        Floor Plan Details
                                      </Typography>
                                      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell><b>name</b></TableCell> */}
            {/* <TableCell align="fImage"><b>Image</b></TableCell> */}
            <TableCell align="fname"><b>name</b></TableCell>
          
            <TableCell align="right"><b>Action</b></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          
              {fdata && fdata.map((value,index)=>(
              <TableRow key={index}>
                    <TableCell  >
                        {value['fname']}
                    </TableCell>
                    {/* <TableCell  >
                    {fdata[value].fImage?.preview}
                      
                    </TableCell> */}
                 
                    <TableCell  align="right" >
                        
                        <Button variant="contained" color="primary"  onClick={()=>deleteFloor(index)}>
                            DELETE
                        </Button>
                    </TableCell>
              </TableRow>))}
          </TableBody>
        
        <TableBody>
           
        </TableBody>
      </Table>

</TableContainer>
<Button onClick={(e)=>{setOpenf(true)}}>Add Floor</Button>
<Dialog
                open={openf}
                onClose={handleCloseF}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add Education Details"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={4}
                        mt={2}
                        >
                <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} >            
                <TextField id="outlined-basic" label="Add Floor" variant="outlined" 
             
               
                value={fname}
                error={err===100 && true}
                onChange={(e)=>{
                    setFname(e.target.value);
                }}
                required    />
                </Grid>
                <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} > 
             
                <Button
                                  variant="outlined"
                                  component="label"
                                  onChange={planImageChange}
                                  error={err == 101 && true}
                                  required
                                  sx={{
                                    color: "#060847",
                                    width: "80%",
                                    "&:hover": { color: "#060847" },
                                  }}
                                >
                                  {/* {JSON.stringify("fImage.length")} */}
                                  Upload Plan Image *
                                  <input hidden type="file" required/>
                                </Button>
                                          {/* {err === 101 && (
                                            <div
                                              style={{
                                                fontSize: "12px",
                                                color: "red",
                                              }}
                                            >
                                              Please Choose Plan Image...
                                            </div>
                                          )}
                                          <br /> */}
                                      
                                        {fImage?.preview && (
                                          <img
                                            src={fImage?.preview}
                                            width="200"
                                            height="200"
                                          />
                                        )}       
               
                </Grid>
              
                </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={itemSubmit} color="primary">
                    ADD
                </Button>
                <Button onClick={handleCloseF} color="primary" autoFocus>
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
                                      {/* {items.map((i, index) => (
                                        <Grid
                                          container
                                          direction="row"
                                          justifyContent="center"
                                          alignItems="center"
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
                                              size="small"
                                              name="floor_name"
                                              label="Floor Name *"
                                              
                                              value={i.floor_name}
                                              onChange={(event) =>
                                                handleItemChange(event, index)
                                              }
                                             
                                              sx={{ m: 2, width: "80%" }}
                                            />
                                            {err === 100+index && (
                                              <div
                                                style={{
                                                  fontSize: "12px",
                                                  color: "red",
                                                }}
                                              >
                                                Please Enter Floor Name...
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
                                            <Typography
                                              variant="caption"
                                              display="block"
                                              gutterBottom
                                              sx={{
                                                textAlign: "start",
                                                marginBottom: 0,
                                                marginLeft: 12,
                                              }}
                                            >
                                              <b> Floor Plan Image*: </b>
                                            </Typography>
                                            <input
                                              accept="image/*"
                                              id={`floor-img-${index}`}
                                              type="file"
                                              onChange={(event) =>
                                                handleImageChange(event, index)
                                              }
                                              error={err == 160+index && true}
                                              hidden
                                            />
                                            <label
                                              htmlFor={`floor-img-${index}`}
                                            >
                                              <Button
                                                component="span"
                                                variant="outlined"
                                                sx={{ mb: 2, width: "80%" }}
                                              >
                                                Upload*
                                              </Button>
                                            </label>
                                            {err === 160+index && (
                                              <div
                                                style={{
                                                  fontSize: "12px",
                                                  color: "red",
                                                }}
                                              >
                                                Please Choose Plan Image...
                                              </div>
                                            )}
                                            <br />
                                          </Grid>
                                          {i.floor_img.preview && (
                                            <img
                                              src={i.floor_img.preview}
                                              width="200"
                                              height="200"
                                            />
                                          )}

                                          <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                          >
                                            <Grid
                                              container
                                              direction="row"
                                              justifyContent="flex-start"
                                              alignItems="center"
                                              ml={11}
                                              item
                                              xl={1}
                                              lg={1}
                                              md={1}
                                              xs={1}
                                              sm={1}
                                            >
                                              <Button>
                                                <RemoveCircleOutlineOutlinedIcon
                                                  onClick={
                                                    handleNumPagesChange1
                                                  }
                                                  sx={{
                                                    borderRadius: 50,
                                                    color: "white",
                                                    backgroundColor: "#001e95",
                                                    height: 50,
                                                    width: 50,
                                                    textAlign: "end",
                                                  }}
                                                />
                                              </Button>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={5}
                                              sm={5}
                                              md={5}
                                              lg={5}
                                              xl={5}
                                            >
                                              <hr style={{ width: "100%" }} />
                                            </Grid>
                                            <Grid
                                              container
                                              direction="row"
                                              justifyContent="flex-end"
                                              alignItems="flex-start"
                                              mr={10}
                                              item
                                              xl={1}
                                              lg={1}
                                              md={1}
                                              xs={1}
                                              sm={1}
                                            >
                                              <Button>
                                                <AddCircleOutlineIcon
                                                  onClick={handleNumPagesChange}
                                                  sx={{
                                                    borderRadius: 50,
                                                    color: "white",
                                                    backgroundColor: "#001e95",
                                                    height: 50,
                                                    width: 50,
                                                    textAlign: "end",
                                                  }}
                                                />
                                              </Button>
                                            </Grid>
                                          </Grid>

                                         
                                        </Grid>
                                      ))} */}
                                    </Box>
                                  )}
                                <br />

                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={6}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      style={{
                                        // width: 180,
                                        color: "white",
                                        backgroundColor: "#001e95",
                                        fontSize: 14,
                                      }}
                                      className="linkstyle"
                                      onClick={handleBack}
                                    >
                                      <KeyboardArrowLeftIcon />
                                      <b> Back </b>
                                    </Button>
                                  </Grid>
                                  {/* <br /> */}
                                  <Grid item xs={6}>
                                    {activeStep === steps.length - 1 && (
                                      <Button
                                        variant="contained"
                                        // type="submit"
                                        onClick={(e)=>{handleSubmit(e)}}                                      disabled={wait}
                                        sx={{
                                          backgroundColor: wait
                                            ? "white"
                                            : "#060847",
                                          color: wait ? "black" : "white",
                                        }}
                                      >
                                        {wait
                                          ? "Please Wait...."
                                          : "Submit Property"}
                                      </Button>
                                    )}
                                  </Grid>
                                  {/* <Button component="span" variant="outlined"   sx={{ borderRadius:10}}  > */}
                                  {/* <AddIcon /> */}

                                  {/* </Button> */}
                                </Grid>

                                <br />
                                <br />
                              </Container>
                            </>
                          )}
                        </>
                      )}
                      {/* // : (<></>)} */}
                    {/* </form> */}
                  </React.Fragment>
                )}
              </Box>
              <Box></Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};