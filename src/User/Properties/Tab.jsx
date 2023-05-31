import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import  {EditProperty}  from './EditProperty'
import { PropertyDetails } from './PropertyDetails'
import { FloorDetails } from  './FloorDetails'
import { Container, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LeftDrawer } from '../Dashboard/Leftdrawer';

export const EditPropertieTab=()=> {
  const matches = useMediaQuery('(min-width:700px)');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Grid container  justifyContent="center"
  alignItems="flex-start">
        <Grid item xs={2}>
       {/*<LeftDrawer /> */}
      </Grid>
      <Grid item xs={10}>
       <Container maxWidth="lg">
       <Typography variant='h4' sx={{mt:5 ,color:"#001e95"}}>Edit Property Details</Typography>

       {matches ? <>
        <Box m={2} sx={{  backgroundColor: "white",  boxShadow:'5', }}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
     
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid item xs={12}>
              <Box >
                <Grid direction="row" justifyContent="center" alignItems="center">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Update property" value="1" />
            <Tab label="property details" value="2" />
            <Tab label="floor details" value="4" />
            {/* {localStorage.getItem('userproptype') !== "Plot" &&  <Tab label="floor details" value="4" />} */}
          </TabList>
          </Grid>
          </Box>
          </Grid>
        </Box>
        <TabPanel value="1"><EditProperty /></TabPanel>
        <TabPanel value="2"><PropertyDetails /></TabPanel>
        <TabPanel value="4"><FloorDetails /></TabPanel>
        {/* {localStorage.getItem('userproptype') !== "Plot" && <TabPanel value="4"><FloorDetails /></TabPanel>} */}
      </TabContext>
    </Box>
    </Box>
    </>:<>  <Box m={2} sx={{ backgroundColor: "white", boxShadow: "5" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      orientation="vertical"
                      sx={{ borderRight: 1, borderColor: "divider" }}
                    >
                      <Tab label="Update property" value="1" />
                      <Tab label="property details" value="2" />
                      <Tab label="floor details" value="4" />
                      {/* {localStorage.getItem('userproptype') !== "Plot" &&  <Tab label="floor details" value="4" />} */}
                    </TabList>
                  </Grid>
                  <Grid item xs={12} sm={6} md={9} lg={9}>
                    <TabPanel value="1">
                      <EditProperty />
                    </TabPanel>
                    <TabPanel value="2">
                      <PropertyDetails />
                    </TabPanel>
                    <TabPanel value="4"><FloorDetails /></TabPanel>
                    {/* {localStorage.getItem('userproptype') !== "Plot" && <TabPanel value="4"><FloorDetails /></TabPanel>} */}
                  </Grid>
                </Grid>
              </Box>
            </TabContext>
          </Box>
        </Box></>}
    </Container>
    </Grid>
    </Grid>
    </div>
  );
}

