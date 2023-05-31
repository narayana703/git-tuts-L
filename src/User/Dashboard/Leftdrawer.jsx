import React, { useContext, useState } from "react";
import {
  Drawer,
  Toolbar,
  Grid,
  ListItemText,
  ListItemButton,
  List,
  Box, Typography, useMediaQuery, useTheme, Button, Hidden, ListItem, Collapse
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import footer from '../../assets/bhrfooter.png'
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 250;

export function UserLeftDrawer() {
  const [color, setColor] = useState();
 const getColor=localStorage.getItem("color")
  const theme = useTheme()
  const { user, setUser, uid, setUId, tkn, setTkn } = useContext(UserContext)
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      linkName: "my_account",
      report: "My Profile",
      icon:<AccountCircleIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "2",
      linkName: "property_list",
      report: "My Properties",
      icon:<FormatListBulletedIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "3",
      linkName: "search_history",
      report: "My Search History",
      icon:<HistoryIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "4",
      linkName: "propert_enq_history",
      report: "Property Enquiry History",
      icon:<HistoryIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "5",
      linkName: "favourites",
      report: "My Favourites",
      icon:<FavoriteIcon sx={{fontSize:"medium"}} />,
    },
    
    {
      id: "6",
      linkName: "subscription_plan_details",
      report: "Subscription Plans",
      icon:<CardMembershipIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "7",
      linkName: "myprofile",
      report: "Update Profile",
      icon:<EditIcon sx={{fontSize:"medium"}} />,
    },
    {
      id: "8",
      linkName: "update_password",
      report: "Update Password",
      icon:<LockIcon sx={{fontSize:"medium"}} />,
    },
    
    // {
    //   id: "8",
    //   linkName: "add_new_property",
    //   report: "Add Property New",
    //   icon:<LockIcon sx={{fontSize:"medium"}} />,
    // },
    // {
    //   id: "9",
    //   linkName: "property_list",
    //   report: "Property List",
    //   icon:<LockIcon sx={{fontSize:"medium"}} />,
    // },
    
  ]
 
  return (
    <>
      {isMatch ? (<>
        <Hidden>
        <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                      >
          <Button onClick={toggleDrawer("left", true)} sx={{ alignItems: "top", height: "5%" }}>
            
            <ListIcon style={{ color: "#060847", top: 0, marginLeft: 0, alignItems: "top" }} />
          </Button>
          </Grid>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                // borderRadius: 4,
                boxShadow: 3,
                backgroundColor: "#060847"
              },
            }}

          >
            <Toolbar />
            <List>           
              {reportList.map((obj) => (
                <div>
                  <ListItemButton
                    sx={{ height: "40px", margin: "10px", borderRadius: "10px" }}
                    // style={{
                    //   backgroundColor: localStorage.getItem("color2") === obj.id ? "#92B5D2" : "",

                    // }}
                    onClick={() => {
                      localStorage.setItem("color2",obj.id)
                      setColor(obj.id);
                      navigate(`/user_dashboard/${obj.linkName}`);
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        // color: color===obj.id ? "white":"#004037",
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                      >
                        <Typography sx={{ color: "white",margin: "auto",marginLeft: "1px",textAlign:"justify",textTransform:"uppercase",fontSize:"15px"}}>{obj.icon}&nbsp;&nbsp;{obj.report}</Typography>
                      </Grid>
                    </ListItemText>
                  </ListItemButton>
                  {/* <hr /> */}

                </div>
              ))}
              <ListItemButton
                sx={{ height: "40px", margin: "10px", borderRadius: "10px" }}

                onClick={() => {
                  localStorage.clear()
                  setUser(null)
                  setUId(null)
                  setTkn(null)
                  navigate("/")
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                   
                    // color: color===obj.id ? "white":"#004037",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Typography sx={{ color: "white",margin: "auto",marginLeft: "1px",textAlign:"justify",textTransform:"uppercase",fontSize:"15px" }}><LogoutIcon sx={{fontSize:"medium"}}/>&nbsp;&nbsp;Logout</Typography>
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
                    <img src={footer} width="200px" height="50px" style={{ position: "fixed", bottom: 5 }} />
                  </Grid>
          </Drawer>
        </Hidden>
      </>) : (
        <div>
        
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              // borderRadius: 4,
              boxShadow: 3,
            backgroundColor:"#060847",
            },
          }}
          variant="permanent"
          anchor="left"
        >
           <Toolbar />
          <Box>
            <List>          
              {reportList.map((obj) => (
                <div>
                  <ListItemButton
                    sx={{ height: "50px", margin: "10px", borderRadius: "10px",textAlign:"center" }}
                    // style={{
                    //   backgroundColor: getColor=== obj.id ? "#92B5D2" : "",

                    // }}
                    onClick={() => {
                      localStorage.setItem("color",obj.id)
                      setColor(obj.id);
                      navigate(`/user_dashboard/${obj.linkName}`);
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        // color: color===obj.id ? "white":"#004037",
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
                        margin: "auto",textTransform:"uppercase",marginLeft: "1px",textAlign:"left",fontSize:"15px" }}
                        
                        >
                         {obj.icon}&nbsp;&nbsp;{obj.report}</Typography>
                      </Grid>
                    </ListItemText>
                  </ListItemButton>
                  {/* <hr /> */}

                </div>
              ))}
              <ListItemButton
                sx={{ height: "50px", margin: "10px", borderRadius: "10px" }}

                onClick={() => {
                  localStorage.clear()
                  setUser(null)
                  setUId(null)
                  setTkn(null)
                  navigate("/")
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "10px",
                    // color: color===obj.id ? "white":"#004037",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Typography sx={{ color: "white", margin: "auto",marginLeft: "1px",textAlign:"justify",textTransform:"uppercase",fontSize:"15px" }}><LogoutIcon sx={{fontSize:"medium"}}/>&nbsp;&nbsp;Logout</Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
          <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-end"

>
                    <img src={footer} width="200px" height="50px" style={{ position: "fixed", bottom: 5 }} />
                  </Grid>
        </Drawer>
        </div>)}
    </>
  )
}