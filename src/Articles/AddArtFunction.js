import { useState, useContext } from "react";
import { SnackbarContext, UserContext } from "../components/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from 'compressorjs';

export const useArticle = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  const { admin } = useContext(UserContext)
  const {tkn,articleData,setArticleData}=useContext(UserContext)
  const [wait, setWait] = useState(false)
  console.log(tkn)
  // console.log(user.admin_id)
  // console.log(localStorage.getItem("TKN"))

  const [item, setItem] = useState({   
    category: "",
   title:"",
    desc: "",
    date:""
  });
  const [desc,setDesc]=useState("")
  const [images, setImages] = useState([])
  const [uploadwait, setUploadWait] = useState(false);
  const [err, setErr] = useState(0)
  const navigate = useNavigate()
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
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  // const itemChange = (e) => {
  //   setItem((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  // function handleEditorChange(event, editor) {
  //   const data = editor.getData();
  //   setEditorData(data);
  // }
  const {catData,setCatData} = useContext(UserContext);
  const [open, setOpen] = useState(false)
  const handleClickOpen = () =>{ 
  setOpen(true)};
  const handleClose = () => {
    setOpen(false);
};

const imageChange = async (e) => {
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
    else if(desc=== ""){
      setErr(3);
      setSnack({
        message: "Please Eneter Description",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(item.date=== ""){
      setErr(4);
      setSnack({
        message: "Please Select Date",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else if(images.length===0){
      setErr(5);
      setSnack({
        message: "Please Choose Article Image",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    else{  
      setWait(true)
    const formdata = new FormData();
    formdata.append("catid", item.category);
   
    formdata.append("title", item.title);
    formdata.append("art_desc", desc);
    formdata.append("added_date", item.date);
  for(let i=0;i<images.length;i++){
    formdata.append("images", images[i].raw);
  }
    
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/add_article", formdata
    , {
      headers: { tkn:tkn },
    }
    ).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        // handleClose()
        setItem("")
       setImages("")
        // getdata()
        navigate("/dashboard/articles")
      } else {
        setWait(false)
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        // handleClose()
        // getdata()
      }
    });
  };
}
const getdata = async () => {
  const formdata = new FormData();
  formdata.append("aid", admin.admin_id);
  await axios.post("/admin/get_all_articles",
  formdata
  , {
    headers: { tkn: tkn },
  }
  ).then((res) => {
    if (res.data.status === 1) {
      setArticleData(res.data.data);
   
      console.log(res.data.data);
    }
  });
};
// console.log( ReactHtmlParser(desc))
  return [item, setItem,images, itemChange,imageChange, uploadwait, setImages,itemSubmit, err,open, setOpen,handleClickOpen,handleClose,setDesc,desc,wait, setWait,];
};
