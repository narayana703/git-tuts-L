import { useEffect, useState, useContext } from "react";
import { SnackbarContext, UserContext } from "../components/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from 'compressorjs';

export const useBanner = () => {

  const { snack, setSnack } = useContext(SnackbarContext);
  const { admin } = useContext(UserContext)
  const {tkn}=useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState(0)
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  const [uploadwait, setUploadWait] = useState(false);
  const {bannerData,setBannerdata}=useContext(UserContext)
const [title,setTitle]=useState("")
const [subtitle,setSubTitle]=useState("")
const [url,setUrl]=useState("")
const [btnText,setBtnText]=useState("")
  const handleClickOpen = () =>{ setImages("");
  setOpen(true)};
  const handleClose = () => {
    setOpen(false);
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
  const imageChange = async (e) => {

  if (e.target.files.length != 0) {
    var type = e.target.files[0].type;
    if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
      const image = e.target.files[0];
      var img = await compImage(image);
      setImages({ raw: img, preview: URL.createObjectURL(img) });
    } else {
      alert("Please select only JPEG, JPG, PNG Images..")
    }
  }
  e.target.value = ""

};

  const itemSubmit = async (e) => {
    e.preventDefault();
 
    console.log(images.raw);
    setErr(0)
    if(title===""){
      setErr(1)
      setSnack({
        message: "Please Enter Banner Title",
        type: 'error',
        open: true,
        direction: "center"
    });}
    else  if(subtitle===""){
      setErr(2)
      setSnack({
        message: "Please Enter Banner SubTitle",
        type: 'error',
        open: true,
        direction: "center"
    });}
    else  if(url===""){
      setErr(3)
      setSnack({
        message: "Please Enter Banner URL",
        type: 'error',
        open: true,
        direction: "center"
    });}
    else  if(btnText===""){
      setErr(4)
      setSnack({
        message: "Please Enter Banner Button Text",
        type: 'error',
        open: true,
        direction: "center"
    });}
    else if(images.length === 0){
      setErr(5)
      setSnack({
        message: "Please Choose Image",
        type: 'error',
        open: true,
        direction: "center"
    });}
    else{
      const formdata = new FormData();
     formdata.append("banner_title",title)
     formdata.append("banner_subtitle",subtitle)
     formdata.append("banner_url",url)
     formdata.append("banner_button_text",btnText)
        formdata.append('banner_image', images.raw);
    
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/add_banner", formdata
      , {
        headers: { tkn: tkn },
      }
      ).then(function (res) {
     
        if (res.data.status === 1) {
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          handleClose()
          getdata()
          setImages("")
 
        } else {
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          });
          handleClose()
        }
      });
    };
  }

  
   
    const getdata = async () => {
      const formdata = new FormData();
      formdata.append("aid", admin.admin_id);
      await axios.post("/admin/get_all_banners",formdata
      , {
        headers: { tkn: tkn },
      }
      ).then((res) => {
        console.log(res.data)
        if (res.data.status === 1) {
          setBannerdata(res.data.data);
          setLoading(false);
          console.log(res.data.data);
        }
      });
    };

  return [ images,loading,  itemSubmit, imageChange,  uploadwait, setImages, err, open, handleClickOpen,  handleClose,title,setTitle,subtitle,setSubTitle,url,setUrl,btnText,setBtnText];
}
