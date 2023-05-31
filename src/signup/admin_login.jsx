import React,{ useState,useContext } from 'react';
import Card from '@mui/material/Card';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {TextField,InputLabel,FilledInput,InputAdornment,IconButton, useTheme, Grid, CardMedia, Container, Typography, FormControl, OutlinedInput, Avatar, Button, useMediaQuery, DialogContent, Dialog,DialogTitle} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import {UserContext, SnackbarContext } from "../components/UserContext";
import { Helmet } from 'react-helmet';
export default function AddListing() {
    const { admin, setAdmin } = useContext(UserContext)
    const {tkn,setTkn}=useContext(UserContext)
    const { snack, setSnack } = useContext(SnackbarContext);

    const [uname, setUname] = useState("")

    const [pass, setPass] = useState("")

    const [otp, setOtp] = useState("")

    const [otpTkn, setOtpTkn] = useState("")

    const [err, setErr] = useState(0)

    const [wait, setWait] = useState(false)

    const [showOtpDailog, setShowOtpDailog] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateotp =async (e) => {
        e.preventDefault();
        setErr(0);
        if (otp === '') {
            setErr(3)
            setSnack({
                message: "Please enter OTP",
                type: 'error',
                open: true,
                direction: "center"
            });
        } else {
            setWait(true)
            const formData = {};

            formData.otp = otp;
            formData.otp_tkn = otpTkn;
          await axios.post("/admin/validate_otp", formData).then((res) => {

                if (res.data.status === 1) {
                    console.log(res.data.msg,"pandu")
                    console.log(res)
                    // let ddata=JSON.stringify(res.data.data.admin_id)
                    // setUser("USER",ddata)
                   
                    setAdmin(res.data.data)
                    setTkn(res.data.tkn)
                    // localStorage.setItem('User',ddata);
                    // setOtpTkn(res.data.otp_token)
                    localStorage.setItem('TKN', res.data.tkn);

                    setWait(false)
                    setSnack({
                        message: res.data.msg,
                        type: 'success',
                        open: true,
                        direction: "left"
                    });
                    setShowOtpDailog(false)
                    Navigate("/Dashboard/property_details")
                } else if (res.data.status === 2) {
                    setWait(false)
                    setSnack({
                        message: res.data.msg,
                        type: 'error',
                        open: true,
                        direction: "center"
                    });
                }
                console.log(admin)
            });
        }
    }


    const login = (e) => {
        e.preventDefault();
        setErr(0);
        if (uname === '') {
            setErr(1)
            setSnack({
                message: "Enter Valid Email-id or Mobile Number",
                type: 'error',
                open: true,
                direction: "center"
            });
        } else if (pass.length <= 4) {
            setErr(2)
            setSnack({
                message: "Please enter Password",
                type: 'error',
                open: true,
                direction: "center"
            });
        } else {
            setWait(true)
            const formData = {};

            formData.uname = uname;
            formData.pass = pass;
            axios.post("/admin/login", formData).then((res) => {

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
            });
        }
    }
    return (<div>
 <Helmet>
                
                <title>Admin Login| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
<Container maxWidth="sm"

>

    {/* <BackDropLoad wait={wait} /> */}
    <Box boxShadow={3} p={3} mt={20} style={{ border: "2px solid #060847", borderRadius: "10px" }}>
        <Dialog open={showOtpDailog} onClose={() => {

        }} >
            <DialogTitle id="alert-dialog-title"> <Typography variant="h5" className="text-center" style={{ color: "#060847" }}>
                Enter OTP
            </Typography>
                <hr style={{ color: "#060847" }} />
            </DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
                <form onSubmit={validateotp} style={{textAlign:"center"}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                        spacing={3}
                    >

                        <Grid item xs={12}   >
                            <br />
                            <TextField id="outlined-basic" label="OTP *" error={err == 3 && true} value={otp} onChange={(e) => setOtp(e.target.value)} variant="outlined" size="small" style={{ width: "100%" }} />
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
        <form onSubmit={login}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
                    <h2 className="text-center" style={{ color: "#060847" }}>LOGIN</h2>
                    <hr style={{ color: "#060847" }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Email-ID / Mobile Number *" error={err == 1 && true} value={uname} onChange={(e) => setUname(e.target.value)} variant="outlined" size="small" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Password *" type="password" variant="outlined" error={err == 2 && true} value={pass} onChange={(e) => setPass(e.target.value)} size="small" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} className="text-center">
                    <Button variant="contained" type="submit" disabled={wait} style={{ backgroundColor: wait ? "white" : "#060847", width: "60%", color: wait ? "black" : "white" }}>{wait ? "Please Wait...." : "LOGIN"}</Button>
                </Grid>
            </Grid>
        </form>
    </Box>
</Container>
    </div>)
}