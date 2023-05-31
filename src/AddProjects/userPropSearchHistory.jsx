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
import { DataGrid } from "@mui/x-data-grid";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";

import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from "react-helmet";
import { Loading } from "../components/Loading";

export const UserPropSearchHist=()=> {
  const { admin } = useContext(UserContext)
  const { tkn, } = useContext(UserContext)
  const { snack, setSnack } = useContext(SnackbarContext);
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true)
  const [page, setPage] = useState(10);

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/fetch_props_All_users"
      , formdata, {
      headers: { tkn: tkn },
    }
    ).then((res) => {
      console.log(res.data.data );
      if (res.data.status === 1) {
        setData(res.data.data);
        // setStatus1(res.data.data.title)

        setLoading(false);
        console.log(res.data.data[0]);
      }
    });
  };
  const columns = [
    { field: "property_id", headerName: "Property ID", width: 120 },
    { field: "prop_type", headerName: "Property Type", width: 120 ,valueGetter: (params) => {
      if (params.row.prop_type === 1) {
        return "Residential";
      } 
      if (params.row.prop_type === 2) {
        return "Commercial";
      }
    }},
    { field: "prop_title", headerName: "Title", width: 100 },
    { field: "prop_cat", headerName: "Category", width: 120 },
    { field: "user_name", headerName: "Name", width: 120 },
    { field: "city", headerName: "City", width: 120 },
    { field: "role", headerName: "Role", width: 100,valueGetter: (params) => {
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
    { field: "user_email", headerName: "Email", width: 150 },
    { field: "user_mobile", headerName: "Mobile", width: 120 },
  ];
  return (
    <div>
       <Helmet>
                
                <title>Search Properties History| Buy or Sell or Rent Property Online</title>
                 
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
                <Typography variant="h4" sx={{ color: "#060847" }}>Search User Properties History</Typography>
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
   
   <DataGrid
      hideFooterSelectedRowCount
      rows={data}
      columns={columns}
      getRowId={(row) => row.property_id}
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
            
            </Box>
           

          </Box>
</Container>
        </>
      )} 
      </Grid>
      </Grid>
    </div>
  );
}