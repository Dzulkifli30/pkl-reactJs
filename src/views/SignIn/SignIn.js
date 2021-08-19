import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
//import mockDataUser from '../UserList/datauser';
import md5 from 'md5'
import swal from '@sweetalert/with-react';
import '../../assets/css_swal/cssSwal.css';

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
import { urlPostLogin } from '../../kumpulanUrl'
import UsersByDevice from 'views/Dashboard/components/UsersByDevice';

const schema={
  user_name: {
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
    //marginLeft: theme.spacing(4)
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

const SignIn=props => {
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
          "UserName": formState.values.user_name,
          "password": formState.values.password,
        })
      };


      let urlGetData=urlPostLogin
      const response=await fetch(urlGetData, requestOptions)
        .then(res => {
          return res.json();
        })/**/

        .then(res => {

          const data=res;
          //console.log(data.data);
          if (data.code=="00") {
            //{ userId: "A6B433CD8F15397BE05314B5A8C00F89" }
            localStorage.setItem('username', data.data[0].UserName);
            localStorage.setItem('NamaLengkap', data.data[0].NamaLengkap);
            localStorage.setItem('roleName', data.data[0].roleName);
            localStorage.setItem('accessId', data.data[0].accessId);
            localStorage.setItem('Jabatan', data.data[0].Jabatan);
            localStorage.setItem('Foto', data.data[0].Foto);
            localStorage.setItem('Periode Sensus', data.data2[0].value_setting);
            window.location='/beranda';
            //history.push('/beranda');

          } else {
            console.log(data);
            setFormState(formState => ({
              ...formState,
              values: {
                user_name: '',
                password: ''
              },
              isValid: false,
              errors: true
            }));
            swal(
              <div>
                <img src='/assets/images/error.png' width='40px' height='40px'></img>
                <h3>{data.code} sasa</h3>
              </div>
            )
            return false;
          }
        })
        .catch((e) => {
          console.log(e)
          alert("err");
          setFormState(formState => ({
            ...formState,
            isValid: false,
            errors: false
          }));

          swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

          return false;


        });


      //      setOpen(false);


    }

    getData();
    /**/



    /*requestOptions*/

    //    console.log("users", users)
    let users4=users.find(user => user.userName===formState.values.user_name
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
    <div className={classes.root}>
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
            <div className={classes.contentBody} style={{ width: '100%' }}>
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
                      ID Pengguna
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
                      error={hasError('email')}
                      fullWidth
                      margin="dense"

                      /*
                      helperText={
                        hasError('email')? formState.errors.email[0]:null
                      }*/
                      //label="User Name"
                      name="user_name"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.user_name||''}
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

SignIn.propTypes={
  history: PropTypes.object
};

export default withRouter(SignIn);