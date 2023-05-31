import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  NativeSelect,
  ButtonBase,
  Autocomplete,
  Paper,
  Tab,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Helmet } from "react-helmet";
import axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from '../assets/jumbo.jpg'
import { Location } from "../components/AutoCompLoc";
// import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const OurBhrProperties = () => {
  let { city,search , type } = useParams()
  let data = useParams();
  // const [propStatFor, setPropStatfor] = useState(status);
  const [propCity, setPropCity] = useState(city);
  const [propTypeFor, setPropTypefor] = useState(type);
  const [propSearch, setPropSearch] = useState(search);
  const [areaRange, setAreaRange] = useState([0, 30000]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [error, setError] = useState(0);
  const [project, setProject] = useState([]);
  // const [loc, setLoc] = useState("Hyderabad, Telangana, India")
  const [propTypes, setPropTypes] = useState([]);
  const [item, setItem] = useState("");
  const [alldata, setAllData] = useState([]);
  const [value, setValue] = React.useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [ptype, setPType] = useState("0");
  const [title, setTitle] = useState('')
  let history = useNavigate();
  const [propStat, setPropStat] = useState("0");
  const [wait, setWait] = useState(false);
  const [propStatus, setPropStatus] = useState([]);
  const [err, setErr] = useState(0)
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true)
  const [searchData, setSearchData] = useState([])
  // let {ps,pt,pss}=useParams()

  const [viewType, setViewType] = useState("grid");

  const handleGridViewClick = () => {
    setViewType("grid");
  };

  const handleListViewClick = () => {
    setViewType("list");
  };
  const handleTabChange = (event, newValue) => {
    setViewType(newValue);
  };

  useEffect(() => {
    getAllProperties();
  }, [data]);


  const getAllProperties = async () => {
    setLoading(true);
    const formdata = new FormData() 
formdata.append("location",data.city)
    formdata.append("ptype", data.type)
    await axios.post("/user/get_search_project_data", formdata).then(function (res) {
      console.log(res, "===res");
      if (res.data.status === 1) {
        console.log(res.data.data[0])
        setProject(res.data.data);
        setAllData(res.data.data);
        setLoading(false);
      
      }

    });
  };

  const jumbotroncss = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${img})`,
    opacity: 0.8,
    backgroundAttachment: 'fixed',
    color: '#fff',
    minHeight: "300px",
    // marginTop: "15px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  };
  
  return (
    <div >
      <Helmet>

        <title>Our Projects | Buy or Sell or Rent Property Online</title>

      </Helmet>
      <div className="jumbotron text-center" style={jumbotroncss} >
        <Paper style={{opacity:"0.5",width: "80%",}}>

        <Typography variant="h2" >
          Our Projects</Typography>
        </Paper>


      </div><br />
      <Box
        style={{
          // border: "2px groove #060847",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
        mt={3}
        p={3}
      >
        <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="flex-start" alignItems="center"  spacing={1}>
  <Grid item xs={12} sm={6} md={6} lg={2} xl={2} p={1}>
    <ButtonBase onClick={() => history("/our_properties/" + propCity + "/" +  propTypeFor)}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Location
        </InputLabel>
        <NativeSelect
          value={propCity}
          onChange={(e) => setPropCity(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Tirupati">Tirupati</option>
        </NativeSelect>
      </FormControl>
    </ButtonBase>
  </Grid>


            <Grid item xs={12} sm={6} md={6} lg={2} xl={2} p={1}>
              <ButtonBase onClick={()=>(history("/our_properties/" + propCity + "/" +  propTypeFor))}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Property Types
                </InputLabel>

                <NativeSelect
                  value={propTypeFor}
                  onChange={(e) => {
                    setPropTypefor(e.target.value)
                  }}
                >

                  <option value="all">All Types</option>
                 
                  <option value="Apartment">Apartment</option>
                  <option value="Farmland">Farmland</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>

          
                </NativeSelect>
              </FormControl>
              </ButtonBase>
            </Grid>

{/* <Grid item xs={12} sm={6} md={6} lg={2} xl={2} p={1}>
    <TextField
      label="Search By Property Name"
      variant="outlined"
      name="propSearch"
      value={propSearch === "all" ? "" : propSearch}
      onChange={(e) => {
        setPropSearch(e.target.value);
        history("/our_properties/" + propCity + "/" + propSearch + "/" + propTypeFor);
      }}
      fullWidth
      size="small"
    />
  </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2} p={1}>
              <Button
                sx={{
                  backgroundColor: wait
                    ? "white"
                    : "#060847",
                  color: wait ? "black" : "white", "&:hover": { backgroundColor: wait ? "wait" : "#060847" }
                }}
                fullWidth
                disabled={wait}
                onClick={() => {
                
                  history("/our_properties/" + propSearch + "/" +  propTypeFor);
                  
                }}

              >
                {" "}

                {wait ? "Please Wait...." : "Search"}  {" "}
              </Button>
            </Grid> */}

<Grid  item xl={8} lg={8} md={12} sm={12} xs={12}>
            <Button variant='contained'
              sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/all`);
              }}
            >All</Button>
            {/* <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/House`);
              }}
            >House</Button> */}
            <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Apartment`);
              }}
            >Apartment</Button>
            <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Farmland`);
              }}
            >Farmland</Button>
              <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/House`);
              }}
            >House</Button>
            {/* <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Office Space`);
              }}
            >Office Space</Button> */}
            {/* <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Shop`);
              }}
            >Shop</Button> */}
            <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Villa`);
              }}
            >Villa</Button>
            <Button variant='contained' sx={{ m: 0.5, backgroundColor: "#060847", color: "white", '&:hover': { backgroundColor: "#060847", color: "white", } }}
              onClick={() => {
                history(`/our_properties/${propCity}/Plot`);
              }}
            >Plot</Button>
          </Grid>


          </Grid>





        </Container>
      </Box>
      <Container maxWidth="lg">
        <br />
        <br />
        <br />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xl={3} lg={3} md={12} sm={12} xs={12} textAlign="justify">
            <Typography variant="h4" gutterBottom sx={{ color: "#060847", ml: 1 }}>
              Ongoing Projects
            </Typography>
          </Grid>
          
        </Grid>




        <br />

        <div>
    
<div  style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
<TabContext value={viewType}>
        <TabList onChange={handleTabChange} aria-label="View Type">
          <Tab value="grid" icon={<GridViewIcon />} />
          <Tab value="list" icon={<ViewListIcon />}  />
        </TabList>
        
      </TabContext>
</div>


          {project.length !== 0 ? (
            <>
              {viewType === "list" ? (
                <Grid container spacing={2}>
                  {project.map((i, key) => (
                    <Grid item xs={8} key={key} container alignItems='flex-start' justifyContent='flex-start'>
                      <ButtonBase component={Link} to={`/project/${i.project_id}`}>
                      <Card sx={{ display: 'flex' }}>
                        <CardMedia
                          component="img"
                          sx={{ width: '100%', maxWidth: 300, objectFit: 'cover', pr: 3 }}
                          image={`/images/projects/${i.project_images.split(",")[0]}`}
                          alt={i.project_title}
                        />
                        <CardContent sx={{ flex: 1, textAlign: "justify" }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {i.project_title}
                          </Typography>
                          <Typography variant="body2">
                            <PlaceIcon sx={{ fontSize: "medium" }} />
                            Location: &nbsp; {i.location}
                          </Typography>
                          <Typography variant="body2">
                            <HomeIcon sx={{ fontSize: "medium" }} />
                            Type: &nbsp;{i.property_type}
                          </Typography>
                        
                        </CardContent>
                      </Card></ButtonBase>
                    </Grid>
                  ))}
                </Grid>
              ) : (<>


                <Grid
                  container
                  direction="row"
                   alignItems='flex-start' justifyContent='flex-start'
                  spacing={5}
                  className="text-center"
                >
                  <br />
                  <br />

                  {project.map((i, key) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
                      <ButtonBase component={Link} to={`/project/${i.project_id}`}>
                        <Card
                          sx={{
                            // height: "430px",
                            pb: 3,
                            width: "250px",
                            textAlign: "center",
                            position: "relative",
                            borderRadius: "25px",
                            "&:hover": {
                              boxShadow: "0 10px 15px 0 rgba(52, 51, 51, 0.08)",
                            },
                          }}
                        >
                          <CardMedia
                            style={{
                              height: "200px",
                              width: "250px",
                              margin: "auto",
                              // marginTop:"10px",
                              borderRadius: "18px"
                            }}
                            image={`/images/projects/${i.project_images.split(",")[0]}`}
                          />
                       

                          <CardContent sx={{ textAlign: "justify" }}>
                             <Typography variant="h6">
          <b>{i.project_title} </b> 
          </Typography>
         
          <Typography variant="body2">
          Type:&nbsp;{i.property_type} 
          </Typography> 
          <Typography variant="body2">
          City/Location&nbsp;<PlaceIcon sx={{fontSize:"medium"}}/>: &nbsp;{i.location}
          </Typography> 
                            
                          </CardContent>
                        </Card>
                      </ButtonBase>
                    </Grid>
                  ))}
                </Grid>

              </>)}
            </>
          ) : <p>
            No Results Found.....
          </p>}





        </div>
        <br />
      </Container>

    </div>
  );
};



