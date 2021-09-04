import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {UserSignIn} from 'views'
import {SignIn} from 'views'


const LoginSlider = () => {

    return(
        <Carousel className="h-full ">
            
                <div className="w-full font-poppins mt-9 p-9 mb-12 bg-gray-200 rounded-xl">
                    {/* <img src='images/auth.jpg' /> */}
                    <h4 className="mb-12 font-poppins">Login Petugas Sensus</h4>
                    <UserSignIn className="mt-10"/>
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div className="w-full  mt-9 p-9 mb-12 bg-gray-200 rounded-xl">
                    {/* <img src='images/auth.jpg' /> */}
                    <h4 className="mb-12 font-poppins">Login Pegawai BKKBN</h4>
                    <SignIn className="mt-10"/>

                    {/* <p className="legend">Legend 1</p> */}
                </div>
            </Carousel>
    )
}

// ReactDOM.render(<LoginSlider />, document.querySelector('root'));

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
export default LoginSlider