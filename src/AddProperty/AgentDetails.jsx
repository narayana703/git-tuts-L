import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField, Button, Box, Grid, Container, Typography, Dialog, DialogContent, Card, CardMedia, FormControl, MenuItem, Checkbox, Select, OutlinedInput, ListItemText, InputLabel, InputAdornment } from "@mui/material";
import { useEditProperty } from "./EditPropertyFunction";

import React, { useState, useContext,useEffect } from "react";
import { SnackbarContext, UserContext } from "../components/UserContext";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from '../components/Loading';



export const AgentDetails = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  const [err, setErr] = useState(0);
  const [item, setItem] = useState({
 name:"",email:"",mobile:"",fax_num:"",comp_name:"",agent_desc:"",off_address:"",position:"",website:""
  });
  const [wait, setWait] = useState(false)

  let history=useNavigate()
  const [loading, setLoading] = useState(true)
  let { id } = useParams();
  
  const [oldProfile,setOldProfile]=useState([])
 
  const [profile, setProfile] = useState([])
  // const [floor_img, setFloor_img] = useState([])
  const [open, setOpen] = useState(false)
  const [uploadwait, setUploadWait] = useState(false);
  const [feature, setFeature] = useState([]);

const {tkn,admin}=useContext(UserContext)

  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
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

  const imageChange1 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setProfile({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };


 useEffect(() => {
   
    singlePropAgentData()
  }, [])
console.log(id)
 
  const singlePropAgentData = () => {
    const formdata = new FormData()
  
    formdata.append('id', localStorage.getItem('rowid'))
    formdata.append("aid", admin.admin_id);
    axios.post('/admin/get_single_agent', formdata, {
      headers: { tkn: tkn },
    })
      .then(function (response) {
        if (response.data.status === 1) {
          console.log(response.data.data,"555555555555555555")
          console.log(response.data.data[0])
          setItem({           
            
            name:response.data.data[0].name,
            email:response.data.data[0].email,
            mobile:response.data.data[0].mobile,
            fax_num:response.data.data[0].fax,
            comp_name:response.data.data[0].company,
            agent_desc:response.data.data[0].agent_desc,
            // off_address:response.data.data[0].mobile,
            position:response.data.data[0].position,
            website:response.data.data[0].website,
          })
     
    
   
      setOldProfile(response.data.data[0].agent_image)
      setProfile(response.data.data[0].agent_image)
      setLoading(false);
        }
        
        console.log(response.data);

      });

  }

 
  const agentSubmit = async (e) => {
   e.preventDefault()
   setErr(0)
   if(item.name===""){
     setErr(20)
     setSnack({
       message: "Please Enter Agent Name",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
    else if(!item.email.includes('@')){
     setErr(21)
     setSnack({
       message: "Please Enter Agent Email",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
    else if(item.mobile.length<10){
     setErr(22)
     setSnack({
       message: "Please Enter Agent Mobile Number",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
    else if(item.agent_desc===""){
     setErr(23)
     setSnack({
       message: "Please Enter Agent Description",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
    else if(item.position===""){
     setErr(24)
     setSnack({
       message: "Please Enter Agent Designation",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
    else if(profile.length===0){
     setErr(26)
     setSnack({
       message: "Please Choose Agent Profile",
       type: 'error',
       open: true,
       direction: "center"
   });
    }
  
    else{
      setWait(true)
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('rowid'))
    
   
    formdata.append("name", item.name);
    formdata.append("email", item.email);
    formdata.append("mobile", item.mobile);
    formdata.append("fax", item.fax_num);
    formdata.append("company", item.comp_name);
    formdata.append("agent_desc", item.agent_desc);
    formdata.append("off_address", item.mobile);
    formdata.append("position", item.position);
    formdata.append("website", item.website);
  
   
    formdata.append("profile", profile.raw);
    formdata.append("aid", admin.admin_id);
   
    await axios.post("/admin/edit_agent_details", formdata, {
      headers: { tkn: tkn },
    }).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        console.log(oldProfile)
        console.log(profile,"======profile====694====")
       
        // if(oldProfile !== profile.raw){
        //   deleteAgentProfileImage(localStorage.getItem('rowid'))
        // } 
        setLoading(false); 
        history('/Dashboard/property_details')
      } else {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  }
  };

  
  const deleteAgentProfileImage=async (id)=>{
 
    const formdata = new FormData();
    formdata.append("id", id)
    formdata.append("profile", oldProfile)
    formdata.append("aid", admin.admin_id);
  
    await axios.post("/admin/deleteprofile_image", formdata, {
      headers: { tkn: tkn },
    }).then( function (res){
   
      if(res.data.status===1){
        console.log(res)
        setLoading(false);
      }
    })
  }
    // const [item,setItem,setProfile, images,setImages, uploadwait, itemChange, itemSubmit, imageChange,imageChange1,profile,doc, setDoc,fileChange,open, setOpen,handleClickOpen,handleClose,feature,handleChange,itemSubmit1,,agentSubmit,oldImages, setOldImages,imageids, setImageIds,delete_image,loading, setLoading] = useEditProperty();

    return (
        <div>

{loading ? (
        <Loading />
      ) : (
<Container maxWidth="md">
<Typography variant="h5" gutterBottom sx={{color:"#060847"}}>
                        Agent Details
                    </Typography>
                      <Box sx={{ mt: 3, pt: 3, boxShadow: 5, borderRadius: "20px" }}>
                        <form onSubmit={agentSubmit}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="text"
                              size="small"
                              name="name"
                              label="Agent Name*"
                              value={item.name}
                              onChange={itemChange}
                              error={err == 20 && true}
                              sx={{ m: 2,width: "80%" }}
                            />
                             {err === 20 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Agent Name...</div>}
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="text"
                              size="small"
                              name="email"
                              label="Agent Email*"
                              value={item.email}
                              onChange={itemChange}
                              error={err == 21 && true}
                              sx={{ m: 2,width: "80%" }}
                            />
                            {err === 21 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Agent Email...</div>}
                          </Grid>
                          </Grid>
                          <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="number"
                              size="small"
                              name="mobile"
                              label="Agent Mobile*"
                              value={item.mobile}
                              onChange={itemChange}
                              error={err == 22 && true}
                              sx={{ m: 2,width:"80%" }}
                            />
                            {err === 22 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Agent Mobile Number...</div>}
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="number"
                              size="small"
                              name="fax_num"
                              label="Fax Number"
                              value={item.fax_num}
                              onChange={itemChange}

                              sx={{ m: 2,width: "80%" }}
                            />
                          </Grid>
                          </Grid>
                          <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="text"
                              size="small"
                              name="comp_name"
                              label="Company Name"
                              value={item.comp_name}
                              onChange={itemChange}
                              sx={{ m: 2,width: "80%" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="text"
                              size="small"
                              name="position"
                              label="Designation*"
                              value={item.position}
                              onChange={itemChange}
                              error={err == 24 && true}
                              sx={{ m: 2,width: "80%" }}
                            />
                            {err === 24 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Agent Designation...</div>}
                          </Grid>
                          </Grid>
                          <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>
                            <TextField
                              type="text"
                              multiline
                              rows={4}
                              size="small"
                              name="agent_desc"
                              label="Agent Description*"
                              error={err == 23 && true}
                              value={item.agent_desc}
                              onChange={itemChange}
                              sx={{ m: 2,width: "79%" }}
                            />
                            {err === 23 && <div style={{ fontSize: "12px", color: "red" }}>Please Enter Agent Description...</div>}
                          </Grid>
                         
                          <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              type="text"
                              size="small"
                              name="website"
                              label="Agent Website"
                              value={item.website}
                              onChange={itemChange}
                              sx={{ m: 2,width: "80%" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            {/* {profile.preview && <img src={profile.preview} width='100' height='100' />} */}
                            <Button
                              variant="outlined"
                              component="label"
                              // color="success"
                              size="small"
                              onChange={imageChange1}
                              error={err == 26 && true}
                              sx={{ m: 2,width: "80%", color: "#060847", "&:hover": { color: "#060847" } }}
                            >
                              Profile Image*
                              <input hidden type="file" />
                            </Button>
                            {err === 26 && <div style={{ fontSize: "12px", color: "red" }}>Please Choose Agent Profile...</div>}
                          </Grid>



                          
                          {profile.preview ? (<Grid item>
                            <Card >
                              <CardMedia
                                style={{ height: 200, width: 200 }}
                                image={profile.preview}
                                title={profile.preview}
                              />

                            </Card>
                          </Grid>):(
                            <Grid item>
                            <Card >
                              <CardMedia
                                style={{ height: 200, width: 200 }}
                                image={`/images/properties/${profile}`}
                                title={profile}
                              />

                            </Card>
                          </Grid>
                          )}
                          

</Grid>

                        </Grid>
                        <br/>
                          <br/>
                        <Button variant='contained' type='submit' disabled={wait} sx={{  backgroundColor: wait ? "white" : "#060847",color: wait ? "black" : "white"  }}>{wait ? "Please Wait...." : "Update"}</Button>
                        </form>
                      </Box>
                    </Container>)}
        </div>
    )
}










