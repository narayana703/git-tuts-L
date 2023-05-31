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
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, SnackbarContext } from "../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from "react-helmet";

export default function Propertylist() {
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
    await axios.post("/admin/get_all_properties"
      , formdata, {
      headers: { tkn: tkn },
    }
    ).then((res) => {
      console.log(res.data, "++++++++sai+++++++++");
      if (res.data.status === 1) {
        setData(res.data.data);
        // setStatus1(res.data.data.title)

        // setLoading(false);
        console.log(res.data.data.title, 'saisaisaisaisaisaisaisaisai');
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
                
                <title>My Properties| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      <Grid container justifyContent="center"
        alignItems="flex-start">
        <Grid item xs={3}>
          <LeftDrawer /></Grid>
        <Grid item xs={9}>

          <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
            <Grid container justifyContent="center"
              alignItems="center" mt={3}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: "#060847" }}>My Properties</Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
                mr={5}
                pr={5}
              >
                <Grid item  >
                  <Fab variant="extended" aria-label="add" className="linkstyle" component={Link} to={"/Dashboard/property_type"} sx={{ backgroundColor: "#060847", color: "#fff", "&:hover": { backgroundColor: "#060847", color: "#fff" } }}>
                    <AddIcon />
                    Add Property
                  </Fab>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
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
                        src={`/images/properties/${i.images.split(',')[0]}`}
                        height={150} width={250}
                      />

                      <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                        {" "}
                        <b> {i.title}</b>{" "}
                      </Typography>
                      {/* {JSON.stringify(i.images.split(',')[0])} */}
                      <Typography
                        variant="subtitle1"
                        sx={{ ml: 1 }}
                      >
                        {" "}
                        Type:{i.property_type}{" "}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Status: {i.status == 0 ? "Waiting For Approval" : i.status == 1 ? "Active" : "Inactive"}

                        {/* 0 => waiting for Approval  1 => Active   2 => InActive   */}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Price: {new Intl.NumberFormat("en-IN", {
                          style: "decimal",
                        }).format(i.price)}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Property: {i.property_status}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        Property City: {i.city}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        <LocationOnSharpIcon sx={{ fontSize: 'medium' }} />
                        {i.address}
                      </Typography>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >

                        <Button
                          variant="contained"
                          onClick={() => {
                            setId(i.id)
                            setValue(i.status)
                            handleStatusOpen(i.id)
                            // history("/Dashboard/edit_property");
                          }}
                          sx={{ mt: 1, ml: 1, marginRight: "10px", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Update Status
                        </Button>
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        mt={1}
                        spacing={3}
                      >

                        <Button
                          variant="contained"
                          onClick={() => {
                            handleClickOpen()
                            setStatus1(i.title)
                            setId1(i.id)
                          }}
                          // onClick={() => {
                          //   deletedata(i.id)
                          //   console.log(i.id)
                          // }}
                          sx={{ mr: 0.5, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            history(`/Dashboard/singlepagedata/${i.id}`);
                          }}
                          sx={{ mr: 0.5, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            localStorage.setItem('rowid', i.id);
                            history(`/Dashboard/edit_property/${i.prop_id}`);
                          }}
                          sx={{ mr: 1, backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}
                        >
                          Edit
                        </Button>

                      </Grid>
                      <br />
                    </Card>

                  );
                })}



            </Grid>

            <Dialog open={openC} onClose={handleStatusClose} maxWidth={"lg"}>
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



            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <b>{states1}</b>

              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you Sure
                  Want to Delete this Property?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    deletedata(id1)
                    console.log(id1, 'id1id1id1id1id1id1id1id1id1id1')
                    handleClose()
                  }}
                  autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Container></Grid>
      </Grid>
    </div>
  );
}