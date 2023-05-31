import React, { useState, useContext, useEffect } from "react";
import { SnackbarContext, UserContext } from "../../components/UserContext";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Grid, Container, Typography, Dialog, DialogContent, Card, CardMedia, FormControl, MenuItem, Checkbox, Select, OutlinedInput, ListItemText, InputLabel, InputAdornment,
} from "@mui/material";
import { useEditProperty } from "./EditPropertyFunction";
import { Loading } from "../../components/Loading";
import { LeftDrawer } from "../Dashboard/Leftdrawer";

export const PropertyDetails = () => {
  const [selectedValue, setSelectedValue] = useState(2);
  const [selectedValue1, setSelectedValue1] = useState(2);

  const handleChange0 = (event) => {
    const selected = event.target.value;
    setSelectedValue(selected);
  };

  const handleChange1 = (event) => {
    const Sai = event.target.value;
    setItem({ ...item, size: Sai });

  };

  const handleChange2 = (event) => {
    const Tiru = event.target.value;
    setItem({ ...item, landsize : Tiru });
  };

  const handleChange3 = (event) => {
    const selected1 = event.target.value;
    setSelectedValue1(selected1);
    console.log(selected1,'1Sqyard  2Sqfeet 3Acre 4Cent 5Ankanam 6Cunta ')
  };

  const length = [
    {
      value: 1,
      label: 'Sqyard',
    },
    {
      value: 2,
      label: 'Sqfeet',
    },
    {
      value: 3,
      label: 'Acre',
    },
    {
      value: 4,
      label: 'Cent',
    },
    {
      value: 5,
      label: 'Ankanam',
    },
    {
      value: 6,
      label: 'Cunta',
    },
  ];


  const length1 = [
    {
      value: 1,
      label: 'Sqyard',
    },
    {
      value: 2,
      label: 'Sqfeet',
    },
    {
      value: 3,
      label: 'Acre',
    },
    {
      value: 4,
      label: 'Cent',
    },
    {
      value: 5,
      label: 'Ankanam',
    },
    {
      value: 6,
      label: 'Cunta',
    },
  ];

  const [err, setErr] = useState(0);
  const { snack, setSnack } = useContext(SnackbarContext);
  const [item, setItem] = useState({ ptype: "", price: "", room: "", bedroom: "", bathroom: "", garage: "", size: "", landsize: "", year_built: "", garage_area: "", status: "", face: "", name: "", email: "", mobile: "", fax_num: "", comp_name: "", agent_desc: "", off_address: "", position: "", website: "",
  });
  const [wait, setWait] = useState(false);
  const [catId, setCatId] = useState("");

  let history = useNavigate();
  const { propId, setPropId, user, token } = useContext(UserContext);
  console.log(propId);
  const [loading, setLoading] = useState(true);
  // const [item,setItem,setProfile, images,setImages, uploadwait,floor_img, itemChange, itemSubmit, imageChange,imageChange1,profile,imageChange2,doc, setDoc,fileChange,open, setOpen,handleClickOpen,handleClose,feature,handleChange,numFloors, setNumFloors,items, setItems,numPages, setNumPages,handleItemChange,handleImageChange,itemSubmit1,itemSubmit2,agentSubmit] = useEditProperty();
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    singlePropDetailsData();
  }, []);
  const singlePropDetailsData = () => {
    const formdata = new FormData();
    formdata.append("uid", user.user_id);
    formdata.append("id", localStorage.getItem("rowid"));
    axios
      .post("/user/get_single_property_details", formdata, {
        headers: { tkn: token },
      })
      .then(function (response) {
        console.log("==========res");
        console.log("res", response);
        if (response.data.status === 1) {
          console.log(response.data.data[0]);
          setItem({
            ptype: response.data.data[0].property_type,
            price: response.data.data[0].price,
            room: response.data.data[0].Rooms,
            bedroom: response.data.data[0].bedrooms,
            bathroom: response.data.data[0].bathrooms,
            garage: response.data.data[0].garages,
            size: response.data.data[0].size,
            landsize: response.data.data[0].land_size,
            year_built: response.data.data[0].year_built,
            garage_area: response.data.data[0].Garage_area,
            status: response.data.data[0].property_status,
            face: response.data.data[0].prop_facing,
          });
          setCatId(response.data.data[0].prop_cat_id);
          setLoading(false);
        }
        //   setOldProfile(response.data.data[0].agent_image)
        console.log(response.data);
      });
  };
  const itemSubmit1 = async (e) => {
    e.preventDefault();
    setErr(0);
    if (item.ptype === "") {
      setErr(25);
      setSnack({
        message: "Please Select Property Type",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.price === "") {
      setErr(10);
      setSnack({
        message: "Please Enter Property Price",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.price < 20) {
      setErr(10);
      setSnack({
        message: "Please Enter Property Price",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (
      item.ptype !== "House" &&
      item.ptype !== "Farmlands" &&
      item.ptype !== "Plot" &&
      item.ptype !== "Apartment" &&
      item.ptype !== "Villa" &&
      item.room === ""
    ) {
      setErr(11);
      setSnack({
        message: "Please Enter Number of Rooms",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (
      item.ptype !== "House" &&
      item.ptype !== "Farmlands" &&
      item.ptype !== "Plot" &&
      item.ptype !== "Apartment" &&
      item.ptype !== "Villa" &&
      item.bedroom === ""
    ) {
      setErr(12);
      setSnack({
        message: "Please Enter Number of BedRooms",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (
      item.ptype !== "House" &&
      item.ptype !== "Farmlands" &&
      item.ptype !== "Plot" &&
      item.ptype !== "Apartment" &&
      item.ptype !== "Villa" &&
      item.bathroom === ""
    ) {
      setErr(13);
      setSnack({
        message: "Please Enter Number of BathRooms",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (
      item.ptype !== "House" &&
      item.ptype !== "Farmlands" &&
      item.ptype !== "Plot" &&
      item.ptype !== "Apartment" &&
      item.ptype !== "Villa" &&
      item.garage === ""
    ) {
      setErr(14);
      setSnack({
        message: "Please Enter Number of Garages",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.ptype !== "Plot" && item.size === undefined) {
      setErr(15);
      setSnack({
        message: "Please Enter Size of Property",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.landsize === "") {
      setErr(16);
      setSnack({
        message: "Please Enter Land Size",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.ptype !== "Plot" && item.year_built === "") {
      setErr(17);
      // window.alert(item.size)
      setSnack({
        message: "Please Enter Built Year",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.ptype !== "Plot" && item.garage_area === "") {
      setErr(18);
      setSnack({
        message: "Please Enter Area of Garage",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.status === "") {
      setErr(19);
      setSnack({
        message: "Please Enter Property Status",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (item.face === "") {
      setErr(20);
      setSnack({
        message: "Please Enter Property Facing",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      setWait(true);
      let calculatedSize;
      
      if (selectedValue === 1) {
        calculatedSize = item.size * 9; // Sqyard
        
      } else if (selectedValue === 2) {
        calculatedSize = item.size; // Sqfeet
        
      } else if (selectedValue === 3) {
        calculatedSize = item.size * 43560; // Acre
        
      } else if (selectedValue === 4) {
        calculatedSize = item.size * 435.6; // Cent 
        
      } else if (selectedValue === 5) {
        calculatedSize = item.size * 72; // Ankanam
        
      } else if (selectedValue === 6) {
        calculatedSize = item.size * 1089; // Cunta
        
      }console.log(calculatedSize,'calculatedSize')

      let calculatedLandSize;
      if (selectedValue1 === 1) {
        
        calculatedLandSize = item.landsize * 9; // Sqyard
      } else if (selectedValue1 === 2) {
        
        calculatedLandSize = item.landsize; // Sqfeet
      } else if (selectedValue1 === 3) {
        
        calculatedLandSize = item.landsize * 43560; // Acre
      } else if (selectedValue1 === 4) {
        
        calculatedLandSize = item.landsize * 435.6; // Cent 
      } else if (selectedValue1 === 5) {
        
        calculatedLandSize = item.landsize * 72; // Ankanam
      } else if (selectedValue1 === 6) {
        
        calculatedLandSize = item.landsize * 1089; // Cunta

      }console.log(calculatedLandSize,'calculatedLandSize')

      const formdata = new FormData();
      formdata.append("id", localStorage.getItem("rowid"));
      formdata.append("face", item.face);
      formdata.append("tour", item.tour);
      formdata.append("price", item.price);
      formdata.append("rooms", item.room);
      formdata.append("bedroom", item.bedroom);
      formdata.append("bathroom", item.bathroom);
      formdata.append("garage", item.garage);
      formdata.append("size", calculatedSize);
      formdata.append("land", calculatedLandSize);
      formdata.append("year", item.year_built);
      formdata.append("garage_area", item.garage_area);
      formdata.append("type", item.ptype);
      formdata.append("status", item.status);

      formdata.append("uid", user.user_id);
      await axios
        .post("/user/edit_property_details", formdata, {
          headers: { tkn: token },
        })
        .then(function (res) {
          console.log("hiiiii");
          if (res.data.status === 1) {
            setWait(false);
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
            setLoading(false);
            history("/user_dashboard/all_properties");
          } else {
            setWait(false);
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
          }
        });
    }
  };
  // const [item,setItem,setProfile, images,setImages, uploadwait, itemChange, itemSubmit, imageChange,imageChange1,profile,doc, setDoc,fileChange,open, setOpen,handleClickOpen,handleClose,feature,handleChange,itemSubmit1,,agentSubmit,oldImages, setOldImages,imageids, setImageIds,delete_image,loading, setLoading] = useEditProperty();
  console.log(catId);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="flex-start">
        {/* <Grid item xs={1}>
      <LeftDrawer /></Grid> */}
        <Grid item xs={11}>
          {loading ? (
            <Loading />
          ) : (
            <Container maxWidth="md">
              <Typography variant="h5" gutterBottom sx={{ color: "#001e95" }}>
                Property Details
              </Typography>
              <Box sx={{ m: 3, p: 3, boxShadow: 5, borderRadius: "20px" }}>
                <form onSubmit={itemSubmit1}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <TextField
                          type="text"
                          size="small"
                          name="ptype"
                          label="Property Category*"
                          select
                          value={item.ptype}
                          onChange={itemChange}
                          error={err == 25 && true}
                          sx={{ m: 2, width: "80%" }}
                        >
                          {catId && catId === 1 && catId !== 2 && (
                            <MenuItem value="House">House</MenuItem>
                          )}
                          {catId && catId === 1 && catId !== 2 && (
                            <MenuItem value="Apartment">Apartment</MenuItem>
                          )}
                          {catId && catId === 1 && catId !== 2 && (
                            <MenuItem value="Farmlands">Farmlands</MenuItem>
                          )}

                          {catId && <MenuItem value="Plot">Plot</MenuItem>}

                          {catId && catId !== 1 && catId === 2 && (
                            <MenuItem value="Office Space">
                              Office Space
                            </MenuItem>
                          )}
                          {catId && catId !== 1 && catId === 2 && (
                            <MenuItem value="Shop">Shop</MenuItem>
                          )}
                          {catId && catId === 1 && (
                            <MenuItem value="Villa">Villa</MenuItem>
                          )}
                        </TextField>
                        {err === 25 && (
                          <div style={{ fontSize: "12px", color: "red" }}>
                            Please Select Property Type...
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          type="number"
                          size="small"
                          name="price"
                          label="Property Price*"
                          value={item.price}
                          onChange={itemChange}
                          error={err == 10 && true}
                          sx={{ m: 2, width: 240 }}
                        />
                        {err === 10 && (
                          <div style={{ fontSize: "12px", color: "red" }}>
                            Please Enter Property Price...
                          </div>
                        )}
                      </Grid>
                    </Grid>
                    {item.ptype !== "Farmlands" &&
                      item.ptype !== "Plot" &&
                      item.ptype !== "Apartment" &&
                      item.ptype !== "Villa" && (
                        <>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item xs={6}>
                              <TextField
                                type="number"
                                size="small"
                                name="room"
                                label="Number of Rooms*"
                                value={item.room}
                                onChange={itemChange}
                                error={err == 11 && true}
                                sx={{ m: 2, width: 240 }}
                              />
                              {err === 11 && (
                                <div style={{ fontSize: "12px", color: "red" }}>
                                  Please Enter Number of Rooms...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                type="number"
                                size="small"
                                name="bedroom"
                                label="Number of Bedrooms*"
                                value={item.bedroom}
                                onChange={itemChange}
                                error={err == 12 && true}
                                sx={{ m: 2, width: 240 }}
                              />
                              {err === 12 && (
                                <div style={{ fontSize: "12px", color: "red" }}>
                                  Please Enter Number of BedRooms...
                                </div>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item xs={6}>
                              <TextField
                                type="number"
                                size="small"
                                name="bathroom"
                                label="Number of Bathrooms*"
                                value={item.bathroom}
                                onChange={itemChange}
                                error={err == 13 && true}
                                sx={{ m: 2, width: 240 }}
                              />
                              {err === 13 && (
                                <div style={{ fontSize: "12px", color: "red" }}>
                                  Please Enter Number of BathRooms...
                                </div>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                type="number"
                                size="small"
                                name="garage"
                                label="Number of Garages*"
                                value={item.garage}
                                onChange={itemChange}
                                error={err == 14 && true}
                                sx={{ m: 2, width: 240 }}
                              />
                              {err === 14 && (
                                <div style={{ fontSize: "12px", color: "red" }}>
                                  Please Enter Number of Garages...
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}

                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      {item.ptype !== "Plot" && (
                        <Grid item xs={6}>
                          {/* <TextField
                            type="number"
                            size="small"
                            name="size"
                            label="Built Area(in SqYards)*"
                            value={item.size}
                            onChange={itemChange}
                            error={err == 15 && true}
                            sx={{ m: 2, width: 240 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  sqft
                                </InputAdornment>
                              ),
                            }}
                          /> */}
Size
<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                  value={item.size}
                                  onChange={handleChange1} 
                                  // onChange={itemChange}
                                  endAdornment={
                                    <InputAdornment>
                                      <TextField
                                        id="standard-select-currency"
                                        select
                                        value={selectedValue}
                                        // value={item.size}
                                        // defaultValue={2}
                                        onChange={handleChange0}
                                        variant="standard"
                                      >
                                        {length.map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>

                          {err === 15 && (
                            <div style={{ fontSize: "12px", color: "red" }}>
                              Please Enter Size of Property...
                            </div>
                          )}
                        </Grid>
                      )}
                      <Grid item xs={6}>
                        {/* <TextField
                          type="text"
                          size="small"
                          name="landsize"
                          label="Land Area(in Sqyards)*"
                          value={item.landsize}
                          error={err == 16 && true}
                          onChange={itemChange}
                          sx={{ m: 2, width: 240 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                sqft
                              </InputAdornment>
                            ),
                          }}
                        /> */}
                        LandSize
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                  value={item.landsize}
                                  onChange={handleChange2} 
                                  // onChange={itemChange}
                                  endAdornment={
                                    <InputAdornment>
                                      <TextField
                                        id="standard-select-currency"
                                        select
                                        value={selectedValue1}
                                        // value={item.size}
                                        // defaultValue={2}
                                        onChange={handleChange3}
                                        variant="standard"
                                      >
                                        {length1.map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                        {err === 16 && (
                          <div style={{ fontSize: "12px", color: "red" }}>
                            Please Enter Land Size...
                          </div>
                        )}
                      </Grid>
                    </Grid>
                    {item.ptype !== "Plot" && (
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={6}>
                          <TextField
                            type="number"
                            size="small"
                            name="year_built"
                            label="Built Year*"
                            value={item.year_built}
                            error={err == 17 && true}
                            onChange={itemChange}
                            sx={{ m: 2, width: 240 }}
                          />
                          {err === 17 && (
                            <div style={{ fontSize: "12px", color: "red" }}>
                              Please Enter Built Year...
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            type="text"
                            size="small"
                            name="garage_area"
                            label="Garage Area*"
                            value={item.garage_area}
                            onChange={itemChange}
                            error={err == 18 && true}
                            sx={{ m: 2, width: 240 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  sqft
                                </InputAdornment>
                              ),
                            }}
                          />
                          {err === 18 && (
                            <div style={{ fontSize: "12px", color: "red" }}>
                              Please Enter Area of Garage...
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    )}
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <TextField
                          type="text"
                          size="small"
                          name="status"
                          select
                          label="Property For Rent/Sale*"
                          value={item.status}
                          onChange={itemChange}
                          error={err == 19 && true}
                          sx={{ m: 2, width: 240 }}
                        >
                          <MenuItem value="For Rent">For Rent</MenuItem>
                          <MenuItem value="For Sale">For Sale</MenuItem>
                        </TextField>
                        {err === 19 && (
                          <div style={{ fontSize: "12px", color: "red" }}>
                            Please Enter Property Status...
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          type="text"
                          size="small"
                          name="face"
                          select
                          label="Property Facing*"
                          value={item.face}
                          onChange={itemChange}
                          error={err == 20 && true}
                          sx={{ m: 2, width: 240 }}
                        >
                          <MenuItem value="East">East</MenuItem>
                          <MenuItem value="West">West</MenuItem>

                          <MenuItem value="North">North</MenuItem>
                          <MenuItem value="South">South</MenuItem>

                          <MenuItem value="North-East">North-East</MenuItem>
                          <MenuItem value="North-West">North-West</MenuItem>
                          <MenuItem value="South-East">South-East</MenuItem>
                          <MenuItem value="South-West">South-West</MenuItem>
                        </TextField>
                        {err === 20 && (
                          <div style={{ fontSize: "12px", color: "red" }}>
                            Please Enter Property Facing...
                          </div>
                        )}
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={wait}
                      sx={{
                        backgroundColor: wait ? "white" : "#060847",
                        color: wait ? "black" : "white",
                        "&:hover": {
                          backgroundColor: wait ? "white" : "#060847",
                        },
                      }}
                    >
                      {wait ? "Please Wait...." : "Update"}
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Container>
          )}
        </Grid>
      </Grid>
    </div>
  );
};