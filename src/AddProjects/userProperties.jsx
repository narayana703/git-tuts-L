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
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";
import CloseIcon from '@mui/icons-material/Close';
export const UserProperties=()=> {
  const { admin } = useContext(UserContext)
  const { tkn, } = useContext(UserContext)
  const { snack, setSnack } = useContext(SnackbarContext);
  const [data, setData] = useState("");
  const [move, setMove] = useState("");
  const [id, setId] = useState("")
  const [openC, setOpenC] = useState(false)
  const [send, setSend] = useState();
  const [status, setStatus] = useState('');
  const [value, setValue] = useState({});
  const [open, setOpen] = React.useState(false);
  const [states1, setStatus1] = useState('')
  const [id1, setId1] = useState("")
  let history = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/get_all_properties_waiting_status"
      , formdata, {
      headers: { tkn: tkn },
    }
    ).then((res) => {
      console.log(res.data, );
      if (res.data.status === 1) {
        setData(res.data.data);
        // setStatus1(res.data.data.title)

        // setLoading(false);
        console.log(res.data.data.title,);
      }
    });
  };
  const handleStatusOpen = () => {
    setOpenC(true);
  };

  const handleStatusClose = () => {
    setOpenC(false);
  };
  const handleStatusUpdate = (e) => {
    e.preventDefault()
    console.log(id)
    const formdata = new FormData();
    formdata.append("id", id);

    formdata.append("aid", admin.admin_id);
    formdata.append("status", status);
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

  const deletedata = async (id) => {

    const formdata = new FormData();
    formdata.append("id", id)

    formdata.append("aid", admin.admin_id);

    await axios.post("/admin/delete_property", formdata,
      {
        headers: { tkn: tkn },
      }
    ).then(function (res) {
      if (res.data.status === 1) {
        console.log(res)
        getdata();
      }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
       <Helmet>
                
                <title>Update Status| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Grid container justifyContent="center"
        alignItems="flex-start">
        <Grid item xs={1.5}>
          {/* <LeftDrawer /> */}
          </Grid>
        <Grid item xs={10.5}>

          <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
            <Grid container justifyContent="center"
              alignItems="center" mt={3}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: "#060847" }}>Update Status</Typography>
              </Grid>
            
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              mt={1}
            >
              {data &&
                data.map((i) => {
                  return (
                    <Card
                      sx={{
                        width: 250,
                        pb: 3,
                        // height: "auto",
                        m: 2,
                        mt: 3,
                        borderRadius: 4,
                        textAlign: "start",
                        backgroundColor: "#f8f8f8",
                      }}
                    >

                      <img
                        src={`/images/properties/${i.prop_images?.split(',')[0]}`}
                        height={150} width={250}
                      />

                      <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                        {" "}
                        <b> {i.prop_title}</b>{" "}
                      </Typography>
                      {/* {JSON.stringify(i.images.split(',')[0])} */}
                      <Typography
                        variant="subtitle1"
                        sx={{ ml: 1 }}
                      >
                        {" "}
                        Category:{i.prop_cat}{" "}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Status: {i.prop_status
 == 0 ? "Waiting For Approval" : i.prop_status
 == 1 ? "Active" : "Inactive"}

                        {/* 0 => waiting for Approval  1 => Active   2 => InActive   */}
                      </Typography>

                      {/* <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Price: {new Intl.NumberFormat("en-IN", {
                          style: "decimal",
                        }).format(i.price)}
                      </Typography> */}

                      {/* <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Property: {i.property_status}
                      </Typography> */}

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        City/Location <LocationOnSharpIcon sx={{ fontSize: 'medium' }} />: &nbsp; {i.city}
                      </Typography>

                      {/* <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        <LocationOnSharpIcon sx={{ fontSize: 'medium' }} />
                        {i.address}
                      </Typography> */}

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                      >
{/* <Grid item xs={6}></Grid> */}
                        <Button
                          variant="contained"
                          onClick={() => {
                            setId(i.prop_id)
                            setValue(i.status)
                            setStatus(i.status)
                            handleStatusOpen(i.prop_id)
                            // history("/Dashboard/edit_property");
                          }}
                          sx={{ ml:2,mt: 2, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Update Status
                        </Button>
                    

                  
                                                        <Button
                          variant="contained"
                          onClick={() => {
                            localStorage.setItem('rowid', i.prop_id);
                            history(`/Dashboard/edit_property/${i.prop_id}`);
                          }}
                          sx={{ ml:2,mt: 2,backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Edit
                        </Button>  </Grid>
   
                      {/* <br /> */}
                    </Card>

                  );
                })}



            </Grid>

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
                    {/* {JSON.stringify(value)} */}
                    {/* {JSON.stringify(status)} 
                 {JSON.stringify(id)}  */}
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
                    <Button className='linkbttn' type="submit" variant="contained" sx={{ backgroundColor: "#060847" }}>send</Button>
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



           
          </Container></Grid>
      </Grid>
    </div>
  );
}