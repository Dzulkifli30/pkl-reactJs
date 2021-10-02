import React from 'react'
import AnggotaKKList from '../AnggotaKK'
import AnggotaKKAddModi from '../AnggotaKK/components/AnggotaKKAddModi'

const FormAnggota = (props) => {
    const { gotoNext,goPrev,rowKK,setRowKK,KK
        ,setKK,setAnggotaKK,AnggotaKK,getKKID,
        ...rest } = props;
    return(
        <div className="p-4">
            <h1>Form Anggota Keluarga</h1>
            <button
                onClick={goPrev}
                className="btn btn-sm bg-red-500 text-white"
            >
                Prev
            </button>
            <button
                onClick={gotoNext}
                className="btn btn-sm bg-purple-800 ml-10"
            >
                Next
            </button>
                <AnggotaKKList
                KK={KK}
                setKK={setKK}
                rowKK={rowKK}
                getKKID={getKKID}
                setAnggotaKK = {setAnggotaKK}
                AnggotaKK = {AnggotaKK}
                setRowKK={setRowKK}
                />
        </div>
    )
}

export default FormAnggota;