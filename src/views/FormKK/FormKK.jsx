import React from 'react'
import KKList from '../KKList'

const FormKK = (props) => {
    const { gotoNext,rowKK,setRowKK,KK,setKK,setAnggotaKK,AnggotaKK,...rest } = props;
    return(
        <div className="p-4">
            <h1>Form Kartu Keluarga</h1>
                <KKList
                KK={KK}
                gotoNext={gotoNext}
                setKK={setKK}
                rowKK={rowKK}
                setAnggotaKK = {setAnggotaKK}
                AnggotaKK = {AnggotaKK}
                setRowKK={setRowKK}
                />
        </div>
    )
}

export default FormKK;