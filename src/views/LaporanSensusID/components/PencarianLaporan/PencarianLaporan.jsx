import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { urlGetSetting, urlShowTargetKk } from '../../../../kumpulanUrl'
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import {LapPeriode} from '../../../../components';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
// import { urlGetKelompokData, urlGetSetting, urlShowKelompokData, urlShowSetting } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';

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
      marginTop: '10px',
      marginBottom: '10px',
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


const PencarianLaporan=props => {
  const { className, textfind, onChange, style, rowSelect, setRowSelect, getDataBackend, ...rest }=props;
  const classes=useStyles();
  const schema = {
    // Periode_Sensus: {
    //   presence: { allowEmpty: false, message: 'harus diisi' },
    // },
  };

  const[setting, setSetting]=([])

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  useEffect(() => {
    // rowSelect.Periode_Sensus = localStorage.getItem("Periode Sensus")
    /*
    if (rowSelect.IsActive==='1') {
      rowSelect.status='Active'
    } else if (rowSelect.status==='0') {
      rowSelect.status='Non Activw'
    }*/
    // alert('ini pro')
    const errors=validate(rowSelect,schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]); 

  const handleSave=() => {
    getDataBackend(rowSelect)
    console.log(rowSelect.Periode_Sensus)
  }

const hasError=field => {
    return formState&&formState.errors&&formState.errors[field]? true:false;
  }
  const handleChange=event => {
  alert('masuk')    
    //    event.persist();
// if (event != undefined) {
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
// }

    
    
 
    // let nama = event.target.name.replace("id","nama")
    // if (event.target.name == "id_setting") {
    //   setRowSelect({
    //     ...rowSelect,
    //      [nama]:pencarian(Setting,event.target.value),
    //      [event.target.name]: event.target.value,
    //   });
    //   // console.log("Ket Setting =", Setting)
    // }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
                <form
        autoComplete="off"
        noValidate
      >
         <LapPeriode
              onChange={handleChange}
              rowSelect={rowSelect}
            />
     
         {!formState.isValid}
          <Button
            color="primary"
            className={classes.buttonSuccess}
            variant="contained"
            onClick={handleSave}
            disabled={!formState.isValid}
          >
            Search
          </Button>
      </form>
    </Card>
  );
};

PencarianLaporan.propTypes={
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default PencarianLaporan;