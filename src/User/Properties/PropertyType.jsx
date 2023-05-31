import React, { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../../components/UserContext";
import {
  Box,
  IconButton,
  Typography,
  Container,
  Button,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Card,
  CardMedia,
  FormControl,
  Checkbox,
  Select,
  OutlinedInput,
  ListItemText,
  InputLabel,
  InputAdornment,
  DialogActions,
  DialogContentText,Radio,FormControlLabel,FormLabel,RadioGroup
} from "@mui/material";
import axios from 'axios'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useProperty } from "./AddPropFunction";
import { useNavigate } from "react-router-dom";
import { LeftDrawer } from "../Dashboard/Leftdrawer";

export function PropertyType() {
  const { catU, setCatU } = useContext(UserContext);
  const {propCat,setPropCat,uid, setUId,user,token}=useContext(UserContext)
  let history = useNavigate();
  const { snack, setSnack } = useContext(SnackbarContext);
  const [err, setErr] = useState(0);
  const [cat,setCat]=useState()
  useEffect(() => {
    propCatData()
  }, [])
    const propCatData=async (e)=>{
      axios.post("/user/allPropCat").then(function (res) {
  console.log(res)
  if(res.data.status===1){
    setPropCat(res.data.data)
  }
      })
    }
  console.log(propCat,"===========")
   function handle() {
    setErr(0)
if(cat=== undefined){
  setErr(1)
  setSnack({
    message: "Please Select Property Category",
    type: 'error',
    open: true,
    direction: "center"
});
}else{
  localStorage.setItem("catu",cat)
    
  setCatU(localStorage.getItem("catu"));
 //  setCat1(cat);
 history('/user_dashboard/add_property')
}
    
   
  }
console.log(catU)
  return (
    <div>
      <Grid container  justifyContent="center"
  alignItems="flex-start">
  {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
      <Grid item xs={11}>
      <Container maxWidth="md" >
        <Box
          sx={{
            // m: 3,
            p: 3,
            mt:10,
            boxShadow: 5,
            borderRadius: "20px",
            backgroundColor: "white",
          }}
        >
       
          <Typography variant="h5" sx={{ color: "#001e95" }}>
            Select Property Type
          </Typography>
          <br />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <FormControl>
  <FormLabel id="demo-radio-buttons-group-label"> Please select Category</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    {propCat &&
                propCat.map((i) => (
                  <FormControlLabel value={i.prop_cat_id} control={<Radio />} label={i.prop_cat_name}  onChange={(e) => {
                    setCat(e.target.value);
                  }}  error={err === 1 && true}/>
                ))}
    
  </RadioGroup>
</FormControl>
         
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={10}
              mt={1}
              ml={2}
            >
              {err === 1 && (
                <div style={{ fontSize: "12px", color: "red" }}>
                  Please Select Property Category...
                </div>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: 180,
                  fontSize: 14,
                  backgroundColor: "#060847",
                  color: "white",
                }}
                onClick={() => {
                  handle();
                 
                }}
                className="linkstyle"
              >
                <b>Next</b> <KeyboardArrowRightIcon />
              </Button>
            </Grid>
          </Grid>

          
        </Box>
      </Container>
      </Grid>
      </Grid>
    </div>
  );
}