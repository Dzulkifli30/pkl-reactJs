import React from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './styles.css'

const FormSurvey = () => {
    const content = [
        {
          title: "Pencatatan Kartu Keluarga 1",
        },
        {
          title: "Pencatatan Kartu Keluarga 2",
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
            {content.map((item, index) => (
                <div
                key={index}
                className="slider-content"
                style={{ background: `no-repeat center center` }}
                >
                <div className="inner">
                    <h1>{item.title}</h1>
                </div>
                </div>
            ))}
            </Slider>
        </div>
    )
}

export default FormSurvey