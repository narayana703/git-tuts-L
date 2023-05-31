import {
  Box,
  IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem, Card, CardMedia
} from "@mui/material";
import { useArticlesData } from "./ArticlesFunction";

import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../components/Loading";
import { useCategoriesData } from "../Categories/Admin/categoriesFunction";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import react, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext, SnackbarContext } from "../components/UserContext";
import Compressor from 'compressorjs';
import CKEditor from 'react-ckeditor-component';
import parse from 'html-react-parser';
import { LeftDrawer } from "../Dashboard/Leftdrawer";
import { Helmet } from "react-helmet";
// {parse(`${service.serv_desc}`)}
var momentt = require("moment-timezone");
export const Articles = () => {
  // const [articleData,setArticleData, loading, page, setPage, openE, setOpenE, item, setItem, id, setId,  navigate, itemChange, itemSubmit, err,deletedata,,imageChange,uploadwait,images,setImages,oldImages,delete_image,imageids, setImageIds,setOldImages,dateTime,setDateTime] = useArticlesData();
  const [catData] = useCategoriesData()
  const { articleData, setArticleData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { admin } = useContext(UserContext)
  const { tkn, } = useContext(UserContext)
  const [page, setPage] = useState(10);
  const [openE, setOpenE] = useState(false)
  const [ckdesc, setCkDesc] = useState("")

  const [oldImages, setOldImages] = useState([]);
  const [imageids, setImageIds] = useState("");
  const [delImage, setDelImage] = useState("")
  const navigate = useNavigate();

  const [id, setId] = useState("")
  const { snack, setSnack } = useContext(SnackbarContext);

  const [item, setItem] = useState({
    category: "",
    title: "",


  });
  const [desc, setDesc] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [images, setImages] = useState([])
  const [uploadwait, setUploadWait] = useState(false);
  const [err, setErr] = useState(0)

  useEffect(() => {
    getdata();
  }, []);
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
        // setOldImages()
        setLoading(false);
        console.log(res.data.data);
      }
    });
  };

  const getdata1 = async () => {
    const formdata = new FormData();
    formdata.append("id", id)
    formdata.append("aid", admin.admin_id);
    await axios.post("/admin/get_Single_articles", formdata , {
      headers: { tkn: tkn },
    }).then(function (res) {
      console.log(res.data)
      if (res.data.status === 1) {
        console.log(res)
        setItem({
          category: res.data.data.article_cat_id,
          title: res.data.data.article_title,
          // desc: res.data.data.article_desc,
        });
        setDesc(res.data.data.article_desc)
        var dateTime = String(momentt(res.data.data.added_date).format('YYYY-MM-DD'));
        console.log(dateTime)
        setDateTime(dateTime)
        setImageIds(res.data.data.article_images)
        setOldImages(res.data.images)
        setId(res.data.data.article_id)
        setOpenE(true)
        setLoading(false)

      } else {
        // setSnack({
        //   message: res.data.msg,
        //   type: "error",
        //   open: true,
        // });
        setLoading(false)
        setOpenE(false)


      }

    });

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
        console.log("arr", arr)
        setImages([...images, ...arr]);
      } else {
        alert("Maximum Image limit is 5.");

      }
    }
    e.target.value = ""
  };
  console.log(images)


  const columns = [
    { field: "article_id", headerName: "ID", width: 120, },
    { field: "article_cat_name", headerName: "Category Name", width: 200 },
    { field: "article_title", headerName: "Title", width: 200 },

    {
      field: "article_images", headerName: "Images",width: 200, renderCell: (params) => {

        return (
          <div style={{ marginRight: "1px", padding: "1px" }}>


            {params.value.split(",").map((j) =>

              <img
                src={`/images/articles/${j}`}
                alt="IMAGE"
                width="60"
                height="60"
              />)}
          </div>
        );
      },
    },

    { field: "added_date", headerName: "Added Date", width: 120, valueFormatter: params =>
    momentt(`${params.value}`).format("YYYY-MM-DD"), },
    {
      field: "actions",
      headerName: "Edit",
      type: "actions",
      width: 100,
      renderCell: (row) => (
        <IconButton>
          <EditIcon sx={{ color: "#060847" }} onClick={() => {
            navigate(`/Dashboard/edit_articles/${row.id}`);
            // setId(row.id)
            // setItem({
            //   category: row.row.article_cat_id,

            //   title: row.row.article_title,
            //   // desc: row.row.article_desc,

            // });
            // setDesc(row.row.article_desc)
            // var dateTime = String(momentt(row.row.added_date).format('YYYY-MM-DD'));
            // console.log(dateTime)
            // setDob(dob);
            // setDateTime(dateTime)
            // setImageIds(row.row.article_images)
            // setOldImages(res.data.data[0].prod_images)
            // setOldImages(row.row.article_images.split(","))
            // setOpenE(true)
          }} />
        </IconButton>
      ),
    },

    {
      field: "actions1",
      headerName: "Delete",
      type: "actions",
      width: 70,
      renderCell: (row) => (
        <IconButton>
          <DeleteIcon sx={{ color: "#060847" }} onClick={() => {
            deletedata(row.id)
          }}
          />
        </IconButton>
      ),
    },
  ]

 
  const deletedata = async (id) => {

    const formdata = new FormData();
    formdata.append("id", id)

    formdata.append("aid", admin.admin_id);

    await axios.post("/admin/delete_article", formdata,
      {
        headers: { tkn: tkn },
      }
    ).then(function (res) {
      if (res.data.status === 1) {
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
 

  return (
    <>
         <Helmet>
                
                <title>My Articles | Buy or Sell or Rent Property Online</title>
                 
            </Helmet>
       <Grid container  justifyContent="center"
  alignItems="flex-start">
  <Grid item xs={3}>
      <LeftDrawer /></Grid>
      <Grid item xs={9}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="lg">
          <Box sx={{mt:5, pt: 3,ml:10 }} >
  
  <Typography variant="h5" style={{ color: "#060847" }}>Article Details</Typography>
  <br/>
            <Box
              sx={{
                backgroundColor: "white",
                height: "600px",
                width: "100%",
              }}
            >
              <DataGrid
                hideFooterSelectedRowCount
                rows={articleData}
                columns={columns}
                getRowId={(row) => row.article_id}
                onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pageSize={page}
                // pagination
                getRowHeight={() => 'auto'}
                sx={{
                  '.MuiDataGrid-columnHeaders': {
                    backgroundColor: "#060847",
                    color: "white"
                  },
                  '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                  '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root ': {
                    color: "white"
                  }
                }}
              />
            </Box>
        
          </Box>

          </Container>
        </>
      )}
      </Grid>
      </Grid>
       </>
  );
};



