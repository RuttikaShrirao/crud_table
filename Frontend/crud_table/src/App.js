import React, { useState } from 'react'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './features/counterSlice';
import Table from  "./components/Table"
import { Routes, Route } from "react-router-dom";
import Form from './components/Form';
import NotFound from './components/NotFound'
import UpdateForm from './components/UpdateForm';
 
function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

return(<>
  <Routes>
  <Route path="/" element={<Form />} />
  <Route path="/table" element={<Table />} />
  <Route path="/:update_id" element={<UpdateForm />} />
  <Route path="*" element={<NotFound />} /> 
</Routes>

    </>
)
}

export default App;
