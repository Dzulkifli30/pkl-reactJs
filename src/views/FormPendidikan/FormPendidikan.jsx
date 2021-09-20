import React from 'react'

const FormPendidikan = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h1>Form Pendidikan</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-warning"
            >
                Next
            </button>
        </div>
    )
}

export default FormPendidikan;