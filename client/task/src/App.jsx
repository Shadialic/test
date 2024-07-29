import { useState } from 'react'
import { Routes, Route } from "react-router-dom";


import './App.css'
import AdminRoutes from './routes/AdminRoutes';

function App() {

  return (
    <>
    <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      
    </>
  )
}

export default App
