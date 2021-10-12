import React from react
import ReactDom from 'react-dom'
import Input from './components/inputs/Input'

describe('input tests', () => {
    test('should save input in state', () => {
          ReactDom.render(<Input/>)
    })
    
});
