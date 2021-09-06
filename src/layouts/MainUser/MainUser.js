import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { urlProv,urlKab,urlKec,urlKel,urlRw,urlRt,urlGetVuser } from 'kumpulanUrl';
import { Sidebar, Topbar, Footer, ImportScript } from './components';
import '../../../src/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../src/assets/vendor/dist/font-awesome-4.1.0/css/font-awesome.css';
import '../../../src/assets/vendor/dist/css/AdminLTE.min.css';
import '../../../src/assets/vendor/dist/css/skins/_all-skins.min.css';
import '../../../src/assets/vendor/dist/css/custom.css';
import { select } from 'underscore';

/**/
const useStyles=makeStyles(theme => ({


  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      //paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const MainUser=props => {
  const { children,rowSelect }=props;

  const classes=useStyles();
  const theme=useTheme();
  const isDesktop=useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });


  const [openSidebar, setOpenSidebar]=useState(false);

  const handleSidebarOpen=() => {
    setOpenSidebar(true);
  };

  const handleSidebarcClose=() => {
    setOpenSidebar(false);
  };
  /**/
  const shouldOpenSidebar=isDesktop? true:openSidebar;
  return (
    <>

      <div className="wrapper">

        <header className="main-header">
          <nav className="navbar navbar-static-top  ">
            <div className="container">
              <div className="navbar-header">
                <a href="/beranda" className="navbar-brand"><img src="assets/dist/img/bkkbn-logo-sm.png" height="auto" width="130px" className="img-responsive" /></a>
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                  <i className="fa fa-bars"></i>
                </button>
              </div>

              {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
              <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                <Sidebar />

              </div>{/*<!-- /.navbar-collapse -->*/}
              {/*<!--Navbar Right Menu -->*/}

              <div className="navbar-custom-menu">

                <ul className="nav navbar-nav">

                  {/*<!-- User Account Menu -->*/}
                  <li className="dropdown user user-menu">
                    {/*<!-- Menu Toggle Button -->*/}
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      {/*<!-- The user image in the navbar-->*/}
                      {/*<!--<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">-->*/}
                      {/*<!-- hidden-xs hides the username on small devices so only the image appears. --> */}
                      <span className="hidden-xs"><b>{localStorage.getItem("username")}</b></span>
                    </a>
                    <ul className="dropdown-menu">
                      {/*<!-- The user image in the menu -->*/}
                      <li className="user-header">

                        <img src={'/assets/dist/img/'+localStorage.getItem("Foto")} className="img-circle" alt="User Image" />
                        <p>
                          {localStorage.getItem("NamaLengkap")}
                          <small>{localStorage.getItem("Jabatan")}</small>
                        </p>
                      </li>

                      {/*<!-- Menu Footer-->*/}
                      <li className="user-footer">
                        <div className="pull-left">
                          <a href="/logout" className="btn btn-default btn-flat">Log out</a>
                        </div>
                        <div className="pull-right">
                          <a href="/profile-user" className="btn btn-default btn-flat">Profile</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>{/*<!--/.navbar-custom-menu -->*/}
            </div>
            {/*<!-- /.container-fluid -->*/}
          </nav>
        </header>
        {/*<!-- Full Width Column -->*/}
        <div className="content-wrapper font-poppins" >
          <div className="container font-poppins">
            {/*<!-- Content Header (Page header) -->*/}
            <section className="content-header">
              <h1>&nbsp;
                {/*<!--Top Navigation
                <small>Example 2.0</small>-->*/}
              </h1>
              <ol className="breadcrumb">
                <li className="active"><i className="fa fa-home"></i> Home</li>
              </ol>
            </section>  

            {/*<!-- Main content -->*/}
            <section className="content ">
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title font-poppins">Periode {localStorage.getItem("Periode Sensus")}</h3>
                  <p className="mt-10">  {localStorage.getItem("Setting Label").replace("[username]", localStorage.getItem("username"))}</p>
                </div>
                
                <div className="box-body font-poppins">
                  <main id="main">
                    {children}
                  </main>

                {/* {localStorage.getItem("Setting Label").replace("[username]", localStorage.getItem("username"))}!! to Periode Sensus Tahun {localStorage.getItem("Periode Sensus")} */}
                </div>{/*<!-- /.box-body -->*/}
              </div>{/*<!-- /.box -->*/}
            </section>
            {/*<!-- /.content -->*/}
          </div>
          {/*<!-- /.container -->*/}
        </div>
        {/*<!-- /.content-wrapper -->*/}
        <footer className="main-footer">
          <div className="container">
            Copyright &copy; {localStorage.getItem("Periode Sensus")}. BKKBN. All rights reserved.
          </div>
          {/*<!-- /.container -->*/}
        </footer>
      </div>{/*<!-- ./wrapper-->*/}



      {/* <!-- ======= Hero Section ======= -->*/}
      {/*
      <Sidebar />
      <main id="main">
        {children}

      </main>
      */}
      {/*<!-- End #main -->

    <!--======= Footer======= -->*/}
      {/*<!-- End Footer -->*/}
      {ImportScript("/assets/plugins/jQuery/jQuery-2.1.4.min.js")}
      {ImportScript("/assets/bootstrap/js/bootstrap.min.js")}

      {ImportScript("/assets/plugins/slimScroll/jquery.slimscroll.min.js")}
      {ImportScript("/assets/plugins/fastclick/fastclick.min.js")}
      {ImportScript("/assets/jquery-sticky/jquery.sticky.js")}
      {ImportScript("/assets/dist/js/app.min.js")}
      {ImportScript("/assets/dist/js/demo.js")}
      {
        ImportScript("/assets/dist/js/changebodyMain.js")
      }


      {/*<!-- Vendor JS Files -->*/}

    </>

  );
};

MainUser.propTypes={
  children: PropTypes.node
};

export default MainUser;
