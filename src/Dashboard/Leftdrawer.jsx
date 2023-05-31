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
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import footer from '../assets/bhrfooter.png'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 275;

export function LeftDrawer() {
  const [color, setColor] = useState();
  const getColor = localStorage.getItem("color")
  const theme = useTheme()
  const { admin, setAdmin, user, setUser, order, setOrder, tkn, setTkn } = useContext(UserContext)
  // const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [state, setState] = useState({
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

  const [activeButton, setActiveButton] = useState(sessionStorage.getItem("color") || "");
  const [open, setOpen] = useState(sessionStorage.getItem("open") || null);
  const handleClick = (id) => {
    if (open === id) {
      // Collapse is open, so close it
      setOpen(null);
    } else {
      // Collapse is closed or another one is open, so open this one
      setOpen(id);
    }
  };

  const handleItemClick = (id, linkName) => {
    sessionStorage.setItem("color", id);
    setActiveButton(id);
    sessionStorage.setItem("open", open); // Store the open state in localStorage
    navigate(`/Dashboard/${linkName}`);
  };



  const navigate = useNavigate();
  var superAdminList = [
    {
      id: "19",
      category: "Add Admin",
      items: [
        {
          id: "20",
          linkName: "add_admin",
          report: "Add Admin",
        },
        {
          id: "21",
          linkName: "admin_data",
          report: "Admins Data ",
        },
        {
          id: "25",
          linkName: "admin_history",
          report: "Admins History ",
        },

      ],
    },
    {
      id: "22",
      category: "BHR Projects",
      items: [
        {
          id: "23",
          linkName: "add_project",
          report: "Add Project",
        },
        {
          id: "24",
          linkName: "all_projects",
          report: "All Projects",
        },

      ],
    },
    {
      id: "1",
      category: "Property Listings",
      items: [
        {
          id: "2",
          linkName: "property_details",
          report: "All Property Listings",
        },

        {
          id: "3",
          linkName: "user_properties",
          report: "Update Property Status",
        },
        {
          id: "4",
          linkName: "search_properties",
          report: "Search User Properties",
        },
        {
          id: "6",
          linkName: "search_history",
          report: " Property Search History",
        },
      ],
    },
    {
      id: "6",
      category: "Articles",
      items: [
        {
          id: "7",
          linkName: "category",
          report: "Article Categories",
        },
        {
          id: "8",
          linkName: "add_article",
          report: "Add Article",
        },
        {
          id: "9",
          linkName: "articles",
          report: "Articles",
        },


      ],
    },
    {
      id: "10",
      category: "Subscription Plans",
      items: [
        {
          id: "11",
          linkName: "add_subscription_plan",
          report: "Add Subscription",
        },
        {
          id: "12",
          linkName: "subscription_plans",
          report: "Subscription Plans",
        },
        {
          id: "18",
          linkName: "sub_purchase_history",
          report: "Purchase History",
        },

      ],
    },
    {
      id: "13",
      category: "Banners",
      items: [
        {
          id: "14",
          linkName: "banner",
          report: "Banners",
        },
      ],
    },
    {
      id: "15",
      category: "Contacts",
      items: [
        {
          id: "16",
          linkName: "contacts",
          report: "Contact List",
        },
        {
          id: "17",
          linkName: "enquiry_history",
          report: "Enquiry History",
        },
        {
          id: "25",
          linkName: "project_enq",
          report: "Project Enquiry List",
        },
      ],
    },
    
  ];


  var AdminList = [
    {
      id: "22",
      category: "BHR Projects",
      items: [
        {
          id: "23",
          linkName: "add_project",
          report: "Add Project",
        },
        {
          id: "24",
          linkName: "all_projects",
          report: "All Projects",
        },

      ],
    },
    {
      id: "1",
      category: "Property Listings",
      items: [
        {
          id: "2",
          linkName: "property_details",
          report: "All Property Listings",
        },

        {
          id: "3",
          linkName: "user_properties",
          report: "User Properties Status",
        },
        {
          id: "4",
          linkName: "search_properties",
          report: "Search User Properties",
        },
        {
          id: "6",
          linkName: "search_history",
          report: " Property Search History",
        },
      ],
    },
    {
      id: "6",
      category: "Articles",
      items: [
        {
          id: "7",
          linkName: "category",
          report: "Article Categories",
        },
        {
          id: "8",
          linkName: "add_article",
          report: "Add Article",
        },
        {
          id: "9",
          linkName: "articles",
          report: "Articles",
        },


      ],
    },
    {
      id: "10",
      category: "Subscription Plans",
      items: [
        {
          id: "11",
          linkName: "add_subscription_plan",
          report: "Add Subscription",
        },
        {
          id: "12",
          linkName: "subscription_plans",
          report: "Subscription Plans",
        },
        {
          id: "18",
          linkName: "sub_purchase_history",
          report: "Purchase History",
        },

      ],
    },
    {
      id: "13",
      category: "Banners",
      items: [
        {
          id: "14",
          linkName: "banner",
          report: "Banners",
        },
      ],
    },
    {
      id: "15",
      category: "Contacts",
      items: [
        {
          id: "16",
          linkName: "contacts",
          report: "Contact List",
        },
        {
          id: "17",
          linkName: "enquiry_history",
          report: "Enquiry History",
        },
      ],
    },
    
  ];

  var reportList
    (admin.admin_role == 1 ? reportList = superAdminList : reportList = AdminList)

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
            <Toolbar />
            <List>
              {reportList.map((category) => (
                <div key={category.id}>
                  <ListItemButton
                    onClick={() => handleClick(category.id)}
                    sx={{ height: "50px", margin: "10px", borderRadius: "10px", textAlign: "center" }}
                  >
                    <ListItem>
                      <ListItemText
                        sx={{
                          color: "white",
                          margin: "auto",
                          marginLeft: "30px",
                          textAlign: "left",
                          textTransform: "uppercase",
                        }}
                      >
                        {category.category}
                      </ListItemText>
                      {open === category.id ? (
                        <ExpandLess sx={{ color: "white" }} />
                      ) : (
                        <ExpandMore sx={{ color: "white" }} />
                      )}
                    </ListItem>
                  </ListItemButton>
                  <Collapse in={open === category.id} timeout="auto" unmountOnExit>
                    <List>
                      {category.items.map((item) => (
                        <div key={item.id}>
                          <ListItemButton
                            sx={{
                              height: "50px",
                              marginLeft: "30",
                              borderRadius: "",
                              textAlign: "center",
                              paddingLeft: '3rem',
                              display: 'flex',
                              backgroundColor: activeButton === item.id ? "#b4b5c8" : "#38396c",
                              color: activeButton === item.id ? "#060847" : "#fff",
                              borderLeft: "6px solid #060847",
                              '&:hover': {
                                backgroundColor: '#fff',
                                color: "#060847",

                              }
                            }}
                            onClick={() => handleItemClick(item.id, item.linkName)}
                          >
                            <ListItemText
                              primaryTypographyProps={{
                                fontSize: "10px",
                              }}
                            >
                              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                                <Typography
                                  sx={{ margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase", padding: "10px" }}
                                >
                                  {item.report}
                                </Typography>
                              </Grid>
                            </ListItemText>
                          </ListItemButton>

                        </div>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ))}
              <ListItemButton
                sx={{ height: "50px", margin: "auto", marginLeft: "30px", borderRadius: "10px" }}

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
                    <Typography sx={{ color: "white", margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase" }}>Logout</Typography>
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

                boxShadow: 3,
                backgroundColor: "#060847",
                // backgroundColor: "#3f4d67",
              },
            }}
            variant="permanent"
            anchor="left"
          > <Toolbar />
            <Box>
              <List>
                {reportList.map((category) => (
                  <div key={category.id}>
                    <ListItemButton
                      onClick={() => handleClick(category.id)}
                      sx={{ height: "50px", margin: "10px", borderRadius: "10px", textAlign: "center" }}
                    >
                      <ListItem>
                        <ListItemText
                          sx={{
                            color: "white",
                         
                            margin: "auto",
                            marginLeft: "1px",
                            textAlign: "left",
                            textTransform: "uppercase",
                            
                          }}
                        >
                          <Typography
              variant="body1"
              sx={{
                fontSize: "15px", // Adjust the font size here
              }}
            >
               {category.category}
            </Typography>
                         
                        </ListItemText>
                        {open === category.id ? (
                          <ExpandLess sx={{ color: "white" }} />
                        ) : (
                          <ExpandMore sx={{ color: "white" }} />
                        )}
                      </ListItem>
                    </ListItemButton>
                    <Collapse in={open === category.id} timeout="auto" unmountOnExit>
                      <List>
                        {category.items.map((item) => (
                          <div key={item.id}>
                            <ListItemButton
                              sx={{
                                height: "50px",
                                marginLeft: "30",
                                borderRadius: "",
                                textAlign: "center",
                                paddingLeft: '3rem',
                                display: 'flex',
                                backgroundColor: activeButton === item.id ? "#b4b5c8" : "#38396c",
                                color: activeButton === item.id ? "#060847" : "#fff",
                                borderLeft: "6px solid #060847",
                                '&:hover': {
                                  backgroundColor: '#fff',
                                  color: "#060847",

                                }
                              }}
                              onClick={() => handleItemClick(item.id, item.linkName)}
                            >
                              <ListItemText
                                primaryTypographyProps={{
                                  fontSize: "10px",
                                }}
                              >
                                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                                  <Typography
                                    sx={{ margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase", padding: "10px",fontSize:"15px" }}
                                  >
                                    {item.report}
                                  </Typography>
                                </Grid>
                              </ListItemText>
                            </ListItemButton>

                          </div>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                ))}
                <ListItemButton
                  sx={{ height: "50px", margin: "auto", borderRadius: "10px" }}

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
                      <Typography sx={{ color: "white", margin: "auto", marginLeft: "30px",textAlign:"justify",textTransform:"uppercase",fontSize:"15px" }}>Logout</Typography>
                    </Grid>
                  </ListItemText>
                </ListItemButton>
              </List>

              {/* <List>
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
              sx={{ height: "50px", margin: "10px", borderRadius: "10px", textAlign: "center",backgroundColor: activeButton === item.id ?  "#fff":"#060847"  }}
              onClick={(e) => {
                localStorage.setItem("color", item.id);
                setColor(item.id);
                setActiveButton(item.id);
                navigate(`/Dashboard/${item.linkName}`);
                e.preventDefault(); // stop event propagation
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "10px",
                }}
              >
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                  <Typography
                    sx={{ backgroundColor:"#fff",color: "#060847",borderRadius:"10px" ,margin: "auto", marginLeft: "30px", textAlign: "left", textTransform: "uppercase",padding:"10px" }}
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
              sx={{ height: "50px", margin: "auto", marginLeft: "30px", borderRadius: "10px" }}

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
              <img src={footer} width="200px" height="50px" style={{ position: "fixed", bottom: 5 }} />
            </Grid>
          </Drawer>
        </div>
      )}
    </>
  )
}
