import React, { createRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
  TextField,
  Input
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
import { urlAddAnggotaKK, 
  urlEditAnggotaKK, 
urlRw, urlKel, urlKec, urlKab, urlProv, urlShowKab, urlShowKec, urlShowKel, urlShowRw,urlShowRt,
} from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';
const schema={
  NIK: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  tempat_lahir: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  no_paspor: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  no_katas: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  nama_ayah: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  nama_ibu: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
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

const AnggotaKKAddModi=props => {
  const { className, setData,datas, getDataBackend,getMockData, setRowSelect,gotoNext, rowSelect,handleOpenViewMap, title, ...rest }=props;

  const classes=useStyles();

  const agama = JSON.parse(localStorage.getItem("agama"));
  const jenis_kelamin = JSON.parse(localStorage.getItem("jenis_kelamin"));
  const pendidikan = JSON.parse(localStorage.getItem("pendidikan"));
  const jenis_pekerjaan = JSON.parse(localStorage.getItem("pekerjaan"));
  const status_nikah = JSON.parse(localStorage.getItem("status_nikah"));
  const status_dalam_keluarga = JSON.parse(localStorage.getItem("status_dalam_keluarga"));
  const kewarganegaraan = JSON.parse(localStorage.getItem("kewarganegaraan"));
  const [values, setValues]=useState({});
  // const status_nikah=[
  //   {
  //     value: '1',
  //     label: 'Menikah'
  //   },
  //   {
  //     value: '0',
  //     label: 'Belum Menikah'
  //   }
  // ];
  
  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  
  ///  const mapRef=createRef();

  useEffect(() => {
    // getProv();
    // showKab(rowSelect.id_provinsi);
    // showKecamatan(rowSelect.id_kabupaten);
    // showKel(rowSelect.id_kecamatan);
    // showRw(rowSelect.id_kelurahan);
    // showRt(rowSelect.id_rw);

    const errors=validate(rowSelect, schema);
    console.log(errors)
    console.log("rowSelect", rowSelect)
    console.log("schema", schema)

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    console.log("formState", formState)
    // if (title!='Tambah Anggota KK' && rowSelect.id_rt_old===undefined) {
    //   rowSelect.id_rt_old=rowSelect.id_rt;
    //   rowSelect.Periode_Sensus_old=rowSelect.Periode_Sensus;
    //   console.log('rs = ',rowSelect)
    // }
    //   alert(setOpen)
  }, [rowSelect]);  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


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


  const handleSave=(event) => {
    const userName=localStorage.getItem('username');
    let varJson = {
      "KK_id": rowSelect.KK_id,
      "anggota_kk_id": rowSelect.anggota_kk_id,
      "periode_sensus": rowSelect.periode_sensus,
      "NIK":rowSelect.NIK,
      "jenis_kelamin":rowSelect.jenis_kelamin,
      "tempat_lahir":rowSelect.tempat_lahir,
      "tanggal_lahir": rowSelect.tanggal_lahir,
      "agama": rowSelect.agama,
      "pendidikan": rowSelect.pendidikan,
      "jenis_pekerjaan": rowSelect.jenis_pekerjaan,
      "status_nikah": rowSelect.status_nikah,
      "tanggal_pernikahan": rowSelect.tanggal_pernikahan,
      "status_dalam_keluarga": rowSelect.status_dalam_keluarga,
      "kewarganegaraan": rowSelect.kewarganegaraan,
      "no_paspor": rowSelect.no_paspor,
      "no_katas": rowSelect.no_katas,
      "nama_ayah": rowSelect.nama_ayah,
      "nama_ibu": rowSelect.nama_ibu,
    }
    // let url=urlAddAnggotaKK;
    if (rowSelect.anggota_kk_id === undefined) {
      // url=urlAddAnggotaKK;
      varJson.create_by = userName
      varJson.update_by = userName
    } else {
      // url=urlEditAnggotaKK;
      varJson.update_by = userName
    }
    getDataBackend(varJson)
    console.log("var json =",varJson);



    // const requestOptions={
    //   method: 'POST',
    //   mode: "cors",
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(
    //     varJson
    //   )
    // };


    ///let urlGetData=urlPostLogin
    // alert(url);
    // console.log(url)
    // const response=fetch(url, requestOptions)
    //   .then(tester => {
    //     if (tester.status === 200) {  
    //    handleClose();
    //       return tester.json();
    //     }
       
    //   })/**/

    //   .then(tester => {
    //     console.log(tester)
    //     // alert(tester)
    //   getDataBackend();
    //   if (url == urlAddAnggotaKK) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Sukses Menambah Data',
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //   }if(url == urlEditAnggotaKK){
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Sukses Memperbarui Data',
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //   }

    //     // alert("Sukses")
    //     const data=tester;
    //   })
    //   .catch((e) => {
    //     alert("RUSAk")
    //     // swal("Gagal Login!", "Gagal Login", "error",  )
    //     return false;


    //   });


  }
  const handling =()=>{
    {
      var tmp = [];
      // alert(tmp) 
      // alert( localStorage.getItem("Periode Sensus") - 5 )
      var periode_sensus = parseInt(localStorage.getItem("Periode Sensus"));
      for (var option = periode_sensus; option <= periode_sensus + 5; option++)
       {tmp.push({"option" : option});}
      console.log('temp =',tmp)
      return tmp.map(option => (
          <option value={option.option}>
            {option.option}
          </option>
                   
           ))}
  }
  const handlings =()=>{
    {
      var pm = [];
      // alert(pm) 
      // alert( localStorage.getItem("Periode Sensus") - 5 )
      var agama = parseInt(localStorage.getItem("agama"));
       {pm.push({"agama" : agama});}
      console.log('agama =',pm)
      return pm.map(agama => (
          <option value={agama.agama}>
            {agama.agama}
          </option>
                   
           ))}
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
                label="Periode Sensus"
                margin="dense"
                name="periode_sensus"
                onChange={handleChange}
                select
                variant="outlined"
                value={rowSelect.periode_sensus}
              >
                {handling()}
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
                helperText={
                  hasError('NIK')? formState.errors.NIK[0]:null
                }
                error={hasError('NIK')}
                defaultValue={rowSelect&&rowSelect.NIK? rowSelect.NIK:''}
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
                label="KK_id"
                margin="dense"
                name="KK_id"
                onChange={handleChange}
                helperText={
                  hasError('KK_id')? formState.errors.KK_id[0]:null
                }
                error={hasError('KK_id')}
                defaultValue={rowSelect&&rowSelect.KK_id? rowSelect.KK_id:''}
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
                label="Tempat Lahir"
                margin="dense"
                name="tempat_lahir"
                onChange={handleChange}
                helperText={
                  hasError('tempat_lahir')? formState.errors.tempat_lahir[0]:null
                }
                error={hasError('tempat_lahir')}
                defaultValue={rowSelect&&rowSelect.tempat_lahir? rowSelect.tempat_lahir:''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
              <Input
                fullWidth
                
                type="date"
                margin="dense"
                name="tanggal_lahir"
                onChange={handleChange}
                helperText={
                  hasError('tanggal_lahir')? formState.errors.tanggal_lahir[0]:null
                }
                error={hasError('tanggal_lahir')}
                defaultValue={rowSelect&&rowSelect.tanggal_lahir? rowSelect.tanggal_lahir:''}
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
                label="Jenis Kelamin"
                margin="dense"
                name="jenis_kelamin"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.jenis_kelamin}
                variant="outlined"
              >
              {jenis_kelamin.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Pilih Agama"
                margin="dense"
                name="agama"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.agama}
                variant="outlined"
              >
              {agama.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Pendidikan"
                margin="dense"
                name="pendidikan"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.pendidikan}
                variant="outlined"
              >
              {pendidikan.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Pekerjaan"
                margin="dense"
                name="jenis_pekerjaan"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.jenis_pekerjaan}
                variant="outlined"
              >
              {jenis_pekerjaan.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Status Nikah"
                margin="dense"
                name="status_nikah"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.status_nikah}
                variant="outlined"
              >
              {status_nikah.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
              <label htmlFor="tanggal_pernikahan">Tanggal Pernikahan</label>
              <Input
                fullWidth
                
                type="date"
                margin="dense"
                name="tanggal_pernikahan"
                onChange={handleChange}
                helperText={
                  hasError('tanggal_pernikahan')? formState.errors.tanggal_pernikahan[0]:null
                }
                error={hasError('tanggal_pernikahan')}
                defaultValue={rowSelect&&rowSelect.tanggal_pernikahan? rowSelect.tanggal_pernikahan:''}
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
                label="Status Dalam Keluarga"
                margin="dense"
                name="status_dalam_keluarga"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.status_dalam_keluarga}
                variant="outlined"
              >
              {status_dalam_keluarga.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Kewarganegaraan"
                margin="dense"
                name="kewarganegaraan"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.kewarganegaraan}
                variant="outlined"
              >
              {kewarganegaraan.map(option => (
                  <option
                    key={option.value_setting}
                    value={option.value_setting}
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
                label="Nomor Paspor"
                margin="dense"
                name="no_paspor"
                onChange={handleChange}
                helperText={
                  hasError('no_paspor')? formState.errors.no_paspor[0]:null
                }
                error={hasError('no_paspor')}
                defaultValue={rowSelect&&rowSelect.no_paspor? rowSelect.no_paspor:''}
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
                label="Nomor Katas"
                margin="dense"
                name="no_katas"
                onChange={handleChange}
                helperText={
                  hasError('no_katas')? formState.errors.no_katas[0]:null
                }
                error={hasError('no_katas')}
                defaultValue={rowSelect&&rowSelect.no_katas? rowSelect.no_katas:''}
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
                label="Nama Ayah"
                margin="dense"
                name="nama_ayah"
                onChange={handleChange}
                helperText={
                  hasError('nama_ayah')? formState.errors.nama_ayah[0]:null
                }
                error={hasError('nama_ayah')}
                defaultValue={rowSelect&&rowSelect.nama_ayah? rowSelect.nama_ayah:''}
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
                label="Nama Ibu"
                margin="dense"
                name="nama_ibu"
                onChange={handleChange}
                helperText={
                  hasError('nama_ibu')? formState.errors.nama_ibu[0]:null
                }
                error={hasError('nama_ibu')}
                defaultValue={rowSelect&&rowSelect.nama_ibu? rowSelect.nama_ibu:''}
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
            Simpan dan Next
          </Button>
          <Button 
          color="primary"
          variant="contained"
          onClick={(e) => handleOpenViewMap(e, "Tampilkan Table Data KB")}>
          Tampilkan Table
          </Button>

        </CardActions>
      </form>
    </Card>
  );
};

AnggotaKKAddModi.propTypes={
  className: PropTypes.string,
};

export default AnggotaKKAddModi;