
import { Grid, Container, Link, Typography } from '@mui/material';
import logo from '../assets/bhrfooter.png'
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';

// import {
//     EmailShareButton,
//     EmailIcon,
//     FacebookShareButton,
//     FacebookIcon,
//     LinkedinShareButton,
//     LinkedinIcon,
//     TelegramShareButton,
//     TelegramIcon,
//     TwitterShareButton,
//     TwitterIcon,
//    ViberShareButton,
//     WhatsappShareButton,
//     WhatsappIcon,
    
//   } from "react-share";
export const FooterArawinz = () => {
    const url=window.location.href;
    console.log(url,"url")
    return (
        <div className="main-footer">

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                    <p>Designed and Developed by <a href="https://www.arawinz.com/" target='_blank' style={{color:"#fff"}}>Arawinz soft solutions pvt ltd. © 2018 - 2023</a>

</p>

                    
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography variant="body2" gutterBottom  style={{ backgroundColor:"none" }}>
                                     
                        {/* <FacebookShareButton url='https://www.facebook.com/bhrpropertiesllp' style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <FacebookIcon size={30} round={true}/>
                        </FacebookShareButton>       */}
                        {/* <LinkedinShareButton url=' https://www.linkedin.com/company/bhrproperties/' style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <LinkedinIcon size={30} round={true}/>
                        </LinkedinShareButton>    */}
                        {/* <TwitterShareButton url='https://twitter.com/bhr_properties' style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <TwitterIcon size={30} round={true}/>
                        </TwitterShareButton>     */}
                         
                        {/* <WhatsappShareButton url={url} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <WhatsappIcon size={30} round={true}/>
                        </WhatsappShareButton> */}
                        
                        </Typography>
                 
                    {/* <FacebookIcon /> &nbsp;&nbsp;
                
                    <TwitterIcon />&nbsp;&nbsp;
                
                    <InstagramIcon />&nbsp;&nbsp; */}

                        <a href='https://www.facebook.com/bhrpropertiesllp' target="_blank" style={{textDecoration:'none'}}> <FacebookIcon sx={{m:1, color:'#ffff'}}/></a>
                        <a href='https://twitter.com/bhr_properties' target="_blank" style={{textDecoration:'none'}}> <TwitterIcon sx={{m:1, color:'#ffff'}}/></a>
                        <a href='https://www.linkedin.com/company/bhrproperties/' target="_blank" style={{textDecoration:'none'}}> <LinkedInIcon sx={{m:1, color:'#ffff'}}/></a>
                        <a href='https://instagram.com/bhrproperties' target="_blank" style={{textDecoration:'none'}}> <InstagramIcon sx={{m:1, color:'#ffff'}}/></a>
                        <a href='https://www.youtube.com/@bhrproperties645' target="_blank" style={{textDecoration:'none'}}> <YouTubeIcon sx={{m:1, color:'#ffff'}}/></a>
                  </Grid>


                    
                </Grid>
           

        </div>

    );
}