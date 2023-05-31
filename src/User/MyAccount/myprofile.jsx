import React from "react";
import react, { useState, useEffect, useContext } from "react";
import { UserContext, SnackbarContext } from "../../components/UserContext";

import {
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  Box,
  AppBar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Helmet } from "react-helmet";

export const MyProfile=()=> {
  const [data, setData] = useState();
  const { user, setUser } = useContext(UserContext);
  console.log(user, "user");

  return (
    <div>
      <Helmet>
                
                <title>My Profile| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Grid container  justifyContent="center"
  alignItems="center">
   <Grid item xs={2}></Grid>
          <Grid item xs={10} p={4} >
      <Container maxWidth="md" mt={""}>
        <Box
          sx={{
            mt: 5,
            backgroundColor: "white",
            boxShadow: 5,
            borderRadius: 2,
          }}
        >
          <br />
          <Typography variant="h4" sx={{color:"#060847"}}>Account Details</Typography>
          <br />
          <hr style={{ width: "80%",color:"#060847" }} />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            pl={5}
          >
            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Name: </b>
                {user.user_name}{" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Reg.Mobile no: </b>
                {user.user_mobile}{" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Category: </b>
                {user.role===1 && "Owner" || user.role===2 && "Agent" ||user.role===3 && "Builder"  }{" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>
          </Grid>
          <br />
          {/* <Typography variant="h3" >What to do?</Typography> */}
          <hr style={{ width: "80%" }} />
          <br /> <br />
        </Box>
      </Container></Grid>
      </Grid>
    </div>
  );
}