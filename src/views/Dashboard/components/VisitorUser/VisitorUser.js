import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Icon, InlineIcon } from '@iconify/react';
import counterIcon from '@iconify/icons-mdi/counter';
import PeopleIcon from '@material-ui/icons/People';
import '../../../../assets_sbmpp_bo/css/bootstrap.css';
//import '../../assets/cssnonlogin/core.css';
import '../../../../assets_sbmpp_bo/css/components.css';
import '../../../../assets_sbmpp_bo/css/colors.css';
import '../../../../assets_sbmpp_bo/css/icons/icomoon/styles.css';



const isClient=typeof window==='object';
const useStyles=makeStyles(theme => ({
  root: {
    height: '100%',


  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));
//const isClient=typeof window==='object';
function getSize() {
  return {
    width: isClient? window.innerWidth:undefined,
    height: isClient? window.innerHeight:undefined
  };
}


const VisitorUser=props => {
  const { className, dashboard,
    totalVisitorMobile, totalDailyVisitorMobile, totalUserRegistration,
    totalVisitorWeb, totalDailyVisitorWeb,
    ...rest }=props;
  const [windowSize, setWindowSize]=useState(getSize);
  function handleResize() {
    setWindowSize(getSize());
  }
  //alert(dashboard.totalVisitorMobile)
  //console.log(dashboard.data.listAccessMenuMobile)
  const classes=useStyles();

  return (
    <>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
        style={{
          height: windowSize.width<=780? 400:59+"%",

          //width: '100%'


        }}
      >


        <CardContent style={{
          //background: 'blue', color: 'white',
          //     width: '100%'
          //          background: 'white', color: '#000',
          height: 20+'%',
          border: '1',
          paddingBottom: windowSize.width<=780? 110:37+'%',

        }}
        >
          <Grid
            container
            justify="space-between"
            className="panel"
          >
            <Grid item
              lg={12}
              sm={12}
              xl={6}
              xs={12}
              //            style={{ verticalAlign: '_top',borderBottomColor:'#fff' }}
              style={{
                transparent: true,
                //              borderBottom:
                //              {
                //                color:'#fff',
                //              },
                //height: '100%',
                borderBottomColor: 'rgba(255, 255, 255, 0.3)',
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-teal-400"

            >
              TOTAL AKSES
          </Grid>
            <Grid item
              lg={6}
              sm={6}
              xl={6}
              xs={6}
              style={{
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-teal-400"

            > <h3 class="no-margin"><b><i class="icon-mobile position-left"></i> &nbsp;
              {

                totalVisitorMobile? totalVisitorMobile:'0'
                //      dashboard.totalVisitorMobile
              }</b>
              </h3>
            </Grid>
            <Grid item
              lg={6}
              sm={6}
              xl={6}
              xs={6}
              className="panel-heading bg-teal-400"
            >
              <h3 class="no-margin"><b><i class="icon-earth position-left"></i> &nbsp;
          {
                  totalVisitorWeb? totalVisitorWeb:'0'//dashboard.totalUserRegistration
                }</b></h3>

            </Grid>

          </Grid>
        </CardContent>
        <CardContent style={{
          //background: 'blue', color: 'white',
          //     width: '100%'
          //          background: 'white', color: '#000',
          height: '20%',
          border: '1',
          paddingBottom: windowSize.width<=780? 110:36+'%'
        }}
        >
          <Grid
            container
            justify="space-between"
            className="panel"
          >
            <Grid item
              lg={12}
              sm={12}
              xl={6}
              xs={12}
              //            style={{ verticalAlign: '_top',borderBottomColor:'#fff' }}
              style={{
                transparent: true,
                //              borderBottom:
                //              {
                //                color:'#fff',
                //              },
                //height: '100%',
                borderBottomColor: 'rgba(255, 255, 255, 0.3)',
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-pink-400"

            >
              JUMLAH AKSES HARI INI
          </Grid>
            <Grid item
              lg={6}
              sm={6}
              xl={6}
              xs={6}
              style={{
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-pink-400"

            >
              <h3 class="no-margin"><b><i class="icon-mobile position-left"></i> &nbsp;
              {totalDailyVisitorMobile? totalDailyVisitorMobile:'0'//dashboard.totalDailyVisitorMobile
                }</b></h3>
            </Grid>
            <Grid item
              lg={6}
              sm={6}
              xl={6}
              xs={6}
              className="panel-heading bg-pink-400"
            >
              <h3 class="no-margin"><b><i class="icon-earth position-left"></i> &nbsp;
            {totalDailyVisitorWeb? totalDailyVisitorWeb:'0'//dashboard.totalUserRegistration
                } </b></h3>

            </Grid>

          </Grid>
        </CardContent>

        <CardContent style={{
          //background: 'blue', color: 'white',
          //     width: '100%'
          //          background: 'white', color: '#000',
          height: '20%',
          border: '1',
          paddingBottom: windowSize.width<=780? 110:37+'%',
          //marginBottom: '0px'



        }}
        >
          <Grid
            container
            justify="space-between"
            className="panel"
          >
            <Grid item
              lg={12}
              sm={12}
              xl={6}
              xs={12}
              //            style={{ verticalAlign: '_top',borderBottomColor:'#fff' }}
              style={{
                transparent: true,
                //              borderBottom:
                //              {
                //                color:'#fff',
                //              },
                height: '100%',
                borderBottomColor: 'rgba(255, 255, 255, 0.3)',
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-blue-400"

            >
              TOTAL PENDAFTARAN PENGGUNA
          </Grid>
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
              style={{
                verticalAlign: '_top', fontSize: '13px', fontFamily: [
                  "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
                ]
              }}
              className="panel-heading bg-blue-400"

            >
              <h3 class="no-margin"><b><i class="icon-users4 position-left"></i> &nbsp;{
                totalUserRegistration? totalUserRegistration:'0'//dashboard.totalUserRegistration
              }
              </b>
              </h3>
            </Grid>

          </Grid>
        </CardContent>

      </Card>
    </>
  );
};

VisitorUser.propTypes={
  className: PropTypes.string
};

export default VisitorUser;
