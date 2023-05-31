import {
    Box,
    IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem, Card, CardMedia
  } from "@mui/material";
 
  import EditIcon from '@mui/icons-material/Edit';
  import { Loading } from "../components/Loading";
  import {  DataGrid, GridToolbarContainer, GridToolbarExport  } from "@mui/x-data-grid";
  import DeleteIcon from '@mui/icons-material/Delete';
  import react, { useState, useEffect, useContext } from "react";
  import axios from "axios";
  import { useNavigate, useParams } from 'react-router-dom';
  import { UserContext, SnackbarContext } from "../components/UserContext";
  import Compressor from 'compressorjs';
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";

  // {parse(`${service.serv_desc}`)}
  var momentt = require("moment-timezone");



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  export const ContactList = () => {
 
  const [contactData,setContactData]=useState([])
    const [loading, setLoading] = useState(true);
    const { admin } = useContext(UserContext)
    const { tkn, } = useContext(UserContext)
    const [page, setPage] = useState(10);
    const [openE, setOpenE] = useState(false)
    const [ckdesc, setCkDesc] = useState("")
  
    const [oldImages, setOldImages] = useState([]);
    const [imageids, setImageIds] = useState("");
    const [delImage, setDelImage] = useState("")
    const navigate = useNavigate();
  
    const [id, setId] = useState("")
    const { snack, setSnack } = useContext(SnackbarContext);
  
   
    const [dateTime, setDateTime] = useState("")
    const [images, setImages] = useState([])
   
    const [err, setErr] = useState(0)
  
    useEffect(() => {
      getdata();
    }, []);
    const getdata = async () => {
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/allcontacts",
        formdata
        , {
          headers: { tkn: tkn },
        }
      ).then((res) => {
        console.log(res.data)
        if (res.data.status === 1) {
            setContactData(res.data.data);
          // setOldImages()
          setLoading(false);
          console.log(res.data.data);
        }
      });
    };
  
    const getdata1 = async () => {
      const formdata = new FormData();
      formdata.append("id", id)
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/get_Single_articles", formdata , {
        headers: { tkn: tkn },
      }).then(function (res) {
        console.log(res.data)
        if (res.data.status === 1) {
          console.log(res)
         
          var dateTime = String(momentt(res.data.data.added_date).format('YYYY-MM-DD'));
          console.log(dateTime)
          setDateTime(dateTime)
         
          setId(res.data.data.article_id)
          setOpenE(true)
          setLoading(false)
  
        } else {
          // setSnack({
          //   message: res.data.msg,
          //   type: "error",
          //   open: true,
          // });
          setLoading(false)
          setOpenE(false)
  
  
        }
  
      });
  
    }
  
   
  
    const columns = [
      { field: "contact_id", headerName: "ID", width: 120, },
      { field: "contact_name", headerName: "User Name", width: 200 },
      { field: "contact_mobile", headerName: "Mobile", width: 200 },
      { field: "contact_email", headerName: "Email", width: 200 },
      { field: "contact_location", headerName: "Location", width: 200 },
      
      { field: "contact_message", headerName: "Message", width: 200 },
      
      { field: "added_date", headerName: "Added Date", width: 200 },
     
  
    //   {
    //     field: "actions1",
    //     headerName: "Delete",
    //     type: "actions",
    //     width: 70,
    //     renderCell: (row) => (
    //       <IconButton>
    //         <DeleteIcon sx={{ color: "#001e95" }} onClick={() => {
    //           deletedata(row.id)
    //         }}
    //         />
    //       </IconButton>
    //     ),
    //   },
    ]
  
   
    const deletedata = async (id) => {
  
      const formdata = new FormData();
      formdata.append("id", id)
  
      formdata.append("aid", admin.admin_id);
  
      await axios.post("/admin/delete_article", formdata,
        {
          headers: { tkn: tkn },
        }
      ).then(function (res) {
        if (res.data.status === 1) {
          console.log(res)
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          getdata();
        }
      })
    }
   
  
    return (
      <>
       <Helmet>
                
                <title>All Contacts | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
       <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={1}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={11}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Container maxWidth="lg">
            <Box sx={{mt:5, pt: 3,ml:10 }} >
    
    <Typography variant="h5" style={{ color: "#060847" }}>Contact Details</Typography>
    <br/>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "600px",
                  width: "100%",
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  rows={contactData}
                  columns={columns}
                  getRowId={(row) => row.contact_id}
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
                      color: "white"
                    },
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root ': {
                      color: "white"
                    }
                  }}
                />
              </Box>
          
            </Box>
  
            </Container>
          </>
        )}
        
        </Grid>
        </Grid> </>
    );
  };
  
  
  
  