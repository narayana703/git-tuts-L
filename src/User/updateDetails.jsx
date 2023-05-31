import React, { useState, useContext,useEffect } from "react";
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
import { SnackbarContext, UserContext } from "../components/UserContext";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Margin } from "@mui/icons-material";
import { LeftDrawer } from "./Dashboard/Leftdrawer";
import {Loading} from '../components/Loading'
import { Helmet } from "react-helmet";
export const UpdateDetails=()=>{
  const { snack, setSnack } = useContext(SnackbarContext);
  const {uid,setUid}=useContext(UserContext)
  const { user,token } = useContext(UserContext)
  const [id, setId] = useState("");
  const [wait, setWait] = useState(false);
  const [err, setErr] = useState(0);
  const [open, setOpen] = useState(false);
 const [loading,setLoading]=useState(true)

  const [data2, setData2] = useState({
    name: "",
    email: "",
  });


  useEffect(() => {
    getdata();
  }, []);
  const getdata=async ()=>{
    setLoading(true)
    const formdata = new FormData();
    formdata.append("id", uid);
     
    formdata.append("uid", user.user_id);
    await axios.post("/user/getdata",formdata,
     {
      headers: { tkn: token },
    }
    ).then((res) => {
      if (res.data.status === 1) {
       setData2({
        name:res.data.data.user_name,
        email:res.data.data.user_email,
        
       })
       setLoading(false)
        console.log(res.data.data);
      }
    });
  }


  const changeHandlear2 = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };


  const submit01 = (e) => {
    e.preventDefault();
    setErr(0);
    if (data2.name === "") {
      setErr(1);
      setSnack({
        message: "Please Enter Name",
        type: "error",
        open: true,
        direction: "center",
      });
      
    } else if (!data2.email.includes("@")) {
      setErr(2);
      setSnack({
        message: "Please Enter Valied Email",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      setWait(true);
      setLoading(true)
      const formdata = new FormData();
      formdata.append("id", uid);
      formdata.append("uname", data2.name);
      formdata.append("uemail", data2.email);
      formdata.append("uid", user.user_id);
      axios.post("/user/update_details", formdata, {
        headers: { tkn: token },
      }).then((res) => {
        if (res.data.status === 1) {
            console.log(res.data.data)
            setSnack({
                message: res.data.msg,
                type: "success",
                open: true,
              });
              setLoading(false)
              getdata()
        }
      });
    }
  };

  return (
    <div>
       <Helmet>
                
                <title>Update Profile| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
     <Grid container  justifyContent="center"
  alignItems="flex-start">
  {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
      <Grid item xs={11}>
{loading ? <Loading />:(
      <Container maxWidth="sm" sx={{ backgroundColor: "" }}>
        <Box
          m={2}
          sx={{
            backgroundColor: "white",
            boxShadow: "1",
            marginTop: 5,
            padding: 2,
            borderRadius: 1,
          }}
        >
          <form onSubmit={submit01}>
          <Grid item xs={12} m={2}>
               <Typography variant="h5" gutterBottom sx={{color:"#060847"}}>
              Update Profile
      </Typography>
      </Grid>
          <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="stretch"
>
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Name*"
                  name="name"
                  value={data2.name}
                  onChange={changeHandlear2}
                  error={err === 1 && true}
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>

              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Email*"
                  name="email"
                  value={data2.email}
                  onChange={changeHandlear2}
                  error={err === 2 && true}
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} m={2}>
              <Button variant="contained" type="submit" sx={{ ml: 1, color: "white",backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}>
                Update{" "}
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>)}

<br/>
</Grid>
</Grid>




    </div>
  );
}