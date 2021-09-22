import React, {useRef, useState} from 'react'
import FormKK from '../FormKK'
import FormAnggota from '../FormAnggota'
import FormAlatKontrasepsi from '../FormAlatKontrasepsi'
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
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
      //   nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
      };
      const gotoNext = () => {
        sliderRef.current.slickNext();
      }
      const goPrev = () => {
        sliderRef.current.slickPrev();
      }
      const sliderRef = useRef();
      const [rowKK, setRowKK]=useState({});
      const [dataKK, setDataKK]=useState({});
    return(
      <Animated animationIn="zoomIn" isVisible={true}>
        <div className="mb-6">
          <Slider className="sliderMain" ref={sliderRef} {...settings}>
              <div>
              <FormKK
              gotoNext={gotoNext}
              // dataKK={dataKK}
              rowKK={rowKK}
              setRowKK={setRowKK}
              />
              </div>
              <div>
              <FormAnggota
              gotoNext={gotoNext}
              goPrev={goPrev}
              // dataKK={dataKK}
              rowKK={rowKK}
              setRowKK={setRowKK}
              // anggotaKK={anggotaKK}
              />
              </div>
              <div>
              <FormAlatKontrasepsi
              gotoNext={gotoNext}
              />
              </div>
          </Slider>
        </div>
      </Animated>
    )
}

export default FormSurvey