import React from "react";
import { TextField, Button, Box, Grid, Container, Typography, MenuItem,Dialog, DialogContent } from "@mui/material";

import { useCategory } from "./AddCatFunction";
import { Categories } from "./Categories";
import { LeftDrawer } from "../../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";
export const AddCategory = () => {

  const [item, setItem, itemChange, itemSubmit,  err,open, setOpen,handleClickOpen,handleClose] = useCategory();
 
  return (
    <>
     <Helmet>
                
                <title>Add Article Category| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
               <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={1}>
      {/* <LeftDrawer /> */}
      </Grid>
      <Grid item xs={10}>
    <Container maxWidth="md">
            <Box sx={{ pt: 3 }} >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
            <Typography variant="h4" style={{ color: "#060847" }}>Category Details</Typography></Grid>
            <br/>
    <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button variant='contained' onClick={ handleClickOpen} sx={{ color: "white",marginLeft:"40%", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847",}, }}>Add Category</Button>
              </Grid>
          
            <Categories />
   </Box>
   <Dialog maxWidth={"lg"} open={open} onClose={()=>{handleClose()
    setItem("")
  }} >
          <DialogContent sx={{}}>
            <Container maxWidth="sm">
      <Box sx={{ m: 5, p: 3,textAlign:"center" }}>
        <form onSubmit={itemSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" style={{ color: "#060847" }}>Add Category Details</Typography>
            <TextField
              type="text"
              size="small"
              name="name"
              label="Name"
              value={item.name}
              onChange={itemChange}
              error={err == 1 && true}
             sx={{ m: 2, width: "100%" }}
            />
         
            
            <TextField
              select
              fullwidth
              type="text"
              size="small"
              name="status"
              label="Status"
              value={item.status}
              onChange={itemChange}
              error={err == 3 && true}
              sx={{ m: 2, width: "100%" }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
            
          

            <Button size="small" type="submit" variant="contained" sx={{ m: 2,backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"} }}>
              Add Category
            </Button>
          </Grid>
        </form>
      </Box>
    </Container> 
            </DialogContent>
            </Dialog>
   </Container></Grid>
   </Grid>
    </>
  );
};
