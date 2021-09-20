import React from 'react'

const FormPendapatan = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h1>Form Pendapatan</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-warning"
            >
                Next
            </button>
        </div>
    )
}

export default FormPendapatan;