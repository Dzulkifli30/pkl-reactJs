import React from 'react'

const FormAnggota = (props) => {
    const { gotoNext,...rest } = props;
    return(
        <div className="">
            <h1>Form Anggota Keluarga</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-warning"
            >
                Next
            </button>
        </div>
    )
}

export default FormAnggota;