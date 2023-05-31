import {Grid} from '@mui/material';
import {CircularProgress} from '@mui/material';

export const Loading = () =>{

    return (<Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    style={{height:'70vh' }}
    >
            <CircularProgress style={{color:"#060847",}} />
            </Grid>);

}

 