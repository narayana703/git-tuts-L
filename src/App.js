import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Admin_login from './signup/admin_login'
import { Snackbar, Alert, Slide, useScrollTrigger, Fab, Zoom } from "@mui/material";
import { UserContext, SnackbarContext } from './components/UserContext';
import { Dashboard } from './Dashboard/Dasboard'
import axios from 'axios'
import { Loading } from './components/Loading';
import { Home } from './Home/home';
import { UserDashboard } from './User/Dashboard/Dasboard';
import { ContactNow } from './ContactUs/contact';
import { WhatWeDo } from './WhatWeDo/WhatWeDo';
import { Footer } from './components/footer';
import { FooterArawinz } from './components/footerArawinz';
import { OurProjects } from './OurProjects/OurProjects';
import { Header } from './components/header';
import { Register } from './signup/register';
import { Signin } from './signup/signin';
import { AllBlogArticle } from './Blog/AllBlogArticle'
import { Test } from './components/test';
import { AllPropertyData } from './OurProperties/AllPropertyData';
import { SinglePropertyView } from './OurProperties/SingleProperty';
import { SingleArticle } from './OurArticles/singleArticle';
import { SearchResults } from './Search/SearchResults';
import { PropSearchResults } from './Search/PropSearchResult';
import { OurBhrProperties } from './OurProperties/ourBhrProperty';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Left } from './left';
import { SinglePropertyDetails } from './User/Properties/SinglePropertyView'
import { SingleProject } from './OurProjects/singleProject';
import WabPage from './OurProjects/sample';
import { Floor } from './AddProperty/floor';



function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (e) => {

    const anchor = (e.target.ownerDocument).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={{ position: "fixed", bottom: 2, right: 7 }} >
        {children}
      </div>
    </Zoom>
  );
}


function App(props) {
  const urll = window.location.pathname;

  console.log(urll === "/contact_us" ? <FooterArawinz /> : <Footer />);
  const [cat1, setCat1] = useState()
  const [catU, setCatU] = useState()
  const [user, setUser] = useState()
  const [admin, setAdmin] = useState()
  const [propCat, setPropCat] = useState()
  const [catData, setCatData] = useState([])
  const [articleData, setArticleData] = useState([])
  const [bannerData, setBannerdata] = useState([])
  const [userId, setUserId] = useState()
  const [editID, setEditID] = useState()
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });
  const [tkn, setTkn] = useState(localStorage.getItem('TKN'));
  const [token, setToken] = useState(localStorage.getItem('UTKN'));
  const [propData, setPropData] = useState([])
  const [isloading, setIsloading] = useState(true);
  const [propId, setPropId] = useState(localStorage.getItem('rowid'))
  const [uid, setUId] = useState(localStorage.getItem('uid'));
  const [searchHistorypropId, setSearchHistorypropId] = useState();
  useEffect(() => {
    adminSession()
    userSession()
  }, []);

  const adminSession = () => {
    const formData = {};

    formData.tkn = tkn;

    axios.post("/admin/check_session", formData

    ).then((res) => {
      console.log(res)
      if (res.data.status === 1) {
        setAdmin(res.data.data)
        // setUser(res.data.data)
        setIsloading(false);
        console.log(user)
      } else {
        setAdmin(null)
        // setUser(null);
        setIsloading(false);
      }
    });

  }
  const userSession = () => {
    const formData = {};

    formData.tkn = token;

    axios.post("/user/check_session", formData

    ).then((res) => {
      console.log(res)
      if (res.data.status === 1) {

        setUser(res.data.data)
        setIsloading(false);
        console.log(user)
      } else {

        setUser(null);
        setIsloading(false);
      }
    });

  }
  console.log(user, "=======user==========")

  let footerComponent;
  if (urll === "/contact_us") {
    footerComponent = <FooterArawinz />;
  } else {
    footerComponent = <Footer />;
  }
  return (

    <div className="page-container">
      {isloading ? (<Loading />) : (<UserContext.Provider value={{ admin, setAdmin, user, setUser, tkn, setTkn, token, setToken, propData, setPropData, propId, setPropId, uid, setUId, catData, setCatData, articleData, setArticleData, propCat, setPropCat, bannerData, setBannerdata, cat1, setCat1, catU, setCatU, searchHistorypropId, setSearchHistorypropId, userId, setUserId, editID, setEditID }} >
        <div class="content-wrap">
          <Snackbar
            open={snack.open}
            autoHideDuration={2000}
            onClose={() => {
              setSnack((prevdata) => {
                return {
                  ...prevdata,
                  open: false,
                };
              });
            }}
            TransitionComponent={Slide}
          >
            <Alert
              variant="filled"
              onClose={() => {
                setSnack((prevdata) => {
                  return {
                    ...prevdata,
                    open: false,
                  };
                });
              }}
              severity={snack.type}
            >
              {snack.message}
            </Alert>
          </Snackbar>
          {/* {isloading ? (<Loading />) : (<UserContext.Provider value={{ admin, setAdmin, user, setUser, tkn, setTkn, token, setToken, propData, setPropData, propId, setPropId, uid, setUId, catData, setCatData, articleData, setArticleData, propCat, setPropCat, bannerData, setBannerdata, cat1, setCat1, catU, setCatU }} > */}
          <SnackbarContext.Provider value={{ snack, setSnack }}>
            <Router>
              {/* {!admin &&  <Header />} */}
              {/* <Header /> */}

              <Routes>
                ``
                <Route path='/' element={<><Header /> <Home /></>} />
                <Route path="/login_ad" element={admin ? <Navigate to="/Dashboard/property_details" /> : <> <Admin_login /></>} />
                <Route path="/Dashboard/*" element={admin ? <><Dashboard /></> : <Navigate to="/login_ad" />} />
                <Route path="/" element={user ? <Navigate to="/user_dashboard/my_account" /> : <><Header /> <Home />  </>} />
                <Route path="/user_dashboard/*" element={user ? <><UserDashboard />        </>: <Navigate to="/signin" />} />
                <Route path="/contact_us" element={<><Header /><ContactNow /></>} />
                <Route path="/what_we_do" element={<><Header /> <WhatWeDo />
                </>} />
                <Route path='/signup' element={<><Header /> <Register /> 
                </>} />
                <Route path='/signin' element={user ? <Navigate to="/user_dashboard/my_account" /> : <><Header />  <Signin /> 
                </>} />
                <Route path="/property/:id" element={user ? <><Header />   <SinglePropertyDetails /></> : <><Header /> <SinglePropertyView /> 
                </>} />
                <Route path="/article/:id" element={<><Header />   <SingleArticle /> 
                </>} />
                <Route path='/property_searchresults/:ps/:pt/:pss' element={<><Header /> <PropSearchResults /> 
                </>} />
                <Route path="/rent_sale_property/:city?/:ps?/:pt?/:pss?/:rand?" element={<><Header /> <OurProjects /> 
                </>} />
                <Route path="/our_articles/:cat?" element={<><Header />   <AllBlogArticle />
                </>} />
                <Route path="/our_properties/:city/:type" element={<><Header /> <OurBhrProperties />
                </>} />
                <Route path="/project/:id" element={<><Header /> <SingleProject />
                </>} />
                <Route path='/test' element={<Test />} />
                <Route path='/left' element={<Left />} />
                <Route path='/sample' element={<WabPage />} />
<Route path='/floor' element={<Floor />} />
              </Routes>

            </Router>

          </SnackbarContext.Provider>
          {/* </UserContext.Provider>)} */}

        </div>
        {/* {JSON.stringify(urll=="/contact_us")} */}
        {footerComponent}
        
        <ScrollTop {...props}>
          <Fab
            color="primary"
            aria-label="scroll back to top"
            style={{ border: "1px solid white", backgroundColor: "#060847" }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </UserContext.Provider>)}
    </div>

  );
}

export default App;
