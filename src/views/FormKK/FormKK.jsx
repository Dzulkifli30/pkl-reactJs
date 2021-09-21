import React from 'react'
import KK from '../KK'


const FormKK = (props) => {
    const { gotoNext,...rest } = props;
    return (
        <div className="">
            <h3>Form KK</h3>

            <button
                onClick={gotoNext}
                className="btn btn-sm btn-success"
            >
                Next
            </button>
            <div className="">
                <KK/>
                
            </div>
            
        </div>
    )
}

export default FormKK;