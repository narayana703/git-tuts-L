import React from 'react'
import { Button, Grid, Box, Container, Dialog, DialogContent, Card, CardMedia, Typography, TextField } from '@mui/material'
import { BannerData } from './BannerData/getBanner';
import { useBanner } from './bannerFunction';
import { Loading } from "../components/Loading";
import { LeftDrawer } from '../Dashboard/Leftdrawer';
import { Helmet } from 'react-helmet';
export const Banner = () => {
  const [images, loading, itemSubmit, imageChange, uploadwait, setImages, err, open, handleClickOpen, handleClose, title, setTitle,subtitle,setSubTitle,url,setUrl,btnText,setBtnText] = useBanner();
  return (
    <div>
       <Helmet>
                
                <title>Banners | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
      {/* {loading ? (
                <Loading />
            ) : ( */}
      <Grid container justifyContent="center"
        alignItems="flex-start">
        <Grid item xs={3}>
          {/* <LeftDrawer /> */}
          </Grid>
        <Grid item xs={9}>
          <Container maxWidth="xl">
            <Box sx={{ pt: 3 }} >
              <Typography variant="h4" sx={{ textAlign: "center", color: "#060847", }} >Banners List</Typography><br />

              {/* <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              > */}
                <Grid item xs={12} >
                  <Button variant='contained' style={{ color: "white", marginLeft: "27%", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" }, }} onClick={handleClickOpen}>Add Banner</Button>
                  {/* <BannerData /> */}
                </Grid>

                <br />

                <Grid item xs={12}>
                  <BannerData />
                </Grid>
              {/* </Grid> */}

              <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
                <Container maxWidth="md">
                <DialogContent>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={6}>
                      <Typography variant='h4' sx={{ color: "#060847" }}>Add Banner</Typography>
                      <br />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="Title *" name='title' value={title} fullWidth size='small' onChange={(e) => { setTitle(e.target.value) }} error={err == 1 && true} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="Sub Title *" name='subtitle' value={subtitle} fullWidth size='small' onChange={(e) => { setSubTitle(e.target.value) }} error={err == 2 && true} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="URL *" name='url' value={url} fullWidth size='small' onChange={(e) => { setUrl(e.target.value) }} error={err == 3 && true} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField variant='outlined' label="Button Text *" name='btnText' value={btnText} fullWidth size='small' onChange={(e) => { setBtnText(e.target.value) }} error={err == 4 && true} />
                    </Grid>
                    <Grid item xs={6}>

                      <Button
                        variant="outlined"
                        size="small"
                        component="label"
                        fullWidth
                        onChange={imageChange}
                        error={err == 5 && true}
                        sx={{ mt: 2, color: "#060847", "&:hover": { color: "#060847" } }}
                      >
                        upload image
                        <input hidden type="file" multiple />
                      </Button>


                    </Grid>
                    {
                      uploadwait ? (<span style={{ color: "white" }}><br /><br />Adding Images...</span>)
                        : (<>

                          {(images.length !== 0) ? (<Grid item xs={12}>
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start"
                              spacing={3}
                            >


                              <Grid item>
                                <Card >
                                  <CardMedia
                                    style={{ height: 300, width: 300 }}
                                    image={images.preview}
                                    title={images.preview}
                                  />

                                </Card>
                              </Grid>

                            </Grid>
                          </Grid>) : ""} </>)
                    }
                    <br />
                    <Grid item xs={6}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button variant="contained" onClick={itemSubmit} style={{ color: "#ffffff", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}>Add Banner</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent></Container>
              </Dialog></Box>
          </Container></Grid>
      </Grid>
      {/* )} */}
    </div>
  )
}
