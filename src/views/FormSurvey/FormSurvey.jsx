import React from 'react'
import ProvinsiList from '../ProvinsiList'
import KabupatenList from '../KabupatenList'
import Slider from "react-slick"; 
import "./slick/slick.css"; 
import "./slick/slick-theme.css";
import {Animated} from "react-animated-css";
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style}}
//       onClick={onClick}
//       ></div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style}}
//       onClick={onClick}
//     />
//   );
// }

const FormSurvey = () => {
      const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      //   nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
      };
    return(
      <Animated animationIn="zoomIn" isVisible={true}>
        <div className="mb-6">
          <Slider {...settings}>
              <div>
              <ProvinsiList/>
              </div>
              <div>
              <KabupatenList/>
              </div>
          </Slider>
        </div>
      </Animated>
    )
}

export default FormSurvey