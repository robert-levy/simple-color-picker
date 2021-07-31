import React from 'react'
import './inputStyles.css'

const Input = ({ updateFieldValues, colors, type }) => {

    // store input value selected by user
    const [color, setColor] = React.useState(colors[type])
    // error
    const [error, setError] = React.useState(false)

    // update field value
    const handleChange = (event) => {
        setColor(event.target.value)
    }

    // update all field values
    const handleEnter = (event, color) => {
        if(error) setError(false)
        if (event.key === 'Enter') {
            const checkError = updateFieldValues(color)
            if(checkError){
                setError(true)
            }
        }
    }

    // when colors change, update this field value
    React.useEffect(() => {
        setColor(colors[type])
        setError(false)
    }, [colors]);

    return (
        <div className="inputContainer">
            <label htmlFor={type}>{type}</label>
            <input
                type="text"
                value={color}
                onKeyDown={(event) => handleEnter(event, color)}
                onChange={handleChange}
                autoComplete="nope"
                className={error ? "inputInvalid": "input"}
                id={type}
            />
        </div>
    )
}

export default Input
