import {
  Box,
  IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem,Card,CardMedia,FormControl,Checkbox,Select,OutlinedInput,ListItemText,InputLabel,InputAdornment,
} from "@mui/material";
import { usePropertyData } from "./AllPropFunction";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../../components/Loading";
import "../../App.css"
import { DataGrid } from "@mui/x-data-grid";
import React, { useState,useContext } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
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


export const Properties = () => {
  const [propData, loading, page, setPage, openE, setOpenE, item, setItem, id, setId, setImages, images, navigate, itemChange, onChangeImage, itemSubmit, err, oldImages, setOldImages, deleteImage,deletedata,floorData,fileEdit,uploadwait,profile,onChangeImage1,floor_img,onChangeImage2,feature,handleChange,setFeature,singlePropData] = usePropertyData();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
const {propId,setPropId,uid,setUId}=useContext(UserContext)
  const isStepOptional = (step) => {
    return step === 1;
  };
console.log(uid,"=====42");
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
    { field: "id", headerName: "Property ID", width: 120, },
    
    { field: "title", headerName: "Title", width: 120, },
   
    { field: "country", headerName: "Country", width: 120, },
    { field: "address", headerName: "Address", width: 120, },
    { field: "price", headerName: "Price", width: 120, },
    { field: "property_type", headerName: "Type", width: 120, },
    { field: "property_status", headerName: "Status", width: 120, },
   
    
    { field: "Rooms", headerName: "No of rooms", width: 120, },
    { field: "Garage_area", headerName: "Garage Area", width: 120, },
   
    { field: "attachment", headerName: "Attachment", width: 120, },
    { field: "bathrooms", headerName: "Bathrooms", width: 120, },
    { field: "bedrooms", headerName: "Bed Rooms", width: 120, },
    
    { field: "feature", headerName: "Feature ", width: 120, },

   

    { field: "year_built", headerName: "Year Built ", width: 120, },

    {
      field: "images", renderCell: (params) => {

        return (
          <div style={{ marginRight: "1px", padding: "1px" }}>
           
        
            {params.value.split(",").map((j) =>
            
              <img
                src={`/images/properties/${j}`}
                alt="IMAGE"
                width="60"
                height="60"
              />)}
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => {
        if (params.row.status === 1) {
          return "Active";
        } else if (params.row.status === 0) {
          return "Waiting For Approval";
        } else if (params.row.status === 2) {
          return "Inactive";
        } else {
          return "Reject";
        }
      }
    },
  
    {
      field: "actions",
      headerName: "Edit",
      type: "actions",
      width: 30,
      renderCell: (row) => (
        <IconButton>
          <EditIcon sx={{ color: "#001e95" }} onClick={() => {
           localStorage.setItem('rowid', row.id);
           console.log(row)
    //  localStorage.setItem('propId',row.)
    localStorage.setItem('userpropCatId',row.row.prop_cat_id)
history('/user_dashboard/edit_property')
          
          }} />
        </IconButton>
      ),
    },
    {
      field: "actions1",
      headerName: "Inactive Status",
      width: 120,
      valueGetter: (params) => {
        if (params.row.status === 2) {
          return "Inactive";
        } else {
          return "";
        }
      }
    },
    // {
    //   field: "actions1",
    //   headerName: "Delete",
    //   type: "actions",
    //   width: 70,
    //   renderCell: (row) => (
    //     <IconButton>
    //       <DeleteIcon sx={{ color: "#001e95" }} onClick={()=>{
    //         deletedata(row.id)
    //       }}
    //       />
    //     </IconButton>
    //   ),
    // },
  ]

  // {
  //   field: "actions1",
  //   headerName: "Delete",
  //   type: "actions",
  //   width: 70,
  //   hideHeader: !user.admin_id, // hide header when admin_id is not available
  //   renderCell: (row) => {
  //     const showDelete = user.admin_id;
  //     return (
  //       showDelete && (
  //         <IconButton>
  //           <DeleteIcon
  //             sx={{ color: "#001e95" }}
  //             onClick={() => {
  //               deletedata(row.id);
  //             }}
  //           />
  //         </IconButton>
  //       )
  //     );
  //   },
  // }
  



  return (
    <>
         <Grid container  justifyContent="center"
  alignItems="flex-start">
  {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
      <Grid item xs={10}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="lg">
       
          <Box sx={{ pt: 3,}} >
          <Typography variant="h4" style={{ color: "#001e95" }}>Property Details</Typography>
          <Box 
              sx={{
                backgroundColor: "white",
                height: "600px",
                width: "100%",
               
              }}
            >
              <DataGrid
                hideFooterSelectedRowCount
                rows={propData}
                columns={columns}
                getRowId={(row) => row.id}
                onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pageSize={page}
                // pagination
                getRowHeight={() => 'auto'}
                sx={{
                  '.MuiDataGrid-columnHeaders': {
                    backgroundColor: "#001e95",
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

































