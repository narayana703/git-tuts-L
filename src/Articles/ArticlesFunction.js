import react, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {  UserContext,SnackbarContext } from "../components/UserContext";
import Compressor from 'compressorjs';

export const useArticlesData =()=>{
    const {articleData,setArticleData} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { admin } = useContext(UserContext)
  const {tkn,}=useContext(UserContext)
  const [page, setPage] = useState(10);
const [openE,setOpenE]=useState(false)


const [oldImages, setOldImages] = useState([]);
const [imageids, setImageIds] = useState("");
const [delImage, setDelImage] = useState("")
const navigate = useNavigate();

const [id,setId]=useState("")
const { snack, setSnack } = useContext(SnackbarContext);

const [item, setItem] = useState({   
  category: "",
 title:"",
  desc: "",

});
const [dateTime,setDateTime]=useState("")
const [images, setImages] = useState([])
const [uploadwait, setUploadWait] = useState(false);
const [err, setErr] = useState(0)

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const formdata = new FormData();
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/get_all_articles",formdata
    , {
      headers: { tkn: tkn },
    }
    ).then((res) => {
      if (res.data.status === 1) {
        setArticleData(res.data.data);
        // setOldImages()
        setLoading(false);
        console.log(res.data.data);
      }
    });
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
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
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

  };
  const itemSubmit = async (e) => {
    e.preventDefault();
    setErr(0);
    if(item.category === ""){
      setErr(1);
      setSnack({
        message: "Please Select Category",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.title=== ""){
      setErr(2);
      setSnack({
        message: "Please Enter Title Name",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.desc=== ""){
      setErr(3);
      setSnack({
        message: "Please Eneter Description",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(dateTime=== ""){
      setErr(4);
      setSnack({
        message: "Please Select Date",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(images.length===0){
      setErr(4);
      setSnack({
        message: "Please Vhoose Article Image",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else{  

    const formdata = new FormData();
    formdata.append("catid", item.category);
    formdata.append("aid", admin.admin_id);
    formdata.append("title", item.title);
    formdata.append("art_desc", item.desc);
    formdata.append("added_date", dateTime);
  for(let i=0;i<images.length;i++){
    formdata.append("images", images[i].raw);
  }
   
    await axios.post("/admin/edit_articles", formdata
    , {
      headers: { tkn: tkn },
    }
    ).then(function (res) {
      if (res.data.status === 1) {
        // /deletecatimage
       
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
             
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

const deletedata=async (id)=>{
 
  const formdata = new FormData();
  formdata.append("catid", id)
 
  formdata.append("aid", admin.admin_id);

  await axios.post("/admin/delete_category", formdata, 
  {
    headers: { tkn: tkn },
  }
  ).then( function (res){
    if(res.data.status===1){
      console.log(res)
      setSnack({
        message: res.data.msg,
        type: "success",
        open: true,
      });
      getdata();
    }
  })
}
const delete_image=()=>{

}
  return[articleData,setArticleData,loading,page,setPage,openE,setOpenE, item,setItem,id,setId, navigate, itemChange, itemSubmit,err,deletedata,imageChange,uploadwait,images,setImages,oldImages,delete_image,imageids, setImageIds,dateTime,setDateTime];
}