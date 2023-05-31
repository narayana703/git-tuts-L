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
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
// import MenuIcon from '@mui/icons-material/Menu';
import img from '../assets/jumbo3.jpg'
import { Location } from "../components/AutoCompLoc";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { TabContext, TabList } from "@mui/lab";

export const OurProjects = () => {
  let {city,ps,pt,pss,rand} = useParams()

  console.log(rand,"rand")
  let data = useParams();
  // const [propCity, setPropCity] = useState(city);
  const [propStatFor,setPropStatfor] = useState(ps);
  const [propTypeFor,setPropTypefor] = useState(pt);
  const [propSearch,setPropSearch] = useState(pss);
  const [random, setRandom] = useState(rand);
  const [areaRange, setAreaRange] = useState([0, 30000]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [error, setError] = useState(0);
  const [project, setProject] = useState([]);
  const [loc,setLoc]=useState("Hyderabad, Telangana, India")

  const [locality,setLocality]=useState("")
  const [area,setArea]=useState("")
  const [cityy,setCityy]=useState("Hyderabad")
  const [state,setState]=useState("Telangana")

  const [searchByLoc, setSearchByLoc] = useState(city);

  const [propTypes, setPropTypes] = useState([]);
  const [item, setItem] = useState("");
  const [alldata, setAllData] = useState([]);
  const [value, setValue] = React.useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [ptype, setPType] = useState("0");
  const [title,setTitle]=useState('')
  let history = useNavigate();
  const [propStat, setPropStat] = useState("0");
  const [wait,setWait] = useState(false);
  const [propStatus, setPropStatus] = useState([]);
  const [err,setErr] = useState(0)
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true)
  const [searchData,setSearchData]=useState([])
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

  // let {ps,pt,pss}=useParams()
  useEffect(() => {
    console.log(data,"CHETHAN....................................");

    getAllProperties();

   
  }, [data]);
 
  const getpropType = async () => {
    await axios.post("/user/get_all_property_type").then(function (res) {
      // console.log(res);
      if (res.data.status === 1) {      
        
        setPropTypes(res.data.data);
       
      }
    });
  };
  const getAllProperties = async () => {
  
    setLoading(true);
    const formdata=new FormData()
     
      formdata.append("title",data.pss)
      // formdata.append("title", propSearch === "all" ? "" : propSearch);
     
      formdata.append("pstatus",data.ps)
      
     
      formdata.append("ptype",data.pt)
      
      formdata.append("city",data.city)
      formdata.append("rand",data.rand)


      
    await axios.post("/user/get-search-property-data_user",formdata).then(function (res) {
     console.log(res.data.data,"prasanthi")
      if(res.data.status===1){
       
        setProject(res.data.data);
        setAllData(res.data.data);
        setLoading(false);
         
      }
     
    });
  };
  
  const getAllPropertyStatus = async () => {
    await axios.post("/user/get_all_property_status").then(function (res) {
    
      if (res.data.status === 1) {
      
        setPropStatus(res.data.data);
        
      }
    });
  };
  const jumbotroncss={
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${img})`,
    opacity: 0.8,
    backgroundAttachment: 'fixed',
    color: '#fff',
    minHeight: "300px",
    // marginTop: "10px",
    marginBottom: "8px",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
  
  };
  const updateLoc = (loc) => {
    setLoc(loc);
    var loc_data = loc.split(", ");
    if(loc_data.length >= 5){
      setState(loc_data[loc_data.length - 2]);
      setCityy(loc_data[loc_data.length - 3]);
      setArea(loc_data[loc_data.length - 4]);
      setLocality(loc_data[loc_data.length - 5]);
    }
    if(loc_data.length == 4){
      setState(loc_data[loc_data.length - 2]);
      setCityy(loc_data[loc_data.length - 3]);
      setArea(loc_data[loc_data.length - 4]);
      setLocality("");
    }
    if(loc_data.length == 3){
      setState(loc_data[loc_data.length - 2]);
      setCityy(loc_data[loc_data.length - 3]);
      setArea("");
      setLocality("");
    }

    if(loc_data.length == 2){
      setState(loc_data[loc_data.length - 2]);
      setCityy("");
      setArea("");
      setLocality("");
    }

    setSearchByLoc("all")
  }

  return (
    <div>
      <Helmet>
                
                <title>Rent or Sale | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
            <div className="jumbotron text-center" style={jumbotroncss} >
            <Paper style={{opacity:"0.5",width: "80%",}}>
           
           <Typography variant="h2" >
          Rent / Sale</Typography>
           </Paper>
             
             
      </div><br/>
    
      <Box
  style={{
    backgroundColor: "#fff",
    borderRadius: "10px",
  }}
  mt={3}
  p={3}
>
  <Container maxWidth="xl">
    <Grid container spacing={2} alignItems="center">

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Location  loc={loc} setloc={updateLoc} style={{ m: 1,width:"100%" }}/>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:'start'}}>
    <Typography variant="ps2" sx={{color:'black'}}>Search By</Typography>
    
  </FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    
    name="radio-buttons-group"
  >
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div>
    {locality!==''&&
    <ButtonBase onClick={() => history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch+"/"+random)}>
    <FormControlLabel
        value={locality}
        control={<Radio />}
        label={locality}
         onChange={(e) => {
          const updatedSearchByLoc = e.target.value;
          setSearchByLoc(updatedSearchByLoc);
          history("/rent_sale_property/" + updatedSearchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + random);
        }}
       
      />
      </ButtonBase>
      }
    </div>
    <div>
      {area!=='' &&<FormControlLabel
        value={area}
        control={<Radio />}
        label={area}
         onChange={(e) => {
          const updatedSearchByLoc = e.target.value;
    setSearchByLoc(updatedSearchByLoc);
    history("/rent_sale_property/" + updatedSearchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + random);
        }}
      
      />}
    </div>
    <div>
      {cityy!=='' &&<FormControlLabel
        value={cityy}
        control={<Radio />}
        label={cityy}
         onChange={(e) => {
          const updatedSearchByLoc = e.target.value;
    setSearchByLoc(updatedSearchByLoc);
    history("/rent_sale_property/" + updatedSearchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + random);
        }}
      
      />}
    </div>
   
 
  <div>
     {state!=='' &&  <FormControlLabel
        value={state}
        control={<Radio />}
        label={state}
         onChange={(e) => {
          const updatedSearchByLoc = e.target.value;
          setSearchByLoc(updatedSearchByLoc);
          history("/rent_sale_property/" + updatedSearchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + random);
         
        }}
      
      />}
    </div> 
   
  </div>
  </RadioGroup>
</FormControl>  
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <ButtonBase onClick={() => history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch+"/"+random)}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Property For Rent/Sell
                </InputLabel>

                <NativeSelect
                  value={propStatFor}
                  onChange={(e) => {
                   
                    setPropStatfor(e.target.value)
                  }}
                >
                  <option value="0">Both Rent/Sale</option>
                  <option value="1">For Rent</option>
                  <option value="2">For Sale</option>
                 
                </NativeSelect>
              </FormControl></ButtonBase>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <ButtonBase onClick={() => history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch+"/"+random)}>
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
             
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farmland">Farmland</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Shop">Shop</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                 
                 
                </NativeSelect>
              </FormControl>
              </ButtonBase>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <TextField
  label="Property Title"
  variant="outlined"
  name="propSearch"
  value={propSearch === "all" ? "" : propSearch}
  onChange={(e) => {
    const enteredValue = e.target.value;
    setPropSearch(enteredValue === "" ? "all" : enteredValue);
    history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + (enteredValue === "" ? "all" : enteredValue) + "/" + random);
  }}
  fullWidth
  size="small"
/>

      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <ButtonBase onClick={() => history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + random)} sx={{ ml: 2 }}>
  <FormControl fullWidth>
    <InputLabel variant="standard" htmlFor="uncontrolled-native">
      Sort By:
    </InputLabel>

    <NativeSelect
      value={random}
      onChange={(e) => {
        const updatedRandom = e.target.value;
        setRandom(updatedRandom);
        history("/rent_sale_property/" + searchByLoc + "/" + propStatFor + "/" + propTypeFor + "/" + propSearch + "/" + updatedRandom);
      }}
    >
      <option value="rand">Relevance</option>
      <option value="new">Most Recent</option>
      <option value="low">Low Price</option>
      <option value="high">High Price</option>
    </NativeSelect>
  </FormControl>
</ButtonBase>
      </Grid>

    </Grid>
  </Container>
</Box>

          <Container maxWidth="lg">
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
{/* {project.map((i, key) => (<>
      {i.rent_sale === 1 ?  <>
      <Grid item xs={8} key={key} container alignItems='flex-start' justifyContent='flex-start'>  
                    
        <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
        <Card sx={{ display: 'flex', height: "300px" }}>
<CardMedia
component="img"
sx={{ width: '100%', maxWidth: "400px", objectFit: 'cover', pr: 3 }}
image={`/images/properties/${i.prop_images.split(",")[0]}`}
alt={i.title}
/>
<CardContent sx={{ width: "100%", textAlign: "justify" }} >
<Typography gutterBottom variant="h6" component="h2" noWrap>
<b>{i.title}</b>
</Typography>
<Typography variant="body2">, {i.country}
</Typography>
<Typography variant="body2">
<HomeIcon sx={{ fontSize: "medium" }} /> Category: {i.prop_cat}
</Typography>
{i.no_of_bedrooms && (
<Typography variant="body2">
<BedIcon sx={{ fontSize: "medium" }} /> Number of Bedrooms: {i.no_of_bedrooms}
</Typography>
)}
{i.no_of_bathrooms && (
<Typography variant="body2">
<ShowerIcon sx={{ fontSize: "medium" }} /> Number of Bathrooms: {i.no_of_bathrooms}
</Typography>
)}
{i.land_area && (
<Typography variant="body2">
<BorderOuterIcon sx={{ fontSize: "medium" }} /> Land Area: {i.land_area} sqft
</Typography>
)}
<Typography variant="body2">
<b>INR: {new Intl.NumberFormat("en-IN").format(i.prop_price)}</b>
</Typography>
</CardContent>
</Card>


</ButtonBase>
      </Grid>
      </> : <> {(project.length < 0 ) && <p> <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; No Results Found..... </p> }</> }</>
    ))} */}


{project.length!==0 ? (
  
  <>
  {(propStatFor === "2"|| propStatFor === '0') && <>
  <Typography variant="h4"sx={{color:'#060847', textAlign:'start'}}>Properties For Sale</Typography><br/>
  { viewType === "list" ? (
    <Grid container spacing={2}>

    {project.map((i, key) => (<>
      {i.rent_sale === 2 ?  <>
      <Grid item xs={8} key={key} container alignItems='flex-start' justifyContent='flex-start'>  
                    
        <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
        <Card sx={{ display: 'flex', height: "300px" }}>
<CardMedia
component="img"
sx={{ width: '100%', maxWidth: "400px", objectFit: 'cover', pr: 3 }}
image={`/images/properties/${i?.prop_images.split(",")[0]}`}
alt={i.title}
/>
<CardContent sx={{ width: "100%", textAlign: "justify" }} >
<Typography gutterBottom variant="h6" component="h2" noWrap>
<b>{i.prop_title}</b>
</Typography>
<Typography variant="body2">
<PlaceIcon sx={{ fontSize: "medium" }} /> Location: {i.city}
</Typography>
<Typography variant="body2">
<HomeIcon sx={{ fontSize: "medium" }} /> Category: {i.prop_cat}
</Typography>
{i.no_of_bedrooms && (
<Typography variant="body2">
<BedIcon sx={{ fontSize: "medium" }} /> Number of Bedrooms: {i.no_of_bedrooms}
</Typography>
)}
{i.no_of_bathrooms && (
<Typography variant="body2">
<ShowerIcon sx={{ fontSize: "medium" }} /> Number of Bathrooms: {i.no_of_bathrooms}
</Typography>
)}
{i.land_area && (
<Typography variant="body2">
<BorderOuterIcon sx={{ fontSize: "medium" }} /> Land Area: {i.land_area} sqft
</Typography>
)}
<Typography variant="body2">
<b>INR: {new Intl.NumberFormat("en-IN").format(i.prop_price)}</b>
</Typography>
</CardContent>
</Card>


</ButtonBase>
      </Grid>
      </> :<> {(project.length < 0 ) && <p> &nbsp; &nbsp; &nbsp; &nbsp; No Results Found..... </p> }</> }</>
    ))}
  </Grid> 
  ):(<> 
  

  <Grid
    container
    direction="row"
     alignItems='flex-start' justifyContent='flex-start'
    spacing={5}
    className="text-center"
  >
    <br />
    <br />

    {project && project.map((i, key) => (<>
      {i.rent_sale === 2 ?  <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
        <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
          <Card
            sx={{
              // height: "430px",
              pb:3,
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
              borderRadius:"18px"
              }}
              image={`/images/properties/${i.prop_images?.split(",")[0]}`}
            />
           

            <CardContent sx={{ textAlign: "justify" }}>
             
              <Typography variant="h6">
                <b>{i.prop_title} </b>
              </Typography>
              <Typography variant="body2">
                <PlaceIcon sx={{ fontSize: "medium" }} />
                Location: &nbsp; {i.city}
              </Typography>
             
              <Typography variant="body2">
                <HomeIcon sx={{ fontSize: "medium" }} />
                Category: &nbsp;{i.prop_cat}
              </Typography>
             
              <Typography variant="body2">
                {i.no_of_bedrooms && (
                  <>
                    <BedIcon sx={{ fontSize: "medium" }} />
                    Number of Bed Rooms: &nbsp;{i.no_of_bedrooms}&nbsp;
                  </>
                )}
                  </Typography>
                  <Typography variant="body2">
                {i.no_of_bathrooms && (
                  <>
                    {" "}
                    <ShowerIcon sx={{ fontSize: "medium" }} />
                    Number of Bath Rooms: &nbsp;{i.no_of_bathrooms}&nbsp;{" "}
                  </>
                )}
                </Typography>
                <Typography variant="body2">
                {i.land_area && (
                  <>
                    {" "}
                    <BorderOuterIcon sx={{ fontSize: "medium" }} />
                    Land Area: &nbsp;{i.land_area}{" "}
                  </>
                )}
              </Typography>
              <Typography variant="body2">
                <b>INR: {new Intl.NumberFormat("en-IN", {
                style: "decimal",
              }).format(i.prop_price)} 
                 </b>
              </Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </Grid>
      </> : <> {(project.length < 0 ) && <p> &nbsp; &nbsp; &nbsp; &nbsp; No Results Found..... </p> }</>}</>
    ))}
  </Grid>
  <br/><br/><br/><br/>
</>)}</> }



{(propStatFor === '1'|| propStatFor === '0') && <>
<Typography variant="h4"sx={{color:'#060847', textAlign:'start'}}>Properties For Rent</Typography><br/>
  { viewType === "list" ? (
    <Grid container spacing={2}>
      
    {project.map((i, key) => (<>
      {i.rent_sale === 1 ?  <>
      <Grid item xs={8} key={key} container alignItems='flex-start' justifyContent='flex-start'>  
                    
        <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
        <Card sx={{ display: 'flex', height: "300px" }}>
<CardMedia
component="img"
sx={{ width: '100%', maxWidth: "400px", objectFit: 'cover', pr: 3 }}
image={`/images/properties/${i.prop_images.split(",")[0]}`}
alt={i.title}
/>
<CardContent sx={{ width: "100%", textAlign: "justify" }} >
<Typography gutterBottom variant="h6" component="h2" noWrap>
<b>{i.title}</b>
</Typography>
<Typography variant="body2">, {i.country}
</Typography>
<Typography variant="body2">
<HomeIcon sx={{ fontSize: "medium" }} /> Category: {i.prop_cat}
</Typography>
{i.no_of_bedrooms && (
<Typography variant="body2">
<BedIcon sx={{ fontSize: "medium" }} /> Number of Bedrooms: {i.no_of_bedrooms}
</Typography>
)}
{i.no_of_bathrooms && (
<Typography variant="body2">
<ShowerIcon sx={{ fontSize: "medium" }} /> Number of Bathrooms: {i.no_of_bathrooms}
</Typography>
)}
{i.land_area && (
<Typography variant="body2">
<BorderOuterIcon sx={{ fontSize: "medium" }} /> Land Area: {i.land_area} sqft
</Typography>
)}
<Typography variant="body2">
<b>INR: {new Intl.NumberFormat("en-IN").format(i.prop_price)}</b>
</Typography>
</CardContent>
</Card>


</ButtonBase>
      </Grid>
      </> : <> {(project.length < 0 ) && <p> <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; No Results Found..... </p> }</> }</>
    ))}
  </Grid> 
  ):(<> 
  

  <Grid
    container
    direction="row"
     alignItems='flex-start' justifyContent='flex-start'
    spacing={5}
    className="text-center"
  >
    <br />
    <br />

    {project && project.map((i, key) => (<>
      {i.rent_sale === 1 ?  <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
        <ButtonBase component={Link} to={`/property/${i.prop_id}`}>
          <Card
            sx={{
             
              pb:3,
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
             
              borderRadius:"18px"
              }}
              image={`/images/properties/${i.prop_images?.split(",")[0]}`}
            />
           

            <CardContent sx={{ textAlign: "justify" }}>
             
              <Typography variant="h6">
                <b>{i.prop_title} </b>
              </Typography>
              <Typography variant="body2">
                <PlaceIcon sx={{ fontSize: "medium" }} />
                Location: &nbsp; {i.city}
              </Typography>
             
              <Typography variant="body2">
                <HomeIcon sx={{ fontSize: "medium" }} />
                Category: &nbsp;{i.prop_cat}
              </Typography>
             
              <Typography variant="body2">
                {i.no_of_bedrooms && (
                  <>
                    <BedIcon sx={{ fontSize: "medium" }} />
                    Number of Bed Rooms: &nbsp;{i.no_of_bedrooms}&nbsp;
                  </>
                )}
                  </Typography>
                  <Typography variant="body2">
                {i.no_of_bathrooms && (
                  <>
                    {" "}
                    <ShowerIcon sx={{ fontSize: "medium" }} />
                    Number of Bath Rooms: &nbsp;{i.no_of_bathrooms}&nbsp;{" "}
                  </>
                )}
                </Typography>
                <Typography variant="body2">
                {i.land_area && (
                  <>
                    {" "}
                    <BorderOuterIcon sx={{ fontSize: "medium" }} />
                    Land Area: &nbsp;{i.land_area}{" "}
                  </>
                )}
              </Typography>
              <Typography variant="body2">
                <b>INR: {new Intl.NumberFormat("en-IN", {
                style: "decimal",
              }).format(i.prop_price)} 
                 </b>
              </Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </Grid>
      </> : <> {(project.length < 0 ) && <p> <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; No Results Found..... </p> }</> }</>
    ))}
  </Grid>

</>)}</> }


  </>
):<p>
  No Results Found.....
  </p>}
     
        </div>
        <br />
      </Container>
     
    </div>
  );
};



