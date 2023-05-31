import React, { useState, useContext, useEffect } from "react";
import { UserContext, SnackbarContext } from "../components/UserContext";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  FormControl,Radio,RadioGroup,FormControlLabel,FormLabel

} from "@mui/material";
import axios from 'axios'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useProperty } from "./AddPropFunction";
import { useNavigate } from "react-router-dom";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";

export function PropertyType() {
  const { cat1, setCat1 } = useContext(UserContext);
  // const { propCat } = useProperty();
  let history = useNavigate();

  const [cat,setCat]=useState('')
  const [err, setErr] = useState(0);
  const {propCat,setPropCat, admin, tkn}=useContext(UserContext)
  const { snack, setSnack } = useContext(SnackbarContext);
  useEffect(() => {
    propCatData()
  }, [])
    const propCatData=async (e)=>{
      const formData = new FormData()
      formData.append('aid', admin.admin_id)
      axios.post("/admin/allPropCat", formData, {header:{tkn:tkn}}).then(function (res) {
  console.log(res)
  if(res.data.status===1){
    setPropCat(res.data.data)
  }
      })
    }
  console.log(propCat,"===========s")
  console.log(propCat,"===========s")
  function handle() {
    // window.alert(propCat)
    setErr(0)
    if(cat=== ''){
      setErr(1)
      setSnack({
        message: "Please Select Property Category",
        type: 'error',
        open: true,
        direction: "center"
    });
    }else{
      localStorage.setItem("cat",cat)
    
     setCat1(localStorage.getItem("cat"));
    //  setCat1(cat);
    history('/Dashboard/add_property')
    }
        
       
      }
   
console.log(cat1)
  return (
    <div>
       <Helmet>
                
                <title>Add Property| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
         <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={3}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={9}>
      <Container maxWidth="md" >
        <Box
          sx={{
            m: 3,
            p: 3,
            mt:10,
            boxShadow: 5,
            borderRadius: "20px",
            backgroundColor: "white",
        
          }}
        >
          {/* <form onSubmit={propData}> */}
          <Typography variant="h5" sx={{ color: "#060847" }}>
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
                  // history('/Dashboard/add_property')
                }}
                className="linkstyle"
              >
                <b>Next</b> <KeyboardArrowRightIcon />
              </Button>
            </Grid>
          </Grid>

          {/* </form> */}
        </Box>
      </Container></Grid>
      </Grid>
    </div>
  );
}