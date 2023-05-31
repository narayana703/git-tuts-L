import React, { useState, useContext, useEffect } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Helmet} from "react-helmet";
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, IconButton, FilledInput, InputLabel, InputAdornment, FormControl, Grid, Box, Button, Container, DialogContent, Dialog, DialogTitle, MenuItem, Radio, FormControlLabel, FormLabel, RadioGroup, Grow,OutlinedInput } from '@mui/material';
import { UserContext, SnackbarContext } from '../components/UserContext';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
export const EditAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showPassword1, setShowPassword1] = useState(false);
let id=useParams()
  const { user, setUser, token, setToken } = useContext(UserContext)

  const { snack, setSnack } = useContext(SnackbarContext);
  const [roleId, setRoleId] = useState("")
  const [uname, setUname] = useState("")

  const [mobile, setMobile] = useState("")

  const [email, setEmail] = useState("")

  const [upass, setPass] = useState("")

  const [conf_pass, setConf_Pass] = useState("")
  const [loc,setLoc]=useState("")


  const [err, setErr] = useState(0)

  const [wait, setWait] = useState(false)

  const [showOtpDailog, setShowOtpDailog] = useState(false)
  const [fax, setFax] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [desc, setDesc] = useState('')
  const [website, setWebsite] = useState('')
  const [images, setImages] = useState([])
  const handleImage = (e) => {
    var img = e.target.files[0]
    setImages({ raw: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) })
    // console.log(img)
    console.log(img.length)
  }

  const { admin } = useContext(UserContext)
  const { tkn, } = useContext(UserContext)
  let history = useNavigate()
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    getdata()
  },[])
const getdata=async ()=>{
    const formdata = new FormData()

    formdata.append("admin_id",id.id)
 
    formdata.append("aid", admin.admin_id);  
         
    
          await axios.post("/admin/get_single_admin", formdata, {
            headers: { tkn: tkn },
        }).then((res) => {
            console.log(res.data.data);
            if (res.data.status === 1) {
                // setData(res.data.data);
                // setStatus1(res.data.data.title)

setUname(res.data.data.admin_name)        
setEmail(res.data.data.admin_email)     
setMobile(res.data.data.admin_mobile)    
setLoc(res.data.data.admin_location)    
  
       setLoading(false);
                console.log(res.data.data[0]);
            }
        });
    };

  // console.log(roleId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(0);


     if (uname === '') {
      setErr(1)
      setSnack({
        message: "Enter User Name",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (!email.includes('@')) {
      setErr(2)
      setSnack({
        message: "Enter valied Email address",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (mobile.length != 10) {
      setErr(3)
      setSnack({
        message: "Enter Valied Mobile Number",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if(loc===""){
      setErr(6)
      setSnack({
        message: "Please Select Location",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else {
      setWait(true)
      // console.log(images.raw)

      const formdata = new FormData()
formdata.append("admin_id",id.id)
      formdata.append('admin_name', uname)
      formdata.append('admin_email', email)
      formdata.append('admin_mobile', mobile)
      formdata.append('admin_pass', upass)
      formdata.append("aid", admin.admin_id);  
      formdata.append('admin_confirmPass', conf_pass)
      
      formdata.append('admin_location', loc)
      await axios.post("/admin/edit_admin", formdata, {
        headers: { tkn: tkn },
    }).then((res) => {

        if (res.data.status === 1) {
        //   setOtpTkn(res.data.otp_token)
          setWait(false)

          setShowOtpDailog(true)
        setSnack({
          message: res.data.msg,
          type: 'success',
          open: true,
          direction: "center"
        });
        history('/Dashboard/admin_data')
        } else if (res.data.status === 2) {
          setWait(false)
          setSnack({
            message: res.data.msg,
            type: 'error',
            open: true,
            direction: "center"
          });
        }
        else {
          setWait(false)
          setSnack({
            message: res.data.msg,
            type: 'error',
            open: true,
            direction: "center"
          });
        }
      });
    }
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  return (
    <div >
      <Helmet>
                
                <title>Edit Admin | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Container maxWidth="md">
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000 } : {})} >
        <Box
          sx={{
            margin: 3,
            padding: 3,
            mt:10,
            boxShadow: 5,
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" sx={{ color: "#060847" }}>
         Edit Admin Details
          </Typography>
          <hr />
          <br/>
        
          <form onSubmit={handleSubmit}>
            
              <Grid
               container
               direction="row"
               justifyContent="flex-start"
               alignItems="stretch"
               spacing={3}
              >
                



                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField placeholder='Name *' label="Name *" variant="outlined" fullWidth sx={{ marginTop: 1 }} name='uname' value={uname} onChange={(e) => setUname(e.target.value)} error={err == 1 && true} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField placeholder='Email-ID *' label=" Email-ID * " variant="outlined" fullWidth sx={{ marginTop: 2  }} name='email' value={email} onChange={(e) => setEmail(e.target.value)} error={err == 2 && true} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField placeholder='Mobile *' label=" Mobile *" variant="outlined" fullWidth sx={{ marginTop: 2  }} name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} error={err == 3 && true} />
                </Grid>

              

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    placeholder='Location *'
                    fullwidth
                    select
                    type="text"
                    variant="outlined"
                    name="loc"
                    label="Location *"
                    value={loc}
                    onChange={(e) => {
                      setLoc(e.target.value);
                    }}
                    sx={{ marginTop: 2 ,width:"100%"}}
                    error={err == 6 && true}
                    
                  >
                     <MenuItem value="Hyderabad">Hyderbad</MenuItem>
                    <MenuItem value="Banglore">Banglore</MenuItem>
                    <MenuItem value="Tirupati">Tirupati</MenuItem>
                    </TextField>
</Grid>

                </Grid>
             
               
              

              
              <br />
              <br />
              <Grid item xs={12}>
                <br /> 
                <Button variant="contained" type="submit"
                //  style={{ m: 2, backgroundColor: wait ? "white" : "#060847", width: "60%", color: wait ? "black" : "white" }}
                 >Update NOW</Button>
              </Grid>
           
          </form>
          <br />
          <br />
        </Box>
        </Grow>
        <br />
        <br />
      
      </Container>
    </div>
  )
}



