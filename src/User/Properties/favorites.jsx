import React from "react";
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { useNavigate } from "react-router-dom";
import {  UserContext,SnackbarContext } from "../../components/UserContext";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Loading } from "../../components/Loading";
import { Helmet } from "react-helmet";

export const FavouritesData=()=>{
    const {propData,setPropData,user,token,uid,} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [move, setMove] = useState("");
  let history = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("id", uid);
    formdata.append("uid", user.user_id);
    await axios.post("/user/get_all_favs_data",formdata
    , {
      headers: { tkn: token },
    }
    ).then((res) => {
      if (res.data.status === 1) {
        setPropData(res.data.data);
        // setOldImages()
        setLoading(false);
        console.log(res.data);
      }
    });
  };
  const deleteCard=async (favid)=>{
    // e.preventDefault()
    console.log(favid,"searchId")
    const formdata=new FormData()
    formdata.append("favid",favid)
    await axios.post("/user/delete_favs_data",formdata
    , {
      headers: { tkn: token },
    }
    ).then((res) => {
        if(res.data.status===1)
        {
            getdata()
        }
    })
  }
  return (
    <div>
       <Helmet>
                
                <title>My Favourites| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
        {loading ? <Loading />:(
          <Grid container  justifyContent="center"
  alignItems="center">
   <Grid item xs={2}></Grid>
          <Grid item xs={10} p={4} >

      <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
<Typography variant="h4" sx={{marginTop:4,color:"#060847",width:"100%"}}>My Favorites</Typography>
 
 <hr style={{width:"100%"}}/>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt={1}
        >
            {/* {JSON.stringify(propData)} */}
          
          {propData.length===0 ? <p style={{textAlign:"center",margin:"auto", justifyContent:"center",marginTop:"50px",marginBottom:"50px"}}>No Results Found....</p>:(
            propData.map((i) => {
              return (
                <Card
                sx={{
                  width: 250,
                  // height: 400,
                  m: 2,
                  mt: 3,
                  pb:3,
                  borderRadius: 4,
                  textAlign: "start",
                  backgroundColor: "#f8f8f8",
                  position: 'relative'
                }}
              >
             
                 
                  <img
                    src={`/images/properties/${i.prop_images.split(',')[0]}`}  width={250} 
                    height={150}
                  />

                  <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                    {" "}
                    <b> {i.prop_title}</b>{" "}
                  </Typography>
                  {/* {JSON.stringify(i.images.split(',')[0])} */}
                  {/* <Typography
                    variant="subtitle1"
                    sx={{ textDecoration: "underline", ml: 1 }}
                  >
                    {" "}
                    {i.property_type}{" "}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                  Status: {i.status == 0 ? "Waiting For Approval" :i.status == 1? "Active":"Inactive"}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Price: {i.price}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Property: {i.property_status}
                  </Typography> */}

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                  <LocationOnSharpIcon sx={{fontSize:'medium'}}/>  Property City: {i.city}
                  </Typography>

                  {/* <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    <LocationOnSharpIcon sx={{fontSize:'medium'}}/>
                {i.address}
                  </Typography> */}

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        // setSearchHistorypropId(i.id)
                        history(`/property/${i.prop_id}`);
                      }}
                      sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}  }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        // setSearchHistorypropId(i.id)  
                        deleteCard(i.fav_id)
                      }}
                      sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}  }}
                    >
                      Remove
                    </Button>
                    
                  </Grid> 
                </Card>
              );
            }))}
        </Grid>
      </Container></Grid>
      </Grid>
      )}
    </div>
  );
}





      
   
 
   
     