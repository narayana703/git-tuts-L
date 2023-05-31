import React, { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../components/UserContext";
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
import { Location } from "../components/AutoCompLoc";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const steps = [
  "Select Property Type",
  "Create/Add Property",
  "Property Details",
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


export const AddProperty = () => {
  let history = useNavigate();
  const { catU } = useContext(UserContext);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  // const handleNext = () => {
  //   itemSubmit();
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const [
    item,
    setItem,
    images,
    setImages,
    loc,
    setLoc,
    locality,
    setLocality,
    area,
    setArea,
    city,
    setCity,
    state,
    setState,
    broucher,
    setBroucher,
    amenities,
    setAmenities,
    handleChange,
    activeStep,
    setActiveStep,
    err,
    setErr,
    handlestepzero,
    prop_type,
    setProp_type,
    userRole,userId,
    fileChange,
    approvals,
    setApprovals,
    handlestepOne,
    proj_overview,
    setProjOverview,
    proj_highlights,
    setProjHighlights,
    proj_overall_area,
    setProjOverallArea,

    selectedValue,
    setSelectedValue,
    sqftvalue,
    setSqftValue,

    proj_size,
    setProj_size,
    avgPrice,
    setAvgPrice,
    possession_status,
    setPossessionStatus,
    config,
    setConfig,
    launch_date,
    setLanunchDate,
    furnished,
    setFurnished,
    parking,
    setParking,
    washroom,
    setWashroom,
    floor_num,
    setFloorNum,
    handlestepTwo, proj_min_area, setProjMinArea, selectedValueMin, setSelectedValueMin, sqftvalueMin, setSqftValueMin, proj_max_area, setProjMaxArea, selectedValueMax, setSelectedValueMax, sqftvalueMax, setSqftValueMax, landArea, setLandArea, selectedValueLand, setSelectedValueLand, sqftvalueLand, setSqftValueLand, builtArea, setBuiltArea, selectedValueBuilt, setSelectedValueBuilt, sqftvalueBuilt, setSqftValueBuilt, landLength, setLandLength, landWidth, setLandWidth, builtLength, setBuiltLength, builtWidth, setbuiltWidth, wait, setWait, fname, setFname, fImage, setFImage, fdata, setFData, openf, setOpenf, handleCloseF, deleteFloor, planImageChange, itemSubmit, handleSubmit, imageChange, uploadwait, setUploadWait, handleChangeAmenities,otherApproval,setOtherApproval
  ] = useProperty();

  console.log(catU);

  if (item.ptype !== "Plot" && !steps.includes("Floor Details")) {
    steps.push("Floor Details");
  } else if (item.ptype === "Plot" && steps.includes("Floor Details")) {
    steps.splice(steps.indexOf("Floor Details"), 1);
  }

  //   const [locLocality, setLocLocality] = useState("")
  //   const [locArea, setLocArea] = useState("")
  //   const [locCity, setLocCity] = useState("")
  //   const [locState, setLocState] = useState("")

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

  return (
    <div>
      <Grid container justifyContent="center" alignItems="flex-start">
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
                    {activeStep == 0 && (
                      <>
                        <Container maxWidth="md">
                          <Box
                            sx={{
                              // m: 3,
                              p: 3,
                              mt: 10,
                              boxShadow: 5,
                              borderRadius: "20px",
                              backgroundColor: "white",
                            }}
                          >
                            <Typography variant="h5" sx={{ color: "#001e95" }}>
                              Select Property Type
                            </Typography>
                            <br />
                            <Grid
                              container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              style={{ textAlign: "center", margin: "0 auto" }}
                            >
                              <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">
                                  {" "}
                                  Please select Type
                                </FormLabel>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  // defaultValue="1"
                                  name="radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Residential"
                                    onChange={(e) =>
                                      setProp_type(e.target.value)
                                    }
                                    error={err === 1 && true}
                                  />
                                  <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Commercial"
                                    onChange={(e) =>
                                      setProp_type(e.target.value)
                                    }
                                    error={err === 1 && true}
                                  />
                                </RadioGroup>
                              </FormControl>

                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={10}
                                mt={1}
                                ml={2}
                              >
                                {err === 1 && (
                                  <div
                                    style={{ fontSize: "12px", color: "red" }}
                                  >
                                    Please Select Property Category...
                                  </div>
                                )}
                              </Grid>


                              <Grid item xs={12}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    width: 180,
                                    fontSize: 14,
                                    backgroundColor: "#060847",
                                    color: "white",
                                  }}
                                  onClick={(e) => {
                                    handlestepzero(e);
                                  }}
                                  className="linkstyle"
                                >
                                  <b>Next</b> <KeyboardArrowRightIcon />
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Container>
                      </>
                    )}
                      {activeStep === 1 && (
                      <Container maxWidth="md">
                        {/* {JSON.stringify(userRole)} */}
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
                            Create Property
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
                                label="Property Category *"
                                select
                                value={item.prop_cat}
                                onChange={handleChange}
                                error={err == 2 && true}
                                sx={{ m: 2, width: "90%" }}
                              >
                                {prop_type === "1" && prop_type !== "2" && (
                                  <MenuItem value="House">House</MenuItem>
                                )}
                                {prop_type === "1" && prop_type !== "2" && (
                                  <MenuItem value="Apartment">
                                    Apartment
                                  </MenuItem>
                                )}
                                {prop_type === "1" && prop_type !== "2" && (
                                  <MenuItem value="Farmland">
                                    Farmland
                                  </MenuItem>
                                )}

                                <MenuItem value="Plot">Plot</MenuItem>

                                {prop_type !== "1" && prop_type === "2" && (
                                  <MenuItem value="Office Space">
                                    Office Space
                                  </MenuItem>
                                )}
                                {prop_type !== "1" && prop_type === "2" && (
                                  <MenuItem value="Shop">Shop</MenuItem>
                                )}
                                {prop_type === "1" && (
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
                            {userRole !== 3 && (
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
                                label="Video URL (optional)"
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
                                label="Virtual Tour URL (optional)"
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
                                Upload Broucher (optional)
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
                                label="RERA No (optional)"
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
                                  <b>Amenities:</b> (optional)
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
                                error={err == 11 && true}
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

                              {err === 11 && (
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
                            spacing={1}
                          >
                            <Grid item xs={6}>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
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
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
                                  fontSize: 14,
                                  color: "white",
                                  backgroundColor: "#060847",
                                }}
                                onClick={handlestepOne}
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
                    )}
                    {activeStep === 2 && (
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

                            {userRole === 3 && <>

                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                Project Overview *
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
                                Project Highlights *
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
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                Project Details
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                               
                              </Grid> 
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                {/* {JSON.stringify(size)} */}
                                <FormControl
                                  sx={{ m: 1, width: "90%" }}
                                  variant="outlined"
                                  size="small"
                                >
                                  <InputLabel>Project Overall Area *</InputLabel>
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
                                    label="Project Overall Area *"
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
                                  <InputLabel>Project Min Area *</InputLabel>
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
                                    label="Project Min Area *"
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
                                  <InputLabel>Project Max Area *</InputLabel>
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
                                    label="Project Max Area *"
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
                                  label="Project size *"
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
                                  label="Average Price (in INR) *"
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
                                  label="Possession Status *"
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
                            {(item.prop_cat !== "Plot" && item.prop_cat!=="Farmland") && 
                             <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                             {/* {JSON.stringify(item.prop_cat)} */}
                             <TextField
                               id="date"
                               label={userRole===3 && "Launch Date *" || "Year of Built *"}
                               type="date"
                               error={err == 21 && true}
                               fullWidth={true}
                               size="small"
                               value={launch_date}
                               name="launch_date"
                               placeholder={userRole===3 && "Launch Date *" || "Year of Built *"}
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
                           </Grid>}
                           
                            {prop_type === "2" && (item.prop_cat === "Office Space" || item.prop_cat === "Shop") && <>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                {/* {JSON.stringify(size)} */}
                                <TextField
                                  select
                                  size="small"
                                  name="furnished"
                                  label="Furnished Status *"
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
                                  label="Closed Parking (optional)"
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
                                  label="Personal Washroom (optional)"
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
                                  label="Number Of Floors (optional)"
                                  value={floor_num}
                                  onChange={(e) => setFloorNum(e.target.value)}
                                  sx={{ m: 2, width: "90%" }}
                                />
                              </Grid>
                            </>}


                            {userRole !== 3 &&
                              <>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                  <TextField
                                    size="small"
                                    name="unit_no"
                                    label="Unit Number *"
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
                                {(item.prop_cat !=="Farmland" && item.prop_cat !=="Plot")&&
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
                                     label="Number of Rooms *"
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
                                }
                             {(item.prop_cat === "House" || item.prop_cat === "Apartment" || item.prop_cat === "Villa") && <>
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
                             </>}
                               {(item.prop_cat !=="Plot" && item.prop_cat !=="Farmland")&&  <Grid
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
                                </Grid>}
                               
                              </>}

{(item.prop_cat !=="Apartment" && item.prop_cat !=="Villa")&& <>
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              {/* {JSON.stringify(`${landArea} ${selectedValueLand}`)} */}
                              <FormControl
                                sx={{ m: 1, width: "90%" }}
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Land Area *</InputLabel>
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
                                  label="Land Area *"
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
                                label="Land Area Length (optional)"
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
                                label="Land Area Width (optional)"
                                value={landWidth}
                                onChange={(e) => setLandWidth(e.target.value)}

                                sx={{ m: 2, width: "90%" }}
                              />

                            </Grid>
</>}

                          {(item.prop_cat !=="Farmland" && item.prop_cat!=="Plot")&&<>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                              {/* {JSON.stringify(builtArea,"builtArea")} */}
                              <FormControl
                                sx={{ m: 1, width: "90%" }}
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Built Area *</InputLabel>
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
                                  label="Built Area *"
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
                                label="Built Area Length (optional)"
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
                                label="Built Area Width (optional)"
                                value={builtWidth}
                                onChange={(e) => setbuiltWidth(e.target.value)}

                                sx={{ m: 2, width: "90%" }}
                              />

                            </Grid>
                          </>}  
                          

                          </Grid>
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
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
                                  fontSize: 14,
                                  color: "white",
                                  backgroundColor: "#060847",
                                }}
                                onClick={handlestepTwo}
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
                    )}

                    {activeStep === 3 && (
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
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      {/* <TableCell><b>name</b></TableCell> */}
                                      {/* <TableCell align="fImage"><b>Image</b></TableCell> */}
                                      <TableCell align="fname"><b>name</b></TableCell>

                                      <TableCell align="right"><b>Action</b></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>

                                    {fdata && fdata.map((value, index) => (
                                      <TableRow key={index}>
                                        <TableCell  >
                                          {value['fname']}
                                        </TableCell>
                                        {/* <TableCell  >
             {fdata[value].fImage?.preview}
               
             </TableCell> */}

                                        <TableCell align="right" >

                                          <Button variant="contained" color="primary" onClick={() => deleteFloor(index)}>
                                            DELETE
                                          </Button>
                                        </TableCell>
                                      </TableRow>))}
                                  </TableBody>

                                  <TableBody>

                                  </TableBody>
                                </Table>

                              </TableContainer>
                              <Button onClick={(e) => { setOpenf(true) }}>Add Floor</Button>
                              <Dialog
                                open={openf}
                                onClose={handleCloseF}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"Add Floor Plan Details"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                      alignItems="center"
                                      spacing={4}
                                      mt={2}
                                    >
                                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                        <TextField id="outlined-basic" label="Add Floor" variant="outlined"


                                          value={fname}
                                          error={err === 100 && true}
                                          onChange={(e) => {
                                            setFname(e.target.value);
                                          }}
                                          required />
                                           {err === 100 && (
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                    }}
                                  >
                                 Please Enter Floor Name or Number ...
                                  </div>
                                )}
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >

                                        <Button
                                          variant="outlined"
                                          component="label"
                                          onChange={planImageChange}
                                          error={err == 101 && true}
                                          required
                                          sx={{
                                            color: "#060847",
                                            
                                            "&:hover": { color: "#060847" },
                                          }}
                                        >
                                          {/* {JSON.stringify("fImage.length")} */}
                                          Upload Plan Image *
                                          <input hidden type="file" required />
                                        </Button>
                                        {err === 101 && (
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
                                onClick={(e) => {
                                  handleSubmit(e)
                                }}
                                disabled={wait}
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
                    )}
                    {/* <form onSubmit={itemSubmit}> */}
                    {/* {activeStep === 0 && (
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
                               
                                  <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={6}
                                      xl={6}
                                    >
                                
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
                    )} */}
                    {/* {activeStep === 1 && (
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

                            
                            <br />
                            <br />
                          </Box>
                        </Container>
                      </>
                    )} */}

                    {/* {(item.ptype !== "Plot") && (
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
                          
                                  Upload Plan Image *
                                  <input hidden type="file" required/>
                                </Button>
                                         
                                      
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
                                 
                                  <Grid item xs={6}>
                                    {activeStep === steps.length - 1 && (
                                      <Button
                                        variant="contained"
                                      
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
                                
                                </Grid>

                                <br />
                                <br />
                              </Container>
                            </>
                          )}
                        </>
                      )} */}
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
