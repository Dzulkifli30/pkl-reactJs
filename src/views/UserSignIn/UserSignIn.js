import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
//import mockDataUser from '../UserList/datauser';
import md5 from 'md5'
import swal from '@sweetalert/with-react';
import '../../assets/css_swal/cssSwal.css';
import {bg_login} from '../../assets/img_master_backup/index'
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import { urlPostLoginUser } from '../../kumpulanUrl';

import UsersByDevice from 'views/Dashboard/components/UsersByDevice';

const schema={
  UserName: {
    presence: { allowEmpty: false, message: 'is required' },
    //email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles=makeStyles(theme => ({
  root: {
    //backgroundColor: theme.palette.background.default,
    height: '100%',
    width: '100%'
  },
  grid: {
    marginTop: '-4%',
    height: '100%',

    //height: '20%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '50%',
    //display: 'flex',
    //flexDirection: 'column'
  },
  contentHeader: {
    //    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)/**/
  },
  logoImage: {
    // marginLeft: theme.spacing(4)
  },
  contentBody: {
    //flexGrow: 1,
    //display: 'flex',
    alignItems: 'center',
    paddingTop: -10,
    //width: '100%'
  },
  form: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 2,
    //marginLeft: '25%',
    flexBasis: 600,
  },
  title: {
    marginTop: theme.spacing(-1)
  },
  sugestion: {
    marginTop: theme.spacing(0),
  },
  textField: {
    marginTop: theme.spacing(40)
  },
  signInButton: {
    //margin: theme.spacing(2, 0)
  }
}));

const UserSignIn=props => {
  const { history }=props;
  const [users, setUsers]=useState([]/*mockDataUser*/);
  const classes=useStyles();

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors=validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors? false:true,
      errors: errors||{}
    }));
  }, [formState.values]);

  const handleBack=() => {
    history.goBack();
  };

  const handleChange=event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type==='checkbox'
            ? event.target.checked
            :event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn=event => {
    //event.preventDefault();
    //
    event.preventDefault();
    /* */
    async function getData() {
      const requestOptions={
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "UserName": formState.values.UserName,
          "password": formState.values.password,
        })
      };


      let urlGetData=urlPostLoginUser
      
      const response=await fetch(urlGetData, requestOptions)
        .then(res => {
          return res.json();
        })/**/

        .then(res => {
          const data=res;

          //console.log(data.data);
          if (data.code=="00") {
            //{ userId: "A6B433CD8F15397BE05314B5A8C00F89" }
            // localStorage.setItem('nama_provinsi', data.data[0].nama_provinsi);
            // localStorage.setItem('nama_kabupaten', data.data[0].nama_kabupaten);
            // localStorage.setItem('nama_kecamatan', data.data[0].nama_kecamatan);
            // localStorage.setItem('nama_kelurahan', data.data[0].nama_kelurahan);
            // localStorage.setItem('nama_rw', data.data[0].nama_rw);
            // localStorage.setItem('nama_rt', data.data[0].nama_rt);
            // localStorage.setItem('id_provinsi', data.data[0].id_provinsi);
            // localStorage.setItem('id_kabupaten', data.data[0].id_kabupaten);
            // localStorage.setItem('id_kecamatan', data.data[0].id_kecamatan);
            // localStorage.setItem('id_kelurahan', data.data[0].id_kelurahan);
            // localStorage.setItem('id_rw', data.data[0].id_rw);
            // localStorage.setItem('id_rt', data.data[0].id_rt);
            // localStorage.setItem('Format RT : ',{id_rt});
            localStorage.setItem('username', data.data[0].UserName);
            localStorage.setItem('NamaLengkap', data.data[0].NamaLengkap);
            localStorage.setItem('roleName', data.data[0].roleName);
            localStorage.setItem('id', data.data[0].id);
            localStorage.setItem('Jabatan', data.data[0].Jabatan);
            localStorage.setItem('Alamat', data.data[0].Alamat);
            localStorage.setItem('NIK', data.data[0].NIK);
            localStorage.setItem('Email', data.data[0].Email);
            localStorage.setItem('Foto', data.data[0].Foto);
            localStorage.setItem('Periode Sensus', data.data2[0].value_setting);
            localStorage.setItem('Setting Label', data.data3[0].value_setting);
            localStorage.setItem('Title Email', data.data4[0].value_setting);
            localStorage.setItem('Data Wilayah', JSON.stringify(data.wilayah));
            localStorage.setItem('Form Rt', JSON.stringify(data.rt));
            localStorage.setItem('Period', JSON.stringify(data.data5));
            localStorage.setItem('body', data.data4[1].value_setting);
            localStorage.setItem('url', data.data4[2].value_setting);
            localStorage.setItem('nama wilayah', JSON.stringify(data.data5));
            // localStorage.setItem('form rt', JSON.stringify(data.data6));
            localStorage.setItem('rt', data.data5[0].nama_rt);
            window.location='/beranda-user';

            //history.push('/beranda');

          } else{  
            console.log(data);
            setFormState(formState => ({
              ...formState,
              isValid: false,
              errors: false
            }));
            // setFormState(formState => ({
            //   ...formState,
            //   values: {
            //     UserName: '',
            //     password: ''
            //   },
            //   isValid: false,
            //   errors: true
            // }));
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Login Tidak Sesuai  ',
              showConfirmButton: false,
              timer: 1000
            })
            
            return false;
          }
        })
        .catch((e) => {
          console.log(e)
          alert("Anda Tidak mempunyai akses");
          setFormState(formState => ({
            ...formState,
            isValid: false,
            errors: false
          }));

          swal("Gagal Login!", "Anda Tidak Mempunyai UserAccess", "error")
          return false;


        });


      //      setOpen(false);


    }

    getData()
    /**/



    /*requestOptions*/

    //    console.log("users", users)
    let users4=users.find(user => user.UserName===formState.values.user_name
      &&user.userPassword===md5(formState.values.password));

    //alert(formState.values.user_name)
    ///console.log("users4", users4);
    ///alert(formState.values.user_name)
    //alert(formState.values.password)

    /**/


    //history.push('/');
  };

  const hasError=field =>
    formState.touched[field]&&formState.errors[field]? true:false;

  return (
    <div className={classes.root,"font-poppins"}>
      <Grid
        className={classes.grid}
        container
        style={{ width: "92%" }}
      >
        <Grid
          className={classes.content}
          item
          lg={12}
          xs={12}
        >
          <div className={classes.content}>
            {/* <div>{bg_login}</div> */}
            <div className="d-md flex" style={{ width: '100%' }}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >


                <Grid
                  className={classes.grid}
                  container
                >
                  <Grid
                    // className={classes.content}
                    item
                    lg={6}
                    xs={6}

                  >
                    <br />
                    <Typography
                      style={{ verticalAlign: 'bottom' }}
                      className={classes.title}
                      variant="h6"
                      margin="normal"
                    >
                      Username
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.content}
                    item
                    lg={6}
                    xs={6}
                  >

                    <TextField
                      className="form-control"
                      fullWidth
                      margin="dense"

                      error={hasError('UserName')}
                      fullWidth
                      helperText={
                        hasError('UserName')? formState.errors.UserName[0]:null
                      }
                      name="UserName"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.UserName||''}
                      variant="outlined"

                    />
                  </Grid>
                  <Grid
                    //className={classes.content}
                    item
                    lg={6}
                    xs={6}
                  >
                    <br />
                    <Typography
                      className={classes.title}
                      variant="h6"
                    >
                      Kata Kunci
                    </Typography>
                  </Grid>
                  <Grid
                    //className={classes.content}
                    item
                    lg={6}
                    xs={6}
                  >

                    <TextField
                      className="form-control"
                      error={hasError('password')}
                      fullWidth
                      helperText={
                        hasError('password')? formState.errors.password[0]:null
                      }
                      //label="Password"
                      name="password"
                      margin="dense"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password||''}
                      variant="outlined"
                      style={{ marginBottom: 12 }}
                    />

                  </Grid>

                </Grid>


                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  //fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                //style={{ marginTop: '2%', marginBottom: '-2%' }}
                >
                  Masuk
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
    
  );
};

UserSignIn.propTypes={
  history: PropTypes.object
};

export default withRouter(UserSignIn);