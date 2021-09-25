import React from 'react'
import KBList from '../KBList'

const FormKK = (props) => {
    const { gotoNext,...rest } = props;
    return (
        <div>
            <h1>Form KB</h1>
            <button
                onClick={gotoNext}
                className="btn btn-sm bg-purple-800"
            >
                Isi data KK lagi?
            </button>
            <KBList/>
        </div>
    )
}

export default FormKK;