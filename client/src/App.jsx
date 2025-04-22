import React from 'react'
import './App.css'
import '../public/assets/css/media.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import JsonFormatter from './pages/JsonFormatter'
import ColorPicker from './pages/ColorPicker'
import RegexGenerator from './components/RegexGenerator'
import Home from './pages/Home'
import HomeContent from './pages/HomeContent'
import AboutMe from './pages/AboutMe'
import TrendSpot from './pages/TrendSpot'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
        <Route index element={<HomeContent />} />
        <Route path='/json-formatter' element={<JsonFormatter />} />
        <Route path='/color-picker' element={<ColorPicker />} />
        <Route path='/regex-generator' element={<RegexGenerator />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='/trendspot' element={<TrendSpot />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
