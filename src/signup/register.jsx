import React, { useState, useContext } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Helmet} from "react-helmet";
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, IconButton, FilledInput, InputLabel, InputAdornment, FormControl, Grid, Box, Button, Container, DialogContent, Dialog, DialogTitle, MenuItem, Radio, FormControlLabel, FormLabel, RadioGroup, Grow,OutlinedInput } from '@mui/material';
import { UserContext, SnackbarContext } from '../components/UserContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Compressor from "compressorjs";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showPassword1, setShowPassword1] = useState(false);

  const { user, setUser, token, setToken } = useContext(UserContext)

  const { snack, setSnack } = useContext(SnackbarContext);
  const [roleId, setRoleId] = useState("")
  const [uname, setUname] = useState("")

  const [mobile, setMobile] = useState("")

  const [email, setEmail] = useState("")

  const [upass, setPass] = useState("")

  const [conf_pass, setConf_Pass] = useState("")

  const [otp, setOtp] = useState("")

  const [otp_tkn, setOtpTkn] = useState("")

  const [err, setErr] = useState(0)

  const [wait, setWait] = useState(false)

  const [showOtpDailog, setShowOtpDailog] = useState(false)
  const [fax, setFax] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [desc, setDesc] = useState('')
  const [website, setWebsite] = useState('')
  const [images, setImages] = useState([])
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
  const handleImage = async (e) => {
    // var img = e.target.files[0]
    var arr = [];
    var type = e.target.files[0].type;
    if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
      const image = e.target.files[0];
      console.log(image)
      var img = await compImage(image);
      // arr.push({ raw: img, preview: URL.createObjectURL(img) });
      setImages({ raw: img, preview: URL.createObjectURL(img) })
      console.log(arr)
    } else {
      alert("Please select only JPEG, JPG, PNG Images..")
    }
    // setImages({ raw: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) })
    // setImages([...images, ...arr]);
    // console.log(img)
    // console.log(img.length)
  }


  let history = useNavigate()
  const validateotp = async (e) => {
    e.preventDefault();
    setErr(0);
    if (otp === '') {
      setErr(6)
      setSnack({
        message: "Please enter OTP",
        type: 'error',
        open: true,
        direction: "center"
      });
    } else {
      setWait(true)

      const formdata = new FormData()
      formdata.append("otp", otp)
      formdata.append("otp_token", otp_tkn)
      formdata.append("role", roleId)
      formdata.append("fax", fax)
      formdata.append("company", company)
      formdata.append("designation", designation)
      formdata.append("description", desc)
      formdata.append("website", website)
      //console.log(images.raw,"CHethannnnnnnnnnn" );
      if ('raw' in images) {
        formdata.append("image", images.raw)

      }

      await axios.post("/user/validate_otp_signup", formdata).then((res) => {

        if (res.data.status === 1) {
          console.log(res.data)
          console.log(res)
          // let ddata=JSON.stringify(res.data.data.admin_id)
          // setUser("USER",ddata)

          setUser(res.data.data)
          setToken(res.data.tkn)
          // localStorage.setItem('User',ddata);
          // setOtpTkn(res.data.otp_token)
          localStorage.setItem('UTKN', res.data.tkn);

          setWait(false)
          setSnack({
            message: res.data.msg,
            type: 'success',
            open: true,
            direction: "left"
          });
          setShowOtpDailog(false)
          history("/signin")
        } else if (res.data.status === 2) {
          setWait(false)
          setSnack({
            message: res.data.msg,
            type: 'error',
            open: true,
            direction: "center"
          });
        }
        console.log(user)
      });
    }
  }
  // console.log(roleId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(0);

    if (roleId === '') {
      setErr(7)
      setSnack({
        message: "Plese Select Role",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (uname === '') {
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
        message: "Enter valid Email address",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (mobile.length != 10) {
      setErr(3)
      setSnack({
        message: "Enter Valid Mobile Number",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (upass.length <= 5) {
      setErr(4)
      setSnack({
        message: "Password must be 6 Characters",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (upass !== conf_pass) {
      setErr(5)
      setSnack({
        message: "Password and Conform Password are not same",
        type: 'error',
        open: true,
        direction: "center"
      });
    } else if ((roleId == '2' || roleId == '3') && company == '') {
      setErr(8)
      setSnack({
        message: "Please Enter Company Name",
        type: 'error',
        open: true,
        direction: "center"
      });
    } else if ((roleId == '2') && designation == '') {
      setErr(9)
      setSnack({
        message: "Please Enter Designation",
        type: 'error',
        open: true,
        direction: "center"
      });
    } else if ((roleId == '2' || roleId == '3') && desc == '') {
      setErr(10)
      setSnack({
        message: "Please Enter Description",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else {
      setWait(true)
      // console.log(images.raw)

      const formdata = new FormData()

      formdata.append('uname', uname)
      formdata.append('uemail', email)
      formdata.append('umobile', mobile)
      formdata.append('upass', upass)

      formdata.append('confirmPass', conf_pass)


      await axios.post("/user/user_signup", formdata).then((res) => {

        if (res.data.status === 1) {
          setOtpTkn(res.data.otp_token)
          setWait(false)

          setShowOtpDailog(true)
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
                
                <title>Sign Up | Buy or Sell or Rent Property Online</title>
                 
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
            SIGN UP
          </Typography>
          <hr />
          <br/>
          <Dialog open={showOtpDailog} onClose={() => {

          }} >
            <DialogTitle id="alert-dialog-title"> <Typography variant="h5" className="text-center" style={{ color: "#060847" }}>
              Enter OTP
            </Typography>
              <hr style={{ color: "#060847" }} />
            </DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
              <form onSubmit={validateotp}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={3}
                >

                  <Grid item xs={12}   >
                    <br />
                    <TextField  label="OTP *" error={err == 6 && true} value={otp} onChange={(e) => setOtp(e.target.value)} variant="outlined" size="small" style={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={12}   >

                  </Grid>
                  <Grid item xs={12} className="text-center" >
                    <Button variant="contained" type="submit" disabled={wait} style={{ backgroundColor: wait ? "white" : "#060847", width: "60%", color: wait ? "black" : "white" }}>{wait ? "Please Wait...." : "Validate OTP"}</Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>
          <form onSubmit={handleSubmit}>
            
              <Grid
               container
               direction="row"
               justifyContent="flex-start"
               alignItems="stretch"
               spacing={3}
              >
                

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{textAlign:"left"}}>
                   
                    <FormLabel id="demo-radio-buttons-group-label" error={err == 7 && true} 
                    style={{ display: 'flex-start' }}
                    > Please Select Role *</FormLabel>

                   

                    <FormControl style={{ flexDirection: 'column' }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        style={{ flexDirection: 'row' }}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="Owner" onChange={(e) => { setRoleId(e.target.value); }} />
                        <FormControlLabel value="2" control={<Radio />} label="Agent" onChange={(e) => { setRoleId(e.target.value); }} />
                        <FormControlLabel value="3" control={<Radio />} label="Builder" onChange={(e) => { setRoleId(e.target.value); }} />
                      </RadioGroup>
                    </FormControl>

                 

                </Grid>



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
       
                   <FormControl  variant="outlined" fullWidth>
                   <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                   <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}                   
                     fullwidth                      
                      placeholder='Password *'                      
                      name='upass' value={upass} onChange={(e) => setPass(e.target.value)}
                      error={err == 4 && true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ?  <Visibility /> : <VisibilityOff /> }
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <FormControl  sx={{width:"100%"}} variant="outlined" >
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      placeholder='Confirm Password *'
                      type={showPassword1 ? 'text' : 'password'}
                      name='conf_pass' value={conf_pass} onChange={(e) => setConf_Pass(e.target.value)}
                      error={err == 5 && true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            edge="end"
                          >
                            {showPassword1 ? <Visibility /> :  <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password *"
                    />
                  </FormControl>
                </Grid>

                {roleId && (roleId === '2' || roleId === '3') && <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    placeholder='Company Name *'
                    fullwidth
                    type="text"
                    variant="outlined"
                    name="company"
                    label="Company Name *"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    sx={{width:"100%"}}
                    error={err == 8 && true}
                    
                  />


                </Grid>}
                {roleId && (roleId === '2') && <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField placeholder='Designation *' label=" Designation *" variant="outlined" fullWidth  name='designation' value={designation} onChange={(e) => setDesignation(e.target.value)} error={err == 9 && true} />
                </Grid>}


                {roleId && (roleId === '2' || roleId === '3') && (<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    placeholder='Description *'
                    fullwidth
                    multiline
                    rows={4}
                    type="text"
                    variant="outlined"
                    name="desc"
                    label="Description *"
                    value={desc}
                    sx={{width:"100%"}}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    error={err == 10 && true} 
                  />


                </Grid>) }

                {roleId && (roleId === '2' || roleId === '3') && (
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <TextField
                      placeholder='Fax Number'
                      fullwidth
                      type="text"
                      variant="outlined"
                      name="fax"
                      label="Fax Number"
                      value={fax}
                      sx={{width:"100%"}}
                      onChange={(e) => {
                        setFax(e.target.value);
                      }}
                      // error={err == 7 && true}
                      
                    />


                  </Grid>
                )}

{roleId && (roleId === '2' || roleId === '3') && (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <TextField placeholder='Website' label="Website" variant="outlined" fullWidth sx={{width:"100%"}} name='website' value={website} onChange={(e) => setWebsite(e.target.value)} />
            </Grid>
)}

{roleId && (roleId === '2' || roleId === '3') && (
     <> <Grid
      item
      xs={12}
      sm={12}
      md={12}
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
          marginLeft: 9,
        }}
      >
        <b>Profile Image: </b>
      </Typography>
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
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={6}
      xl={6}
    >
      <span>Uploaded Profile Image: </span><br/><br/>
      {images.preview && (
        <img
          src={images.preview}
          width="200"
          height="200"
        />
      )}
    </Grid>
    </>
    
)}
              </Grid>
               
               
              

              {roleId && (roleId === '2' || roleId === '3') && (<> <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                

              </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  
                  
                </Grid>
                
              </>)}
              <br />
              <br />
              <Grid item xs={12}>
                <br /> 
                <Button variant="contained" type="submit" style={{ m: 2, backgroundColor: wait ? "white" : "#060847", width: "60%", color: wait ? "black" : "white" }}>REGISTER NOW</Button>
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



