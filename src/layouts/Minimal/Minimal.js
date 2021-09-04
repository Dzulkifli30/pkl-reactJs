import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ImportScript } from '../Main/components';
import '../../../src/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../src/assets/vendor/dist/font-awesome-4.1.0/css/font-awesome.css';
import '../../../src/assets/vendor/dist/css/AdminLTE.min.css';
import '../../../src/assets/vendor/plugins/iCheck/square/blue.css';
import '../../../src/assets/vendor/dist/css/custom.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MinimalUser } from 'layouts';
import { bg_login } from 'assets/img_master_backup';
// import "animate.css"
import {Animated} from "react-animated-css";

const useStyles=makeStyles(() => ({
  root: {
    //    paddingTop: 64,
    //    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal=props => {
  const { children }=props;

  const classes=useStyles();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  return (

    <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
    <div className="login-box">
      <div className="login-logo"> 
        <img src="/assets/dist/img/bkkbn-logo-sm.png" width="253" height="62" />
        <h3>System Informasi Sensus</h3>
      </div>
      {/*<!-- /.login-logo -->*/}
      <div className="login-box-body">
        <p className="login-box-msg">Silahkan Login terlebih dahulu</p>
        <main className={classes.content}>
          {children}
        </main>
      </div>{/*<!-- /.login-box-body -->*/}

      {/*<!-- jQuery 2.1.4 --> */}
      {ImportScript("/assets//plugins/jQuery/jQuery-2.1.4.min.js")}
      {/*<!-- Bootstrap 3.3.4 -->*/}
      {ImportScript("/assets/bootstrap/js/bootstrap.min.js")}
      {       /*    <!-- iCheck -->*/}
      {ImportScript("/assets/plugins/iCheck/icheck.min.js")}

      {
        ImportScript("/assets/dist/js/changebodyMinimal.js")
      }
      
    </div>
    </Animated>

  );
};

Minimal.propTypes={
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;