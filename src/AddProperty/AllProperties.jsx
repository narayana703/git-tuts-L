import {
  Box,
  IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem,Card,CardMedia,FormControl,Checkbox,Select,OutlinedInput,ListItemText,InputLabel,InputAdornment,DialogActions,DialogContentText, Fab
} from "@mui/material";
import { usePropertyData } from "./AllPropFunction";
import {Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../components/Loading";
import "../App.css"
import { DataGrid } from "@mui/x-data-grid";
import React, { useState,useContext, useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext,SnackbarContext } from "../components/UserContext";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import {LeftDrawer} from '../Dashboard/Leftdrawer'
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";
import CloseIcon from '@mui/icons-material/Close';

var momentt = require("moment-timezone");
const steps = ['Edit Property', 'Property Details', 'Agent Details', "Floor Details"];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  
  'ac','barbeque','dryer','gym','laundry','lawn','microwave','outdoor shower','fridge','sauna','swimming pool','tv','washer','wifi','window coverings',
];

export const Properties = () => {

  const { snack, setSnack } = useContext(SnackbarContext);
  const [propData,loading,page,setPage,openE,setOpenE, item,setItem,id,setId,setImages, images, navigate, itemChange, onChangeImage, itemSubmit,err,oldImages,setOldImages,deleteImage,deletedata,floorData,fileEdit,uploadwait,profile,onChangeImage1,floor_img,onChangeImage2,feature,handleChange,setFeature,userid,setUserId,getdata] = usePropertyData();
  const [openC,setOpenC]=useState(false)
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
const {propId,setPropId,admin,tkn}=useContext(UserContext)
const [value, setValue] = useState('');
const [send, setSend] = useState();
const [status, setStatus] = useState('');
const handleStatusOpen = () => {
  setOpenC(true);
};

const handleStatusClose = () => {
  setOpenC(false);
};
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const history=useNavigate()
  const columns = [
    { field: "prop_id", headerName: "Property ID", width: 120, },
    { field: "prop_title", headerName: "Title", width: 120, },
    
    { field: "city", headerName: "City", width: 120, },
    { field: "prop_price", headerName: "Price", width: 120},
    { field: "prop_cat", headerName: "Type", width: 120, },
    { field: "rent_sale", headerName: "Rent/Sale", width: 120,  valueGetter: (params) => {
      if (params.row.rent_sale === 1) {
        return "Rent";
      }
    else  if (params.row.rent_sale === 1) {
      return "Sale";
    }
    else{return '0'}
  }
    },
    { field: "role", headerName: "Category", width: 120,valueGetter: (params) => {
      if (params.row.role === 1) {
        return "Owner";
      }  
      if (params.row.role === 2) {
        return "Agent";
      }  
      if (params.row.role === 3) {
        return "Builder";
      }
    } },
    { field: "user_name", headerName: "Name", width: 120, },
    { field: "user_email", headerName: "Email", width: 120, },
    { field: "user_mobile", headerName: "Mobile", width: 120, },
    { field: "added_date", headerName: "Published Date", width: 120, valueFormatter: params =>
    momentt(`${params.value}`).format("YYYY-MM-DD"), },
    { field: "sub_plan_name", headerName: "Plan Name", width: 120, valueGetter: (params) => {
      if (params.row.sub_plan_name === null) {
        return "Not in Plan";
      } 
    else{
      return params.row.sub_plan_name;
    } }},

    { field: "valid_date", headerName: "Expiry Date", width: 120, valueGetter: (params) => {
      if (params.row.valid_date === null) {
        return "Not in Plan";
      } 
    else{
      // return params.row.valid_date;
      return momentt(`${params.row.valid_date}`).format("YYYY-MM-DD")
    } }},

   

    {
      field: "prop_status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => {
        if (params.row.prop_status === 1) {
          return "Active";
        } else if (params.row.prop_status === 0) {
          return "Waiting For Approval";
        } else if (params.row.prop_status === 2) {
          return "Inactive";
        } else {
          return "Reject";
        }
      }
    },
    {
      field: "actions2",
      headerName: "Status Update",
      type: "actions",
      width: 120,
      renderCell: (row) => (
       
        <Button onClick={()=>{
           console.log(row)
           setId(row.id)
           setValue(row.row.prop_status)
           setStatus(row.row.prop_status)
          handleStatusOpen(row.row.prop_id)
        }} sx={{color:"#060847"}}>
         Update Status
        </Button>
      ),
    },

    {
      field: "actions",
      headerName: "Edit",
      type: "actions",
      width: 30,
      renderCell: (row) => (
        <IconButton>
          <EditIcon sx={{ color: "#060847" }} onClick={() => {
          //  localStorage.setItem('rowid', row.id);
          //  localStorage.setItem('adminPropCatId',row.row.prop_cat_id)
     console.log(row.row.prop_cat_id,"===============cataid")
history(`/Dashboard/edit_property/${row.row.prop_id}`)
          
          }} />
        </IconButton>
      ),
    },
    // {
    //   field: "actions1",
    //   headerName: "Delete",
    //   type: "actions",
    //   width: 70,
    //   renderCell: (row) => (
    //     <IconButton>
    //       <DeleteIcon sx={{ color: "#060847" }} onClick={()=>{
    //         deletedata(row.id)
    //       }}
    //       />
    //     </IconButton>
    //   ),
    // },
  ]

 const handleStatusUpdate=(e)=>{
  e.preventDefault()
  console.log(id)
  const formdata = new FormData();
  formdata.append("id", id);
  
  formdata.append("aid", admin.admin_id);
  formdata.append("status",status);
  axios.post("/admin/update_satus", formdata, {
    headers: { tkn: tkn },
  }).then(function (res) {
    if (res.data.status === 1) {
   
     setSnack({
       message: res.data.msg,
       type: "success",
       open: true,
     });
     handleStatusClose()
     getdata()
   } else {
     setSnack({
       message: res.data.msg,
       type: "error",
       open: true,
     });
   }
 });
 }

// const tableRef = useRef(null);

//   const exportToExcel = () => {
//     const csvData = [
//       columns.map(column => column.headerName),
//       ...propData.map(row => columns.map(column => row[column.field]))
//     ].map(row => row.join(','));

//     const csvString = csvData.join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

//     const downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(blob);
//     downloadLink.download = 'PropertyTable.csv';
//     downloadLink.click();
//   };




  return (
    <>
        <Helmet>
                
                <title>My Properties| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
            <Grid container justifyContent="center"
        alignItems="flex-start">
  <Grid item xs={2}>
  {/* <LeftDrawer /> */}
     </Grid>
      <Grid item xs={10}>
      {loading ? (
        <Loading />
      ) : (
        <>
           <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
           <Grid container justifyContent="center"
              alignItems="center" mt={3}>
               <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: "#060847" }}>My Properties</Typography>
              </Grid>
             
            </Grid>
          <Box sx={{ pt: 3,ml:5,p:3}} >
          {/* <Typography variant="h4" style={{ color: "#060847" }}>Property Details</Typography> */}
          <Box 
              sx={{
                backgroundColor: "white",
                height: "600px",
                width: "100%",
               
              }}
            >
              {/* <button onClick={exportToExcel}>Export Excel</button> */}
     
              <DataGrid  
   
                hideFooterSelectedRowCount
                rows={propData}
                columns={columns}
                getRowId={(row) => row.prop_id}
                onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pageSize={page}
                // pagination
                getRowHeight={() => 'auto'}
                sx={{
                  '.MuiDataGrid-columnHeaders': {
                    backgroundColor: "#060847",
                    color: "#f8f8f8"
                  },
                  '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                  '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root ': {
                    color: "black"
                  }
                }}
              />
            
               <Dialog open={openC} onClose={handleStatusClose} maxWidth={"lg"}>
               <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'grey' }}
                  onClick={() => {
                    handleStatusClose()
                    // handle close icon click event
                    // deleteCard(i.search_hist_id)
                  }}
                >
                  <CloseIcon sx={{backgroundColor:"grey",color:"#ffff",borderRadius:"15px",padding:"1px", "&:hover":{backgroundColor:"grey",borderRadius:"15px",padding:"1px"}}}/>
                </IconButton>
                <Container maxwidth='sm'>
            <form onSubmit={handleStatusUpdate}> <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <DialogContent>
              
                <DialogContentText><h4>ARE YOU SURE?</h4></DialogContentText>
           
                <TextField
                  select
                  size="small"
                  name="status"
                  label="Status"
                  value={status}

                  sx={{
                    m: 2,
                    width: "80%",
                  }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="0">Waiting For Approval</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">Inactive</MenuItem>

                </TextField></DialogContent>
              <DialogActions>
                <Button className='linkbttn' type="submit" variant="contained" >send</Button>
              </DialogActions></Grid>
            </form></Container>
          </Dialog>


        
          <Dialog 
        maxWidth={"md"}
        open={send}
        onClose={() => { setSend(false) }} >
        <Box sx={{ width: "300px" }} >
          <br />
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item  ><CircularProgress /></Grid>
              <Grid item  ><Typography variant='h5'>Please Wait...</Typography> </Grid>
            </Grid>
          </Grid>

          <br /></Box>
      </Dialog>
            </Box>
           

          </Box>
</Container>
        </>
      )} 
      </Grid>
      </Grid>
      </>
  );
};

































