import React,{useState,useContext} from "react";
import { TextField, Button, Box, Grid, Container, Typography, MenuItem,Dialog, DialogContent,Card,CardMedia } from "@mui/material";
import { SnackbarContext, UserContext } from "../components/UserContext";
import axios from "axios";
import { LeftDrawer } from "../Dashboard/Leftdrawer";



export const AddPropertyType = () => {
  const { admin,tkn } = useContext(UserContext)
    const [cat,setCat]=useState("")
    const [err, setErr] = useState(0)
    const { snack, setSnack } = useContext(SnackbarContext);
    const itemSubmit = async (e) => {
        e.preventDefault();
        setErr(0);
        if(cat === ""){
          setErr(1);
          setSnack({
            message: "Please Enter Category",
            type: 'error',
            open: true,
            direction: "center"
        });
        }
        
        else{  
        
        const formdata = new FormData();
        formdata.append("cat_name", cat);
       
      
        formdata.append("aid", admin.admin_id);
        await axios.post("/admin/add_prop_cat", formdata
        , {
          headers: { tkn:tkn },
        }
        ).then(function (res) {
          console.log("hiiiii");
          if (res.data.status === 1) {
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
           
           
          } else {
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
           
          }
        });
      };
    }
  return (
    <>
   <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={1}>
      <LeftDrawer /></Grid>
      <Grid item xs={10}>
            <Container maxWidth="sm">
      <Box sx={{ mt:20,m: 5, p: 5,textAlign:"center",border: "1px solid #060847" }}>
        <form onSubmit={itemSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" style={{ color: "#060847" }}>Add Property Category</Typography>
          <Grid item xs={12} >
            <TextField
              type="text"
              size="small"
              name="cat"
              label="Property Category"
              value={cat}
              onChange={(e)=>setCat(e.target.value)}
              error={err == 1 && true}
             sx={{ m: 2, width: "100%" }}
            />
         </Grid>
     

            <Button size="small" type="submit" variant="contained" sx={{ m: 2,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}>
              Add Property Type
            </Button>
          </Grid>
        </form>
      </Box>
    </Container> 
      </Grid> 
      </Grid>    
    </>
  );
};
