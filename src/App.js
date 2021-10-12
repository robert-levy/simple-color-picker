import React from 'react'
import ColorPicker from './components/ColorPicker'
import './App.css'

export default function App() {
  const [background, setBackground] = React.useState('purple')

  const changeBackgroundColor = (color) => document.body.style.backgroundColor = color
  
  React.useEffect(() => changeBackgroundColor(background), [background])

  return (
    <div className="App">
      <ColorPicker background={background} setBackground={setBackground} />
    </div>
  );
}