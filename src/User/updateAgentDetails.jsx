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
export const UpdateAgentDetails=()=>{
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
    email: "",company:"",designation:"",website:"",fax:"",desc:""
  });
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([]);
  const handleImage=(e)=>{
    var img=e.target.files[0]
    setImages({ raw: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) })
    // console.log(img)
    console.log(img.length)
  }
  useEffect(() => {
    getdata();
  }, []);
  const getdata=async ()=>{
    setLoading(true)
    const formdata = new FormData();
    formdata.append("user_id", uid);
     
    formdata.append("uid", user.user_id);
    await axios.post("/user/get_single_agent_or_developer_details",formdata,
     {
      headers: { tkn: token },
    }
    ).then((res) => {
        console.log(res.data.data[0],"===================res")
      if (res.data.status === 1) {
       setData2({
        name:res.data.data[0].user_name,
        email:res.data.data[0].user_email,
        company:res.data.data[0].company_name,
        designation:res.data.data[0].designation,
        website:res.data.data[0].website,
        fax:res.data.data[0].fax_no,
        desc:res.data.data[0].description,
       })
       setImages(res.data.data[0].profile_image)
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
    } 
    else if (data2.company === "") {
        setErr(3);
        setSnack({
          message: "Please Enter Company Name",
          type: "error",
          open: true,
          direction: "center",
        });
        
      }
      else if (data2.designation === "") {
        setErr(4);
        setSnack({
          message: "Please Enter Your Designation",
          type: "error",
          open: true,
          direction: "center",
        });
        
      }
      
        
      
    else {
      setWait(true);
      setLoading(true)
      const formdata = new FormData();
      formdata.append("user_id", uid);
      formdata.append("name", data2.name);
      formdata.append("email", data2.email);
      formdata.append("fax", data2.fax);
      formdata.append("company_name", data2.company);
      formdata.append("designation", data2.designation);
      formdata.append("description", data2.desc);
      formdata.append("website", data2.website);
      formdata.append("profile",images.raw)
      formdata.append("uid", user.user_id);
      axios.post("/user/update_single_agent_or_developer_details", formdata, {
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
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Company Name*"
                  name="company"
                  value={data2.company}
                  onChange={changeHandlear2}
                  error={err === 3 && true}
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Designation*"
                  name="designation"
                  value={data2.designation}
                  onChange={changeHandlear2}
                  error={err === 4 && true}
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Website"
                  name="website"
                  value={data2.website}
                  onChange={changeHandlear2}
                
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Fax No"
                  name="fax"
                  value={data2.fax}
                  onChange={changeHandlear2}
                
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  name="desc"
                  value={data2.desc}
                  onChange={changeHandlear2}
                 
                  variant="outlined"
                  fullWidth
                  sx={{ ml: 1 }}
                />
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
                                       <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  sx={{
                                    textAlign: "start",
                                    marginBottom: 0,
                                    marginLeft: 4,
                                  }}
                                >
                                  <b>Profile Image*: </b>
                                </Typography>
                                </Grid>
                                <Grid item xs={12} m={2}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  component="label"
                                  onChange={handleImage}
                                
                                  sx={{
                                    width: 240,
                                    height: 36,
                                    color: "#060847",
                                    "&:hover": { color: "#060847" },
                                  }}
                                >
                                  Upload*
                                  <input hidden type="file" multiple />
                                </Button>
                                </Grid>
                                <Grid item xs={12} m={2}>
                                {/* {images} */}
                                {images.preview ? (
                                      <img
                                        src={images.preview}
                                        width="150"
                                        height="150"
                                      />
                                    ):((images=== "No Image"? "" : <img
                                      src={`/images/profiles/${images}`}
                                      width="150"
                                      height="170"
                                    />))}
                                <br/>
                                <br/>

                                      </Grid>
            <Grid item xs={12} m={2}>
              <br/>
              <br/>
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