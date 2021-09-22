import React from 'react'
import AnggotaKKList from '../AnggotaKK'
import AnggotaKKAddModi from '../AnggotaKK/components/AnggotaKKAddModi'

const FormAnggota = (props) => {
    const { gotoNext,goPrev,...rest } = props;
    return(
        <div className="">
            <h3>Form Anggota Keluarga</h3>
                <AnggotaKKList/>
        </div>
    )
}

export default FormAnggota;