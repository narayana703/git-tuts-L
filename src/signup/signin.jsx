import React, { useState, useContext } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {Helmet} from "react-helmet";
import Checkbox from "@mui/material/Checkbox";
import {
  Typography,
  TextField,
  IconButton,
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Grid,
  Box,
  Button,
  Container,
  DialogContent,
  Dialog,
  DialogTitle,
  Slide,OutlinedInput, ButtonBase
} from "@mui/material";
import { UserContext, SnackbarContext } from "../components/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const { token, setToken, uid, setUId } = useContext(UserContext);
  const [forgotMobileDailog,setForgotMobileDailog] = useState(false);
  const { snack, setSnack } = useContext(SnackbarContext);
  let history = useNavigate();
  const [uname, setUname] = useState("");
  const [otptoken,setOtpToken] = useState("");
  const [pass, setPass] = useState("");
  const [showPass,setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [newpass,setNewPass] = useState("");
  const [otpTkn, setOtpTkn] = useState("");
  const [renewpass,setReNewPass] = useState("");
  const [err, setErr] = useState(0);

  const [wait, setWait] = useState(false);
  const [uMobile,setUmobile]=useState("")

  const [showOtpDailog, setShowOtpDailog] = useState(false);
  const [openPass,setOpenPass]=useState(false)

const [confNewPass,setConfNewPass]=useState("")
const [valotpDailog,setValotpDailog] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setErr(0);
    if (uname.length !== 10) {
      setErr(1);
      setSnack({
        message: "Enter Valid Mobile Number",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (pass.length < 6) {
      setErr(2);
      setSnack({
        message: "Please Enter Valid Password ",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      setWait(true);
      const formData = {};

      formData.uname = uname;
      formData.upass = pass;
      axios.post("/user/login", formData).then((res) => {
        if (res.data.status === 1) {
          // setOtpTkn(res.data.otp_token)
          console.log(res.data);

          console.log(res.data.data.user_id);
          setUId(res.data.data.user_id);
          setWait(false);
          setUser(res.data.data);
          setToken(res.data.tkn);
          // localStorage.setItem('User',ddata);
          // setOtpTkn(res.data.otp_token)
          localStorage.setItem("UTKN", res.data.tkn);
          localStorage.setItem("uid", res.data.data.user_id);
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
            direction: "left",
          });
          history("/user_dashboard/my_account");
          // setShowOtpDailog(true)
        } else if (res.data.status === 2) {
          setWait(false);
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
            direction: "center",
          });
        }
      });
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateotp=(e)=>{
    e.preventDefault();
        setErr(0);
    if(otp===''){
      setErr(4)
      setSnack({
        message: "Enter Valid 10-digit Mobile number..",
        type: 'error',
        open: true,
        direction:"center"
      })
    }else if(newpass.length<5){
      setErr(5)
      setSnack({
        message: "Password should have atleast 5 characters..",
        type: 'error',
        open: true,
        direction:"center"
      })
    }else if(newpass!==renewpass){
      setErr(6)
      setSnack({
        message: "Password not Matching..",
        type: 'error',
        open: true,
        direction:"center"
      })
    }else{
      console.log(otptoken,"otptoken")
      setValotpDailog(true);
      setWait(true);
      const formData= {};
      formData.umobile=uMobile;
      formData.otp=otp;
      formData.otp_token=otptoken;
      formData.newpass=newpass;
      axios.post("/user/forgot_password",formData).then((res) => {
           
            if(res.data.status===1){
                setWait(false);
                 
                setValotpDailog(false);
                setSnack({
                  message: res.data.msg,
                  type: 'success',
                  open: true,
                  direction:"center"
                });
            }else{
              setWait(false);
              setValotpDailog(true);
              setSnack({
                message: res.data.msg,
                type: 'error',
                open: true,
                direction:"center"
              });
            }
            
          
       }); 
    }
  }
  const generateotp=(e)=>{
    e.preventDefault();
        setErr(0);
    if(uMobile.length!==10){
      setErr(3)
      setSnack({
        message: "Enter Valid 10-digit Mobile number..",
        type: 'error',
        open: true,
        direction:"center"
      })
    }else{
      setForgotMobileDailog(false);
      setWait(true);
      const formData= {};
      formData.umobile=uMobile;
      axios.post("/user/checkusermobile",formData).then((res) => {
           
            if(res.data.status===1){
                setWait(false);
                setOtpToken(res.data.otp_token)
                setValotpDailog(true);
                setSnack({
                  message: res.data.msg,
                  type: 'success',
                  open: true,
                  direction:"center"
                });
            }else{
              setWait(false);
              setForgotMobileDailog(true);
              setSnack({
                message: res.data.msg,
                type: 'error',
                open: true,
                direction:"center"
              });
            }
            
          
       }); 
    }
  }

  return (
    <div>
      <Helmet>
                
                <title>Sign In | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Container maxWidth="sm">
      <Slide direction="up" in={true} mountOnEnter unmountOnExit {...(true ? { timeout: 1000 } : {})}> 
          <Box
            sx={{
              margin: 3,
              padding: 3,
              mt: 10,
              boxShadow: 5,
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <form onSubmit={handleLogin}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#060847", textAlign: "center" }}
                  >
                    SIGN IN
                  </Typography>
                  <hr />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Mobile Number *"
                    fullWidth
                    label="Mobile Number *"
                    variant="outlined"
                    sx={{ marginTop: 3 }}
                    error={err == 1 && true}
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl sx={{ marginTop: 2 }}  variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={err == 2 && true} value={pass} onChange={(e) => setPass(e.target.value)}
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
               
                  <Grid item xs={12} className="text-center">
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={wait}
                      style={{
                        backgroundColor: wait ? "white" : "#060847",
                        width: "60%",
                        color: wait ? "black" : "white",
                      }}
                    >
                      {wait ? "Please Wait...." : "LOGIN"}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonBase onClick={()=>setForgotMobileDailog(true)}>
<Typography sx={{color:"blue",textDecoration:"underline"}}>Forgot Password?</Typography>
                    </ButtonBase>
                  
                </Grid>
              </Grid>
            </form>
          </Box>
        </Slide>
        <Dialog open={forgotMobileDailog} onClose={() => {
setForgotMobileDailog(false)
}} >
  <Container maxWidth="md">
  <DialogTitle id="alert-dialog-title"> <Typography variant="h5" className="text-center"  >
                                      Enter your Mobile Number           
                        </Typography>
                        <hr />
                        </DialogTitle>
          <DialogContent  style={{overflow:"hidden"}}>
          <form 
          onSubmit={generateotp}
          >
           <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={3}
            mt={2}
            >
                <Grid item xs={12}   >
                <TextField   label="Mobile Number *"  variant="outlined" fullWidth
                    size="small"
                         value={uMobile}
                        // value={frnum}
                        type="number"
                        // error={error===3 && true }
                       
                        //InputLabelProps={{  shrink: true,focused:true }} 
                        
                        onChange={(e) => {
                                 
                          setUmobile(e.target.value);
                                
                                

                        }}
                        
                    />
                </Grid>
                 
                 
                 
                
                <Grid item xs={12}  className="text-center" >
                <Button variant="contained" type="submit"  style={{width:"60%"}} fullWidth={false} color="primary"  className="linkstyle"  >GENERATE OTP</Button>
                </Grid>
                <Grid item xs={12}   >
                 <br/>
                </Grid>
            </Grid>
            </form>
            </DialogContent>
             
           

  {/* <DialogTitle id="alert-dialog-title"> <Typography variant="h5" className="text-center" style={{ color: "#060847",textAlign:"center" }}>
   Forgot Password
  </Typography>
    <hr style={{ color: "#060847" }} />
  </DialogTitle>
  <DialogContent style={{ overflow: "hidden" }}>
    <form onSubmit={forgotPass}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}   >
          <br />
          <TextField
                    placeholder="Mobile Number *"
                    fullWidth
                    label="Mobile Number *"
                    variant="outlined"
                    sx={{ marginTop: 3 }}
                    size="small" 
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                  />
        </Grid>

        <Grid item xs={12}   >
         
          <TextField  label="New Passwod *"  value={newPass} onChange={(e) => setNewPass(e.target.value)} variant="outlined" size="small" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12}   >
         
          <TextField  label="Confirm Passwod *"  value={confNewPass} onChange={(e) => setConfNewPass(e.target.value)} variant="outlined" size="small" style={{ width: "100%" }} />
        </Grid>
       
        <Grid item xs={12} className="text-center" >
          <Button variant="contained" type="submit" 
        
           style={{ backgroundColor:  "#060847", width: "60%", color: "white" }}>
          
            Submit
            </Button>
        </Grid>
      </Grid>
    </form>
  </DialogContent> */}
</Container>
</Dialog>
<Dialog
        open={valotpDailog}
        onClose={()=>{
           
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
            style: {
            
              boxShadow: 'none',
            },
          }}
        //style={{backgroundColor:theme.palette.secondary.main}}
      >
           
          <DialogTitle id="alert-dialog-title"> <Typography variant="h5" className="text-center" >
                                      Update Password           
                        </Typography>
                        <hr />
                        </DialogTitle>
          <DialogContent  style={{overflow:"hidden"}}>
          <form onSubmit={validateotp}>
           <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={3}
            mt={2}
            >
                <Grid item xs={12}   >
                <TextField   label="OTP *"  variant="outlined" fullWidth
                    size="small"
                         
                        value={otp}
                        type="number"
                        error={err===4 && true }
                        InputProps={{
                          
                            startAdornment:(<InputAdornment position="end">
                                <span style={{marginRight:"8px"}}>
                                {/* <PhoneIcon color="primary"/>   */}
                                </span>
                             
                          </InputAdornment>),
                        }}
                        //InputLabelProps={{  shrink: true,focused:true }} 
                        onChange={(e) => {
                                    setOtp(e.target.value);
                        }}
                        
                    />
                </Grid>
                <Grid item xs={12}>
             
             <TextField   label="New Password *"  variant="outlined" fullWidth
                     size="small"
                          
                         error={err===5 && true }
                         type={showPass ? 'text' : 'password'}
                         value={newpass}
                          
                         InputProps={{
                             
                             startAdornment:(<InputAdornment position="end">
                                 <span style={{marginRight:"8px"}}>
                                 {/* <LockIcon color="primary"/>   */}
                                 </span>
                              
                           </InputAdornment>),
                         
                             endAdornment:(<InputAdornment position="end">
                             <IconButton
                               aria-label="toggle password visibility"
                               onClick={()=>{
                                   setShowPass(!showPass);
                               }}
                               onMouseDown={()=>{
                                   setShowPass(!showPass);
                               }}
                               edge="end"
                             >
                               {showPass ? <Visibility color="primary"/> : <VisibilityOff  color="primary"/>}
                             </IconButton>
                           </InputAdornment>)
                         }}
                          
                         onChange={(e) => {
                                 setNewPass(e.target.value);
 
                         }}
                         
                     />
             </Grid>
             <Grid item xs={12}>
             
             <TextField  label="Re-Enter New Password *"  variant="outlined" fullWidth
                     size="small"
                          
                         error={err===6 && true }
                         type={showPass ? 'text' : 'password'}
                         value={renewpass}
                          
                         InputProps={{
                           
                             startAdornment:(<InputAdornment position="end">
                                 <span style={{marginRight:"8px"}}>
                                 {/* <LockIcon color="primary"/>   */}
                                 </span>
                              
                           </InputAdornment>),
                         
                             endAdornment:(<InputAdornment position="end">
                             <IconButton
                               aria-label="toggle password visibility"
                               onClick={()=>{
                                   setShowPass(!showPass);
                               }}
                               onMouseDown={()=>{
                                   setShowPass(!showPass);
                               }}
                               edge="end"
                             >
                               {showPass ? <Visibility color="primary"/> : <VisibilityOff  color="primary"/>}
                             </IconButton>
                           </InputAdornment>)
                         }}
                          
                         onChange={(e) => {
                                 setReNewPass(e.target.value);
 
                         }}
                         
                     />
             </Grid>  
                 
                
                <Grid item xs={12}  className="text-center" >
                <Button variant="contained" type="submit"  style={{width:"60%"}} fullWidth={false} color="primary"  className="linkstyle"  >UPDATE PASSWORD</Button>
                </Grid>
                <Grid item xs={12}   >
                 <br/>
                </Grid>
            </Grid>
            </form>
            </DialogContent>
             
      </Dialog>
      </Container>
    </div>
  );
};