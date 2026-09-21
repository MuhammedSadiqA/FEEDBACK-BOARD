import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'

import Home from './Home.jsx'
import Adminlogin from "./Adminlogin.jsx";
import Admindashboard from "./Admindashboard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<Admindashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
