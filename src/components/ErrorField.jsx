import React from 'react'

const ErrorField = ({ text }) => {
    return (
        <p className="mb-2 text-sm text-error">
            {text}
        </p>
    )
}

export default ErrorField