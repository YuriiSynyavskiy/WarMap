import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WarMap from './components/Map'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WarMap />} />
        <Route exact path='/chronology' element={<h2>AAAAAAA</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
