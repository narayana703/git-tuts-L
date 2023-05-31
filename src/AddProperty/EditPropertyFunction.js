import React, { useState, useContext,useEffect } from "react";
import { SnackbarContext, UserContext } from "../components/UserContext";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const useEditProperty = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  const [item, setItem] = useState({
    userid:"",title:"", desc: "",video:"",country:"",address:"",tour:"",ptype:"", price:"", room:"", bedroom:"", bathroom:"", garage:"", size:"", landsize:"", year_built:"", garage_area:"", status: "",name:"",email:"",mobile:"",fax_num:"",comp_name:"",agent_desc:"",off_address:"",position:"",website:""
  });
  let history=useNavigate()
  let { id } = useParams();
  const [doc, setDoc] = useState("")
  const [oldDoc,setOldDoc]=useState("")
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([]);
  const [oldProfile,setOldProfile]=useState([])
  const [imageids, setImageIds] = useState("");
  const [delImage, setDelImage] = useState("")
  const [profile, setProfile] = useState([])
  // const [floor_img, setFloor_img] = useState([])
  const [open, setOpen] = useState(false)
  const [uploadwait, setUploadWait] = useState(false);
  const [feature, setFeature] = useState([]);
const {propId,setPropId}=useContext(UserContext)
console.log(propId)





  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
      setDoc(e.target.files[0]);
    }
 
  
  };

  const imageChange = async (e) => {
    if (e.target.files.length != 0) {
      // console.log(oldImages.split(",").length)
      // if (oldImages.split(",").length + images.length + e.target.files.length <= 3) {
      console.log(oldImages.length)
      if (oldImages.length + images.length + e.target.files.length <= 5) {
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
    }
    e.target.value = ""

  }
  const imageChange1 = async (e) => {
    if (e.target.files.length != 0) {
      const image = e.target.files[0];
      setProfile({ raw: image, preview: URL.createObjectURL(image) });
    }
    e.target.value = ""
  };

 console.log(doc);




 useEffect(() => {
    singlePropData();
    singlePropDetailsData();
    singlePropAgentData()
  }, [])
console.log(id)
  const singlePropData = () => {
    const formdata = new FormData()
    console.log(propId)
    formdata.append('id', localStorage.getItem('rowid'))
    axios.post('/admin/get_single_propertyy', formdata)
      .then(function (response) {
        console.log(response.data.data[0].title)
        if (response.data.status === 1) {
          
          console.log(response.data.data[0].title)
          setItem({
          
            title:response.data.data[0].title,
            country:response.data.data[0].country,
            address:response.data.data[0].address,
            video:response.data.data[0].video,
            tour:response.data.data[0].virtual_tour,
            desc:response.data.data[0].desc,
            feature:response.data.data[0].feature,
     
          })
          setDoc(response.data.data[0].attachment)
        
      //   setItems({
      //     floor_name: response.data.data[0].floor_name,
      //     floor_price: response.data.data[0].floor_price,
      //     floor_size: response.data.data[0].floor_size,
      //     floor_bedroom: response.data.data[0].floor_bedrooms,
      //     floor_bathroom: response.data.data[0].floor_bathrooms,
      //     floor_desc: response.data.data[0].floor_desc,
       
   
      const array=response.data.data[0].feature.split(",")
      setFeature(array)
      setImageIds(response.data.data[0].images)
      setOldImages(response.data.images)
      setLoading(false);
      // setProfile(response.data.data[0].agent_image)
        }
      //   setOldProfile(response.data.data[0].agent_image)
        console.log(response.data);

      });

  }
  const singlePropDetailsData = () => {
    const formdata = new FormData()
    console.log(propId)
    formdata.append('id', localStorage.getItem('rowid'))
    axios.post('/admin/get_single_property_details', formdata)
      .then(function (response) {
        console.log("==========res")
        console.log("res",response)
        if (response.data.status === 1) {
          
          console.log(response.data.data[0])
          setItem({
            
            ptype:response.data.data[0].property_type,
            price:response.data.data[0].price,
            room:response.data.data[0].Rooms,
            bedroom:response.data.data[0].bedrooms,
            bathroom:response.data.data[0].bathrooms,
            garage:response.data.data[0].garages,
            size:response.data.data[0].size,
            landsize:response.data.data[0].land_size,
            year_built:response.data.data[0].year_built,
            garage_area:response.data.data[0].Garage_area,
            status:response.data.data[0].property_status,
     
          })
          setLoading(false);
        }
      //   setOldProfile(response.data.data[0].agent_image)
        console.log(response.data);

      });

  }
  const singlePropAgentData = () => {
    const formdata = new FormData()
    console.log(propId)
    formdata.append('id', localStorage.getItem('rowid'))
    axios.post('/admin/get_single_agent', formdata)
      .then(function (response) {
        if (response.data.status === 1) {
          
          console.log(response.data.data[0])
          setItem({           
            
            name:response.data.data[0].name,
            email:response.data.data[0].email,
            mobile:response.data.data[0].mobile,
            fax_num:response.data.data[0].fax,
            comp_name:response.data.data[0].company,
            agent_desc:response.data.data[0].agent_desc,
            off_address:response.data.data[0].mobile,
            position:response.data.data[0].position,
            website:response.data.data[0].website,
          })
     
    
   
      setOldProfile(response.data.data[0].agent_image)
      setProfile(response.data.data[0].agent_image)
      setLoading(false);
        }
        
        console.log(response.data);

      });

  }
console.log(feature)

  const itemSubmit = async (e) => {
    e.preventDefault();
 console.log(images)
 console.log(item.userid,"======userid")
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('rowid'))
   
    formdata.append("title", item.title);
    formdata.append("document", doc);
    formdata.append("desc", item.desc);
    formdata.append("video", item.video);
    formdata.append("country", item.country);
    formdata.append("address", item.address);
    formdata.append("tour", item.tour);
    
    formdata.append("feature", feature);
 console.log(images,"ïmagessss")
 console.log(oldImages)
 console.log(images.length,"ïmagessss")
 formdata.append('images', imageids);
    for (var i = 0; i < images.length; i++) {

      formdata.append('images', images[i].raw);
    }
    
  
    await axios.post("/admin/edit_property", formdata).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
    
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        history('/Dashboard/propertydetails')
        setLoading(false);
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
   
  };
  const itemSubmit1 = async (e) => {
    e.preventDefault();
 console.log(images)
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('rowid'))
    
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
    formdata.append("type", item.ptype);
    formdata.append("status", item.status);
    
  
    await axios.post("/admin/edit_property_details", formdata).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
    
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        setLoading(false);
        history('/Dashboard/propertydetails')
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
   
  };
 
  const agentSubmit = async (e) => {
   e.preventDefault()
 console.log(images)
    const formdata = new FormData();
    formdata.append('id', localStorage.getItem('rowid'))
    
   
    formdata.append("name", item.name);
    formdata.append("email", item.email);
    formdata.append("mobile", item.mobile);
    formdata.append("fax", item.fax_num);
    formdata.append("company", item.comp_name);
    formdata.append("agent_desc", item.agent_desc);
    formdata.append("off_address", item.off_address);
    formdata.append("position", item.position);
    formdata.append("website", item.website);
  
   
    formdata.append("profile", profile.raw);
   
   
    await axios.post("/admin/edit_agent_details", formdata).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
    
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        if(oldProfile !== images){
          deleteAgentProfileImage(localStorage.getItem('rowid'))
        } 
        setLoading(false); 
        history('/Dashboard/propertydetails')
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
   
  };

  const delete_image = async (image) => {
    // e.preventDefault();
    console.log(image,"=========ïmage==========")
    console.log(localStorage.getItem('rowid'),"======id======")
console.log("=========gani=======")
    const formdata = new FormData();

    // formdata.append("aid", user.admin_id);
    // formdata.append("images", imageids);
    formdata.append("image", image);
    formdata.append("id", localStorage.getItem('rowid'))
    await axios.post("/admin/deleteimages", formdata).then(function (res) {
      if (res.data.status === 1) {
        setSnack({
          message: res.data.msg,
          type: 'success',
          open: true,
          direction: "center"
        });
        setLoading(false);
        singlePropData()

      } else {

        setSnack({
          message: res.data.msg,
          type: 'error',
          open: true,
          direction: "center"
        });
        singlePropData()
      }


    });
  }
  const deleteAgentProfileImage=async (id)=>{
    console.log(oldImages)
    const formdata = new FormData();
    formdata.append("id", id)
    formdata.append("profile", oldProfile)
   
  
    await axios.post("/admin/deleteprofile_image", formdata).then( function (res){
   
      if(res.data.status===1){
        console.log(res)
        setLoading(false);
      }
    })
  }

  return [item,setItem,setProfile, images,setImages, uploadwait, itemChange, itemSubmit, imageChange,imageChange1,profile,doc, setDoc,fileChange,open, setOpen,handleClickOpen,handleClose,feature,handleChange,itemSubmit1,,agentSubmit,oldImages, setOldImages,imageids, setImageIds,delete_image,loading, setLoading];
};
