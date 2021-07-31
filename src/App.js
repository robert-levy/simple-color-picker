import React from 'react'
import ColorPicker from './components/ColorPicker'
import Title from './components/Title'
import './App.css'

function App() {
  const [background, setBackground] = React.useState('#ff00d4')

  const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color
  }

  React.useEffect(() => {
    changeBackgroundColor(background)
  }, [background])

  return (
    <div className="App">
      <Title />
      <ColorPicker background={background} setBackground={setBackground}/>
    </div>
  );
}

export default App;
