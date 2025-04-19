import React from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import JsonFormatter from './pages/JsonFormatter'
import ColorPicker from './pages/ColorPicker'
import RegexGenerator from './components/RegexGenerator'
import Home from './pages/Home'
import HomeContent from './pages/HomeContent'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
        <Route index element={<HomeContent />} />
        <Route path='/json-formatter' element={<JsonFormatter />} />
        <Route path='/color-picker' element={<ColorPicker />} />
        <Route path='/regex-generator' element={<RegexGenerator />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
