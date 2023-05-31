import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ButtonBase, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Loading } from '../components/Loading'
export const SearchResults=()=> {
  const [loading, setLoading] = useState(true)

  let {cat}=useParams()
  const [data,setData]=useState([])
  console.log(cat)
  useEffect(()=>{
    getSearchData()
  },[])
  const getSearchData=async ()=>{
    setLoading(true);
    const formdata=new FormData()
    formdata.append("article_cat_name",cat)
   await axios.post("/user/get-search-article-data",formdata).then(function (res) {
      console.log(res,"===res");
      if(res.data.status===1){
        setData(res.data.data)
        setLoading(false);
      }
     
    });
  }

  return (
    <div>
       {loading ? (
        <Loading />
      ) : (

      <Container maxWidth="lg">
     

     <br />
     <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
            <Typography variant="h4" style={{ color: "#060847" }}>Search Results</Typography></Grid>
            <br/>
            <br/>

     <div>
   
       {data.length ? (
         <Grid
           container
           direction="row"
           justify="center"
           alignItems="center"
           spacing={5}
           className="text-center"
         >
           <br />
           <br />
       

           {data.map((i, key) => (
               <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key}>
                  <ButtonBase component={Link} to={`/article/${i.article_id}`}
                         >
                 <Card
                   sx={{
                     height: "350px",
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
                       height: "220px",
                       width: "250px",
                       margin: "auto",
                       // marginTop:"10px",
                       // borderRadius:"18px"
                     }}
                     image={`/images/articles/${i.article_images.split(",")[0]}`}
                   />
                   {i.cat_name && ( // Add a condition to check for feature
                     <div
                       style={{
                         position: "absolute",
                         top: 15,
                         left: 15,
                         padding: "8px",
                         background: "rgba(0,0,0,0.6)",
                         color: "#fff",
                         borderRadius: "10%",
                         // fontSize: "15px",
                         // fontWeight: "bold"
                       }}
                     >
                       <Typography variant="body2">
                         <b>{i.cat_name}</b>
                       </Typography>
                     </div>
                   )}

                   <CardContent sx={{ textAlign: "left" }}>
                     <Typography variant="h6">
                       <b>{i.article_title} </b>
                     </Typography>
                     <Typography variant="body2">
                       <b>{i.added_date} </b>
                     </Typography>
                   </CardContent>
                 </Card></ButtonBase>
               </Grid>
             ))}
         </Grid>
       ):(<>No Results Found Here</>)}
     </div>
     <br/>
   </Container>
      )}
    </div>
  )
}
