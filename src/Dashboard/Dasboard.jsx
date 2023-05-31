import { Header } from "../components/header";
import { LeftDrawer } from "./Leftdrawer"
import { Routers } from "./Routers";
import { Box } from "@mui/material";

export const Dashboard = () => {
  return (
    <Box 
    // sx={{ display: "flex" }}
    >
      {/* <LeftDrawer  
       sx={{ display: "flex" }}
       /> */}
       <Header />
      <Routers />
    
    </Box>
  )
}