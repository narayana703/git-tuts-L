import react, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {  UserContext,SnackbarContext } from "../../components/UserContext";
import Compressor from 'compressorjs';

export const useCategoriesData =()=>{
    const {catData,setCatData} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { admin } = useContext(UserContext)
  const {tkn,}=useContext(UserContext)
  const [page, setPage] = useState(10);
const [openE,setOpenE]=useState(false)


const navigate = useNavigate();

const [id,setId]=useState("")
const { snack, setSnack } = useContext(SnackbarContext);

const [item, setItem] = useState({
  name: "",
 
  status: "",
});
const [err, setErr] = useState(0)

  useEffect(() => {
    getdata();
  }, []);
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
        // setOldImages()
        setLoading(false);
        console.log(res.data.data);
      }
    });
  };



 
  const itemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }

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
        message: "Please select Status",
        type: 'error',
        open: true,
        direction: "center"
    });
    }
    
    else{  
    console.log(item.name, "name");
    console.log(item.name, "name");
    const formdata = new FormData();
    formdata.append("catid", id)
    formdata.append("name", item.name)
    formdata.append("desc", item.desc)
    formdata.append("status", item.status)
    formdata.append("aid", admin.admin_id);
   
    await axios.post("/admin/edit_category", formdata
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
  return[catData,loading,page,setPage,openE,setOpenE, item,setItem,id,setId, navigate, itemChange, itemSubmit,err,deletedata];
}