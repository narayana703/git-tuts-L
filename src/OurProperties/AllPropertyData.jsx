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
} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { useNavigate } from "react-router-dom";
import { LeftDrawer } from "../Dashboard/Leftdrawer";
export const AllPropertyData=()=> {
   const [data, setData] = useState("");
  let history = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    
    await axios.post("/user/to_get_all_properties").then((res) => {
      console.log(res.data);
      if (res.data.status === 1) {
        setData(res.data.data);
      
      }
    });
  };
  return (
    <div>


      <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
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
                    height: 400,
                    m: 2,
                    mt: 3,
                    borderRadius: 4,
                    textAlign: "start",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                 
                  <img
                    src={`/images/properties/${i.images.split(',')[0]}`}
                    height={150}
                  />

                  <Typography variant="subtitle1" sx={{ marginTop: "", ml: 1 }}>
                    {" "}
                    <b> {i.title}</b>{" "}
                  </Typography>
                  {/* {JSON.stringify(i.images.split(',')[0])} */}
                  <Typography
                    variant="subtitle1"
                    sx={{ textDecoration: "underline", ml: 1 }}
                  >
                    {" "}
                    {i.property_type}{" "}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Status: {i.status ? <>Active</> : <>Inactive</>}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Price: {i.price}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Property: {i.property_status}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Property City: {i.city}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    <LocationOnSharpIcon sx={{fontSize:'medium'}}/>
                {i.address}
                  </Typography>

                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    mt={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        history(`/property/${i.id}`);
                      }}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    
                  </Grid> 
                </Card>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}