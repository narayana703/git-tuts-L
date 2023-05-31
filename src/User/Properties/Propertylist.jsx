import React from "react";
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  Fab, Dialog, DialogTitle, DialogContent, IconButton
} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Loading } from "../../components/Loading";
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function Propertylist() {
  const { propData, setPropData, user, token, uid, userId, setUserId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [move, setMove] = useState("");
  const [subData, setSubData] = useState([])
  const { snack, setSnack } = useContext(SnackbarContext);
  const [showPlan, setShowPlan] = useState(false)
  let history = useNavigate();

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("id", uid);
    formdata.append("uid", user.user_id);

    await axios.post("/user/get_all_properties", formdata
      , {
        headers: { tkn: token },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setPropData(res.data.data);
        setSubData(res.data.subData)
      
       
        // setOldImages()
        setLoading(false);
        console.log(res.data.subData===undefined);
        if(res.data.subData === undefined){
           setShowPlan(true)
        }
      }
    });
  };
  const updateFeature = async (propid) => {
    const formdata = new FormData();
    formdata.append("id", uid);
    formdata.append("uid", user.user_id);

    formdata.append("propid", propid)
    await axios.post("/user/update_feature_status", formdata
      , {
        headers: { tkn: token },
      }
    ).then((res) => {
      // alert( JSON.stringify(res.data))
   
      if (res.data.status === 1) {
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        getdata()
      }
      else if (res.data.status === 2) {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        getdata()
      }
      else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        getdata()
      }
    });
  };

  return (
    <div>
      <Helmet>

        <title>MY Properties | Buy or Sell or Rent Property Online</title>

      </Helmet>
      {loading ? <Loading /> : (
        <Grid container justifyContent="center"
          alignItems="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={10} p={4} >

            <Container maxWidth="lg" p={3} sx={{ backgroundColor: "white" }}>
              <Dialog
                open={showPlan}
                onClose={() => {
                  setShowPlan(false);
                }}
                style={{ textAlign: 'center' }}
              >
<IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'grey' }}
                  onClick={() => {
                    setShowPlan(false);
                    // handle close icon click event
                    // deleteCard(i.search_hist_id)
                  }}
                >
                  <CloseIcon sx={{backgroundColor:"grey",color:"#ffff",borderRadius:"15px",padding:"1px", "&:hover":{backgroundColor:"grey",borderRadius:"15px",padding:"1px"}}}/>
                </IconButton>
                <DialogTitle  > <Typography variant="h4" className="text-center" style={{ color: "#060847" }}>
                  <ErrorOutlineIcon fontSize="large" />&nbsp;Choose a Plan
                </Typography>
                  <hr style={{ color: "#060847" }} />
                </DialogTitle>
                <DialogContent style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                  > <Grid item xs={12}>
                      <Typography variant="body1" className="text-center" style={{ color: "#060847" }}>
                        Choose a <b>Subscription Plan</b> to add more <b>Products</b>.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}   >
                      <br />
                    </Grid>
                    <Grid item xs={12}   >
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={6} className="text-center">
                          <Button variant="contained" type="submit" style={{ width: "60%", backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }} fullWidth={false} color="primary" className="linkstyle" onClick={() => {
                            setShowPlan(false);

                          }} >close</Button>

                        </Grid>
                        <Grid item xs={6} className="text-center">
                          <Button variant="contained" type="submit" style={{ width: "60%", backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }} fullWidth={false} color="primary" className="linkstyle" component={Link} to={"/user_dashboard/subscription_plan_details"} >Subscribe Now</Button>
                        </Grid>
                      </Grid>

                    </Grid>
                    <Grid item xs={12}   >
                      <br />
                    </Grid>
                  </Grid>

                </DialogContent>

              </Dialog>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >


                <Typography variant="h4" sx={{ marginTop: 4, color: "#060847" }}>My Properties</Typography>
              </Grid>

              {/* {JSON.stringify(subData[0].sub_plan_list)} */}

              {subData ? <>{(propData !== 0 && subData[0].sub_plan_list > propData.length) &&

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                  mr={5}
                  pr={5}
                >
                  <Grid item  >

                    <Fab variant="extended" aria-label="add" className="linkstyle" component={Link} to={"/user_dashboard/property_types"} sx={{ backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }}>
                      <AddIcon />
                      Add Property
                    </Fab>
                  </Grid>
                </Grid>}
              </> : <> {propData && propData.length < 1 &&

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                  mr={5}
                  pr={5}
                >
                  <Grid item  >

                    <Fab variant="extended" aria-label="add" className="linkstyle" component={Link} to={"/user_dashboard/property_types"} sx={{ backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }}>
                      <AddIcon />
                      Add Property
                    </Fab>
                  </Grid>
                </Grid>
              }</>
              }

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                mt={1}
                pb={5}
              >

                {propData && propData.length === 0 ? <p style={{ textAlign: "center", margin: "auto", fontSize: "30px", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>No Data to Found Here</p> : (
                  propData.map((i) => {
                    return (
                      <Card
                        sx={{
                          width: 250,
                          // height: 400,
                          pb: 3,
                          m: 2,
                          mt: 3,
                          borderRadius: 4,
                          textAlign: "start",
                          backgroundColor: "#f8f8f8",
                        }}
                      >

                        <img
                          src={`/images/properties/${i.images.split(',')[0]}`} width={250}
                          height={150}
                        />

                        <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                          {" "}
                          <b> {i.title}</b>{" "}
                        </Typography>
                        {/* {JSON.stringify(i.images.split(',')[0])} */}
                        <Typography
                          variant="subtitle1"
                          sx={{ ml: 1 }}
                        >
                          {" "}
                          Type: {i.property_type}{" "}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          Status: {i.status == 0 ? "Waiting For Approval" : i.status == 1 ? "Active" : "Inactive"}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          Price:  {new Intl.NumberFormat("en-IN", {
                                style: "decimal",
                              }).format(i.price)}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          Property: {i.property_status}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          Property City: {i.city}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          <LocationOnSharpIcon sx={{ fontSize: 'medium' }} />
                          {i.address}
                        </Typography>

                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                          m={1}
                          p={1}
                          spacing={1}
                        >
                          <Grid item xs={12}>
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{
                              mr: 1,
                              backgroundColor: "#060847",
                              "&:hover": { backgroundColor: "#060847" },
                            }}
                            onClick={() => {
                              // handleFeatureClick();
                              // Additional logic related to propId...
                              updateFeature(i.id)
                            }}
                          >
                            {i.featured_status == "1" ? "Remove Feature" : "Featured"}
                          </Button></Grid>
                          <Grid item xs={12}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              // setSearchHistorypropId(i.id)
                              setUserId(i.id)
                              history(`/property/${i.id}`);
                            }}
                            sx={{ mr: 1, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => {
                              localStorage.setItem('rowid', i.id);
                              localStorage.setItem('userproptype', i.property_type)
                              setUserId(i.id)
                              history("/user_dashboard/edit_property_deatils");
                            }}
                            sx={{ mr: 1, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                          >
                            Edit
                          </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    );
                  }))}
              </Grid>
            </Container></Grid>
        </Grid>
      )}
    </div>
  );
}









