import React from 'react'

const FormAlatKontrasepsi = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h1>Form Pengguanan Alat Kontrasepsi</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-primary"
            >
                Next
            </button>
        </div>
    )
}

export default FormAlatKontrasepsi;