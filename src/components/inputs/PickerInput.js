import React from 'react'
import './pickerInputStyles.css'
const PickerInput = ({ updateFieldValues, colors }) => {

    // store input value selected by user
    const [color, setColor] = React.useState(colors.hex)

    // update all field values
    const handlePickerChange = (event) => updateFieldValues(event.target.value)


    // Show color picker when clicking on span
    const handleSpanClick = (event) => inputRef.current.click()

    // when colors change, update this field value
    React.useEffect(() => {
        setColor(colors.hex)
    }, [colors])

    const inputRef = React.useRef(null)

    return (
        <div className="pickerInputContainer">
            <label htmlFor="colorPicker">Color picker</label>
            <span
                className="pickerSpan"
                style={{ backgroundColor: colors.hex }}
                onClick={handleSpanClick}
            />
            <input
                type="color"
                value={color}
                onChange={handlePickerChange}
                style={styles.input}
                ref={inputRef}
                id="colorPicker"
            />
        </div>
    )
}

export default PickerInput

const styles = {
    input: {
        visibility: 'hidden'
    },
    span: {
        borderRadius: 50,
        width: '3rem',
        height: '3rem',
        display: 'inline-block',
        position: 'relative',
        right: 21,
        // backgroundColor:'white'
    }
}
