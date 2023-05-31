import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, Box, Grid, TextField, Button, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext, UserContext } from '../components/UserContext';
import { LeftDrawer } from '../Dashboard/Leftdrawer';
import { Helmet } from 'react-helmet';

export const AddSubPlan = () => {
  const [wait, setWait] = useState(false)
  const [item, setItem] = useState({

    sub_plan_name: '',
    sub_plan_validity: '',
    sub_plan_featured: '',
    sub_plan_amount: '',
    sub_plan_role: '',
    sub_plan_list: '',
  });
  const { admin,tkn } = useContext(UserContext)
  const [err, setErr] = useState(0)
  const { snack, setSnack } = useContext(SnackbarContext);
  let history = useNavigate()
  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr(0);
    if(item.sub_plan_name === ""){
      setErr(1);
      setSnack({
        message: "Please Enter Subscription Plan Title",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.sub_plan_validity === ""){
      setErr(2);
      setSnack({
        message: "Please Enter Subscription Plan Validity in Days",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.sub_plan_featured === ""){
      setErr(3);
      setSnack({
        message: "Please Enter Number of Featured List",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.sub_plan_amount === ""){
      setErr(4);
      setSnack({
        message: "Please Enter Subscription Plan Amount",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.sub_plan_role === ""){
      setErr(5);
      setSnack({
        message: "Please Select Role",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.sub_plan_list === ""){
      setErr(6);
      setSnack({
        message: "Please Enter Number of Listings",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else{
      setWait(true)
    const formData = new FormData()
    formData.append('sub_plan_name', item.sub_plan_name)
    formData.append('sub_plan_validity', item.sub_plan_validity)
    formData.append('sub_plan_featured', item.sub_plan_featured)
    formData.append('sub_plan_amount', item.sub_plan_amount)
    formData.append('sub_plan_role', item.sub_plan_role)
    formData.append('sub_plan_list', item.sub_plan_list)
    formData.append("aid", admin.admin_id);
    await axios.post('/admin/addSubPlan', formData , {
      headers: { tkn:tkn },
    }).then(function (res) {
      console.log(res)
      if (res.data.status === 1) {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        history('/Dashboard/subscription_plans')
      }
      else{
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    })
  }
  };

  return (
    <>
     <Helmet>
                
                <title>Add Subscription Plan | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
               <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={1}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={11}>
    <Container maxWidth="sm">
      {/* <Box sx={{ mt: 4 }}> */}
      <Box sx={{ m: 5, p: 5, textAlign: "center", border: "1px solid #060847", backgroundColor: "white" }}>

        <form onSubmit={handleSubmit}>
          <Typography variant="h5" style={{ color: "#060847" }}>Add Subscription Plan</Typography>
          <br />
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField name="sub_plan_name" value={item.sub_plan_name} label="Plan Name" onChange={handleChange} fullWidth  error={err == 1 && true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' name="sub_plan_validity" value={item.sub_plan_validity} label="Validity (in days)" onChange={handleChange} fullWidth  error={err == 2 && true}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="sub_plan_featured" value={item.sub_plan_featured} label="No. of Featured List" onChange={handleChange} fullWidth  error={err == 3 && true}/>
            </Grid>
            <Grid item xs={12}>
              <TextField type='number' name="sub_plan_amount" value={item.sub_plan_amount} label="Amount" onChange={handleChange} fullWidth  error={err ==4 && true}/>
            </Grid>
            <Grid item xs={12}>
              <TextField select name="sub_plan_role" value={item.sub_plan_role} label="Role" onChange={handleChange} fullWidth  error={err == 5 && true}>
                <MenuItem value="1">Owner</MenuItem>
                <MenuItem value="2">Agent</MenuItem>
                <MenuItem value="3">Builder</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" name="sub_plan_list" value={item.sub_plan_list} label="Number Of Listings" onChange={handleChange} fullWidth  error={err == 6 && true}/>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained"disabled={wait} fullWidth sx={{ m: 2,backgroundColor: wait ? "white" : "#060847",  color: wait ? "black" : "white","&:hover":{backgroundColor:wait?"wait":"#060847"} }}>
            {wait ? "Please Wait...." : "Add  Add Subscription"}
               
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
    </Grid>
    </Grid>
    </>
  );
};


