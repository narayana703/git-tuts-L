import React from "react";
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Card,
    Grid,
    Typography,
    CardContent,
    Button, Dialog, DialogActions, DialogContentText, DialogContent, TextField, MenuItem, Box, DialogTitle, Fab, IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../../components/UserContext";
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from "react-helmet";
import { Loading } from "../../components/Loading";
var momentt = require("moment-timezone");
export const ProjectData = () => {
    const { admin } = useContext(UserContext)
    const { tkn, } = useContext(UserContext)
    const { snack, setSnack } = useContext(SnackbarContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(10);

    useEffect(() => {
        getdata();
    }, []);
    const getdata = async () => {
        const formdata = new FormData();
        formdata.append("aid", admin.admin_id);
        await axios.post("/admin/get_all_projects"
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
    let history = useNavigate()
    const columns = [
        { field: "project_id", headerName: "Project ID", width: 120 },
        { field: "project_title", headerName: "Title", width: 120 },

        {
            field: "project_type", headerName: "Project Type", width: 120, valueGetter: (params) => {
                if (params.row.project_type === 1) {
                    return "On Going";
                }
                if (params.row.project_type === 2) {
                    return "Up Comming";
                }
            }
        },
        { field: "location", headerName: "Location", width: 120 },

        {
            field: "project_status", headerName: "Status", width: 100, valueGetter: (params) => {
                if (params.row.project_status === 1) {
                    return "Active";
                }
                if (params.row.project_status === 2) {
                    return "Inactive";
                }

            }
        },
        {
            field: "added_date", headerName: "Added Date", width: 120, valueFormatter: params =>
                momentt(`${params.value}`).format("YYYY-MM-DD"),
        },
        {
            field: "actions",
            headerName: "Edit",
            type: "actions",
            width: 30,
            renderCell: (row) => (
                <IconButton>
                    <EditIcon sx={{ color: "#060847" }} onClick={() => {

                        console.log(row.project_id)
                        history(`/Dashboard/edit_project/${row.row.project_id}`)

                    }} />
                </IconButton>
            ),
        },
    ];
    return (
        <div>
            <Helmet>

                <title>All Projects| Buy or Sell or Rent Property Online</title>

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
                                        <Typography variant="h4" sx={{ color: "#060847" }}>Projects Data</Typography>
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
                                            getRowId={(row) => row.project_id}
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