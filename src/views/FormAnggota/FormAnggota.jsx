import React from 'react'
import AnggotaKKList from '../AnggotaKK'
import AnggotaKKAddModi from '../AnggotaKK/components/AnggotaKKAddModi'

const FormAnggota = (props) => {
    const { gotoNext,goPrev,...rest } = props;
    return(
        <div className="">
            <h3>Form Anggota Keluarga</h3>
            <div className="space-x-4">
            <button
                onClick={goPrev}
                className="btn btn-sm bg-red-500 text-white"
            >
                Prev
            </button>
            <button
                onClick={gotoNext}
                className="btn btn-sm bg-purple-800"
            >
                Next
            </button>
            </div>
            <div className="mb-4 p-10">
                <AnggotaKKList/>
            </div>
        </div>
    )
}

export default FormAnggota;