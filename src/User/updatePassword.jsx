import React, { useState, useContext,useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Container,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { SnackbarContext, UserContext } from "../components/UserContext";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { LeftDrawer } from "./Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";

export const UpdatePassword=()=>{
  const { snack, setSnack } = useContext(SnackbarContext);
  const {uid,setUid}=useContext(UserContext)
  const { user,token } = useContext(UserContext)
  const [wait, setWait] = useState(false);
  const [err, setErr] = useState(0);
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    conformPassword: "",
  });


  const changeHandlear = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const submitHandlear = (e) => {
    e.preventDefault();
    setErr(0);
   
    if (data.currentPassword.length <= 5) {
      setErr(3);
      setSnack({
        message: "Please Enter Current Password",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (data.newPassword.length <= 5) {
      setErr(4);
      setSnack({
        message: "Please Enter New Password",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (data.conformPassword !== data.newPassword) {
      setErr(5);
      setSnack({
        message: "PassWord and Conform Password are not same",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      setWait(true);
      const formdata = new FormData();
      formdata.append("id", uid);
      formdata.append("oldPassword", data.currentPassword);
      formdata.append("newPassword", data.newPassword);
      formdata.append("confirmPassword", data.conformPassword);
      formdata.append("uid", user.user_id);
      axios.post("/user/update_password", formdata, {
        headers: { tkn: token },
      }).then((res) => {
        if (res.data.status === 1) {
            setSnack({
                message: res.data.msg,
                type: "success",
                open: true,
              });
            
        }
        else{
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          });
        }
      });
    }
  };

 

  return (
    <div>
       <Helmet>
                
                <title>Update Password| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
     <Grid container  justifyContent="center"
  alignItems="flex-start">
  {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
      <Grid item xs={11}>

      <Container maxWidth="sm" sx={{ backgroundColor: "" }}>
        <Box
          m={2}
          sx={{
            backgroundColor: "white",
            boxShadow: "1",
            marginTop: 5,
            borderRadius: 1,
          }}
        >
          <form onSubmit={submitHandlear}>
          <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="stretch"
>
<Grid item xs={12} m={2}>
               <Typography variant="h5" gutterBottom sx={{color:"#060847"}}>
               Change password
      </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
                <FormControl sx={{ m: 1 }} variant="outlined"  fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password"  >
                    Current Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end"  >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          
                        >
                          {showPassword ?  <Visibility />:<VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password*"
                    name="currentPassword"
                    value={data.currentPassword}
                    onChange={changeHandlear}
                    error={err === 4 && true}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} m={2}>
                <FormControl sx={{ m: 1 }} variant="outlined"  fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    New Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword1 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {showPassword1 ?  <Visibility />:<VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password*"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={changeHandlear}
                    error={err === 4 && true}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} m={2}>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword2 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                        >
                          {showPassword2 ? <Visibility />:<VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Conform Password*"
                    name="conformPassword"
                    value={data.conformPassword}
                    onChange={changeHandlear}
                    error={err === 5 && true}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} m={2}>
              <Button variant="contained" type="submit" sx={{ ml: 1, mb:3, color: "white",backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}  }}>
            
                Update Password{" "}
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
      </Grid>
      </Grid>
    </div>
  );
}