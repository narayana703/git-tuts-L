import {
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    TableBody,
    Box,
    Paper,
    Button, IconButton, Typography, TextField, MenuItem, Container, Grid, TablePagination, Dialog, DialogContent, Card, CardMedia
} from "@mui/material";
// import { useBannerData } from "./getBannerFunction";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from "../../components/Loading";
import "../../App"
import { DataGrid } from "@mui/x-data-grid";
import { LeftDrawer } from "../../Dashboard/Leftdrawer";
import { useContext, useState,useEffect } from "react";
import { SnackbarContext, UserContext } from "../../components/UserContext";
import axios from 'axios'
import Compressor from 'compressorjs';

export const BannerData = () => {
    // const [bannerData, loading, page, setPage, rowsPerPage, setRowsPerPage, handleChangePage, handleChangeRowsPerPage, deleteRow, open, handleClickOpen, handleClose, id, setId, getdata1, imageChange, oldImages, images, setImages, itemSubmit, err,title,setTitle,titleChange] = useBannerData();
    const navigate = useNavigate();
    const {bannerData,setBannerdata} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([])
    const { admin } = useContext(UserContext)
    const {tkn}=useContext(UserContext)
    const [page, setPage] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false)
    const [err, setErr] = useState(0)
    const { snack, setSnack } = useContext(SnackbarContext);
    const [id,setId]=useState("")
    const [oldImages, setOldImages] = useState([]);
    const [title,setTitle]=useState("")
    const [subtitle,setSubTitle]=useState("")
    const [url,setUrl]=useState("")
    const [btnText,setBtnText]=useState("")
  
   
    const [image, setImage] = useState([])
  
    const [uploadwait, setUploadWait] = useState(false);
  
    let compImage = (image) => {
      return new Promise((resolve, reject) => {
        new Compressor(image, {
          quality: 0.8,
          success: async (compressedResult) => {
            return resolve(compressedResult);
          }
        });
      })
    
    };
  
    const imageChange = async (e) => {
      if (oldImages[0].length+e.target.files.length != 0) {
        var type = e.target.files[0].type;
        if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
          const image = e.target.files[0];
          var img = await compImage(image);
          setImages({ raw: img, preview: URL.createObjectURL(img) });
        } else {
          alert("Please select only JPEG, JPG, PNG Images..")
        }
      }
      e.target.value = ""
    
    };
    useEffect(() => {
      getdata();
    
    }, []);
  const titleChange=(e)=>{
    setTitle(e.target.value)
  }
    const getdata = async () => {
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/get_all_banners"
      ,formdata
      , {
        headers: { tkn: tkn },
      }
      ).then((res) => {
        console.log(res.data)
        if (res.data.status === 1) {
  
          setBannerdata(res.data.data);
          setLoading(false);
          console.log(res.data.data);
        }
      });
    };
    const getdata1 = async (id) => {
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
      formdata.append("id", id);
      await axios.post("/admin/get_single_banner",formdata
      , {
        headers: { tkn: tkn },
      }
      ).then((res) => {
        console.log(res.data.data[0].banner_title)
        if (res.data.status === 1) {
          setTitle(res.data.data[0].banner_title)
          setOldImages(res.data.data[0].banner_image);
         setSubTitle(res.data.data[0].banner_sub_title)
         setUrl(res.data.data[0].banner_url)
         setBtnText(res.data.data[0].banner_button_text)
          setLoading(false);
          console.log(res.data.data);
        }
      });
    };
  
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
  };
  
  
    const deleteRow = (id) => {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("id", id);
      formdata.append("aid", admin.admin_id);
      axios.post("/admin/delete_banner", formdata, {
        headers: { tkn: tkn },
      }).then(function (response) {
        if (response.data.status === 1) {
          getdata();
        }
        console.log(response.data);
      });
    };
    const imageChange1 = async (e) => {
      if (e.target.files.length != 0) {
        var type = e.target.files[0].type;
        if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
          const image = e.target.files[0];
          setImages({ raw: image, preview: URL.createObjectURL(image) });
        } else {
          alert("Please select only JPEG, JPG, PNG Images..")
        }
      }
      e.target.value = ""
    
    };
    
     
    const itemSubmit = async (e) => {
      e.preventDefault();
   
      console.log(images.raw);
      setErr(0)     
      if(title===""){
        setErr(1)
        setSnack({
          message: "Please Enter Banner Title",
          type: 'error',
          open: true,
          direction: "center"
      });}
      else  if(subtitle===""){
        setErr(2)
        setSnack({
          message: "Please Enter Banner SubTitle",
          type: 'error',
          open: true,
          direction: "center"
      });}
      else  if(url===""){
        setErr(3)
        setSnack({
          message: "Please Enter Banner URL",
          type: 'error',
          open: true,
          direction: "center"
      });}
      else  if(btnText===""){
        setErr(4)
        setSnack({
          message: "Please Enter Banner Button Text",
          type: 'error',
          open: true,
          direction: "center"
      });}
      
      else 
      if(oldImages[0].length+images.length === 0){
        setErr(5)
        setSnack({
          message: "Please Choose Image",
          type: 'error',
          open: true,
          direction: "center"
      });}
      else{
        const formdata = new FormData();
        formdata.append('id', id);
        formdata.append("banner_title",title)
        formdata.append("banner_subtitle",subtitle)
     formdata.append("banner_url",url)
     formdata.append("banner_button_text",btnText)
          formdata.append('banner_image', images.raw);    
        formdata.append("aid", admin.admin_id);
        await axios.post("/admin/edit_banner", formdata
        , {
          headers: { tkn: tkn },
        }
        ).then(function (res) {
       
          if (res.data.status === 1) {
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
            handleClose();
            setImages("")
            getdata()
          //   navigate("/dashboard/MultiProducts")
          } else {
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
            handleClose()
            getdata()
          }
        });
      };
    }
  
    const columns = [
        { field: "banner_id", headerName: "ID", width: 150, },
        { field: "banner_title", headerName: "Title", width: 200, },
        { field: "banner_sub_title", headerName: "Sub Title", width: 200, },
        { field: "banner_url", headerName: "URL", width: 200, },
        { field: "banner_button_text", headerName: "Button Text", width: 200, },
        { field: "banner_image", headerName: "Image", renderCell: (params) => <img src={`/images/banners/${params.value}`} width="300" height="100" style={{aspectRatio:1/1}} />, headerName: "Image", width: 200 },

        {
            field: "actions1",
            headerName: "Edit",
            type: "actions",
            width: 100,
            renderCell: (row) => (
                <IconButton>
                    <EditIcon sx={{ color: "#060847" }} onClick={() => {
                        // navigate(`/dashboard/editcategory/${row.id}`);
                        getdata1(`${row.id}`)
                        setId(row.id)
// setTitle(row.)
console.log(row.row)
// setImages(row.row.cat_image)
                        handleClickOpen()
                    }} />
                </IconButton>
            ),
        },
        {
            field: "actions2",
            headerName: "Delete",
            type: "actions",
            width: 100,
            renderCell: (row) => (
                <IconButton>
                    <DeleteIcon sx={{ color: "#060847" }} onClick={() => {
                        deleteRow(row.id)
                    }} />
                </IconButton>
            ),
        },

    ]
    return (
        <>
       
     
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* <Container maxWidth="lg"> */}
        
                    <Box
                        sx={{
                            backgroundColor: "white",
                            height: "600px",
                            width: "950px",
                            // ml: 40
                        }}
                    >
                        <DataGrid
                            hideFooterSelectedRowCount
                            rows={bannerData}
                            columns={columns}
                            getRowId={(row) => row.banner_id}
                            onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                            rowsPerPageOptions={[10, 20,30]}
                            pageSize={page}
                            // pagination
                            getRowHeight={() => 'auto'}
                            sx={{
                                '.MuiDataGrid-columnHeaders': {
                                    backgroundColor: "#060847",
                                    color: "#ffffff"
                                },
                                '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },
                                '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root ': {
                                    color: "#ffffff"
                                }
                            }}
                        />
                    </Box>


                    <Dialog maxWidth={"lg"} open={open} onClose={() => {
                        handleClose()
                        setImages("")
                        setTitle("")
                    }
                    }>
                       <Container maxWidth="md">
                        <DialogContent>
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid item xs={6}>
                <Typography variant='h4' sx={{color: "#060847"}}>Edit Banner</Typography>
                <br/>
              </Grid>
           
              <Grid item xs={6}>
                <TextField  variant='outlined' label="Title *" name='title' value={title} fullWidth size='small' onChange={(e)=>setTitle(e.target.value)}  error={err == 1 && true}/>
              </Grid>
              <Grid item xs={6}>
                      <TextField variant='outlined' label="Sub Title *" name='subtitle' value={subtitle} fullWidth size='small' onChange={(e) => { setSubTitle(e.target.value) }} error={err == 2 && true} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="URL *" name='url' value={url} fullWidth size='small' onChange={(e) => { setUrl(e.target.value) }} error={err == 3 && true} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="Button Text *" name='btnText' value={btnText} fullWidth size='small' onChange={(e) => { setBtnText(e.target.value) }} error={err == 4 && true} />
                    </Grid>
                                        <Grid item xs={6}>

                                            <Button
                                                variant="outlined"
                                                size="small"
                                                component="label"
                                                onChange={imageChange}
                                                error={err == 5 && true}
                                                sx={{ m: 2, width: "73%", color: "#060847", "&:hover": { color: "#060847" } }}
                                            >
                                                upload image
                                                <input hidden type="file" multiple />
                                            </Button>


                                        </Grid>



                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="flex-start"
                                                spacing={3}
                                            >

                                                <Grid item>

                                                    {images.length === 0 ?
                                                        (<><Card style={{ border: "1px solid black", color: "#060847", "&:hover": { color: "#060847" } }}>
                                                            <CardMedia
                                                                style={{ height: 200, width: 450,aspectRatio:1/1,objectFit:"cover" }}
                                                                image={`/images/banners/${oldImages}`}

                                                            />


                                                        </Card></>) : (<><Card >
                                                            <CardMedia
                                                                style={{ height: 300, width: 300,aspectRatio:1/1 }}
                                                                image={images.preview}
                                                                title={images.preview}
                                                            />

                                                        </Card></>)}
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <br /><br />
                                        <Grid item xs={6}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Button variant="contained" onClick={itemSubmit} style={{ color: "#cbecff", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}>Update Banner</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>)}
                        </DialogContent></Container>
                    </Dialog>

                </>
            )}
         
            
        </>
    );
};






