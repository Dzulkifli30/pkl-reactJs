import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Hidden } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import GroupWork from '@material-ui/icons/GroupWork';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import CommentIcon from '@material-ui/icons/Comment';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import Archive from '@material-ui/icons/Search';
import IconAccessibility from '@material-ui/icons/Accessibility';
import IconRoom from '@material-ui/icons/Room';
//


//import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles=makeStyles(theme => ({
  drawer: {
    width: 260,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    //    backgroundColor: theme.palette.primary.main,
    backgroundImage: "url(/img/header.jpeg)",
    backgroundRepeat: 'no-repeat',
    //backgroundPosition:" top left",
    backgroundSize: "cover",
    resizeMode: "cover",
    top: "left",
    color: theme.palette.primary.contrastText,
    display: 'fix',
    flexDirection: 'column',
    height: '100%',
    padding: 0,
  },
  divider: {
    resizeMode: "cover",

    margin: theme.spacing(2, 0)
  },
  nav: {

    marginBottom: theme.spacing(1)
  }
}));

const Sidebar=props => {
  const { /*open, variant,*/ onClose, className, ...rest }=props;

  const classes=useStyles();



  const pages=[
    {
      title: 'Beranda',
      href: '/beranda',
    },

    {

      title: 'Input Data',
      href: '/#',

      items: [

        {
          title: 'Vuser',
          href: '/vusertable'
        },
        {
          title: 'Provinsi',
          href: '/provinsi'
        },
        {
          title: 'Kabupaten',
          href: '/kabupaten'
        },
        {
          title: 'Kecamatan',
          href: '/kecamatan'

        },
        {
          title: 'Kelurahan',
          href: '/kelurahan',
        },
        {
          title: 'Rw',
          href: '/rw',
        },
        {
          title: 'Rt',
          href: '/rt',
        } ,

      ]
    },

    {
      title: 'Laporan Wilayah Indonesia',
      href:'/#',
      items : [
        {
          title: 'Laporan Wilayah Provinsi di Indonesia',
          href: '/laporan/provinsiID'
        },
        {
          title: 'Laporan Wilayah di Provinsi',
          href: '/laporan/perProvTable'
        },
        {
          title:'Laporan Wilayah di Kabupaten',
          href:'/laporan-kabupaten',
        
        },
        {
          title:'Laporan Wilayah Per Kabupaten',
          href:'laporan-per-kabupaten',
        },
        {
          title:'Laporan Wilayah di Kecamatan',
          href:'/laporan-kecamatan'
        },        
        {
          title:'Laporan Wilayah Per Kecamatan',
          href:'/laporan-per-kecamatan'
        },
        {
          title:'Laporan Wilayah di Kelurahan',
          href:'/laporan-kelurahan'
        },
        {
          title:'Laporan Wilayah Per Kelurahan',
          href:'/laporan-perkelurahan'
        },
      ]
    },

    {
      title: 'Laporan Target Sensus',
      href:'/#',
      items : [
        {
          title:'Laporan Target Sensus di Indonesia',
          href:'/laporan-sensus-indonesia'
        },
        {
          title:'Laporan Target Sensus Per Provinsi',
          href:'/laporan-sensus-perprov'
        },
        {
          title:'Laporan Target Sensus Per Kabupaten',
          href:'/laporan-sensus-perkab'
        }
      ]
    },
    {
      title: 'Setting Aplikasi',
      href: '/setting'

    },
    {
      title: 'Kelompok Data',
      href: '/kelompok-data'

    },
    {
      title: 'Visitor User',
      href: '/vuser'

    },
    {
      title: 'Target KK',
      href: '/target-kk'

    },
  ];
  return (

    /*<!-- ======= Header======= -->*/
    <SidebarNav
      className={classes.nav}
      pages={pages}
    />


    /*<!-- End Header -->*/



  );
};

Sidebar.propTypes={
  className: PropTypes.string,
  onClose: PropTypes.func,
  //open: PropTypes.bool.isRequired,
  //variant: PropTypes.string.isRequired
};

export default Sidebar;
