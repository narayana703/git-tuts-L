import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuItem, FormControl, Select, useTheme, Grid, CardMedia, Container, Typography, OutlinedInput, Avatar, Button, useMediaQuery, Card } from '@mui/material';

import Blog01 from '../assets/blog01.jpg';
import Blog02 from '../assets/blog02.jpg';
import Blog03 from '../assets/blog03.jpg';
import Blog04 from '../assets/blog04.jpg';
import Blog05 from '../assets/blog05.jpg';

export default function BuySellRent() {
  const matches = useMediaQuery('(min-width:1000px)');
  const theme = useTheme()
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const buySellRentData = [
    {
      id: "1",
      image: Blog01
    },
    {
      id: "2",
      image: Blog02
    },
    {
      id: "3",
      image: Blog03
    },
    {
      id: "4",
      image: Blog04
    },
    {
      id: "5",
      image: Blog05
    }
  ]

  return (
    <div>
      <Card variant="outlined" sx={{ backgroundColor: "cream", padding: '5%', marginTop: '%' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: '', marginTop: 2, marginLeft:'8%' }}>
              <strong>Buy-Sell-Rent for Property  </strong>
            </Typography>
      </Card>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        marginTop={'5%'}
        // sx={{textAlign:'start'}}
      >
        <Grid >
          <Typography variant="h4" gutterBottom sx={{ textAlign: "start" }}>
            <strong>Popular Properties</strong>
            <hr style={{ width: '80px', margin: '0', marginTop: '3%' }} />
            <Typography variant="body2" gutterBottom sx={{ marginTop: '25px' }} >
              Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse suscipit
            </Typography>
          </Typography>
        </Grid>
        <Grid
          item lg={5} xl={5}
          marginLeft={'5%'}
          sx={{ textAlign: "start" }}>
            {matches ? <>
          <Button variant="contained" disableElevation sx={{ backgroundColor: "#060847", color: 'white' }}> All </Button>
          <Button variant="contained" sx={{ margin: '1%', backgroundColor:  "cream" }}>APARTMENT</Button>
          <Button variant="contained" sx={{ margin: '1%', backgroundColor:  "cream" }}>FARMLAND</Button>
          <Button variant="contained" sx={{ margin: '1%', backgroundColor:  "cream" }}>HOUSE</Button>
          <Button variant="contained" sx={{ margin: '1%', backgroundColor:  "cream" }}>VILLA</Button>
          </>:<>
          <FormControl sx={{ minWidth: 120, marginLeft:'%'}}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          // inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em> All </em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </>}

        </Grid>
      </Grid>



      

     

      <Grid
        container rowSpacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
       
      >


        {buySellRentData.map((i) => (
          <Grid
            item xl={2} lg={4} md={4} sm={5} xs={10}
            marginTop={'3%'}
            marginLeft={'6%'}
            
          >
            <Card sx={{ height: "350px", width: "300px" }}>
              <CardMedia
                component="img"
                sx={{ height: "45%", width: "auto" }}
                image={i.image}
              ></CardMedia>
            </Card>
          </Grid>
        ))}
      </Grid>
    
      <Button  variant="contained" sx={{ margin:'5%'}}>See all properties <ArrowForwardIcon /> </Button>
    </div>
  )
}
