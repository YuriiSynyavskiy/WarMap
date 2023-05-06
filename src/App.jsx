import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WarMap from './components/Map'
import WarMapChronology from './components/MapChronology'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WarMap />} />
        <Route exact path='/chronology' element={<WarMapChronology />} />
      </Routes>
    </BrowserRouter>
  )
}
