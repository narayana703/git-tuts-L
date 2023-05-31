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
    Fab, Dialog, DialogTitle, DialogContent, TextField, Box
} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";

import { Loading } from "../components/Loading";
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";

export const SearchProps = () => {
    const { admin, tkn } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState([])
    const [subData, setSubData] = useState([])
    const { snack, setSnack } = useContext(SnackbarContext);
    const [mobile, setMobile] = useState("")
    const [showPlan, setShowPlan] = useState(false)
    let history = useNavigate();

    //   useEffect(() => {
    //     getdata();
    //   }, []);
    const getdata = async (e) => {
        console.log(mobile, "mobile")
        const formdata = new FormData();

        formdata.append("aid", admin.admin_id);
        formdata.append("user_mobile", mobile);
        await axios.post("/admin/fetch_all_prop_with_mobile", formdata
            , {
                headers: { tkn: tkn },
            }
        ).then((res) => {
            if (res.data.status === 1) {
                setSearchData(res.data.data);
localStorage.setItem("userId",res.data.data[0].user_ids)
localStorage.setItem("userRole",res.data.data[0].role)
                setLoading(false);
                console.log(res.data);
            }
        });
    };

    return (
        <div>
            <Helmet>

                <title>Search User Properties | Buy or Sell or Rent Property Online</title>

            </Helmet>
            {/* {loading ? <Loading /> : ( )} */}
            <Grid container justifyContent="center"
                alignItems="center">
                <Grid item xs={2}></Grid>
                <Grid item xs={10} p={4} >

                    <Container maxWidth="lg" p={3} sx={{ backgroundColor: "white" }}>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >


                            <Typography variant="h4" sx={{ marginTop: 4, color: "#060847" }}>Search User Properties</Typography>
                        </Grid>

                        {/* {JSON.stringify(subData[0].sub_plan_list)} */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                            mt={3}
                            m={2}
                        >
                            <Grid item xs={12} md={4} lg={4}>
                                <TextField type="number" label="Mobile Number *" variant="outlined" name="mobile" size="small" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />

                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Button variant="outlined" sx={{ color: "#060847" }} onClick={(e) => getdata(e)}>Search</Button>
                            </Grid>

                            {searchData.length !== 0 && <Grid item xs={12} md={4} lg={4} >

                                <Fab variant="extended" aria-label="add" className="linkstyle" component={Link} to={"/Dashboard/add_property"} sx={{ backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }}>
                                    <AddIcon />
                                    Add Property
                                </Fab>
                            </Grid>
                            }

                        </Grid>
                        {loading ? <p>No Results to Found Here...</p> : (
                            <>

                                {searchData &&
                                    searchData.length === 0 ? (<p>User not Exisits...</p>) :
                                    <>

<Grid item xs={12} pt={2} pb={2} >
      <Container maxWidth="md" mt={""}>
        <Box
          sx={{
            mt: 1,
            backgroundColor: "white",
            boxShadow: 5,
            borderRadius: 2,
            p:2
          }}
        >
          <br />
          <Typography variant="h6" sx={{color:"#060847"}}>User Details</Typography>
        
          <hr style={{ width: "80%",color:"#060847" }} />
          
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            p={3}
            ml={3}
            sx={{textAlign:"justify"}}
          >
            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Name: </b>
                {searchData[0].user_name}{" "}
              </Typography>
              
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Mobile no: </b>
                {searchData[0].user_mobile}{" "}
              </Typography>
             
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Email Id: </b>
                {searchData[0].user_email}
             
              </Typography>
              
   
            </Grid>
          
          </Grid>
         
          <hr style={{ width: "80%" }} />
          <br /> <br />
        </Box>
      </Container></Grid>



                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            mt={1}
                                        >
                                            {searchData.map((i) => {
                                                return (
                                                    <Card
                                                        sx={{
                                                            width: 250,
                                                            pb: 3,
                                                            // height: "auto",
                                                            m: 2,
                                                            mt: 3,
                                                            borderRadius: 4,
                                                            textAlign: "start",
                                                            backgroundColor: "#f8f8f8",
                                                        }}
                                                    >

                                                        <img
                                                            src={`/images/properties/${i.prop_images.split(',')[0]}`}
                                                            height={150} width={250}
                                                        />

                                                        <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                                                            {" "}
                                                            <b> {i.prop_title}</b>{" "}
                                                        </Typography>
                                                        {/* {JSON.stringify(i.images.split(',')[0])} */}
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ ml: 1 }}
                                                        >
                                                            {" "}
                                                            Category:{i.prop_cat}{" "}
                                                        </Typography>


                                                       

                                                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                                                            <LocationOnSharpIcon sx={{ fontSize: 'medium' }} />
                                                            {i.city}
                                                        </Typography>
                                                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                                                           
                                                            Added By:{i.role===1 && "Owner" ||i.role==2 && "Agent" || i.role==3 && "Builder" || i.role==0 && "Admin"}
                                                        </Typography>
                                                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                        spacing={3}
                      >
                                                        <Button
                          variant="contained"
                          onClick={() => {
                            localStorage.setItem('rowid', i.id);
                            history(`/Dashboard/edit_property/${i.prop_id}`);
                          }}
                          sx={{ mr: 1, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Edit
                        </Button></Grid>


                                                        
                                                    </Card>)
                                            })}
                                        </Grid>
                                    </>}
                            </>
                        )}

                    </Container></Grid>
            </Grid>

        </div>
    );
}









