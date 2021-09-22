import React from 'react'

const FormAlatKontrasepsi = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h3>Form Pengguanan Alat Kontrasepsi</h3>
            <button
                onClick={gotoNext}
                className="btn btn-sm btn-primary"
            >
                Next
            </button>
        </div>
    )
}

export default FormAlatKontrasepsi;