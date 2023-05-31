import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'

export const Floor=()=> {
    const [fdata,setFData]=useState([])

    const [fname,setFname]=useState("")
    const [fImage,setFImage]=useState("")
    const [openf,setOpenf]=useState(false)
    const [err,setErr]=useState(0)
    const handleCloseF=()=>{setOpenf(false)}

    const deleteFloor = (i) => {
        var arr= [...fdata];
        if(i!=-1){
             arr.splice(i,1);
             setFData(arr);
        }
         console.log(i);
 };

 const addFloor = () => {
    if(fname===""){
        setErr(100);
    }else if(fImage===""){
        setErr(101);
    }else{
        setErr(0);
        let arr={"name":fname,"image":fImage}
        let finalarr=fdata.concat(arr);
        
        setFData(finalarr);
        setFname("");
        setFImage("");
      
        setOpenf(false);
    }
    
};

  return (
    <div>Floor

<TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell><b>name</b></TableCell> */}
            <TableCell align="image"><b>Image</b></TableCell>
            <TableCell align="name"><b>name</b></TableCell>
          
            <TableCell align="right"><b>Action</b></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          
              {fdata.map((value,index)=>(
              <TableRow key={index}>
                    <TableCell  >
                        {value['address']}
                    </TableCell>
                    <TableCell  align="right" >
                        {value['class']}
                    </TableCell>
                    <TableCell  align="right" >
                        {value['startdate']}
                    </TableCell>
                    <TableCell  align="right" >
                        {value['leaveDate']}
                    </TableCell>
                    <TableCell  align="right" >
                        
                        <Button variant="contained" color="primary"  onClick={()=>deleteFloor(index)}>
                            DELETE
                        </Button>
                    </TableCell>
              </TableRow>))}
          </TableBody>
        
        <TableBody>
           
        </TableBody>
      </Table>

</TableContainer>
<Button onClick={(e)=>{setOpenf(true)}}>Add Floor</Button>
<Dialog
                open={openf}
                onClose={handleCloseF}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add Education Details"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={4}
                        >
                <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} >            
                <TextField id="outlined-basic" label="Add Floor" variant="outlined" 
             
               
                value={fname}
                error={err===100 && true}
                onChange={(e)=>{
                    setFname(e.target.value);
                }}
                required    />
                </Grid>
                <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} >            
                <TextField id="outlined-basic" label="Add Image" variant="outlined" 
                 
               
                value={fImage}
                error={err===101 && true}
                onChange={(e)=>{
                    setFImage(e.target.value);
                }}
                required    />
                </Grid>
              
                </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={addFloor} color="primary">
                    ADD
                </Button>
                <Button onClick={handleCloseF} color="primary" autoFocus>
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}
