import React from 'react'

const FormKK = (props) => {
    const { gotoNext,...rest } = props;
    return (
        <div className="">
            <h1>Form KK</h1>
            <button
                onClick={gotoNext}
                className="btn btn-md btn-success"
            >
                Next
            </button>
        </div>
    )
}

export default FormKK;