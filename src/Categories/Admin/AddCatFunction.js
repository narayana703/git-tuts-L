import { useState, useContext } from "react";
import { SnackbarContext, UserContext } from "../../components/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from 'compressorjs';

export const useCategory = () => {
  const { snack, setSnack } = useContext(SnackbarContext);
  const { admin } = useContext(UserContext)
  const {tkn}=useContext(UserContext)
  console.log(tkn)
  // console.log(user.admin_id)
  // console.log(localStorage.getItem("TKN"))

  const [item, setItem] = useState({
    name: "",
   
    status: "",
  });
  const [err, setErr] = useState(0)
  const navigate = useNavigate()
 
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const {catData,setCatData} = useContext(UserContext);
  const [open, setOpen] = useState(false)
  const handleClickOpen = () =>{ 
  setOpen(true)};
  const handleClose = () => {
    setOpen(false);
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
    
    else if(item.status=== ""){
      setErr(3);
      setSnack({
        message: "Please Select Status",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
  
    else{  

    const formdata = new FormData();
    formdata.append("name", item.name);
   
    formdata.append("status", item.status);
    
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/add_category", formdata
    , {
      headers: { tkn:tkn },
    }
    ).then(function (res) {
      console.log("hiiiii");
      if (res.data.status === 1) {
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        handleClose()
        setItem("")
       
        getdata()
        // navigate("/dashboard/categories")
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
        handleClose()
        getdata()
      }
    });
  };
}
const getdata = async () => {
  const formdata = new FormData();
  formdata.append("aid", admin.admin_id);
  await axios.post("/admin/get_all_cats",
  formdata
  , {
    headers: { tkn: tkn },
  }
  ).then((res) => {
    if (res.data.status === 1) {
      setCatData(res.data.data);
   
      console.log(res.data.data);
    }
  });
};
  return [item, setItem, itemChange, itemSubmit, err,open, setOpen,handleClickOpen,handleClose];
};
