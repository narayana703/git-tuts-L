import react, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {  UserContext,SnackbarContext } from "../components/UserContext";
import Compressor from 'compressorjs';

export const usePropertyData =()=>{
    const {propData,setPropData} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { admin } = useContext(UserContext)
  const {tkn,}=useContext(UserContext)
  const [page, setPage] = useState(10);
const [openE,setOpenE]=useState(false)


const navigate = useNavigate();
// let { id } = useParams();
const [id,setId]=useState("")
const { snack, setSnack } = useContext(SnackbarContext);

const [item, setItem] = useState({
  id:"",title:"", desc: "",video:"",country:"",address:"",tour:"",ptype:"", price:"", room:"", bedroom:"", bathroom:"", garage:"", size:"", landsize:"", year_built:"", garage_area:"", status: "",name:"",email:"",mobile:"",fax_num:"",comp_name:"",agent_desc:"",off_address:"",position:"",website:"",floor_name:"",floor_price:"",floor_size:"",floor_bedroom:"",floor_bathroom:"",floor_desc:"",
});
const [userid,setUserId]=useState("")
const [err, setErr] = useState(0)
const [doc, setDoc] = useState("")
  const [images, setImages] = useState([])
  const [profile, setProfile] = useState([])
  const [floor_img, setFloor_img] = useState([])
  const [open, setOpen] = useState(false)
  const [uploadwait, setUploadWait] = useState(false);
  const [feature, setFeature] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
const [oldImages,setOldImages]=useState([])

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("aid", admin.admin_id);
    formdata.append("role", admin.admin_role);
    await axios.post("/admin/get_all_properties"
    ,formdata, {
      headers: { tkn: tkn },
    }
    ).then((res) => {
      if (res.data.status === 1) {
        setPropData(res.data.data);
        // setOldImages()
        setLoading(false);
        console.log(res.data.data);
      }
    });
  };




 
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
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

  const fileEdit = async (e) => {
    console.log(e.target.files)
    if (e.target.length !== 0) {
      setDoc(e.target.files[0]);
    }
  };
  const onChangeImage = async (e) => {
    if (images.length + e.target.files.length <= 5) {

      var arr = [];
      for (var i = 0; i < e.target.files.length; i++) {
        var type = e.target.files[i].type;
        if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
          const image = e.target.files[i];
          var img = await compImage(image);
          arr.push({ raw: img, preview: URL.createObjectURL(img) });
        } else {
          alert("Please select only JPEG, JPG, PNG Images..")
        }
      }
      setImages([...images, ...arr]);

    } else {
      alert("Maximum Image limit is 5.");

    }
    e.target.value = ""

  };

  const onChangeImage1 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setProfile({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };
  const onChangeImage2 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setFloor_img({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };
  const itemSubmit = async (e) => {
    e.preventDefault();
    setErr(0);
    if(item.name === ""){
      setErr(1);
      setSnack({
        message: "Please enter Category Name",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.desc===""){
      setErr(2);
      setSnack({
        message: "Please enter Description",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.status=== ""){
      setErr(3);
      setSnack({
        message: "Please select Status",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(images.length === 0){
      setErr(4);
      setSnack({
        message: "Please upload image",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else{  
    console.log(item.name, "name");
    console.log(item.name, "name");
  
    const formdata = new FormData();
    formdata.append("id", item.id);
    formdata.append("title", item.title);
    formdata.append("document", doc);
    formdata.append("desc", item.desc);
    formdata.append("video", item.video);
    formdata.append("country", item.country);
    formdata.append("address", item.address);
    formdata.append("tour", item.tour);
    formdata.append("price", item.price);
    formdata.append("rooms", item.room);
    formdata.append("bedroom", item.bedroom);
    formdata.append("bathroom", item.bathroom);
    formdata.append("garage", item.garage);
    formdata.append("size", item.size);
    formdata.append("land", item.landsize);
    formdata.append("year", item.year_built);
    formdata.append("garage_area", item.garage_area);
    formdata.append("type", item.status);
    formdata.append("status", item.status);
    formdata.append("name", item.name);
    formdata.append("email", item.email);
    formdata.append("mobile", item.mobile);
    formdata.append("fax", item.fax_num);
    formdata.append("company", item.comp_name);
    formdata.append("agent_desc", item.agent_desc);
    formdata.append("off_address", item.off_address);
    formdata.append("position", item.position);
    formdata.append("website", item.website);
    formdata.append("feature", item.feature);
    if (images.raw !== undefined) {
      formdata.append("images", images.raw)
      console.log("send image")
    }

    await axios.post("/admin/edit_property", formdata, 
    // {
    //   headers: { tkn: tkn },
    // }
    ).then(function (res) {
      if (res.data.status === 1) {
        // /deletecatimage
       
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      console.log(oldImages)
      console.log(images)
      if(oldImages !== images){
        deleteImage(id)
      }        
        setOpenE(false)       
        // navigate("/dashboard/categories")
        getdata();

      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        setOpenE(false)
      
        getdata();
      }
    });
  };
  }
const deleteImage=async (id)=>{
  console.log(oldImages)
  const formdata = new FormData();
  formdata.append("id", id)
  formdata.append("images", oldImages)
  // formdata.append("aid", user.admin_id);

  await axios.post("/admin/deleteimages", formdata, {
    headers: { tkn: tkn },
  }).then( function (res){
    if(res.data.status===1){
      console.log(res)
      setLoading(false);
    }
  })
}

const deletedata=async (id)=>{
 
  const formdata = new FormData();
  formdata.append("id", id)
 
  formdata.append("aid", admin.admin_id);

  await axios.post("/admin/delete_property", formdata, 
  {
    headers: { tkn: tkn },
  }
  ).then( function (res){
    if(res.data.status===1){
      console.log(res)
      getdata();
    }
  })
}
const floorData=async (e)=>{
  e.preventDefault()
  const formdata = new FormData();
  formdata.append("id", item.id);
  formdata.append("floor_name", item.floor_name);
  formdata.append("floor_price", item.floor_price);
  formdata.append("floor_size", item.floor_size);
  formdata.append("f_bedrooms", item.floor_bedroom);
  formdata.append("f_bathrooms", item.floor_bathroom);
  formdata.append("f_desc", item.floor_desc);
  formdata.append("plan_image", floor_img.raw);
   axios.post("/admin/add_floor_plans", formdata).then(function (res) {
   if (res.data.status === 1) {
  
    setSnack({
      message: res.data.msg,
      type: "success",
      open: true,
    });
  } else {
    setSnack({
      message: res.data.msg,
      type: "error",
      open: true,
    });
  }
});
}
  return[propData,loading,page,setPage,openE,setOpenE, item,setItem,id,setId,setImages, images, navigate, itemChange, onChangeImage, itemSubmit,err,oldImages,setOldImages,deleteImage,deletedata,floorData,fileEdit,uploadwait,profile,onChangeImage1,floor_img,onChangeImage2,feature,handleChange,setFeature,userid,setUserId,getdata];
}