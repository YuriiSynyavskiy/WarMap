import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WarMap from './pages/Map'
import Login from './pages/Login'
import PrivateRouter from './components/PrivateRouter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route
          exact
          path='/'
          element={
            <PrivateRouter>
              <WarMap />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
