import React, { createRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
import { urlAddKab, urlEditKab, urlKab, urlProv } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
const schema={
  KodeDepdagri: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  nama_kabupaten: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  IsActive: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    /* length: {
       maximum: 1
     }*/
  },
  id_provinsi: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    /* length: {
       maximum: 1
     }*/
  },
  /**/

};

const useStyles=makeStyles(theme => ({
  root: {},
  buttonSuccess: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green,
    '&:hover': {
      backgroundColor: '#4caf50',
      borderColor: '#66bb6a',
      boxShadow: 'none',
    },
  },
  buttonCancel: {
    color: theme.palette.white,
    backgroundColor: theme.palette.red,
    '&:hover': {
      backgroundColor: '#f44336',
      borderColor: '#ef5350',
      boxShadow: 'none',
    },
  },
}));

const KabupatenAddModi=props => {
  const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);
  const [prov, setProv] = useState([])

  const status=[
    {
      value: '1',
      label: 'Active'
    },
    {
      value: '0',
      label: 'Inactive'
    }


  ];

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  ///  const mapRef=createRef();

  async function getProv() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlProv
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setProv(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setProv([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  useEffect(() => {
    getProv()

    const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    console.log("formState", formState)
    //   alert(setOpen)
  }, [rowSelect]); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {

    //    event.persist();

    const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));


    setRowSelect({
      ...rowSelect,
      [event.target.name]: event.target.value
    });
  }

  const handleClose=() => {
    getDataBackend();
  }

<<<<<<< HEAD
  const handleSave=(event) => {
=======
  const handleSave=() => {
>>>>>>> d25e4bde1e22e854a6d49b10262aee6821568b6c
    const userName=localStorage.getItem('username');
    let url=urlAddKab;
    let varJson = {
      "KodeDepdagri": rowSelect.KodeDepdagri,
      "id_provinsi": rowSelect.id_provinsi,
      "id_kabupaten": rowSelect.id_kabupaten,
      "nama_kabupaten": rowSelect.nama_kabupaten,
      "IsActive": rowSelect.IsActive,
    }
    if (rowSelect.id_kabupaten===undefined) {
      url=urlAddKab;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditKab;
      varJson.LastModifiedBy = userName
    }

    //console.log(body);

    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson
      )
<<<<<<< HEAD
    };


=======
    }
  
>>>>>>> d25e4bde1e22e854a6d49b10262aee6821568b6c
    ///let urlGetData=urlPostLogin
    alert(url);
    const response=fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })/**/

      .then(res => {
        //console.log(res)
        //console.log(res.data)
        alert(res.message)

        handleClose();
        getDataBackend();
        //alert("Sukses")
        const data=res;
      })
      .catch((e) => {

        swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

        return false;


      });
    }

    

  //  const position=[currentLocation.lat, currentLocation.lng]
  const hasError=field => {
    return formState&&formState.errors&&formState.errors[field]? true:false;
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader=""
          title={rowSelect.id_kabupaten == undefined ? "Tambah Kabupaten" : "Ubah Kabupaten"}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Kode Depdagri"
                margin="dense"
                name="KodeDepdagri"
                onChange={handleChange}
                helperText={
                  hasError('KodeDepdagri')? formState.errors.KodeDepdagri[0]:null
                }

                error={hasError('KodeDepdagri')}
                defaultValue={rowSelect&&rowSelect.KodeDepdagri? rowSelect.KodeDepdagri:''}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pilih Provinsi"
                margin="dense"
                name="id_provinsi"
                onChange={handleChange
                
                }
                select

                value={rowSelect.id_provinsi}
                variant="outlined"
              >
                {prov.map((option)=> (
                  <option
                    key={option.id_provinsi}
                    value={option.id_provinsi}
                  >
                    {option.nama_provinsi}
                  </option>
                ))}

              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Nama Kabupaten"
                margin="dense"
                name="nama_kabupaten"
                onChange={handleChange}
                helperText={
                  hasError('nama_kabupaten')? formState.errors.nama_kabupaten[0]:null
                }

                error={hasError('nama_kabupaten')}

                defaultValue={rowSelect&&rowSelect.nama_kabupaten? rowSelect.nama_kabupaten:''}
                variant="outlined"
              />
            </Grid>



            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Select aktiv"
                margin="dense"
                name="IsActive"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect&&rowSelect.IsActive? rowSelect.IsActive:''}
                variant="outlined"
              >
                {status.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}

              </TextField>

            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
         {!formState.isValid}
          <Button
            color="primary"
            className={classes.buttonSuccess}
            variant="contained"
            onClick={handleSave}
            disabled={!formState.isValid}

          >
            Simpan
          </Button>

          <Button color="primary"
            className={classes.buttonCancel}
            variant="contained"
            onClick={handleClose} >Batal</Button>

        </CardActions>
      </form>
    </Card>
  );
};

KabupatenAddModi.propTypes={
  className: PropTypes.string
};

export default KabupatenAddModi;