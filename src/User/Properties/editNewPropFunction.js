import React, { useState, useContext,useEffect } from "react";
import {UserContext, SnackbarContext } from "../../components/UserContext";
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

export const useEditNewProperty = () => {
  const { catU, setCatU } = useContext(UserContext);
  // const [requestFlag,setRequestFlag]=useState(0)
  const [activeStep, setActiveStep] = useState(0);
  const {propCat,setPropCat,uid, setUId,user,token}=useContext(UserContext)
  console.log(uid)
  let history=useNavigate()
  const { snack, setSnack } = useContext(SnackbarContext);
  const [wait, setWait] = useState(false)
const [item,setItem]=useState({prop_cat:"",title:"",prop_desc:"",loan_availability:"",prop_facing:"",prop_price:"",prop_approved_by:"",rera_num:"",video:"",tour:"",rent_sale:"",sale_type:"",rooms:"",bedrooms:"",bathrooms:"",garages:"",unit_no:"",})
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

useEffect(() => {
 
}, []);

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

const handleChangeSelected = (event) => {
  const selected = event.target.value;
  setSelectedValue(selected);
};
const handleChangeSelectedMin = (event) => {
  const selected = event.target.value;
  setSelectedValueMin(selected);
};
const handleChangeSelectedMax = (event) => {
  const selected = event.target.value;
  setSelectedValueMax(selected);
};
const handleChange1 = (event) => {
  const sqvalue = event.target.value;
  setSqftValue(sqvalue);
};
const handleChange2 = (event) => {
  const sqvalue = event.target.value;
  setSqftValueMin(sqvalue);
};
const handleChange3 = (event) => {
  const sqvalue = event.target.value;
  setSqftValueMax(sqvalue);
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
  }
  else{
    setActiveStep(1)
  }
}
const handlestepOne=(e)=>{
  e.preventDefault()
  // window.alert(prop_type)
  // setErr(0)
  // if(prop_type===""){
  //   setErr(1)
  // }
  // else{
    setActiveStep(2)
  // }
}
const handlestepTwo=(e)=>{
  e.preventDefault()
  // window.alert(prop_type)
  // setErr(0)
  // if(prop_type===""){
  //   setErr(1)
  // }
  // else{
    setActiveStep(3)
  // }
}
const itemSubmit = async (e) => {

  e.preventDefault();

  setErr(0)

  if(fname===""){
    setErr(100);
}else if(fImage.length===0){
    setErr(101);
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
  formdata.append("userid",user.user_id)
  formdata.append("prop_id",user.user_id)
  formdata.append("title",item.title)
  for (var i = 0; i < images.length; i++) {
  
    formdata.append('images', images[i].raw);
  }


  formdata.append("prop_desc",item.prop_desc)
 
  formdata.append("locality",locality)
  formdata.append("area",area)
  formdata.append("city",city)
   formdata.append("state",state)
   formdata.append("approved_by",item.prop_approved_by)
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
    formdata.append("land_area",landArea)
    formdata.append("land_area_length",landLength)
    formdata.append("land_area_width",landWidth)
    formdata.append("built_area",builtArea)
    formdata.append("built_area_length",builtLength)
    formdata.append("built_area_width",builtWidth)
    formdata.append("built_year",launch_date)
    formdata.append("proj_overview",proj_overview)
    formdata.append("proj_highlights",proj_highlights)
    formdata.append("proj_overall_area",proj_overall_area)
    formdata.append("proj_size_min",proj_min_area)
    formdata.append("proj_size_max",proj_max_area)
    formdata.append("proj_size",proj_size)
    formdata.append("proj_avg_price",avgPrice)
    formdata.append("possession_status",possession_status)
    formdata.append("proj_config",config) 
    formdata.append("furnished_status",furnished) 
    formdata.append("closed_parking",parking) 
    formdata.append("personal_washroom",washroom) 
    formdata.append("no_floors",floor_num) 
    formdata.append("flat_unit_no",item.unit_no) 
    axios.post("/user/edit_property_by_id", formdata).then(function (res) {
console.log(res)
if(res.data.status===1){
  history('/user_dashboard/property_list')
}
    })
  
}

  return [item,setItem,images,setImages,loc,setLoc,locality,setLocality,area,setArea,city,setCity,state,setState,broucher,setBroucher,amenities,setAmenities,handleChange,activeStep, setActiveStep,err,setErr,handlestepzero,prop_type,setProp_type,user,fileChange,approvals,setApprovals,handlestepOne,proj_overview,setProjOverview,proj_highlights,setProjHighlights,proj_overall_area,setProjOverallArea, handleChangeSelected,selectedValue, setSelectedValue,sqftvalue, setSqftValue,handleChange1,proj_size,setProj_size,avgPrice,setAvgPrice,possession_status,setPossessionStatus,config,setConfig,launch_date,setLanunchDate,furnished,setFurnished,parking,setParking,washroom,setWashroom,floor_num,setFloorNum,handlestepTwo,proj_min_area,setProjMinArea,selectedValueMin, setSelectedValueMin,sqftvalueMin, setSqftValueMin,handleChangeSelectedMin,handleChange2,proj_max_area,setProjMaxArea,selectedValueMax, setSelectedValueMax,sqftvalueMax, setSqftValueMax,handleChange3,handleChangeSelectedMax,landArea,setLandArea,selectedValueLand, setSelectedValueLand,sqftvalueLand, setSqftValueLand,builtArea,setBuiltArea,selectedValueBuilt, setSelectedValueBuilt,sqftvalueBuilt, setSqftValueBuilt,landLength,setLandLength,landWidth,setLandWidth,builtLength,setBuiltLength,builtWidth,setbuiltWidth,wait, setWait,fname,setFname,fImage,setFImage,fdata,setFData,openf,setOpenf,handleCloseF,deleteFloor,planImageChange,itemSubmit,handleSubmit,imageChange,uploadwait, setUploadWait]
};