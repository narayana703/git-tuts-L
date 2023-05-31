import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useParams,  } from 'react-router-dom'
import { ButtonBase, Card, CardActions, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Loading } from '../components/Loading'
export const PropSearchResults=()=> {
  const [loading, setLoading] = useState(true)
  const [searchData,setSearchData]=useState([])
  let {ps,pt,pss}=useParams()
  console.log(pss)
  useEffect(()=>{
    getData()
  },[])
  const getData=async ()=>{
    setLoading(true);
    const formdata=new FormData()
    if(pss){
      formdata.append("title",pss)
      console.log("tt");
    }
    if(ps){
      formdata.append("pstatus",ps)
    }
    if(pt){
      formdata.append("ptype",pt)
    }
  
   
   await axios.post("/user/get-search-property-data",formdata).then(function (res) {
      console.log(res,"===res");
      if(res.data.status===1){
        console.log(res.data.data[0])
        setSearchData(res.data.data)
        setLoading(false);
      }
     
    });
  }

  return (
    <div>
       {loading ? (
        <Loading />
      ) : (
<Container maxWidth="xl">
   <br/>
   <br/>
   <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
            <Typography variant="h4" style={{ color: "#060847" }}>Search Results</Typography></Grid>
            <br/>
            <br/>
     {searchData  && (<Grid
         container
         direction="row"
         justify="flex-start"
         alignItems="flex-start"
         spacing={4}
        >
            
          {searchData.map((item) => (
            <>
          
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} 
                 className="text-center"
                 >
                  
                    <ButtonBase component={Link} to={`/property/${item.id}`}
                            >
                            <Card style={{width: "250px",border:"2px groove blue"}}>
                            <CardMedia
                        style={{
                          height: "150px",
                          width: "250px",
                          margin: "auto",
                        marginTop:"0px",
                        borderRadius:"18px"
                        }}
                        image={`/images/properties/${item.images.split(",")[0]}`}
                      />
                              
                                 
                             
                            <CardActions>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                //spacing={1}
                                >
                                    <Grid item xs={12}>
                                    <Typography variant="body2" className="text-center" style={{width:"100%",overflow:"hidden",fontWeight:"bold"}}>
                                   Title: {item.title}
                                   </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Typography variant="body2" className="text-center" style={{width:"100%",textDecoration:"none"}}>
                                   Type: {item.property_type}
                                   </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Typography variant="body2" className="text-center" style={{width:"100%"}}>
                                   Rent/Sale: {item.property_status}                                   
                                   </Typography>
                                   <Typography variant="body2" className="text-center" style={{width:"100%"}}>
                                  Address: {item.city},{item.country}                                 
                                   </Typography>
                                    </Grid>
                                </Grid>
                                 
                                  
                            </CardActions>
                            </Card>
                            </ButtonBase>
                </Grid>
                </>
            ))}
     </Grid>)}
     <br/>
     <br/>
     </Container>
      )}
    </div>
  )
}
