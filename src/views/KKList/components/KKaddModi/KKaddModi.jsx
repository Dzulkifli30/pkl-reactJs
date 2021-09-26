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
  TextField
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
import { urlAddFormKK, 
  urlEditFormKK, 
urlRw, urlKel, urlKec, urlKab, urlProv, urlShowKab, urlShowKec, urlShowKel, urlShowRw,urlShowRt

} from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';
const schema={
  NIK_KK: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  NoKK: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  nama_kk: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    // length: {
    //   maximum: 200
    // }
  },
  alamat_kk: {
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

const KKAddModi=props => {
  const { className, setData, getDataBackend,getMockData, setRowSelect, rowSelect, title, handleOpen,gotoNext, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);
  const [kelompokData,setKelompokData]=useState([]);
  const [rw, setRw]=useState([]);
  const [rt, setRt]=useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [kel, setKel]=useState([]);
  const formRt = JSON.parse(localStorage.getItem("form rt"));
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

  const handleChangeProvinsi=event=> {
    handleChange(event)
    showKab(event.target.value)
  } 
  const handleChangeKabupaten=event=> {
    handleChange(event)
    showKecamatan(event.target.value)
  }
  const handleChangeKecamatan=event=> {
    handleChange(event)
    showKel(event.target.value)
  }

  const handleChangeKelurahan=event=> {
    handleChange(event)
    showRw(event.target.value)
  }
  const handleChangeRw=event=> {
    handleChange(event)
    showRt(event.target.value)
  }

  async function showKab(id_provinsi) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_provinsi": id_provinsi,
      })
    };

    let urlShow=urlShowKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        console.log('kabupaten =',data.data)
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showKecamatan(id_kabupaten) {
    /* */
    const requestOptions = {
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kabupaten": id_kabupaten,
      })
    };

    let urlShow = urlShowKec

    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        console.log('kecamatan =', data.data)
        setKecamatan(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKecamatan([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showKel(id_kecamatan) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kecamatan": id_kecamatan,
      })
    };

    let urlShow=urlShowKel

    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        console.log('kelurahan =',data.data)
        setKel(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKel([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showRw(id_kelurahan) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kelurahan": id_kelurahan,
      })
    };

    let urlShow=urlShowRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        console.log('Rw =',data.data)
        setRw(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setRw([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showRt(id_rw) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_rw": id_rw,
      })
    };

    let urlShow=urlShowRt
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        console.log('Rt =',data.data)
        setRt(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setRt([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getKel() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlKel
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKel(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKel([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getKec() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKecAll=urlKec
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetKecAll, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKecamatan(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setKecamatan([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getKab() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKabAll=urlKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetKabAll, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);

        setKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getProv() {
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetProv = urlProv
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlGetProv, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setProvinsi(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setProvinsi([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getRw() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setRw(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
  
        setRw([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }
  ///  const mapRef=createRef();

  useEffect(() => {
    // getProv();
    // showKab(rowSelect.id_provinsi);
    // showKecamatan(rowSelect.id_kab);
    // showKel(rowSelect.id_kec);
    // showRw(rowSelect.id_kel);
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
    const periode_sensus=localStorage.getItem('Periode Sensus');
    let wilayah = JSON.parse(localStorage.getItem("Data Wilayah"))
    rowSelect.id_provinsi=wilayah[0].id_provinsi;
    
    
    let url=urlAddFormKK;
    rowSelect.id_provinsi=wilayah[0].id_provinsi
    rowSelect.id_kabupaten=wilayah[0].id_kabupaten;
    rowSelect.id_kecamatan=wilayah[0].id_kecamatan;
    rowSelect.id_kelurahan=wilayah[0].id_kelurahan;
    rowSelect.id_rw=wilayah[0].id_rw;
    rowSelect.create_by= userName
    rowSelect.periode_sensus = periode_sensus
    rowSelect.update_by= userName
    let varJson = {
      "KK_id": rowSelect.KK_id,
      "periode_sensus": rowSelect.periode_sensus,
      "NoKK": rowSelect.NoKK,
      "NIK_KK": rowSelect.NIK_KK,
      "nama_kk": rowSelect.nama_kk,
      "alamat_kk": rowSelect.alamat_kk,
      "id_provinsi": rowSelect.id_provinsi,
      "id_kab": rowSelect.id_kabupaten,
      "id_kec": rowSelect.id_kecamatan,
      "id_kel": rowSelect.id_kelurahan,
      "id_rw": rowSelect.id_rw,
      "id_rt":rowSelect.id_rt,
    }
    if (rowSelect.KK_id===undefined) {
      url=urlAddFormKK;
      varJson.create_by = userName
      varJson.update_by = userName
    } else {
      url=urlEditFormKK;
      // console.log("ide =",rowSelect.id_rt)
      varJson.update_by = userName
    }
    console.log(rowSelect);
    gotoNext();
    // console.log("var json =",varJson);



    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson
      )
    };

    let urlGetData=urlAddFormKK
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
      if (url == urlAddFormKK) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Menambah Data',
          showConfirmButton: false,
          timer: 1000
        })
      }if(url == urlEditFormKK){
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
                label="Nomor KK"
                margin="dense"
                name="NoKK"
                onChange={handleChange}
                helperText={
                  hasError('NoKK')? formState.errors.NoKK[0]:null
                }
                error={hasError('NoKK')}
                defaultValue={rowSelect&&rowSelect.NoKK? rowSelect.NoKK:''}
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
                label="NIK KK"
                margin="dense"
                name="NIK_KK"
                onChange={handleChange}
                helperText={
                  hasError('NIK_KK')? formState.errors.NIK_KK[0]:null
                }
                error={hasError('NIK_KK')}
                defaultValue={rowSelect&&rowSelect.NIK_KK? rowSelect.NIK_KK:''}
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
                label="nama KK"
                margin="dense"
                name="nama_kk"
                onChange={handleChange}
                helperText={
                  hasError('nama_kk')? formState.errors.nama_kk[0]:null
                }
                error={hasError('nama_kk')}
                defaultValue={rowSelect&&rowSelect.nama_kk? rowSelect.nama_kk:''}
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
                label="alamat KK"
                margin="dense"
                name="alamat_kk"
                onChange={handleChange}
                helperText={
                  hasError('alamat_kk')? formState.errors.alamat_kk[0]:null
                }
                error={hasError('alamat_kk')}
                defaultValue={rowSelect&&rowSelect.alamat_kk? rowSelect.alamat_kk:''}
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
                label="Pilih Rt"
                margin="dense"
                name="id_rt"
                onChange={handleChange}
                select

                value={rowSelect.id_rt}
                variant="outlined"
              >
                {formRt.map((option)=> (
                  <option
                    key={option.id_rt}
                    value={option.id_rt}
                  >
                    {option.nama_rt}
                  </option>
                ))}

              </TextField>

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
            color="secondary"
            className={classes.buttonPrimary}
            variant="contained"
            onClick={handleOpen}

          >
            Lihat Form KK
          </Button>

        </CardActions>
      </form>
    </Card>
  );
};

KKAddModi.propTypes={
  className: PropTypes.string,
};

export default KKAddModi;