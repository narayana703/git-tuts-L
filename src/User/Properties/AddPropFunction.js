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

export const useProperty = () => {
  const { catU, setCatU } = useContext(UserContext);
  // const [requestFlag,setRequestFlag]=useState(0)
  const [activeStep, setActiveStep] = useState(0);
  const {propCat,setPropCat,uid, setUId,user,token}=useContext(UserContext)
  console.log(uid)
  let history=useNavigate()
  const { snack, setSnack } = useContext(SnackbarContext);
  const [item, setItem] = useState({
    userid:"",catid:"",title:"", video:"",tour:"",ptype:"", price:"", room:"", bedroom:"", bathroom:"", garage:"", year_built:"", garage_area:"", status: "",face:"",name:"",email:"",mobile:"",fax_num:"",comp_name:"",agent_desc:"",off_address:"",position:"",website:""
  });
  const [desc,setDesc]=useState("")
  const [loc,setLoc]=useState("")
  const [city,setCity]=useState("")
  const [wait, setWait] = useState(false)
  const [landsize,setLandsize]=useState()
  const [size,setSize]=useState()

  const [selectedValue, setSelectedValue] = useState();
  const [sqftvalue, setSqftValue] = useState();

  const [sqyard, setSqyard] = useState();
  const [sqfeet, setSqfeet] = useState();
  const [acre, setAcre] = useState();
  const [cent, setCent] = useState();
  const [ankanam, setAnkanam] = useState();
  const [cunta, setCunta] = useState();

  const [sqyard1, setSqyard1] = useState();
  const [sqfeet1, setSqfeet1] = useState();
  const [acre1, setAcre1] = useState();
  const [cent1, setCent1] = useState();
  const [ankanam1, setAnkanam1] = useState();
  const [cunta1, setCunta1] = useState();

  const [sqyard2, setSqyard2] = useState();
  const [sqfeet2, setSqfeet2] = useState();
  const [acre2, setAcre2] = useState();
  const [cent2, setCent2] = useState();
  const [ankanam2, setAnkanam2] = useState();
  const [cunta2, setCunta2] = useState();

  const [cat,setCat]=useState()
  const [doc, setDoc] = useState("")
  const [images, setImages] = useState([])
  const [profile, setProfile] = useState([])
  const [floor_img, setFloor_img] = useState([])
  const [open, setOpen] = useState(false)
  const [uploadwait, setUploadWait] = useState(false);
  const [feature, setFeature] = useState([]);
  const [err, setErr] = useState(0);
  const [currentForm, setCurrentForm] = useState(0);
const [numFloors, setNumFloors]=useState(1)
const [numPages, setNumPages] = useState(1); // default number of pages is 1
const [items, setItems] = useState([{
  floor_name: "",
  floor_price: "",
  floor_size: "",
  floor_bedroom: "",
  floor_bathroom: "",
  floor_desc: "",
  floor_img: { preview: "", raw: "" }
}]);
const [fdata,setFData]=useState([])

const [fname,setFname]=useState("")
const [fImage,setFImage]=useState([])
const [openf,setOpenf]=useState(false)
var requestFlag = 0
const handleChangeSelected = (event) => {
  const selected = event.target.value;
  setSelectedValue(selected);
};
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
const handleChange1 = (event) => {
  const sqvalue = event.target.value;
  setSqftValue(sqvalue);
};

useEffect(() => {
  if (selectedValue === 1) {
    setSize(sqftvalue * 9); // Sqyard
  } else if (selectedValue === 2) {
    setSize(sqftvalue); // Sqfeet
  } else if (selectedValue === 3) {
    setSize(sqftvalue * 43560); // Acre
  } else if (selectedValue === 4) {
    setSize(sqftvalue * 435.6); // Cent 
  } else if (selectedValue === 5) {
    setSize(sqftvalue * 72); // Ankanam
  } else if (selectedValue === 6) {
    setSize(sqftvalue * 1089); // Cunta
  }
}, [selectedValue, sqftvalue]);


  const [selectedValue9, setSelectedValue9] = useState();
  const [sqftvalue9, setSqftValue9] = useState();
  
  const handleChangeSelected9 = (event) => {
    const selected9 = event.target.value;
    setSelectedValue9(selected9);
  };

  const handleChange19 = (event) => {
    const sai9 = event.target.value;
    setSqftValue9(sai9);
  };

  useEffect(() => {
    if (selectedValue9 === 1) {
      setLandsize(sqftvalue9 * 9); // Sqyard
    } else if (selectedValue9 === 2) {
      setLandsize(sqftvalue9); // Sqfeet
    } else if (selectedValue9 === 3) {
      setLandsize(sqftvalue9 * 43560); // Acre
    } else if (selectedValue9 === 4) {
      setLandsize(sqftvalue9 * 435.6); // Cent 
    } else if (selectedValue9 === 5) {
      setLandsize(sqftvalue9 * 72); // Ankanam
    } else if (selectedValue9 === 6) {
      setLandsize(sqftvalue9 * 1089); // Cunta
    }
  }, [selectedValue9, sqftvalue9]);
const handleNumPagesChange = (event) => {
  const value = event.target.value;
  setNumPages(value);
  setItems([...items,{
    floor_name: "",
    floor_price: "",
    floor_size: "",
    floor_bedroom: "",
    floor_bathroom: "",
    floor_desc: "",
    floor_img: { preview: "", raw: "" }
  }]);
};

const handleItemChange = (event, index) => {
  const { name, value } = event.target;
  const newItems = [...items];
  newItems[index][name] = value;
  setItems(newItems);
 
  
};

const handleImageChange = (event, index) => {
  const file = event.target.files[0];
  const newItems = [...items];
  console.log(newItems)
  newItems[index].floor_img = {
    preview: URL.createObjectURL(file),
    raw: file
  };
  setItems(newItems);
};

const handleNumFloorsChange = (event) => {
  setNumFloors(event.target.value);
};

const handleChange = (event) => {
  const {
    target: { value, checked },
  } = event;
  if (value === "all") {
    if (checked) {
      setFeature(names);
    } else {
      setFeature([]);
    }
  } else {
    if (checked) {
      setFeature([...feature, value]);
    } else {
      setFeature(feature.filter((f) => f !== value));
    }
  }
};

  const handleClickOpen = () =>{ 
  setOpen(true)};
  const handleClose = () => {
    setOpen(false);
};
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
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
  const fileChange = async (e) => {
    console.log(e.target.files)
    // if (e.target.files.length !== 0) {
    //   const docs = e.target.files[0];
    //   setDoc({
    //     raw: docs,
    //     preview: URL.createObjectURL(docs),
    //   });
    // }   e.target.value = "";
    if (e.target.length !== 0) {
      // var type = e.target.files[0].type;
      // if (type === "pdf") {
      setDoc(e.target.files[0]);
      // }
      // else {
      //   alert("Please select only PDF files only..")
      // }
    }
    
 
  
  };
useEffect(() => {
  propCatData()
}, [])
  const propCatData=async (e)=>{
    axios.post("/user/allPropCat").then(function (res) {
console.log(res)
if(res.data.status===1){
  setPropCat(res.data.data)
}
    })
  }
console.log(propCat,"===========")

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
  const imageChange1 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setProfile({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };
  const imageChange2 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setFloor_img({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };
 
 console.log(doc);
 const propData0=(e)=>{
  e.preventDefault()    
  setErr(0)
  if(cat===undefined){
    setErr(33)
    setSnack({
      message: "Please Select Property Category",
      type: 'error',
      open: true,
      direction: "center"
  });
   }
 

  else {
    setActiveStep(1)
  }
 }
 const propData1 = (e) => {
  console.log(item.price)
  e.preventDefault()
  setErr(0)
  if (item.ptype === "") {
    setErr(1)
    setSnack({
      message: "Please Select Property Type",
      type: 'error',
      open: true,
      direction: "center"
    });
  }
  else
    if (item.price === "" ) {
      setErr(2)
      setSnack({
        message: "Please Enter Property Price",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
   
    else if ((item.price) < 20) {
      setErr(2)
      setSnack({
        message: "Please Enter Property Price",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if ((
      item.ptype !== "Plot" ) && item.room === "") {
      setErr(3)
      setSnack({
        message: "Please Enter Number of Rooms",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if ((item.ptype !== "Plot" && catU !== "2") && item.bedroom === "") {
      setErr(4)
      setSnack({
        message: "Please Enter Number of BedRooms",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (( item.ptype !== "Plot" ) && item.bathroom === "") {
      setErr(5)
      setSnack({
        message: "Please Enter Number of BathRooms",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (( item.ptype !== "Plot" ) && item.garage === "") {
      setErr(6)
      setSnack({
        message: "Please Enter Number of Garages",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (item.ptype !== "Plot" && size === undefined) {
      setErr(7)
      setSnack({
        message: "Please Enter Size of Property",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (landsize === undefined) {
      setErr(8)
      setSnack({
        message: "Please Enter Land Size",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if ((item.ptype !== "Plot") && item.year_built === "") {
      setErr(9)
      setSnack({
        message: "Please Enter Built Year",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if ((item.ptype !== "Plot") && item.garage_area === "") {

      setErr(10)
      setSnack({
        message: "Please Enter Area of Garage",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (item.status === "") {
      // window.alert(size)
      setErr(11)
      setSnack({
        message: "Please Select Property Status",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else if (item.face === "") {
      setErr(12)
      setSnack({
        message: "Please Enter Property Facing",
        type: 'error',
        open: true,
        direction: "center"
      });
    }
    else {
      setActiveStep(1)
    }
}
const propData = (e) => {
  e.preventDefault()
  setErr(0)
  if (item.title === "") {
    setErr(13)
    setSnack({
      message: "Please Enter Property Title",
      type: 'error',
      open: true,
      direction: "center"
    });
  }

  else if (loc === "") {
    setErr(15)
    setSnack({
      message: "Please Enter Property Address",
      type: 'error',
      open: true,
      direction: "center"
    });
  }

  else if (city === "") {
    setErr(16)
    setSnack({
      message: "Please Enter City",
      type: 'error',
      open: true,
      direction: "center"
    });
  }
  else if ((item.ptype !== "Plot") && feature.length === 0) {
    setErr(17)
    setSnack({
      message: "Please Select Property Features",
      type: 'error',
      open: true,
      direction: "center"
    });
  }
  else if (desc === "") {
    setErr(18)
    setSnack({
      message: "Please Enter Property Description",
      type: 'error',
      open: true,
      direction: "center"
    });
  }

  else if (doc.length === 0) {
    setErr(19);
    setSnack({
      message: "Please Choose PDF File",
      type: 'error',
      open: true,
      direction: "center"
    });
  }
  else if (images.length === 0) {
    setErr(20);
    setSnack({
      message: "Please Choose Image",
      type: 'error',
      open: true,
      direction: "center"
    });
  }
  else {
    // window.alert(cat1)
    if (item.ptype !== "Plot") {
      setActiveStep(2)
    } else {
      console.log("no floor details");
      handleSubmit(e)
    }
    // setActiveStep(2)
  }
}
const propData2 = (e) => {
  e.preventDefault()

}
console.log(items[0].floor_name, "-----")

const itemSubmit = async (e) => {

  e.preventDefault();
  // console.log(items)
  // console.log(typeof (items.floor_name))
  // const currentFormFields = items[currentForm];
  // console.log(currentFormFields,"current")
  setErr(0)
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
  //  if(items[0].floor_img.preview === ""){
//   for (var k = 0; k < items.length; k++) {
//     console.log(items[k]);
//    console.log(index,"k value");
// console.log(e,"index")
//     if ((item.ptype !== "Plot") && items[k].floor_name === "") {
//       console.log("k value is :",  k);
//       setErr(100+k)
//       setSnack({
//         message: "Please Enter Floor Name",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else if ((item.ptype !== "Plot") && items[k].floor_size === "") {
//       setErr(110+k)
//       setSnack({
//         message: "Please Enter Floor Size",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else if ((item.ptype !== "Plot") && items[k].floor_bedroom === "") {
//       setErr(130+k)
//       setSnack({
//         message: "Please Enter Number of Bedrooms",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else if (( item.ptype !== "Plot" ) && items[k].floor_bathroom === "") {
//       setErr(140+k)
//       setSnack({
//         message: "Please Enter Number of Bathrooms",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else if ((item.ptype !== "Plot") && items[k].floor_desc === "") {
//       setErr(150+k)
//       setSnack({
//         message: "Please Enter Description",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else if ((item.ptype !== "Plot") && items[k].floor_img.preview === "") {
//       setErr(160+k)
//       setSnack({
//         message: "Please Choose Plan Image",
//         type: 'error',
//         open: true,
//         direction: "center"
//       });
//       requestFlag = 0;
//       break;
//     }
//     else {
//       console.log("set request flag 1");
//       requestFlag = 1
//     }
   

//   }
// requestFlag = 1
//   console.log("requestFlag", requestFlag);
//   if (requestFlag == 1) {
//     // API call
//     handleSubmit(e)
//   }
// }
}
const handleSubmit=async (e)=>{
  console.log("====================")
  e.preventDefault()

  setWait(true)
    // handleSubmit(e)
    const formdata = new FormData();
    formdata.append("user_id", uid);
    formdata.append("catid", catU);
    formdata.append("face", item.face);
    formdata.append("title", item.title);
    formdata.append("document", doc);
    formdata.append("desc", desc);
    formdata.append("video", item.video);

    formdata.append("address", loc);
    formdata.append("tour", item.tour);
    formdata.append("city", city);
   
    formdata.append("price", item.price);
    formdata.append("rooms", item.room);
    formdata.append("bedroom", item.bedroom);
    formdata.append("bathroom", item.bathroom);
    formdata.append("garage", item.garage);
    formdata.append("size", size);
    formdata.append("land", landsize);
    formdata.append("year", item.year_built);
    formdata.append("garage_area", item.garage_area);
    formdata.append("type", item.ptype);
    formdata.append("status", item.status);
    // formdata.append("name", item.name);
    // formdata.append("email", item.email);
    // formdata.append("mobile", item.mobile);
    // formdata.append("fax", item.fax_num);
    // formdata.append("company", item.comp_name);
    // formdata.append("agent_desc", item.agent_desc);
    // formdata.append("off_address", item.mobile);
    // formdata.append("position", item.position);
    // formdata.append("website", item.website);
  
    formdata.append("feature", feature);
  
    for (var i = 0; i < images.length; i++) {
  
      formdata.append('images', images[i].raw);
    }

    console.log(items.floor_name);
    console.log(typeof(items))
    for (let fd=0;fd<fdata.length;fd++){
      console.log(fdata[0].fname,"fdata")
      formdata.append(`floor_name`, fdata[fd].fname);
      formdata.append(`plan_image`, fdata[fd].fImage?.raw);
    }
    // for (let j = 0; j < items.length; j++) {
    //   formdata.append(`floor_name`, items[j].floor_name);
    //   formdata.append(`floor_price`, items[j].floor_price);
    //   formdata.append(`floor_size`, items[j].floor_size);
    //   formdata.append(`f_bedrooms`, items[j].floor_bedroom);
    //   formdata.append(`f_bathrooms`, items[j].floor_bathroom);
    //   formdata.append(`f_desc`, items[j].floor_desc);
    //   formdata.append(`plan_image`,items[j].floor_img.raw);
    //   }
      formdata.append("uid", user.user_id);
     axios.post("/user/add_properties", formdata,  {
      headers: { tkn: token },
    }).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        history('/user_dashboard/all_properties')
      } else {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  
}

  return [activeStep, setActiveStep,item,setItem,setProfile, images,setImages, uploadwait, itemChange, itemSubmit, imageChange,imageChange1,profile,imageChange2,floor_img,doc, setDoc,fileChange,open, setOpen,handleClickOpen,handleClose,feature,handleChange,numFloors, setNumFloors,handleNumFloorsChange,items, setItems,numPages, setNumPages,handleNumPagesChange,handleItemChange,handleImageChange,err,propData,propData1,propData2,propCat,cat,setCat,landsize,setLandsize,size,setSize,wait, setWait,sqyard, setSqyard,sqfeet, setSqfeet,acre, setAcre,cent, setCent,ankanam, setAnkanam,cunta, setCunta,sqyard1, setSqyard1,sqfeet1, setSqfeet1,acre1, setAcre1,cent1, setCent1,ankanam1, setAnkanam1,cunta1, setCunta1,sqyard2, setSqyard2,sqfeet2, setSqfeet2,acre2, setAcre2,cent2, setCent2,ankanam2, setAnkanam2,cunta2, setCunta2,loc,setLoc,city,setCity,sqftvalue,handleChange1,selectedValue,handleChangeSelected,sqftvalue9,handleChange19,selectedValue9,handleChangeSelected9,desc,setDesc,handleSubmit,fname,setFname,fImage,setFImage,fdata,setFData,openf,setOpenf,handleCloseF,deleteFloor,planImageChange,];
};