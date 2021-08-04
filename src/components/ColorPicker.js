import React from 'react'
import './ColorPicker.css'
import colorMappings from '../color-mappings.json'
import { checkColorType, rgbToHex, rgbToHsl, hslToHex, hslToRgb, hexToRgb, hexToHsl } from '../utility-functions'
import PickerInput from './inputs/PickerInput'
import Input from './inputs/Input'

const ColorPicker = ({ background, setBackground }) => {

  const [colors, setColors] = React.useState({ name: '', hex: background, rgb: '', hsl: '' })

  const updateFieldValues = (color) => {
    color = color.replace(/ /g, '').toLowerCase()
    const type = checkColorType(color)
    let hexValue, rgbValue, hslValue
    switch (type) {
      case 'name':
        hexValue = colorMappings[color].hex
        rgbValue = colorMappings[color].rgb
        hslValue = colorMappings[color].hsl
        setColors({
          name: color,
          hex: hexValue,
          rgb: rgbValue,
          hsl: hslValue
        })
        break;
      case 'rgb':
        hexValue = rgbToHex(color)
        hslValue = rgbToHsl(color)
        setColors({
          name: '',
          hex: hexValue,
          rgb: color,
          hsl: hslValue
        })
        break;
      case 'hsl':
        hexValue = hslToHex(color)
        rgbValue = hslToRgb(color)
        setColors({
          name: '',
          hex: hexValue,
          rgb: rgbValue,
          hsl: color
        })
        break;
      case 'hex':
        rgbValue = hexToRgb(color)
        hslValue = hexToHsl(color)
        setColors({
          name: '',
          hex: color,
          rgb: rgbValue,
          hsl: hslValue
        })
        break;
      case 'formatError':
        const formatError = "format error"
        return formatError

      default:
        alert("unknown error")
        return
    }
    setBackground(color)
  }

  React.useEffect(() => {
    updateFieldValues(background)
  }, []);

  return (
    <div className="container">
      <Input colors={colors} updateFieldValues={updateFieldValues} type="name"/>
      <Input colors={colors} updateFieldValues={updateFieldValues} type="hex"/>
      <Input colors={colors} updateFieldValues={updateFieldValues} type="rgb"/>
      <Input colors={colors} updateFieldValues={updateFieldValues} type="hsl"/>
      <PickerInput colors={colors} updateFieldValues={updateFieldValues}/>
    </div>
  )
}

export default ColorPicker
