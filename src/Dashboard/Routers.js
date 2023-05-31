
import { Routes, Route, } from "react-router-dom";
import { AddProperty } from '../AddProperty/AddProperty'
import { Properties } from "../AddProperty/AllProperties";

import { EditPropertieTab } from '../AddProperty/Tab'
import { AddCategory } from "../Categories/Admin/AddCategory";
import { AddArticle } from "../Articles/AddArticle";
import { Articles } from "../Articles/Articles";
import { EditArticles } from "../Articles/EditArticle";
import { AddPropertyType } from "../AddProperty/AddCategory";
import { AllSubPlans } from '../SubscriptionPlans/AllSubPlans'
import { AddSubPlan } from '../SubscriptionPlans/AddSubPlan'
import { Banner } from "../Banners/banner";
import { PropertyType } from "../AddProperty/PropertyType";
import { ContactList } from "../ContactUs/allContacts";
import { ArticalsList } from "../Articles/ArticleCard";
import { ArticleSinglePage } from "../Articles/ArtcleSinglePage";
import Propertylist from "../AddProperty/Propertylist";
import Singlepropartylist from "../AddProperty/singlepageData";
import { AllBhrProjects } from "../AddProjects/allBhrProjects";
import { UserProperties } from "../AddProjects/userProperties";
import { SearchProps } from "../AddProjects/searchProperties";
import { LeftDrawer } from "./Leftdrawer";
import { UserPropSearchHist } from "../AddProjects/userPropSearchHistory";
import { EnquirySearchHistory } from "../ContactUs/enquiryHistory";
import { SubPurchaseHistory } from "../SubscriptionPlans/SubPurchaseHistory";
import { AddAdmin } from "../Add Admin/AddAdmin";
import { AdminData } from "../Add Admin/AdminData";
import { EditAdmin } from "../Add Admin/EditAdmin";
import { ViewAdmin } from "../Add Admin/viewAdmin";
import { AddProject } from "../AddProjects/Projects/addProject";
import { ProjectData } from "../AddProjects/Projects/getAllProjects";
import { EditProject } from "../AddProjects/Projects/editProject";
import { ProjectEnqHistory } from "../ContactUs/projectContact";
import { AdminHistory } from "../Add Admin/AdminHistory";
export function Routers() {


    return (
        <div>
            <LeftDrawer />
            <Routes>
                <Route path="add_property" element={<AddProperty />} />
                <Route path="property_details" element={<Properties />} />
                <Route path="edit_property/:id" element={<EditPropertieTab />} />
                <Route path="category" element={<AddCategory />} />
                <Route path="add_article" element={<AddArticle />} />
                {/* <Route path="articles" element={<Articles />} /> */}
                <Route path="edit_articles/:id" element={<EditArticles />} />
                <Route path="property_category" element={<AddPropertyType />} />
                <Route path="subscription_plans" element={<AllSubPlans />} />
                <Route path="add_subscription_plan" element={<AddSubPlan />} />
                <Route path="banner" element={<Banner />} />
                <Route path="property_type" element={<PropertyType />} />
                <Route path="contacts" element={<ContactList />} />
                <Route path="articles" element={<ArticalsList />} />
                <Route path="article_single_page/:id" element={<ArticleSinglePage />} />
                {/* <Route path="property_details" element={<Propertylist />} /> */}
                <Route path="singlepagedata/:id" element={<Singlepropartylist />} />
                <Route path="bhr_property" element={<AllBhrProjects />} />
                <Route path="user_properties" element={<UserProperties />} />
                <Route path="search_properties" element={<SearchProps />} />
                <Route path="search_history" element={<UserPropSearchHist />} />
                <Route path="enquiry_history" element={<EnquirySearchHistory />} />
                <Route path="sub_purchase_history" element={<SubPurchaseHistory />} />
                <Route path="add_admin" element={<AddAdmin />} />
                <Route path="admin_data" element={<AdminData />} />
                <Route path="edit_admin/:id" element={<EditAdmin />} />
                <Route path="view_admin/:id" element={<ViewAdmin />} />
                <Route path="add_project" element={<AddProject />} /> 
                <Route path="all_projects" element={<ProjectData />} />  
                <Route path="edit_project/:id" element={<EditProject />} />  
                <Route path="project_enq" element={<ProjectEnqHistory />} />
                <Route path="admin_history" element={<AdminHistory />} />

            </Routes>
        </div>
    )
}