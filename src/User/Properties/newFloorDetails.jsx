import React, { useContext, useState, useEffect } from "react";
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
} from "@mui/material";
import { useEditProperty } from "./EditPropertyFunction";
import axios from "axios";
import { SnackbarContext, UserContext } from "../../components/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
export const NewFloorDetails = () => {
  const [err, setErr] = useState(0);
  const [loading, setLoading] = useState(true);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [numFloors, setNumFloors] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [requestFlag, setRequestFlag] = useState(0);
  const [catId, setCatId] = useState("");
  let history = useNavigate();
  const { token, user } = useContext(UserContext);
  const [wait, setWait] = useState(false);
  // const [id,setId]=useState("")
  const [ptype, setPtype] = useState("");
  let id=useParams()
  const [items, setItems] = useState([
    {
      id: "",
      floor_name: "",
      floor_size: "",
      floor_bedroom: "",
      floor_bathroom: "",
      floor_desc: "",
      floor_img: { preview: "", raw: "" },
      oldimage: "",
    },
  ]);
  const [itemdata, setItemdata] = useState([
    {
      id: "",
      floor_name: "",
      floor_size: "",
      floor_bedroom: "",
      floor_bathroom: "",
      floor_desc: "",
    },
  ]);
  const [planimage, setPlanImage] = useState([]);
  const [iid, setIid] = useState("");
  const [openD, setOpenD] = useState(false);
  const handleOpen = () => {
    setOpenD(true);
  };

  const handleClose = () => {
    setOpenD(false);
  };
  useEffect(() => {
    singlePropData();
    console.log(singlePropData, "============singlePropData");
  }, []);

  const singlePropData = () => {
    const formdata = new FormData();
    formdata.append("prop_id", id.id);
    formdata.append("uid", user.user_id);
    axios
      .post("/user/get_single_property_new", formdata
      , {
        headers: { tkn: token },
      }
      )
      .then(function (response) {
        console.log(response.data, "===========66============");
        if (response.data.status === 1) {
          console.log(response.data.data.length, "00000000000000000000");
          console.log(response.data.plan);

          if (response.data.plan.length > 0) {
           
            setItems(
              response.data.plan.map((item) => ({
               
                floor_name: item.floorName,
                id: item.id,
                floor_img: `/images/properties/${item.floorPlanImage}`,
                oldimage: item.floorPlanImage,
              }))
            );
          }
        }
        console.log(response.data.status);
      
        setLoading(false);
      });
  };

  const handleItemChange = (e) => {
    setItemdata({ ...itemdata, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setPlanImage({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = "";
  };

  const itemSubmit2 = async (e) => {
    e.preventDefault();

    setErr(0);

    if (ptype !== "Plot" && itemdata.floor_name === "") {
      setErr(27);
      setSnack({
        message: "Please Enter Floor Name",
        type: "error",
        open: true,
        direction: "center",
      });
    } 
   
    else if (
      ptype !== "Plot" &&
      (planimage.length === 0 || planimage === "")
    ) {
      setErr(33);
      setSnack({
        message: "Please Choose Plan Image",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);
    const formdata = new FormData();
    formdata.append("uid", user.user_id);
    console.log(itemdata);
    formdata.append(`floor_name`, itemdata.floor_name);
    formdata.append("id", iid);
  
    formdata.append(`plan_image`, planimage.raw);
    await axios
      .post("/user/edit_property_floor_plans_nes", formdata, {
        headers: { tkn: token },
      })
      .then(function (res) {
        console.log("hiiiii");
        if (res.data.status === 1) {
          setWait(false);
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          setLoading(false);
          handleClose();
          singlePropData();
         
        } else {
          setWait(false);
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          });
          setLoading(false);
          singlePropData();
        }
      });
  };
  const deletefloor = async (e) => {
    e.preventDefault();
    setWait(true);
    const formdata = new FormData();

    // formdata.append("uid", user.user_id);

    formdata.append("id", iid);

    await axios
      .post("/user/delete_single_floor", formdata, {
        headers: { tkn: token },
      })
      .then(function (res) {
        console.log("hiiiii");
        if (res.data.status === 1) {
          setWait(false);
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          setLoading(false);
          // handleClose()
          singlePropData();
          // history("/Dashboard/property_details");
        } else {
          setWait(false);
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          });
          setLoading(false);
        }
      });
  };
  return (
    <div>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item xs={11}>
          {loading ? (
            <Loading />
          ) : (
            <Container maxWidth="md">
              {ptype && ptype === "Plot" ? (
                <p>No Fata Found Here</p>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#001e95" }}
                  >
                    Floor Plan Details
                  </Typography>
                  <Box
                    sx={{ mt: 3, pt: 3, boxShadow: 5, borderRadius: "20px" }}
                  >
                    <Box
                      sx={{
                        m: 5,

                        p: 5,
                        textAlign: "center",
                        // border: '1px solid #060847',
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                      >
                        {items &&
                          items.map((i, index) => (
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                              {i.floor_name === "" ? (
                                "No Floor Data"
                              ) : (
                                <Card
                                  sx={{
                                    // height: "320px",
                                    width: "240px",
                                    textAlign: "center",
                                    // position: "relative",
                                    backgroundColor: "#bbdefb",
                                    borderRadius: "25px",
                                    "&:hover": {
                                      boxShadow:
                                        "0 10px 15px 0 rgba(52, 51, 51, 0.08)",
                                    },
                                  }}
                                >
                                  <CardMedia
                                    style={{
                                      height: "160px",
                                      width: "240px",
                                      margin: "auto",
                                    }}
                                    image={i.floor_img}
                                  />
                                  {/* {JSON.stringify(i.sub_plan_id)} */}
                                  <Typography variant="body2" gutterBottom>
                                    Floor name: {i.floor_name}
                                  </Typography>
                              {/* {JSON.stringify(i.id)} */}
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    mt={1}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "#060847",
                                        "&:hover": {
                                          backgroundColor: "#060847",
                                        },
                                      }}
                                      onClick={(e) => {
                                        setItemdata({
                                          id: i.id,
                                          floor_name: i.floor_name,
                                          // floor_size: i.floor_size,
                                          // floor_bedroom: i.floor_bedroom,
                                          // floor_bathroom: i.floor_bathroom,
                                          // floor_desc: i.floor_desc,
                                        });
                                        setPlanImage(i.floor_img);
                                        setIid(i.id);
                                        setPtype(i.property_type);
                                        handleOpen(i.id);
                                      }}
                                    >
                                      Edit
                                    </Button>

                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "#060847",
                                        "&:hover": {
                                          backgroundColor: "#060847",
                                        },
                                      }}
                                      onClick={(e) => {
                                        setIid(i.id);
                                        deletefloor(e);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </Grid>

                                  <br />
                                </Card>
                              )}
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                    <Dialog
                      open={openD}
                      onClose={() => {
                        setOpenD(false);
                      }}
                      maxWidth={"md"}
                    >
                      <Container maxWidth="md">
                        <DialogContent>
                          <form onSubmit={itemSubmit2}>
                         
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                  <Typography variant="h5" sx={{color:"#060847"}}>
                              Update Single Floor Plan
                            </Typography>
                            {JSON.stringify(iid)}
                            </Grid>
                            <br />
                            <br />
                            {/* {JSON.stringify(ptype)} */}
                            {ptype !== "Farmlands" && ptype !== "Plot" && (
                              <>
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
                                      label="Floor name*"
                                      value={itemdata.floor_name}
                                      onChange={(event) =>
                                        handleItemChange(event)
                                      }
                                      error={err === 27 && true}
                                      sx={{ m: 2, width: 240 }}
                                    />
                                    {err === 27 && (
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
                                                             
                                      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                                  {/* {JSON.stringify(`floor-img-${index}`)} */}

                                  <Button
                                    variant="outlined"
                                    component="label"
                                    // color="success"
                                    size="small"
                                    onChange={handleImageChange}
                                    error={err == 33 && true}
                                    sx={{
                                      m: 2,
                                      width: "80%",
                                      color: "#060847",
                                      "&:hover": { color: "#060847" },
                                    }}
                                  >
                                    Plan Image*
                                    <input hidden type="file" />
                                  </Button>

                                  {err === 33 && (
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
                                {/* {JSON.stringify(planimage)} */}

                                {planimage.preview ? (
                                  <img
                                    src={planimage.preview}
                                    width="200"
                                    height="200"
                                  />
                                ) : (
                                  <img
                                    src={planimage}
                                    width="200"
                                    height="200"
                                  />
                                )}

                              
                              </Grid>
                               
                              </>
                            )}
                            <Grid container direction="row" justifyContent="center" alignItems="center" mt={3}>
                                  {/* {JSON.stringify(iid)} */}
                                 
                                  <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={wait}
                                    sx={{
                                      backgroundColor: wait
                                        ? "white"
                                        : "#060847",
                                      color: wait ? "black" : "white",
                                      "&:hover": {
                                        backgroundColor: wait
                                          ? "white"
                                          : "#060847",
                                      },
                                    }}
                                  >
                                    {wait ? "Please Wait...." : "Update"}
                                  </Button>
                                  {/* <Button variant='contained' onClick={itemSubmit2} >Update</Button> */}
                           
                              </Grid>
                          </form>
                          
                          <br />
                                  <br />
                        </DialogContent>
                      </Container>
                    </Dialog>
                  </Box>
                </>
              )}
            </Container>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
