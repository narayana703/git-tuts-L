import React from "react";
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    Typography,
    Button, MenuItem, Box, IconButton,
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from "react-helmet";
import { Loading } from "../components/Loading";
import VisibilityIcon from '@mui/icons-material/Visibility';


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



export const AdminHistory = () => {
    const { admin } = useContext(UserContext)
    const { tkn, } = useContext(UserContext)
    const { snack, setSnack } = useContext(SnackbarContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(10);
let history=useNavigate()
    useEffect(() => {
        getdata();
    }, []);
    const getdata = async () => {
        const formdata = new FormData();
        formdata.append("aid", admin.admin_id);
        await axios.post("/admin/get_admin_history"
            , formdata, {
            headers: { tkn: tkn },
        }
        ).then((res) => {
            console.log(res.data.data);
            if (res.data.status === 1) {
                setData(res.data.data);
                // setStatus1(res.data.data.title)

                setLoading(false);
                console.log(res.data.data[0]);
            }
        });
    };
      const columns = [
      
     
        { field: "admin_name", headerName: "Name", width: 120 },
       

        { field: "admin_email", headerName: "Email", width: 200 },
        { field: "admin_mobile", headerName: "Mobile", width: 120 },
     
        { field: "added_by", headerName: "Added By", width: 120 },
        
      ];
    return (
        <div>
            <Helmet>

                <title>Admin History| Buy or Sell or Rent Property Online</title>

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
                            <Container maxWidth="md" sx={{ backgroundColor: "white" }}>
                                <Grid container justifyContent="center"
                                    alignItems="center" mt={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" sx={{ color: "#060847" }}>Admin Data</Typography>
                                    </Grid>

                                </Grid>
                                <Box sx={{ pt: 3, ml: 5, p: 3 }} >
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
      getRowId={(row) => row.admin_id}
      onPageSizeChange={(newPageSize) => setPage(newPageSize)}
      rowsPerPageOptions={[10, 20, 30]}
      pageSize={page}
      // pagination
      slots={{
        toolbar: CustomToolbar,
      }}
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