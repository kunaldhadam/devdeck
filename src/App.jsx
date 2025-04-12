import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JsonFormatter from './pages/JsonFormatter'
import ColorPicker from './pages/ColorPicker'
import RegexGenerator from './components/RegexGenerator'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/json-formatter' element={< JsonFormatter />} />
        <Route path='/color-picker' element={< ColorPicker />} />
        <Route path='/regex-generator' element={< RegexGenerator />} />
      </Routes>
    </Router>
  )
}

export default App
