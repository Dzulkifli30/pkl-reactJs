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
import Swal from 'sweetalert2';
import axios from 'axios';
import { urlAddKB, urlEditKB, urlGetIdKK, urlGetNIKAnggota } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
const schema={  
  KK_id: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
  NIK: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
  tahun_pemakaian: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    length: {
      maximum: 4
    }
  },
  alasan: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
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

const KBAddModi=props => {
  const { className, setData, datas, handleClose, getDataBackend, setRowSelect,handleOpen ,handleOpenViewMap , rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);
  const [KK, setKK] = useState([])
  const [AnggotaKK, setAnggotaKK] = useState([])
  const alatKB = JSON.parse(localStorage.getItem("Alat Kontrasepsi"));

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  async function getKK() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlGetIdKK
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKK(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setKK([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getNIKanggota() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlGetNIKAnggota
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setAnggotaKK(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setAnggotaKK([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  useEffect(() => {
    getKK()
    getNIKanggota()

    const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    // console.log("formState", formState)
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

  // const handleClose=() => {
  //   getDataBackend();
  // }

  const handleSave=() => {
    const userName=localStorage.getItem('username');
    let url=urlAddKB;
    // rowSelect.id_provinsi=wilayah[0].id_provinsi
    // rowSelect.id_kabupaten=wilayah[0].id_kabupaten;
    // rowSelect.id_kecamatan=wilayah[0].id_kecamatan;
    // rowSelect.id_kelurahan=wilayah[0].id_kelurahan;
    // rowSelect.id_rw=wilayah[0].id_rw;
    // rowSelect.create_by= userName
    // rowSelect.update_by= userName
    let varJson = {
      "KK_id": rowSelect.KK_id,
      // "data_kb_id": rowSelect.data_kb_id,
      "NIK": rowSelect.NIK,
      "tahun_pemakaian": rowSelect.tahun_pemakaian,
      "alat_kontrasepsi": rowSelect.alatKB,
      "alasan": rowSelect.alasan,
    }
    if (rowSelect.data_kb_id===undefined) {
      url=urlAddKB;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditKB;
      // console.log("ide =",rowSelect.id_rt)
      varJson.LastModifiedBy = userName
    }
    getDataBackend(varJson)
    console.log("var json KB =",varJson);

    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson
      )
    };
    const response=fetch(url, requestOptions)
      .then(tester => {
        if (tester.status === 200) {  
       handleClose();
          return tester.json();
        }
       
      })/**/

      .then(tester => {
        console.log(tester)
        // alert(tester)
      getDataBackend();
      if (url == urlAddKB) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Menambah Data',
          showConfirmButton: false,
          timer: 1000
        })
      }if(url == urlEditKB){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Memperbarui Data',
          showConfirmButton: false,
          timer: 1000
        })
      }

        // alert("Sukses")
        const data=tester;
      })
      .catch((e) => {
        alert(e)
        // swal("Gagal Login!", "Gagal Login", "error",  )
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
        title={title}
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
                label="KK_id"
                margin="dense"
                name="KK_id"
                onChange={handleChange}
                variant="outlined"
                value={rowSelect.KK_id}
                select
              >
                {KK.map(option => (
                  <option
                   value={option.KK_id}
                    key={option.KK_id}
                  >
                    {option.KK_id}
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
                label="NIK"
                margin="dense"
                name="NIK"
                onChange={handleChange}
                variant="outlined"
                value={rowSelect.NIK}
                select
              >
                {AnggotaKK.map(option => (
                  <option
                   value={option.NIK}
                    key={option.NIK}
                  >
                    {option.NIK}
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
                label="Alat Kontrasepsi"
                margin="dense"
                name="alatKB"
                onChange={handleChange}
                variant="outlined"
                value={rowSelect.alatKB}
                select
              >
                {alatKB.map(option => (
                  <option
                   value={option.value_setting}
                    key={option.value_setting}
                  >
                    {option.nama}
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
                label="Tahun Pemakaian"
                margin="dense"
                name="tahun_pemakaian"
                onChange={handleChange}
                helperText={
                  hasError('tahun_pemakaian')? formState.errors.tahun_pemakaian[0]:null
                }
                error={hasError('tahun_pemakaian')}
                defaultValue={rowSelect&&rowSelect.tahun_pemakaian? rowSelect.tahun_pemakaian:''}
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
                label="Alasan Pemakaian"
                margin="dense"
                name="alasan"
                onChange={handleChange}
                helperText={
                  hasError('alasan')? formState.errors.alasan[0]:null
                }
                error={hasError('alasan')}
                defaultValue={rowSelect&&rowSelect.alasan? rowSelect.alasan:''}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {!formState.isValid}
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

KBAddModi.propTypes={
  className: PropTypes.string
};

export default KBAddModi;