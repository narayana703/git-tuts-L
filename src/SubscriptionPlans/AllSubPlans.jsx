import { Box, Card, Container, Typography,Grid,Button, Dialog,DialogContent,TextField, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext, UserContext } from '../components/UserContext';
import {Loading} from '../components/Loading'
import { LeftDrawer } from '../Dashboard/Leftdrawer';
import {CircularProgress} from '@mui/material';
import { Helmet } from 'react-helmet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const AllSubPlans=()=> {
  const [subplan, setSubPlan] = useState([]);
const [open,setOpen]=useState(false)
const [id,setId]=useState("")
const { snack, setSnack } = useContext(SnackbarContext);
const [loading,setLoading]=useState(true)
const [wait, setWait] = useState(false)
const [dilogopen, setDilogopen] = useState(false);
const [item, setItem] = useState({
    
  sub_plan_name: '',
  sub_plan_validity: '',
  sub_plan_featured: '',
  sub_plan_amount: '',
  sub_plan_role: '',
  sub_plan_list: '',
});
const { admin,tkn } = useContext(UserContext)
let history=useNavigate()
const [err, setErr] = useState(0)
  useEffect(() => {
    getData();
    singleData()
  }, []);

  const getData = async () => {
    const formData = new FormData()
    formData.append("aid", admin.admin_id);
    await axios.post('/admin/allSubPlans',formData, {
      headers: { tkn:tkn },
    }).then(function (res) {
      console.log('hiiiii');
      console.log(res.data.data);
      if (res.data.status === 1) {
        setSubPlan(res.data.data);
        setLoading(false)
      }
    });
  };

const singleData=async (iid)=>{
  // setDilogopen(true)
  setLoading(true)
  console.log(id)
  const formdata=new FormData()
  formdata.append("id",iid)
  formdata.append("aid", admin.admin_id);
  await axios.post('/admin/singleSubPlan',formdata, {
    headers: { tkn:tkn },
  }).then(function (res) {
    console.log('hiiiii');
    console.log(res.data);
    if (res.data.status === 1) {
      // setDilogopen(false)
     
      setItem({
        sub_plan_name: res.data.data[0].sub_plan_name,
        sub_plan_validity: res.data.data[0].sub_plan_validity,
        sub_plan_featured: res.data.data[0].sub_plan_featured,
        sub_plan_amount: res.data.data[0].sub_plan_amount,
        sub_plan_role: res.data.data[0].sub_plan_role,
        sub_plan_list: res.data.data[0].sub_plan_list,
      })
     
      setLoading(false)
      handleClickOpen(res.data.data[0].sub_plan_id)
    }
  });
}
const handleClickOpen=()=>{
  setOpen(true)
}
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
  const formData=new FormData()
  formData.append('id',id)
  formData.append("aid", admin.admin_id);
  formData.append('sub_plan_name',item.sub_plan_name)
  formData.append('sub_plan_validity',item.sub_plan_validity)
  formData.append('sub_plan_featured',item.sub_plan_featured)
  formData.append('sub_plan_amount',item.sub_plan_amount)
  formData.append('sub_plan_role',item.sub_plan_role)
  formData.append('sub_plan_list',item.sub_plan_list)
  await axios.post('/admin/editSubPlan', formData , {
    headers: { tkn:tkn },
  }).then( function (res){
    console.log(res)
    if(res.data.status===1){
      setWait(false)
// history('/Dashboard/subscription_plans')
setOpen(false)
setLoading(false)
getData()
    }
  })
  }
};
const deleteData = async (event) => {
  event.preventDefault();
  const formData=new FormData()
  formData.append('id',id)
  formData.append("aid", admin.admin_id);
  await axios.post('/admin/deleteSubPlan', formData, {
    headers: { tkn:tkn },
  }).then( function (res){
    console.log(res)
    if(res.data.status===1){
// history('/Dashboard/subscription_plans')

getData()
    }
  })

};
  return (
    <div>
       <Helmet>
                
                <title>All Subscription Plans | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
                 <Grid container  justifyContent="center"
  alignItems="flex-start">
  {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
      <Grid item xs={12}>
      <Container maxWidth='md'>
        {loading ? <Loading /> :
        <>
         <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={4}
          >
             <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: "#060847" ,mt:3}}>Subscription Plans <hr/></Typography>
              </Grid>
              </Grid>
        <Box
          sx={{
            m: 5,
            mt: 2,
            p: 2,
            textAlign: 'center',
            // border: '1px solid #060847',
          }}
        >
           <Typography variant='h5' gutterBottom sx={{textAlign:'start',color: "#060847"}}>
            OWNER
            </Typography>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={4}
          >
           
            {/* {JSON.stringify(subplan[0])} */}
           
            {subplan &&
              subplan.slice(0, 3).map((i) => (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={i.sub_plan_id}>
                  {/* <b><h3>{i.sub_plan_role === 1 && 'OWNER:'}</h3></b> */}
                  <Card sx={{borderRadius:5}}title={i.sub_plan_name}>
                    <Box sx={{ p: 2 }}>
                    {/* {JSON.stringify(i.sub_plan_id)} */}
                      <Typography variant='h5' gutterBottom>
                        {i.sub_plan_name}
                      </Typography>
                      {/* <Typography variant='body1' gutterBottom>
                        Role: {i.sub_plan_role === 1 && 'Owner' || i.sub_plan_role === 2 && 'Agent' || i.sub_plan_role === 3 && 'Builder'}
                      </Typography> */}
                      <Typography variant='body1' gutterBottom>
                        Validity: {i.sub_plan_validity} days
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        No. of Listings: {i.sub_plan_list} 
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Featured Property: {i.sub_plan_featured}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Amount: {i.sub_plan_amount}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Staus: {i.sub_plan_status===1 ? "Active" : "InActive" }
                      </Typography>
                      <Grid 
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      >
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{     
                        setId(i.sub_plan_id)  
                        singleData(i.sub_plan_id)        

                        // handleClickOpen(i.sub_plan_id)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <EditIcon /></Button>
                      </Grid>
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{   
                        setId(i.sub_plan_id)                   
                        deleteData(e)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <DeleteIcon /></Button>
                      </Grid>
                    </Grid>
                    </Box>
                    
                  </Card>
                </Grid>
              ))}
          </Grid>
<br/>
<Typography variant='h5' gutterBottom sx={{textAlign:'start',color: "#060847"}}>
            Agent
            </Typography>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={4}
          >
           
            {/* {JSON.stringify(subplan[0])} */}
           
            {subplan &&
              subplan.slice(3, 6).map((i) => (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={i.sub_plan_id}>
                  {/* <b><h3>{i.sub_plan_role === 1 && 'OWNER:'}</h3></b> */}
                  <Card sx={{borderRadius:5}} title={i.sub_plan_name}>
                    <Box sx={{ p: 2 }}>
                    {/* {JSON.stringify(i.sub_plan_id)} */}
                      <Typography variant='h5' gutterBottom>
                        {i.sub_plan_name}
                      </Typography>
                      {/* <Typography variant='body1' gutterBottom>
                        Role: {i.sub_plan_role === 1 && 'Owner' || i.sub_plan_role === 2 && 'Agent' || i.sub_plan_role === 3 && 'Builder'}
                      </Typography> */}
                      <Typography variant='body1' gutterBottom>
                        Validity: {i.sub_plan_validity} days
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        No. of Listings: {i.sub_plan_list} 
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Featured Property: {i.sub_plan_featured}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Amount: {i.sub_plan_amount}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Staus: {i.sub_plan_status===1 ? "Active" : "InActive" }
                      </Typography>
                      <Grid 
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      >
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{     
                        setId(i.sub_plan_id)  
                        singleData(i.sub_plan_id)        

                        // handleClickOpen(i.sub_plan_id)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <EditIcon /></Button>
                      </Grid>
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{   
                        setId(i.sub_plan_id)                   
                        deleteData(e)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <DeleteIcon /></Button>
                      </Grid>
                    </Grid>
                    </Box>

                  </Card>
                </Grid>
              ))}
          </Grid>
<br/>
          <Typography variant='h5' gutterBottom sx={{textAlign:'start',color: "#060847"}}>
            Builder
            </Typography>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={4}
          >
           
            {/* {JSON.stringify(subplan[0])} */}
           
            {subplan &&
              subplan.slice(6, 9).map((i) => (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={i.sub_plan_id}>
                  {/* <b><h3>{i.sub_plan_role === 1 && 'OWNER:'}</h3></b> */}
                  <Card sx={{borderRadius:5}} title={i.sub_plan_name}>
                    <Box sx={{ p: 2 }}>
                    {/* {JSON.stringify(i.sub_plan_id)} */}
                      <Typography variant='h5' gutterBottom>
                        {i.sub_plan_name}
                      </Typography>
                      {/* <Typography variant='body1' gutterBottom>
                        Role: {i.sub_plan_role === 1 && 'Owner' || i.sub_plan_role === 2 && 'Agent' || i.sub_plan_role === 3 && 'Builder'}
                      </Typography> */}
                      <Typography variant='body1' gutterBottom>
                        Validity: {i.sub_plan_validity} days
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        No. of Listings: {i.sub_plan_list} 
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Featured Property: {i.sub_plan_featured}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Amount: {i.sub_plan_amount}
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Staus: {i.sub_plan_status===1 ? "Active" : "InActive" }
                      </Typography>
                      <Grid 
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      >
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{     
                        setId(i.sub_plan_id)  
                        singleData(i.sub_plan_id)        

                        // handleClickOpen(i.sub_plan_id)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <EditIcon /></Button>
                      </Grid>
                      <Grid ml={1}>
                      <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{   
                        setId(i.sub_plan_id)                   
                        deleteData(e)
                        // onSubmit(i.sub_plan_id)
                      }}
                      > <DeleteIcon /></Button>
                      </Grid>
                    </Grid>
                    </Box>

                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box> 
       
        </>
}
<Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent sx={{ backgroundColor: "white" }}>
                  <Container maxWidth="sm" >
                  {loading ? (
                               <CircularProgress style={{color:"#060847",}} />
                            ) : (
                                <>
                   {/* hello
                   {JSON.stringify(item)} */}
                   <Box sx={{ m: 5, p: 5,textAlign:"center",border: "1px solid #060847",backgroundColor:"white" }}>
        {/* {JSON.stringify(id)} */}
        
        
        {/* <form onSubmit={handleSubmit}> */}
        <Typography variant="h5" style={{ color: "#060847" }}>Update Subscription Plan</Typography>
        <br/>
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
  {/* {JSON.stringify(id)} */}
  <Button onClick={(e)=>{handleSubmit(e)}} variant="contained" disabled={wait} sx={{ backgroundColor: wait ? "white" : "#060847",  color: wait ? "black" : "white","&:hover":{backgroundColor:wait?"wait":"#060847"}  }} fullWidth>{wait ? "Please Wait...." : "Update Subscription"}
    
  </Button>
</Grid>
</Grid>
        {/* </form> */}
      </Box>
                   </>
                  )} 
                   </Container>
                </DialogContent>
              </Dialog>

      {/* <Dialog
        maxWidth={"sm"}
        open={dilogopen}
        onClose={() => { setDilogopen(false) }} >
        <Box sx={{ width: "100px" }} >
          <br />
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item  ><CircularProgress style={{color:"#060847",}} /></Grid>
             
            </Grid>
          </Grid>

          <br /></Box>
      </Dialog> */}
      </Container></Grid>
      </Grid>
    </div>
  );
}