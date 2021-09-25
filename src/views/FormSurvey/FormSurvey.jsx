import React, {useRef, useState} from 'react'
import FormKK from '../FormKK'
import FormAnggota from '../FormAnggota'
// import AnggotaKK from 'views/AnggotaKK'
import FormAlatKontrasepsi from '../FormAlatKontrasepsi'
import FormKB from '../FormKB'
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
  const [KK,setKK]=useState([])
  const [AnggotaKK,setAnggotaKK]=useState([])
  const [rowKK, setRowKK]=useState({});

      const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: false,
      //   nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
      };
      const gotoNext = () => {
        rowKK.AnggotaKK = AnggotaKK
        console.log(rowKK)

        sliderRef.current.slickNext();
      }
      const goPrev = () => {
        sliderRef.current.slickPrev();
      }
      const sliderRef = useRef();
      const [dataKK, setDataKK]=useState({});
    return(
      <Animated animationIn="zoomIn" isVisible={true}>
        <div className="">
          <Slider className="sliderMain" ref={sliderRef} {...settings}>
              <div>
              <FormKK
              gotoNext={gotoNext}
              // dataKK={dataKK}
              rowKK={rowKK}
              setRowKK={setRowKK}
              KK={KK}
              setKK={setKK}
              />
              </div>
              <div>
              <FormAnggota
              gotoNext={gotoNext}
              goPrev={goPrev}
              // dataKK={dataKK}
              rowKK={rowKK}
              setRowKK={setRowKK}
              KK={KK}
              setKK={setKK}
              AnggotaKK={AnggotaKK}
              setAnggotaKK={setAnggotaKK}
              // anggotaKK={anggotaKK}
              />
              </div>
              <div>
              <FormKB
              gotoNext={gotoNext}
              KK={KK}
              setKK={setKK}
              />
              </div>
          </Slider>
        </div>
      </Animated>
    )
}

export default FormSurvey