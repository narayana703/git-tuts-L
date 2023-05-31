

import {
  AppBar,
  Hidden,
  Toolbar,
  Tab,
  ListItemText,
  ListItemButton,
  List,
  Button,
  Drawer,
  Typography,
  useTheme,
  Dialog,
  DialogContent,
  Box,
  Container,
  ButtonBase
} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import React, { useContext, useState } from "react";
import logo1 from "../assets/logo.png";
import logo2 from "../assets/homeid.png";
import { Grid, ListItem, Collapse } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Signin } from "../signup/signin";
import { Register } from "../signup/register";
import { UserContext } from "./UserContext";
import footer from "../assets/bhrfooter.png";
import { UserLeftDrawer } from "../User/Dashboard/Leftdrawer";
import { useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { LeftDrawer } from "../Dashboard/Leftdrawer";
// import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 220;

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };




  const { userId, setUserId } = useContext(UserContext);
  const link = useParams();


  const history = useNavigate();

  const [value, setValue] = useState(sessionStorage.getItem('activeTab') || '');

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { user, setUser, admin, editID } = useContext(UserContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    sessionStorage.setItem('activeTab', newValue); // store the new value in localStorage
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let id = useParams()
  console.log(user, "====gani")
  console.log(admin, "====gani")


  return (
    <div id="back-to-top-anchor">
      {/* <CssBaseline /> */}

      <AppBar position="fixed" sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }} >

        {/* <Container maxWidth="xl"> */}

          <Toolbar>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"

            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"

                item xs={4} sm={4} md={2} lg={4} xl={4}
              >

                <Grid  >
                  <Link to="/" className="linkstyle">
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <div style={{ padding: "4px", margin: "4px" }}>
                          <img
                            src={logo1}
                            alt="BHR Properties"
                            width="150px"
                            height="40px"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={3} lg={8} xl={8} textAlign={'end'}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Hidden lgUp>
                  <Button
                    onClick={toggleDrawer("left", true)}
                    sx={{ alignItems: "top", height: "5%" }}
                  >
                    <MenuIcon
                      style={{
                        color: "#000000",
                        top: 0,
                        marginLeft: 0,
                        alignItems: "top",
                      }}
                    />
                  </Button>
                  <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    sx={{
                      width: drawerWidth,

                      flexShrink: 0,
                      "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        // borderRadius: 4,
                        boxShadow: 3,
                        backgroundColor: "#060847",
                        color: "white",
                      },
                    }}
                  >
                    <Toolbar />
                    <List>
                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "1" ? "#ffff" : "",
                          color: value === "1" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "1" ? "#ffff" : "",
                            color: value === "1" ? "#001e95" : "white",
                          },
                        }}
                        onClick={() => {
                          history("/");
                          setValue("1");
                        }}
                        value="1"
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          {/* <HomeIcon sx={{fontSize:"medium"}}/> &nbsp; */}
                          Home
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "2" ? "#ffff" : "",
                          color: value === "2" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "2" ? "#ffff" : "",
                            color: value === "2" ? "#001e95" : "white",
                          },
                        }}
                        value="2"
                        onClick={() => {
                          history("/what_we_do");
                          setValue("2");
                        }}
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          What We Do
                        </ListItemText>
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "3" ? "#ffff" : "",
                          color: value === "3" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "3" ? "#ffff" : "",
                            color: value === "3" ? "#001e95" : "white",
                          },
                        }}
                        value="3"
                        onClick={() => {
                          history("/our_properties/all/all");
                          setValue("3");
                        }}
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          Our Projects
                        </ListItemText>
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "4" ? "#ffff" : "",
                          color: value === "4" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "4" ? "#ffff" : "",
                            color: value === "4" ? "#001e95" : "white",
                          },
                        }}
                        value="4"
                        onClick={() => {
                          history("/rent_sale_property/all/0/all/all/rand");
                          setValue("4");
                        }}
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          Rent / Sale
                        </ListItemText>
                      </ListItemButton>

                      <Button variant='outlined' size="small" 
                      sx={{ml:2,
                         border: "1px solid ", 
                         height: 35, 
                         mt: 1, 
                         width: 200,
                         borderRadius: "10px", 
                         backgroundColor:  "#001e95",
                         "&:hover": {
                         backgroundColor: "#ffff" ,
                         },  
                        }}   onClick={() => {
                                  history("/signin");
                                }}>
                          <Typography variant="body2" sx={{ color: '',}}>Post Property </Typography>
                          <Typography variant="caption" sx={{ color: '#ffff', backgroundColor: '#4caf50', pl: 1, pr: 1, borderRadius: 2, ml: 0.5 }}><b>FREE</b></Typography>
                        </Button>

                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "5" ? "#ffff" : "",
                          color: value === "5" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "5" ? "#ffff" : "",
                            color: value === "5" ? "#001e95" : "white",
                          },
                        }}
                        value="5"
                        onClick={() => {
                          history("/our_articles/all");
                          setValue("5");
                        }}
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          Blogs
                        </ListItemText>
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          height: "40px",
                          borderRadius: "10px",
                          margin: "auto",
                          marginTop: "10px",
                          backgroundColor: value === "6" ? "#ffff" : "",
                          color: value === "6" ? "#001e95" : "white",
                          "&:hover": {
                            backgroundColor: value === "6" ? "#ffff" : "",
                            color: value === "6" ? "#001e95" : "white",
                          },
                        }}
                        value="6"
                        onClick={() => {
                          history("/contact_us");
                          setValue("6");
                        }}
                      >
                        {" "}
                        <ListItemText
                          sx={{
                            margin: "auto",
                            marginLeft: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          Contact Us
                        </ListItemText>
                      </ListItemButton>
                      {user ? (
                        <ListItemButton
                          sx={{
                            height: "40px",
                            borderRadius: "10px",
                            margin: "auto",
                            marginTop: "10px",
                            backgroundColor: value === "7" ? "#ffff" : "",
                            color: value === "7" ? "#001e95" : "white",
                            "&:hover": {
                              backgroundColor: value === "7" ? "#ffff" : "",
                              color: value === "7" ? "#001e95" : "white",
                            },
                          }}
                          onClick={() => {
                            history("/signin");
                            setValue("7");
                          }}
                          value="7"
                        >
                          {" "}
                          <ListItemText
                            sx={{
                              margin: "auto",
                              marginLeft: "50px",
                              textTransform: "uppercase",
                            }}
                          >
                            My Profile
                          </ListItemText>
                        </ListItemButton>
                      ) : (
                        <ListItemButton
                          sx={{
                            height: "40px",
                            borderRadius: "10px",
                            margin: "auto",
                            marginTop: "10px",
                            backgroundColor: value === "7" ? "#ffff" : "",
                            color: value === "7" ? "#001e95" : "white",
                            "&:hover": {
                              backgroundColor: value === "7" ? "#ffff" : "",
                              color: value === "7" ? "#001e95" : "white",
                            },
                          }}
                          onClick={() => {
                            history("/signin");
                            setValue("7");
                          }}
                          value="7"
                        >
                          {" "}
                          <ListItemText
                            sx={{
                              margin: "auto",
                              marginLeft: "50px",
                              textTransform: "uppercase",
                            }}
                          >
                            Sign In
                          </ListItemText>
                        </ListItemButton>
                      )}

                      {(
                        <ListItemButton
                          sx={{
                            height: "40px",
                            borderRadius: "10px",
                            margin: "auto",
                            marginTop: "10px",
                            backgroundColor: value === "8" ? "#ffff" : "",
                            color: value === "8" ? "#001e95" : "white",
                            "&:hover": {
                              backgroundColor: value === "8" ? "#ffff" : "",
                              color: value === "8" ? "#001e95" : "white",
                            },
                          }}
                          value="8"
                          onClick={() => {
                            history("/signup");
                            setValue("8");
                          }}
                        >
                          {" "}
                          <ListItemText
                            sx={{
                              margin: "auto",
                              marginLeft: "50px",
                              textTransform: "uppercase",
                            }}
                          >
                            Sign Up
                          </ListItemText>
                        </ListItemButton>
                      )}
                    </List>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-end"
                    >
                      <img
                        src={footer}
                        width="200px"
                        height="50px"
                        style={{ position: "fixed", bottom: 20 }}
                      />
                    </Grid>
                  </Drawer>
                </Hidden>
                <Hidden lgDown>

                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
             

                    <TabContext value={value}>
                      <TabList
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "blue",
                          },
                        }}
                      >
                        {/* <Tab                      
                          label="Home"
                          value="1"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                          
                          }}
                          onClick={() => {
                            history("/");
                            setValue("1");
                          }}
                        /> */}

                        {/* <Tab
                          label="What We Do"
                          value="2"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                            // textTransform: "capitalize",
                          }}
                          onClick={() => {
                            history("/what_we_do");
                            setValue("2");
                          }}
                        /> */}

                        {/* <Tab
                          label="Our Projects"
                          value="3"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                            // textTransform: "capitalize",
                          }}
                          onClick={() => {
                            history("/our_properties/all/all/all");
                            setValue("3");
                          }}
                        /> */}

                        <Tab
                          label="Rent / Sale"
                          value="4"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                            // textTransform: "capitalize",
                            // mr:5
                          }}
                          onClick={() => {
                            history("/rent_sale_property/all/0/all/all/rand");
                            setValue("4");
                          }}
                        />


                       


                        <Button variant='outlined' size="small" sx={{ border: "1px solid ", height: 35, mt: 1, width: 200 }}   onClick={() => {
                              history("/signin");
                            }}>
                          <Typography variant="body2" sx={{ color: 'black',}}>Post Property </Typography>
                          <Typography variant="caption" sx={{ color: '#ffff', backgroundColor: '#4caf50', pl: 1, pr: 1, borderRadius: 2, ml: 0.5 }}><b>FREE</b></Typography>
                        </Button>

                        {/* <Tab
                          label="Blogs"
                          value="5"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                            // textTransform: "capitalize",
                          }}
                          onClick={() => {
                            history("/our_articles/all");
                            setValue("5");
                          }}
                        /> */}

                        {/* <Tab
                          label="contact us"
                          value="6"
                          sx={{
                            color: "black",
                            "&.Mui-selected": { color: "black" },
                            // textTransform: "capitalize",
                          }}
                          onClick={() => history("/contact_us")}
                        /> */}

                        {user ? (
                          <Tab
                            label="My Profile"
                            value="2"
                            sx={{
                              color: "black",
                              "&.Mui-selected": { color: "black" },
                              // textTransform: "capitalize",
                            }}
                            onClick={() => {
                              history("/signin");
                            }}
                          />
                        ) : (
                          <Tab
                            label="Sign In"
                            value="2"
                            sx={{
                              color: "black",
                              "&.Mui-selected": { color: "black" },
                              // textTransform: "capitalize",
                            }}
                            onClick={() => {
                              history("/signin");
                            }}
                          />
                        )}

                        {((!user) &&
                          <Tab
                            label="Sign Up"
                            value="3"
                            sx={{
                              color: "black",
                              "&.Mui-selected": { color: "black" },
                              // textTransform: "capitalize",
                            }}
                            onClick={() => {
                              history("/signup");
                            }}
                          />
                        )}




<ButtonBase  onClick={handleMenu}> 
                        <MenuIcon sx={{ color: 'black',  cursor: 'pointer' }} />
                        <Typography sx={{ ml: 0.5,  color: 'black', }}>
                          Menu
                        </Typography>
</ButtonBase>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',

                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >

                          <MenuItem onClick={() => {
                            history("/");

                          }}>HOME</MenuItem>

                          <MenuItem onClick={() => {
                            history("/what_we_do");

                          }}>WHAT WE DO</MenuItem>

                          <MenuItem onClick={() => {
                            history("/our_properties/all/all");

                          }}>OUR PROJECTS</MenuItem>

                          <MenuItem onClick={() => {
                            history("/rent_sale_property/all/0/all/all/rand");

                          }}>RENT / SALE</MenuItem>

                          <MenuItem onClick={() => {
                            history("/our_articles/all");

                          }}>BLOGS</MenuItem>

                          <MenuItem onClick={() => {
                            history("/contact_us");

                          }}>CONTACT US</MenuItem>

                        </Menu>

                      </TabList>
                    </TabContext>

                  </Grid>

                </Hidden>
              </Grid>
            </Grid>
          </Toolbar>
        {/* </Container> */}
      </AppBar>
      <br /> <br /> <br />

    </div>
  );
};