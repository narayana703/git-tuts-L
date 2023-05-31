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
import CloseIcon from '@mui/icons-material/Close';
import {Helmet} from "react-helmet";
export const VisitedData=()=>{
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
    await axios.post("/user/get_all_search_data",formdata
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
  const deleteCard=async (searchId)=>{
    // e.preventDefault()
    console.log(searchId,"searchId")
    const formdata=new FormData()
    formdata.append("searchid",searchId)
    await axios.post("/user/delete_search_data",formdata
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
                
                <title>My Search History| Buy or Sell or Rent Property Online</title>
                 
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
         
<Typography variant="h4" sx={{marginTop:4,color:"#060847",width:"100%"}}>Search History</Typography>
 
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
                  borderRadius: 4,
                  textAlign: "start",
                  backgroundColor: "#f8f8f8",
                  position: 'relative',
                  pb:3
                }}
              >
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'grey' }}
                  onClick={() => {
                    // handle close icon click event
                    deleteCard(i.search_hist_id)
                  }}
                >
                  <CloseIcon sx={{backgroundColor:"grey",color:"#ffff",borderRadius:"15px",padding:"1px", "&:hover":{backgroundColor:"grey",borderRadius:"15px",padding:"1px"}}}/>
                </IconButton>
                 
                  <img
                    src={`/images/properties/${i.prop_images?.split(',')[0]}`}  width={250} 
                    height={150}
                  />

                  <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                    {" "}
                    <b> {i.prop_title}</b>{" "}
                  </Typography>
                 

              
             
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    <LocationOnSharpIcon sx={{fontSize:'medium'}}/>
                {i.city}
                  </Typography>

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
                        history(`/property/${i.prop_ids}`);
                      }}
                      sx={{ mr: 1,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}  }}
                    >
                      View
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





      
   
 
   
     