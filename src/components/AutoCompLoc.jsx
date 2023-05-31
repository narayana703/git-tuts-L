import { useEffect, React, useState } from 'react';
import { Grid, Typography, TextField, Autocomplete } from '@mui/material';
import Axios from 'axios';

const key = "dqweqwe123y97qhduiasd$@^!*#&bjasdja&^&@!#";

export const Location = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loadingLoc = open && options.length === 0;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChangeHandle = async (value) => {

    await Axios.get("/user/get-location", {
      params: {
        search: value
      },
      headers: { key: key },
    }).then((res) => {

      const places = res.data.preds;
      console.log(places)
      setOptions(Object.keys(places).map(key => places[key].description));

    });

  };

  return (
    <Autocomplete
      id="location"
      error={props.error}
      disableClearable={true}
      defaultValue={props.loc}
      noOptionsText="Location no found.."
      open={open}
      //  disableClearable={false}
      loadingText="Fetching Location...."
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {

        setOpen(false);
      }}
      onChange={(event, newValue) => {

        props.setloc(newValue);
      }}

      // getOptionSelected={(option, value) => option === value}
      getOptionLabel={option => option}
      options={options}
      loading={loadingLoc}

      renderInput={params => (
        <TextField sx={{width:"90%"}}
          {...params}
          label="Location *"
          error={props.error}
          //   className={classes.root} 

          size="small"
          variant="outlined"
          value={props.loc}
          onChange={ev => {

            if (ev.target.value !== "") {
              onChangeHandle(ev.target.value);
            }
          }}
          // onFocus={() => {
          //   if (props.loc !== '') {
          //     onChangeHandle(props.loc);
          //   }
          // }}

          InputProps={{
            ...params.InputProps,
            // style: {
            //   color: "#FFBF00"
            // },
            endAdornment: (
              <>
                {loadingLoc ? (
                  "loading") : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}

      // renderOption={(option) => {
      //   const matches = option;
      //   return (
      //     <Grid container alignItems="center">
      //       <Grid item>
      //       </Grid>
      //       <Grid item xs>

      //         {(matches).substring(0, 20)}
      //         {(matches).length > 20 && "..."}

      //         <Typography variant="body2" color="textSecondary">
      //           {matches}
      //         </Typography>
      //       </Grid>
      //     </Grid>
      //   );
      // }}

    />);
}