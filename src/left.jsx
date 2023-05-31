import React, { useContext, useState } from "react";
import {
  Drawer,
  Toolbar,
  Grid,
  ListItemText,
  ListItemButton,
  List,
  Box, Typography, useMediaQuery, useTheme, Button, Hidden, ListItem, Collapse, AppBar, IconButton, Divider, Container
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import footer from './assets/bhrfooter.png'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const drawerWidth = 300;

export const Left=()=> {
  const [color, setColor] = useState();
 const getColor=localStorage.getItem("color")
  const theme = useTheme()
  const { admin,setAdmin,user, setUser, order, setOrder, tkn, setTkn } = useContext(UserContext)
  // const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
const [open,setOpen]=useState(false)

const handleClickExp = () => {
    setOpen(!open);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


 
  const navigate = useNavigate();
 
  const reportList = [
    {
      id: "1",
      category: "Properties",
      items: [
        {
          id: "2",
          linkName: "property_details",
          report: "My Properties",
        },

  // {
    //   id: "1",
    //   linkName: "property_category",
    //   report: "Add Property Category",
    // },
    // {
    //   id: "2",
    //   linkName: "property_type",
    //   report: "Add Property",
    // },
      ],
    },
    {
      id: "4",
      category: "Articles",
      items: [
        {
            id: "5",
            linkName: "category",
            report: "Article Categories",
          },
        {
            id: "6",
            linkName: "add_article",
            report: "Add Article",
          },
        {
          id: "7",
          linkName: "articles",
          report: "Articles",
        },
       
        
      ],
    },
   { id: "8",
    category: "Subscription Plans",
    items: [
        {
            id: "9",
            linkName: "add_subscription_plan",
            report: "Add Subscription",
          },
          {
            id: "10",
            linkName: "subscription_plans",
            report: "Subscription Plans",
          },     
      
    ],
  },
   { id: "11",
    category: "Banners",
    items: [
        {
      id: "12",
      linkName: "banner",
      report: "Banners",
    },
    ],
  },
   { id: "13",
    category: "Contacts",
    items: [
        {
      id: "14",
      linkName: "contacts",
      report: "Contact List",
    },
    ],
  },
  ];
  
  return (
    <>
 
      {/* {isMatch ? (<>
        <Hidden>
        <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                      >
          <Button onClick={toggleDrawer("left", true)} sx={{ alignItems: "top", height: "5%" }}>
            
            <MenuIcon style={{ color: "#060847", top: 0, marginLeft: 0, alignItems: "top" }} />
          </Button>
          </Grid>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
               
                boxShadow: 3,
                backgroundColor: "#060847"
              },
            }}

          >
            <List>           
              {reportList.map((obj) => (
                <div>
                  <ListItemButton
                    sx={{ height: "40px", margin: "10px", borderRadius: "10px" }}
                   
                    onClick={() => {
                      localStorage.setItem("color2",obj.id)
                      setColor(obj.id);
                      navigate(`/Dashboard/${obj.linkName}`);
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "10px",
                    
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                      >
                        <Typography sx={{ color: "white",margin: "auto",marginLeft: "30px",textAlign:"left" ,textTransform:"uppercase" }}>{obj.report}</Typography>
                      </Grid>
                    </ListItemText>
                  </ListItemButton>
                  <hr />

                </div>
              ))}
              <ListItemButton
                sx={{ height: "40px", margin: "10px", borderRadius: "10px" }}

                onClick={() => {
                  localStorage.clear()
                  setAdmin(null)
                  setOrder(null)
                  setTkn(null)
                  navigate("/login_ad")
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "10px",
                   
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Typography sx={{ color: "white",margin: "auto",marginLeft: "30px",textAlign:"left",textTransform:"uppercase"  }}>Logout</Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
            </List>
            <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-end"

>
                    <img src={footer} width="200px" height="50px" style={{  bottom: 5}} />
                  </Grid>
          </Drawer>
        </Hidden>
      </>) : ( */}
        <div>
       
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
          
              boxShadow: 3,
            backgroundColor:"#060847",
            // backgroundColor: "#3f4d67",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box>
            <List>
  {reportList.map((category) => (
    <div key={category.id}>
      <ListItemButton
        onClick={() => {
          setOpen(open === category.id ? null : category.id);
        }}
        sx={{ height: "50px", margin: "10px", borderRadius: "10px", textAlign: "center" }}
      >
        <ListItem>
          <ListItemText
            sx={{ color: "white", margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase" }}
          >
            {category.category}
          </ListItemText>
          {open === category.id ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
        </ListItem>
      </ListItemButton>
      <Collapse in={open === category.id} timeout="auto" unmountOnExit>
        <List>
          {category.items.map((item) => (
            <div key={item.id}>
              <ListItemButton
                sx={{ height: "50px", margin: "10px", borderRadius: "10px", textAlign: "center" }}
                onClick={() => {
                  localStorage.setItem("color", item.id);
                  setColor(item.id);
                  navigate(`/Dashboard/${item.linkName}`);
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "10px",
                  }}
                >
                  <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                    <Typography
                      sx={{ color: "white", margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase" }}
                    >
                      {item.report}
                    </Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
              <hr />
            </div>
          ))}
        </List>
      </Collapse>
    </div>
  ))}
   <ListItemButton
                sx={{ height: "50px", margin: "10px", borderRadius: "10px" }}

                onClick={() => {
                  localStorage.clear()
                  setAdmin(null)
                  setOrder(null)
                  setTkn(null)
                  navigate("/login_ad")
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    // fontWeight: "bold",
                    fontSize: "10px",
                 
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Typography sx={{ color: "white", margin: "auto",marginLeft: "30px",textAlign:"left",textTransform:"uppercase"  }}>Logout</Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
</List>

            {/* <List>          
              {reportList.map((obj) => (
                <div>
                     <ListItemButton onClick={handleClickExp}  sx={{ height: "50px", margin: "10px", borderRadius: "10px",textAlign:"center" }}>
              <ListItem>
               
              <ListItemText sx={{
                           color: "white",
                        margin: "auto",marginLeft: "30px",textAlign:"left",textTransform:"uppercase" }}>Properties</ListItemText>
               {open ? <ExpandLess sx={{
                           color: "white",}} /> : <ExpandMore sx={{
                            color: "white",}} />}
           </ListItem>
           </ListItemButton>

           <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
        <ListItemButton
                    sx={{ height: "50px", margin: "10px", borderRadius: "10px",textAlign:"center" }}
                 
                    onClick={() => {
                      localStorage.setItem("color",obj.id)
                      setColor(obj.id);
                      navigate(`/Dashboard/${obj.linkName}`);
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        // fontWeight: "bold",
                        fontSize: "10px",
                      
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                      >
                        <Typography  
                        sx={{
                           color: "white",
                        margin: "auto",marginLeft: "30px",textAlign:"left",textTransform:"uppercase" }}
                        >
                          {obj.report}</Typography>
                      </Grid>
                    </ListItemText>
                  </ListItemButton>
                  <hr />
         
        </List>
      </Collapse> 
                

                </div>
              ))}
              <ListItemButton
                sx={{ height: "50px", margin: "10px", borderRadius: "10px" }}

                onClick={() => {
                  localStorage.clear()
                  setAdmin(null)
                  setOrder(null)
                  setTkn(null)
                  navigate("/login_ad")
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    // fontWeight: "bold",
                    fontSize: "10px",
                 
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Typography sx={{ color: "white", margin: "auto",marginLeft: "30px",textAlign:"left",textTransform:"uppercase"  }}>Logout</Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
            </List> */}
          </Box>
          <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-end"

>
                    <img src={footer} width="200px" height="50px" style={{ bottom: 5 }} />
                  </Grid>
        </Drawer>
        </div>
        {/* )}   */}
    </>
  )
}
