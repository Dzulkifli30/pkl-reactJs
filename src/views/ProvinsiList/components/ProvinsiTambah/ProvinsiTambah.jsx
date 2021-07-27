import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { PropTypes } from '@material-ui/core';
import axios from 'axios';
import{
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
  } from '@material-ui/core';
  import { urlAddProv } from '../../../../kumpulanUrl';
//   export const urlAddProv=ulrport+'provinsi/storeProv' <= untuk url Add Provinsi
  import validate from 'validate.js';

  const schema= {
      KodeDepdagri: {
          presence : {allowEmpty: false, message: 'Kolom Harus Diisi'},
          length:{
              maximum: 200
          }
      },
      nama_provinsi: {
          presence: {allowEmpty: false, message: 'Kolom Harus Diisi'},
          length: {
              maximum:200
          }
      },
      isActive: {
        presence: {allowEmpty: false, message: 'Kolom Harus Diisi'},
      }
  };
  
  const useStyles = makeStyles (theme => ({
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

  const ProvinsiTambah =props => {
      const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest }=props;
      const classes=useStyles();

      const [values, setValues]=useState({});
      const [getStatus, setStatus]=useState([]);
      const [getKeyId, setKeyId]=useState([]);
    
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


      useEffect(() => {
        /*
        if (rowSelect.IsActive==='1') {
          rowSelect.status='Active'
        } else if (rowSelect.status==='0') {
          rowSelect.status='Non Activw'
        }*/
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
    
    
        //   alert(setOpen)
      }, [rowSelect]);
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
        const userId=localStorage.getItem('user_id');
        let url=urlAddProv;
        if (rowSelect.id_provinsi===undefined) {
          url=urlAddProv;
        } else {
          url=urlEditProv;
        }
    
        //console.log(body);
    
    
    
    
        const requestOptions={
          method: 'POST',
          mode: "cors",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "KodeDepdagri": rowSelect.KodeDepdagri,
            "id_provinsi": rowSelect.id_provinsi,
            "nama_provinsi": rowSelect.nama_provinsi,
            "IsActive": rowSelect.IsActive,
          })
        };
    
    
        ///let urlGetData=urlPostLogin
    
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
    
          const hasError=field => {
            return formState&&formState.errors&&formState.errors[field]? true:false;
          }
          return (
              <Card 
              {...rest}
              >
        <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader=""
          title="Tambah Provinsi"
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
                label="Nama provinsi"
                margin="dense"
                name="nama_provinsi"
                onChange={handleChange}
                helperText={
                  hasError('nama_provinsi')? formState.errors.nama_provinsi[0]:null
                }

                error={hasError('nama_provinsi')}

                defaultValue={rowSelect&&rowSelect.nama_provinsi? rowSelect.nama_provinsi:''}
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
          valid{!formState.isValid}
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
          )
      }
  }
  export default ProvinsiTambah;