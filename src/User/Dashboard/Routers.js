
import { Routes, Route, } from "react-router-dom";
import {AddProperty} from '../Properties/AddProperty'
import { Properties } from "../Properties/AllProperties";
import {EditPropertieTab} from '../Properties/Tab'
import { UpdateDetails } from "../updateDetails";
import { PropertyType } from "../Properties/PropertyType";
import { UpdatePassword } from "../updatePassword";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { UpdateAgentDetails } from "../updateAgentDetails";
import { UpdateBuilderDetails } from "../updateBuilderDetails";
import { Subscriptionplan } from "../Subscription/subscriptionPlans";
import Propertylist from "../Properties/Propertylist";



import { VisitedData } from "../Properties/VisitedList";
import { FavouritesData } from "../Properties/favorites";
import { MyProfile } from "../MyAccount/myprofile";
import { UserLeftDrawer } from "./Leftdrawer";
import { PropEnqHistory } from "../Properties/propEnqHistory";
import { AddNewProperty } from "../Properties/addnewProperty";
import { PropertyCard } from "../Properties/newPropCards";
import { EditNewProperty } from "../Properties/editnewProperty";
import { EditNewPropertyTab } from "../Properties/newTab";

export function Routers() {
   const {user,setUser}=useContext(UserContext)
   console.log(user.role)
    return (
       <div>
          <UserLeftDrawer />
       
        <Routes>
          
            <Route path="add_property" element={<AddProperty />} />
            {/* <Route path="property_details" element={<Properties />} />         */}
            <Route path="edit_property_deatils" element={<EditPropertieTab />} />
            <Route path="myprofile" element={(user.role === 1 && <UpdateDetails />) || (user.role === 2 && <UpdateAgentDetails />) || (user.role === 3 && <UpdateBuilderDetails />)} /> 
            <Route path="update_password" element={<UpdatePassword />} /> 
            <Route path="property_types" element={<PropertyType />} /> 
            <Route path="subscription_plan_details" element={<Subscriptionplan />} />      
            {/* <Route path="all_properties" element={<Propertylist />} />           */}
       
           <Route path="search_history" element={<VisitedData />} /> 
             <Route path="favourites" element={<FavouritesData />} /> 
             <Route path="my_account" element={<MyProfile />} />  
             <Route path="propert_enq_history" element={<PropEnqHistory />} />  
             <Route path="add_new_property" element={<AddNewProperty />} />  
             <Route path="property_list" element={<PropertyCard />} />  
             <Route path="editNewPropertyTab/:id" element={<EditNewPropertyTab />} />  

        </Routes>
        </div>
    )
}