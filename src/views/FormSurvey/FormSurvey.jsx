import React from 'react'
import Slider from 'react-animated-slider';
// import 'react-animated-slider/build/horizontal.css';
// import './styles.css'
// import './animation.css' 
import ProvinsiList from '../ProvinsiList'
import KabupatenList from '../KabupatenList'

const FormSurvey = () => {
    const content = [
        {
          title:<ProvinsiList/>,
        },
        {
          title: <KabupatenList/>,
        },
        {
          title: "Pencatatan Kartu Keluarga 3",
        },
        {
          title: "Pencatatan Kartu Keluarga 4",
        },
        {
          title: "Pencatatan Kartu Keluarga 5",
        },
      ];
    return(
        <div>
            <Slider className="slider-wrapper">    
              {content.map((con, i)=>(
                <div
                key={i}
                className="slider-content"
                style={{ background: `no-repeat center center` }}
                >
                <div className="inner">
                  <h1> {con.title}</h1>
                </div>
                </div>
              ))}
            </Slider>
        </div>
    )
}

export default FormSurvey