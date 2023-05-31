
import { Grid, Box, Typography, useTheme, Container, Card, Button, CardContent,  } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { Loading } from "../../components/Loading";
import { UserContext, SnackbarContext } from '../../components/UserContext';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LeftDrawer } from '../Dashboard/Leftdrawer';
import { Helmet } from 'react-helmet';

export const Subscriptionplan = () => {

  const history = useNavigate();
  const [subscribe, setScubscribe] = useState([])
  const [loading, setLoading] = useState(true);
  const { snack, setSnack } = useContext(SnackbarContext);

  const { user, setUser } = useContext(UserContext);
const [subData,setSubData]=useState([])

  console.log(user.role, "===user")

  useEffect(() => {
    subscriberData();
    getData();
  }, [])


  const getData = async () => {
    await axios.post("/user/allSubPlans").then((res) => {
      console.log(res, "=====res")
      if (res.data.status === 1) {
        setScubscribe(res.data.data);

        setLoading(false);

      } else {

        setLoading(false);
      }


    });
  }

  const subscriberData = async () => {
    const formdata=new FormData()
    formdata.append("userid",user.user_id)
    await axios.post("/user/get_subscriber_data",formdata).then((res) => {
      console.log(res, "=====datttttt")
      if (res.data.status === 1) {
        setSubData(res.data);
        // setShowPlan(true)
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }
console.log(user)
  const addSubscriberData = async (id) => {
    const formdata=new FormData()
    formdata.append("userid",user.user_id)
    formdata.append("packid",id)
    await axios.post("/user/add_subscriber_data",formdata).then((res) => {
      console.log(res, "=====res")
      if (res.data.status === 1) {
        setScubscribe(res.data.data);
      setSnack({
        message: res.data.msg,
        type: "success",
        open: true,
      });
      subscriberData()
        setLoading(false);

      } 
      else if(res.data.status === 2){
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        // subscriberData()
          setLoading(false);
      }
      else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        setLoading(false);
      }


    });
  }


  return (<div  >
     <Helmet>
                
                <title>My Subscription Plans| Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
            <Grid container  justifyContent="center"
  alignItems="center">
   <Grid item xs={1}></Grid>
          <Grid item xs={11} p={4} >
        <Container maxWidth="md">

          {loading ? <Loading /> : (
            <>



            
            {subData && subData.length !==0 ?(
<>

<Container maxWidth="md" mt={""}>
        <Box
          sx={{
            mt: 5,
            backgroundColor: "white",
            boxShadow: 5,
            borderRadius: 2,
          }}
        >
          <br />
          <Typography variant="h4" sx={{ color: "#060847" }}>My Subscription</Typography>
          <br />
          <hr style={{ width: "80%" }} />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            pl={5}
            ml={3}
            spacing={3}
            sx={{textAlign:"justify"}}
          >
            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
              <b> Plan name: </b> {subData.choosen_plan.sub_plan_name}   {" "}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b>Valid Up To:</b>   {subData.valid_date}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography>
                {" "}
              <b> Role:</b>  {subData.choosen_plan.sub_plan_role===1 && "Owner" || subData.choosen_plan.sub_plan_role===2 && "Agent" || subData.choosen_plan.sub_plan_role===3 && "Builder"}
              </Typography>
              </Grid>
              <Grid item xs={12} md={4} >
              <Typography variant='body1' gutterBottom>
                {" "}
                       <b> Number of Listings:</b> {subData.choosen_plan.sub_plan_list}
                      </Typography></Grid>
              <Grid item xs={12} md={4} >
              <Typography>
                {" "}
               <b>No. of Featured Properties: </b> {subData.choosen_plan.sub_plan_featured}
              </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
              <Typography>
                {" "}
                <b> Plan Status:</b>
                {subData.choosen_plan.sub_plan_status===1 && "Active"}
              </Typography>
              {/* {i.bathrooms} */}
            </Grid>
          </Grid>
          <br />
          {/* <Typography variant="h3" >What to do?</Typography> */}
          <hr style={{ width: "80%" }} />
          <br /> <br />
        </Box>
      </Container>





{/* <Typography variant="h5" sx={{ color: "#060847", mt: 5 }}>My Subscription</Typography> */}
{/* <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='flex-start'
                  // spacing={4}
                  mt={3}
                >
                  <Card
  sx={{
    p: 3,
    width: "250px",
    textAlign: "center",
    borderRadius: "25px",
    boxShadow: "0px 2px 10px 2px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 5px 15px 5px rgba(0, 0, 0, 0.1)",
    },
  }}
>
  <CardContent sx={{ textAlign: "justify" }}>
    <Typography variant="body1" sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
      Plan name: {subData.choosen_plan.sub_plan_name}   
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#666666" }}>
      Valid Up To: {subData.valid_date}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#666666" }}>
      Role: {subData.choosen_plan.sub_plan_role===1 && "Owner" || subData.choosen_plan.sub_plan_role===2 && "Agent" || subData.choosen_plan.sub_plan_role===3 && "Builder"}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#666666" }}>
      No. of Featured Properties: {subData.choosen_plan.sub_plan_featured}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#666666" }}>
     Plan Status: {subData.choosen_plan.sub_plan_status}
    </Typography>
  </CardContent>
</Card>


                    </Grid> */}
</>
            ):(<>
            <>

              <Typography variant="h5" sx={{ color: "#060847", mt: 5 }}>Subscription Plans</Typography>
              <Box
                sx={{
                  m: 3,
                  mt: 10,
                  p: 3,
                  textAlign: 'center',
                  border: '1px groove #060847',
                }}
              >

                <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                  spacing={4}
                >
                  {/* {JSON.stringify(subplan[0])} */}
                  {subscribe &&
                    subscribe.map((i) => (
                      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={i.sub_plan_id}>
                        {user.role === i.sub_plan_role &&
                          <Card title={i.sub_plan_name}>
                            <Box sx={{ p: 2 }}>
                              {/* {JSON.stringify(i.sub_plan_id)} */}
                              <Typography variant='h5' gutterBottom>
                                {i.sub_plan_name}
                              </Typography>
                              <Typography variant='body1' gutterBottom>
                                Role: {i.sub_plan_role === 1 && 'Owner' || i.sub_plan_role === 2 && 'Agent' || i.sub_plan_role === 3 && 'Builder'}
                              </Typography>
                              <Typography variant='body1' gutterBottom>
                                Validity: {i.sub_plan_validity} days
                              </Typography>
                              <Typography variant='body1' gutterBottom>
                        Number of Listings: {i.sub_plan_list}
                      </Typography>
                              <Typography variant='body1' gutterBottom>
                                Featured Property: {i.sub_plan_featured}
                              </Typography>
                              <Typography variant='body1' gutterBottom>
                                Amount: {i.sub_plan_amount}
                              </Typography>
                              <Typography variant='body1' gutterBottom>
                                Staus: {i.sub_plan_status === 1 ? "Active" : "InActive"}
                              </Typography>
                              <Button variant='contained' sx={{backgroundColor:"#060847","&:hover":{backgroundColor:"#060847"}}}
                      onClick={(e)=>{     
                       
                        addSubscriberData(i.sub_plan_id)
                        // onSubmit(i.sub_plan_id)
                      }}
                      >
                        {i.sub_plan_name==="Free" && "Activate" || i.sub_plan_name==="Standard"  && "Subscribe" || i.sub_plan_name==="Gold"  && "Subscribe" }
                        
                        </Button>
                              <br />
                           

                            </Box>

                          </Card>}
                      </Grid>
                    ))}
                </Grid>
              </Box>

            </></>)}
            </>
          )}
        </Container>
      </Grid>
    </Grid>
  </div>);

}