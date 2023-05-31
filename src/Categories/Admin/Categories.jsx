import {
    Box,
    IconButton, Typography, Container, Button, Grid, Dialog, DialogContent, TextField, MenuItem,
  } from "@mui/material";
  import { useCategoriesData } from "./categoriesFunction";
  import { useNavigate } from "react-router-dom";
  import EditIcon from '@mui/icons-material/Edit';
  import { Loading } from "../../components/Loading";

  import { DataGrid } from "@mui/x-data-grid";
  import DeleteIcon from '@mui/icons-material/Delete';
import { LeftDrawer } from "../../Dashboard/Leftdrawer";
  export const Categories = () => {
    const [catData, loading, page, setPage, openE, setOpenE, item, setItem, id, setId,  navigate, itemChange, itemSubmit, err,deletedata] = useCategoriesData();
  
    const columns = [
      { field: "article_cat_id", headerName: "ID", width: 120, },
      { field: "article_cat_name", headerName: "Name", width: 200 },
      // { field: "cat_desc", headerName: "Description", width: 500, },
      { field: "article_cat_status", headerName: "Status", width: 200, valueGetter: (params) => params.row.article_cat_status === 1 ? "Active" : "Inactive" },
      
  
      {
        field: "actions",
        headerName: "Edit",
        type: "actions",
        width: 100,
        renderCell: (row) => (
          <IconButton>
            <EditIcon sx={{ color: "#060847" }} onClick={() => {
              // navigate(`/dashboard/editcategory/${row.id}`);
              setId(row.id)
              setItem({
                name: row.row.article_cat_name,
               
                status: row.row.article_cat_status,
              });
            
              setOpenE(true)
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
            <DeleteIcon sx={{ color: "#060847" }} onClick={()=>{
              deletedata(row.id)
            }}
            />
          </IconButton>
        ),
      },
    ]
    return (
      <>
  
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* <Container maxWidth="md"> */}
            <Box sx={{ pt: 3 }} >
  
  
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "600px",
                  width: "100%",
                }}
              >
                <DataGrid
                   hideFooterSelectedRowCount
                  rows={catData}
                  columns={columns}
                  getRowId={(row) => row.article_cat_id}
                  onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                  rowsPerPageOptions={[10,20,30]}
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
              <Dialog open={openE} onClose={() => setOpenE(false)}>
                <DialogContent sx={{ backgroundColor: "white" }}>
                  <Container maxWidth="sm" >
  
                    <Box sx={{ m: 5, p: 3, textAlign: "center" }}>
                    {loading ? (
          <Loading />
        ) : (
          <>
                      <form onSubmit={itemSubmit}>
  
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography variant="h5" style={{ color: "#060847" }}>Edit Category Details</Typography>
                          <TextField
                            type="text"
                            size="small"
                            name="name"
                            label="Name"
                            value={item.name}
                            onChange={itemChange}
                            error={err == 1 && true}
                            sx={{ m: 2, width: "100%" }}
                          />
  
                         
                          <TextField
                            select
                            fullwidth
                            type="text"
                            size="small"
                            name="status"
                            label="Status"
                            value={item.status}
                            onChange={itemChange}
                            error={err == 3 && true}
                            sx={{ m: 2, width: "100%" }}
                          >
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                          </TextField>
  
                          
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                          >
  
                            <Button size="small" type="submit" variant="contained"
                              sx={{ m: 2, color: "white", backgroundColor: "#060847", "&:hover": { backgroundColor: "#060847" } }}>
                              Update
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                      </>)}
                    </Box></Container>
                </DialogContent>
              </Dialog>
            </Box>
  
            {/* </Container> */}
          </>
        )} 
        
        </>
    );
  };
  
  
  
  