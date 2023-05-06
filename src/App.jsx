import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WarMap from './components/Map'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WarMap />} />
      </Routes>
    </BrowserRouter>
  )
}
