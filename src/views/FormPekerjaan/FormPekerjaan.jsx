import React from 'react'

const FormPekerjaan = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h1>Form Pekerjaan</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-warning"
            >
                Next
            </button>
        </div>
    )
}

export default FormPekerjaan;