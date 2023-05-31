import { Button, Box, Grid } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Typography } from "@mui/material";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
export const Banner = () => {
  const [bannerdata, setBannerData] = useState([]);
  const { user, token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let history=useNavigate()
  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async (e) => {
    setLoading(true);
    await axios.post("/user/get_all_banners").then(function (res) {
      console.log(res);
      if (res.data.status === 1) {
        setBannerData(res.data.data);
        setLoading(false);
        handleClick();
      }
    });
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Carousel
          animation="slide"
          timeout={1200}
          autoPlay={true}
          showIndicators={true}
          showArrows={false}
          centerMode={false}
          infiniteLoop
          stopOnHover
          swipeable
          showThumbs={false}
          transitionTime={2500}
          showStatus={false}
        >
          {bannerdata &&
            bannerdata.map((i) => (
              <div
                style={{
                  margin: "5px",
                  //  paddingRight:"5px",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={`/images/banners/${i.banner_image}`}
                  alt="no image"
                  height="650px"
                  style={{ objectFit: "cover" }}
                />
                <Box
                  // onClick={() => {
                  //   handleImageClick(3);
                  //   console.log(3);
                  // }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    // cursor: "pointer",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    // alignItems="center"
                    // backgroundColor={'red'}
                    textAlign={"start"}
                    ml="15%"
                  >
                    <Grid>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#fff",
                          // fontSize: "2rem",
                          // "@media (max-width: 960px)": {
                          //   fontSize: "2rem",
                          // },
                          // "@media (max-width: 600px)": {
                          //   fontSize: "1rem",
                          // },
                        }}
                      >
                       {i.banner_title.toUpperCase()}
                       
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#fff",}}>
                            {i.banner_sub_title}
                          </Typography>
                   
                    </Grid>
                    <br />
                    <Grid >
                     
                      <Button sx={{color:'white',backgroundColor:"#060847",borderRadius:"50px",padding:"13px",width:"150px",'&:hover':{color:'white',backgroundColor:"#060847"}}} onClick={()=>{history(`/${i.banner_url}`)}}>
                     {i.banner_button_text}
                      </Button>
            
                    </Grid>
                  </Grid>
                </Box>

                {/* <Typography
                   
                    style={{ opacity: "0.7", fontSize: "25px" }}
                    className="legend"
                  >
                   
                  </Typography> */}
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};



// import React, { useState, useContext, useEffect } from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Typography } from '@mui/material';
// import axios from 'axios'
// import { UserContext } from '../components/UserContext';
// import { Loading } from '../components/Loading';
// export const Banner = () => {
//   const [bannerdata, setBannerData] = useState([])
//   const { user, token } = useContext(UserContext)
//   const [loading,setLoading]=useState(true)
//   const handleClick = () => {
//     const anchor = document.querySelector("#back-to-top-anchor");

//     if (anchor) {
//       anchor.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   useEffect(() => {
//     getData()
 
//   }, [])
//   const getData = async (e) => {
//     setLoading(true)
//     await axios.post("/user/get_all_banners").then(function (res) {
//       console.log(res)
//       if (res.data.status === 1) {
//         setBannerData(res.data.data)
//         setLoading(false)
//         handleClick()
//       }
//     })
//   }
//   return (
//     <div>
//       {loading?<Loading />:
//         <Carousel
//         animation="slide"
//         timeout={1200}
//         autoPlay={true}
//         showIndicators={true}
//         showArrows={false}
//         centerMode={false}
//         infiniteLoop
//         stopOnHover
//         swipeable
//         showThumbs={false}
//         transitionTime={2500}
//         showStatus={false}

//       >
         
            
//         {bannerdata && bannerdata.map((i) => (
//           <div  style={{
//             margin: "5px",
//             //  paddingRight:"5px",
//             borderRadius: "5px",
          
//           }}>
       
//             <img src={`/images/banners/${i.banner_image}`} alt="no image" height="650px" style={{ objectFit: "cover" }} />
            
           
             
//               <Typography
//                     variant="h1"
//                     style={{ opacity: "0.7", fontSize: "25px" }}
//                     className="legend"
//                   >
//                     {i.banner_title}
//                   </Typography>
             
//           </div>

//         ))}
//       </Carousel>
//       }
    
    

//     </div>
//   )
// }
