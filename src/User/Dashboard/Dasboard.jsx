import { Header } from "../../components/header";
// import { UserLeftDrawer } from "./Leftdrawer"
import { Routers } from "./Routers";
import { Box } from "@mui/material";


export const UserDashboard = () => {

  return (
    <Box 
    // sx={{ display: "flex" }}
    >
        <Header />
      {/* <UserLeftDrawer   sx={{ display: "flex" }}/> */}
      <Routers />
    
    </Box>
  )
}