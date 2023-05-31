import React from "react";
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  Button, Dialog, DialogActions, DialogContentText, DialogContent, TextField, MenuItem, Box, DialogTitle, Fab
} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";
import { Loading } from "../components/Loading";

export const ViewAdmin=()=> {
  const { admin } = useContext(UserContext)
  const { tkn, } = useContext(UserContext)
  const { snack, setSnack } = useContext(SnackbarContext);
const [data,setData]=useState([])
let id=useParams()
  const [uname, setUname] = useState("")

  const [mobile, setMobile] = useState("")

  const [email, setEmail] = useState("")

  const [upass, setPass] = useState("")

  const [conf_pass, setConf_Pass] = useState("")
  const [loc,setLoc]=useState("")
  const [loading,setLoading]=useState(true)
  let history = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
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


  return (
    <div>
       <Helmet>
                
                <title>View Admin Data| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Grid container justifyContent="center"
        alignItems="flex-start">
        <Grid item xs={3}>
          <LeftDrawer /></Grid>
        <Grid item xs={9}>

          <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
           

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
            {loading? <Loading />:(
                    
<Grid item xs={10} p={4} >
      <Container maxWidth="md" mt={""}>
        <Box
          sx={{
            mt: 5,
            backgroundColor: "white",
            boxShadow: 5,
            borderRadius: 2,
            p:3
          }}
        >
          <br />
          <Typography variant="h4" sx={{color:"#060847"}}>Admin Account Details</Typography>
          <br />
          <hr style={{ width: "80%",color:"#060847" }} />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            pl={5}
            ml={6}
            sx={{textAlign:"justify"}}
          >
            <Grid item xs={12} md={6}>
              <Typography>
                {" "}
                <b>Name: </b>
                {uname}{" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                {" "}
                <b>Reg.Mobile no: </b>
                {mobile}{" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                {" "}
                <b>Email: </b>
                {email}
             
              </Typography>
              
   
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                {" "}
                <b>Location: </b>
                {loc}
                
              </Typography>
              </Grid>
          </Grid>
          <br />
          <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >

                        <Button
                          variant="contained"
                          onClick={() => {
                           
                            history("/Dashboard/admin_data");
                          }}
                          sx={{ mt: 1, ml: 1, marginRight: "10px", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Back
                        </Button>
                      </Grid>
                      <br />
          <hr style={{ width: "80%" }} />
          <br /> <br />
        </Box>
      </Container></Grid>
)}




            </Grid>

          </Container></Grid>
      </Grid>
    </div>
  );
}