import React from 'react'
import KBList from '../KBList'

const FormKK = (props) => {
    const { kirimData, refreshPage, gotoNext, kb, setKB,...rest } = props;

    return (
        <div>
            <h1>Form KB</h1>
            <button
                onClick={refreshPage}
                className="btn btn-sm bg-purple-800"
            >
                Isi data KK lagi?
            </button>
            <button
                onClick={kirimData}
                className="btn btn-sm bg-green-800"
            >
                Kirim Data
            </button>
            <KBList
            kb={kb}
            setKB={setKB}
            />
        </div>
    )
}

export default FormKK;