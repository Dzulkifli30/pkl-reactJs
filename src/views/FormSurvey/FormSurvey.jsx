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
import { useHistory } from "react-router-dom";
import { urlAccKK, urlAddFormKK, urlGetFormKK } from 'kumpulanUrl'
import Swal from 'sweetalert2'

const FormSurvey = () => {
  const [KK,setKK]=useState([])
  const [AnggotaKK,setAnggotaKK]=useState([])
  const [rowKK, setRowKK]=useState({});
  const [kb, setKB]=useState([]);

      const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: false,
      //   nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
      };
      const history = useHistory();
      function refreshPage(){
        KK.push(rowKK)
        // sliderRef.current.slickNext();
        // rowKK = useState({})
        // delete rowKK.kb
        // delete rowKK.AnggotaKK
        // delete rowKK.NIK_KK
        // delete rowKK.KK_id
        // delete rowKK.periode_sensus
        // delete rowKK.id_provinsi
        // delete rowKK.id_kabupaten
        // delete rowKK.id_kecamatan
        // delete rowKK.id_kelurahan
        // delete rowKK.id_rt
        // delete rowKK.id_rw
        // delete rowKK.alamat_kk
        // delete rowKK.NoKK
        // delete rowKK.nama_kk
        // delete rowKK.update_by
        // delete rowKK.create_by
        localStorage.setItem("Data KK",JSON.stringify(KK))
        window.location.reload();
        // 
        // setRowKK({})
        // rowKK = {}
        // 
          // history.push("/form-survey")
        // sliderRef.current.slickNext();
      }
      const gotoNext = () => {
        rowKK.AnggotaKK = AnggotaKK
        // 
        // 

        sliderRef.current.slickNext();
      }

      const getKKID = () => {
        KK.push(rowKK)
      }

      async function kirimData  () {
        rowKK.kb = kb
        KK.push(rowKK)
        // 

        const requestOptions={
          method: 'POST',
          //mode: "cors",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "KK": KK,
          })
        };
    
        let urlAdd=urlAccKK
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlAdd, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Mengirim Data',
          showConfirmButton: false,
          timer: 1000
        })
        // setRowKK(data.data);
        //return false;
      })
      .catch(e => {
        //
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal Mengirim Data',
          showConfirmButton: false,
          timer: 1000
        })
        // setRowKK([]);
        //this.setState({ ...this.state, isFetching: false });
      });
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
              getKKID={getKKID}
              setKK={setKK}
              AnggotaKK={AnggotaKK}
              setAnggotaKK={setAnggotaKK}
              // anggotaKK={anggotaKK}
              />
              </div>
              <div>
              <FormKB
              kirimData={kirimData}
              gotoNext={gotoNext}
              AnggotaKK={AnggotaKK}
              rowKK={rowKK}
              KK={KK}
              rowKK={rowKK}
              setRowKK={setRowKK}
              setKK={setKK}
              refreshPage={refreshPage}
              setAnggotaKK={setAnggotaKK}
              setRowKK={setRowKK}
              kb={kb}
              setKB={setKB}
              />
              </div>
          </Slider>
        </div>
      </Animated>
    )
}

export default FormSurvey