import React, { useState } from 'react'
import './App.css';
import Table from  "./components/Table"
import { Routes, Route } from "react-router-dom";
import Form from './components/Form';
import NotFound from './components/NotFound'
 
function App() {


return(
  <Routes>
  <Route path="/" element={<Form />} />
  <Route path="/table" element={<Table />} />
  <Route path="*" element={<NotFound />} /> 
</Routes>
)
}

export default App;
