import React, { useState, useContext,useEffect } from "react";
import {UserContext, SnackbarContext } from "../components/UserContext";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const names = [
  "AC",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Outdoor Shower",
  "Fridge",
  "Sauna",
  "Swimming Pool",
  "TV",
  "Washer",
  "WiFi",
  "Window Coverings",
];

export const useProperty = () => {
  const { catU, setCatU } = useContext(UserContext);
  // const [requestFlag,setRequestFlag]=useState(0)
  const [activeStep, setActiveStep] = useState(0);
  const {propCat,setPropCat,uid, setUId,user,token,admin,tkn}=useContext(UserContext)
  console.log(uid)
  const userId=localStorage.getItem("userId")
  const userRole=localStorage.getItem("userRole")

  let history=useNavigate()
  const { snack, setSnack } = useContext(SnackbarContext);
  const [wait, setWait] = useState(false)
const [item,setItem]=useState({prop_cat:"",title:"",prop_desc:"",loan_availability:"",prop_facing:"",prop_price:"",rera_num:"",video:"",tour:"",rent_sale:"",sale_type:"",rooms:"",bedrooms:"",bathrooms:"",garages:"",unit_no:"",})
const [images,setImages]=useState([])
const [prop_type,setProp_type]=useState("")
const [err,setErr]=useState(0)
const [loc,setLoc]=useState("")
const [locality,setLocality]=useState("")
const [area,setArea]=useState("")
const [city,setCity]=useState("")
const [state,setState]=useState("")
const [broucher,setBroucher]=useState([])
const [amenities,setAmenities]=useState([])
const [approvals,setApprovals]=useState("")
const [proj_overview,setProjOverview]=useState("")
const [proj_highlights,setProjHighlights]=useState("")
const [proj_overall_area,setProjOverallArea]=useState()
const [proj_min_area,setProjMinArea]=useState()
const [proj_max_area,setProjMaxArea]=useState()
const [selectedValue, setSelectedValue] = useState();
const [sqftvalue, setSqftValue] = useState();
const [proj_size,setProj_size]=useState("")
const [avgPrice,setAvgPrice]=useState("")
const [possession_status,setPossessionStatus]=useState("")
const [config,setConfig]=useState("")
const [launch_date,setLanunchDate]=useState("")
const [furnished,setFurnished]=useState("")
const [parking,setParking]=useState("")
const [washroom,setWashroom]=useState("")
const [floor_num,setFloorNum]=useState("")
const [selectedValueMin, setSelectedValueMin] = useState();
const [sqftvalueMin, setSqftValueMin] = useState();
const [selectedValueMax, setSelectedValueMax] = useState();
const [sqftvalueMax, setSqftValueMax] = useState();
const [landArea,setLandArea]=useState()
const [selectedValueLand, setSelectedValueLand] = useState();
const [sqftvalueLand, setSqftValueLand] = useState();
const [builtArea,setBuiltArea]=useState()
const [selectedValueBuilt, setSelectedValueBuilt] = useState();
const [sqftvalueBuilt, setSqftValueBuilt] = useState();
const [landLength,setLandLength]=useState("")
const [landWidth,setLandWidth]=useState("")
const [builtLength,setBuiltLength]=useState("")
const [builtWidth,setbuiltWidth]=useState("")
const [fdata,setFData]=useState([])

const [fname,setFname]=useState("")
const [fImage,setFImage]=useState([])
const [openf,setOpenf]=useState(false)
const [uploadwait, setUploadWait] = useState(false);
// console.log(approvals,"approvals")
const [otherApproval,setOtherApproval]=useState("")
const planImageChange = async (e) => {
  if (e.target.files.length != 0) {
    const image = e.target.files[0];
    setFImage({ raw: image, preview: URL.createObjectURL(image) });
  }
  e.target.value = ""

};
const handleCloseF=()=>{setOpenf(false)}

const deleteFloor = (i) => {
    var arr= [...fdata];
    if(i!=-1){
         arr.splice(i,1);
         setFData(arr);
    }
     console.log(i);
};


let compImage = (image) => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.8,
      success: async (compressedResult) => {
        return resolve(compressedResult);
      }
    });
  })

};
const handleChange=(e)=>{
  setItem({ ...item, [e.target.name]: e.target.value });
}
const fileChange = async (e) => {
  console.log(e.target.files)
  
  if (e.target.length !== 0) {
   
    setBroucher(e.target.files[0]);
   
  }
}

const handleChangeAmenities = (event) => {
  const {
    target: { value, checked },
  } = event;
  if (value === "all") {
    if (checked) {
      setAmenities(names);
    } else {
      setAmenities([]);
    }
  } else {
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((f) => f !== value));
    }
  }
};


const imageChange = async (e) => {
  console.log(images.length)
   if (images.length + e.target.files.length <= 10) {
console.log("===============")
     var arr = [];
     for (var i = 0; i < e.target.files.length; i++) {
       console.log("========fff=======")
       var type = e.target.files[i].type;
       if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
         const image = e.target.files[i];
         console.log(image)
         var img = await compImage(image);
         arr.push({ raw: img, preview: URL.createObjectURL(img) });
       console.log(arr)
       } else {
         alert("Please select only JPEG, JPG, PNG Images..")
       }
     }
     console.log(arr)
     setImages([...images, ...arr]);

   } else {
     alert("Maximum Image limit is 10.");

   }
   console.log(images)
   e.target.value = ""
 }

const handlestepzero=(e)=>{
  e.preventDefault()
  // window.alert(prop_type)
  setErr(0)
  if(prop_type===""){
    setErr(1)
    setSnack({
      message: "Please Select Property Type",
      type: 'error',
      open: true,
      direction: "center"
  });
  }
  else{

    setActiveStep(1)
  }
}
const handlestepOne=(e)=>{
  e.preventDefault()
  // window.alert(prop_type)
  setErr(0)
  if(item.prop_cat===""){
    setErr(2)
    
      setSnack({
        message: "Please Select Property Category",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(item.title===""){
    setErr(3)
    
      setSnack({
        message: "Please Enter Property Title",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(item.prop_desc===""){
    setErr(4)
    
      setSnack({
        message: "Please Enter Property Description",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(item.loan_availability===""){
    setErr(5)
    
      setSnack({
        message: "Please Select if Loan is Available Or Not?",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(userRole==="3" && item.rent_sale===""){
    setErr(6)
    
      setSnack({
        message: "Please Select Rent /Sale",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(item.rent_sale === "2" && item.sale_type===""){
    setErr(7)
    
      setSnack({
        message: "Please Select Sale Type",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  // else if(loc===""){
  //   setErr(8)
    
  //     setSnack({
  //       message: "Please Select Location",
  //       type: 'error',
  //       open: true,
  //       direction: "center"
  //   });
  // }
  else if(item.prop_facing===""){
    setErr(9)
    
      setSnack({
        message: "Please Select Property Facing",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(item.prop_price===""){
    setErr(10)
    
      setSnack({
        message: "Please Enter Property Price",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else if(images.length===0){
    setErr(11)
    
      setSnack({
        message: "Please Choose Property Images",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else{
    setActiveStep(2)
  }
}
const handlestepTwo=(e)=>{
  e.preventDefault()
  // window.alert(prop_type)
  setErr(0)
  if(userRole===3 && proj_overview===""){
    setErr(12)
    
      setSnack({
        message: "Please Enter Project Overview",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && proj_highlights===""){
    setErr(13)
    
      setSnack({
        message: "Please Enter Project Highlights",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && proj_overall_area===undefined){
    setErr(14)
    
      setSnack({
        message: "Please Enter Project Overall Area",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && selectedValue===undefined){
    setErr(14)
    
      setSnack({
        message: "Please Enter Project Overall Area Unit",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && proj_min_area===undefined){
    setErr(15)
    
      setSnack({
        message: "Please Enter Project Minimum Area",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && selectedValueMin===undefined){
    setErr(15)
    
      setSnack({
        message: "Please Enter Project Minimum Area Unit",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && proj_max_area===undefined){
    setErr(16)
    
      setSnack({
        message: "Please Enter Project Max Area",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && selectedValueMax===undefined){
    setErr(16)
    
      setSnack({
        message: "Please Enter Project Max Area Unit",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && proj_size===""){
    setErr(17)
    
      setSnack({
        message: "Please Enter Project Size",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && avgPrice===""){
    setErr(18)
    
      setSnack({
        message: "Please Enter Project avgPrice",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && possession_status===""){
    setErr(19)
    
      setSnack({
        message: "Please Select Possession Status",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole===3 && config===""){
    setErr(20)
    
      setSnack({
        message: " Please Enter Configuration...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if((item.prop_cat !== "Plot" && item.prop_cat!=="Farmland") && launch_date===""){
    setErr(21)
    
      setSnack({
        message: " Please Enter Launch/Year of Built Date...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && furnished===""){
    setErr(22)
    
      setSnack({
        message: " Please Select Furnished Status",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && parking===""){
    setErr(23)
    
      setSnack({
        message: " Please Enter Closed Parking",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(prop_type==="2" && (item.prop_cat==="Office" ||item.prop_cat==="Shop") && washroom===""){
    setErr(24)
    
      setSnack({
        message: " Please Enter Personal Washroom...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole !== 3 && item.unit_no===""){
    setErr(25)
    
      setSnack({
        message: " Please Enter Plot or Unit Number...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole !== 3 && (item.prop_cat !=="Farmland" && item.prop_cat !=="Plot")&& item.rooms===""){
    setErr(26)
    
      setSnack({
        message: " Please Enter Number of Rooms...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole !== 3 && (item.prop_cat === "House" || item.prop_cat === "Apartment" || item.prop_cat === "Villa") && item.bedrooms===""){
    setErr(27)
    
      setSnack({
        message: " Please Enter Number of BedRooms...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole !== 3 && (item.prop_cat === "House" || item.prop_cat === "Apartment" || item.prop_cat === "Villa") && item.bathrooms===""){
    setErr(28)
    
      setSnack({
        message: " Please Enter Number of Bathrooms...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if(userRole !== 3 && (item.prop_cat !=="Plot" && item.prop_cat !=="Farmland") && item.garages===""){
    setErr(29)
    
      setSnack({
        message: " Please Enter Number of Garages...",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if((item.prop_cat !=="Apartment" && item.prop_cat !=="Villa") && landArea===undefined){
    setErr(30)
    
      setSnack({
        message: " Please Enter LandArea",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if((item.prop_cat !=="Apartment" && item.prop_cat !=="Villa") && selectedValueLand===undefined){
    setErr(30)
    
      setSnack({
        message: " Please Enter LandArea Unit",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if((item.prop_cat !=="Farmland" && item.prop_cat!=="Plot")&& builtArea===undefined){
    setErr(31)
    
      setSnack({
        message: " Please Enter Built Area",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else  if((item.prop_cat !=="Farmland" && item.prop_cat!=="Plot")&& selectedValueBuilt===undefined){
    setErr(31)
    
      setSnack({
        message: " Please Enter Built Unit",
        type: 'error',
        open: true,
        direction: "center"
    });
  }
  else{
    setActiveStep(3)
  }
}
const itemSubmit = async (e) => {

  e.preventDefault();

  setErr(0)

  if(fname===""){
    setErr(100);
   
    
    setSnack({
      message: " Please Enter Floor Name/Number",
      type: 'error',
      open: true,
      direction: "center"
  });
}else if(fImage.length===0){
    setErr(101);
    
    
    setSnack({
      message: " Please Choose Plan Image",
      type: 'error',
      open: true,
      direction: "center"
  });
}else{
    setErr(0);
    let arr={"fname":fname,"fImage":fImage}
    let finalarr=fdata.concat(arr);
    
    setFData(finalarr);
    setFname("");
    setFImage("");
  
    setOpenf(false);
    // requestFlag = 1
}
 
}

const handleSubmit=(e)=>{
  e.preventDefault()
  const formdata=new FormData();
  formdata.append("userid",userId)
  formdata.append("title",item.title)
  for (var i = 0; i < images.length; i++) {
  
    formdata.append('images', images[i].raw);
  }


  formdata.append("prop_desc",item.prop_desc)
 
  formdata.append("locality",locality)
  formdata.append("area",area)
  formdata.append("city",city)
   formdata.append("state",state)
   formdata.append("approved_by",approvals)
   formdata.append("rera_no",item.rera_num)
   formdata.append("video_url",item.video)
   formdata.append("tour_url",item.tour)
   formdata.append("loan_available",item.loan_availability)
   formdata.append("broucher",broucher)
   formdata.append("amenities",amenities)
   formdata.append("prop_type",prop_type)
   formdata.append("prop_cat",item.prop_cat)
   formdata.append("rent_sale",item.rent_sale)
   formdata.append("prop_facing",item.prop_facing)
   formdata.append("prop_price",item.prop_price)
   formdata.append("sale_type",item.sale_type)
    formdata.append("no_rooms",item.rooms)
    formdata.append("no_bedrooms",item.bedrooms)
    formdata.append("no_bathrooms",item.bathrooms)
    formdata.append("no_garages",item.garages) 
    formdata.append("land_area",`${landArea} ${selectedValueLand}`)
    formdata.append("land_area_length",landLength)
    formdata.append("land_area_width",landWidth)
    formdata.append("built_area",`${builtArea} ${selectedValueBuilt}`)
    formdata.append("built_area_length",builtLength)
    formdata.append("built_area_width",builtWidth)
    formdata.append("built_year",launch_date)
    formdata.append("proj_overview",proj_overview)
    formdata.append("proj_highlights",proj_highlights)
    formdata.append("proj_overall_area",`${proj_overall_area} ${selectedValue}`)
    formdata.append("proj_size_min",`${proj_min_area} ${selectedValueMin}`)
    formdata.append("proj_size_max",`${proj_max_area} ${selectedValueMax}`)
    formdata.append("proj_size",proj_size)
    formdata.append("proj_avg_price",avgPrice)
    formdata.append("possession_status",possession_status)
    formdata.append("proj_config",config) 
    formdata.append("furnished_status",furnished) 
    formdata.append("closed_parking",parking) 
    formdata.append("personal_washroom",washroom) 
    formdata.append("no_floors",floor_num) 
    formdata.append("flat_unit_no",item.unit_no) 
    for (let fd=0;fd<fdata.length;fd++){
      console.log(fdata[0].fname,"fdata")
      formdata.append(`floor_name`, fdata[fd].fname);
      formdata.append(`plan_image`, fdata[fd].fImage?.raw);
    }
    formdata.append("aid", admin.admin_id);
    axios.post("/admin/add_new_property", formdata, {
      headers: { tkn: tkn },
    }).then(function (res) {
console.log(res)
if(res.data.status===1){
  setSnack({
    message: res.data.msg,
    type: 'success',
    open: true,
    direction: "center"
});
  history('/Dashboard/property_details')
}
else{
  setSnack({
    message: res.data.msg,
    type: 'error',
    open: true,
    direction: "center"
});
}
    })
  
}

  return [item,setItem,images,setImages,loc,setLoc,locality,setLocality,area,setArea,city,setCity,state,setState,broucher,setBroucher,amenities,setAmenities,handleChange,activeStep, setActiveStep,err,setErr,handlestepzero,prop_type,setProp_type,userRole,userId,fileChange,approvals,setApprovals,handlestepOne,proj_overview,setProjOverview,proj_highlights,setProjHighlights,proj_overall_area,setProjOverallArea, selectedValue, setSelectedValue,sqftvalue, setSqftValue,proj_size,setProj_size,avgPrice,setAvgPrice,possession_status,setPossessionStatus,config,setConfig,launch_date,setLanunchDate,furnished,setFurnished,parking,setParking,washroom,setWashroom,floor_num,setFloorNum,handlestepTwo,proj_min_area,setProjMinArea,selectedValueMin, setSelectedValueMin,sqftvalueMin, setSqftValueMin,proj_max_area,setProjMaxArea,selectedValueMax, setSelectedValueMax,sqftvalueMax, setSqftValueMax,landArea,setLandArea,selectedValueLand, setSelectedValueLand,sqftvalueLand, setSqftValueLand,builtArea,setBuiltArea,selectedValueBuilt, setSelectedValueBuilt,sqftvalueBuilt, setSqftValueBuilt,landLength,setLandLength,landWidth,setLandWidth,builtLength,setBuiltLength,builtWidth,setbuiltWidth,wait, setWait,fname,setFname,fImage,setFImage,fdata,setFData,openf,setOpenf,handleCloseF,deleteFloor,planImageChange,itemSubmit,handleSubmit,imageChange,uploadwait, setUploadWait,handleChangeAmenities,otherApproval,setOtherApproval]
};