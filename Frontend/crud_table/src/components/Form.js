import React from 'react'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'

function Form() {
    const [formData, setFormData] =useState({
        amount:"",
        transactionType:'',
        reason:""
      })
      
      const [errormsg,setErrorMsg] =useState("")
      const [apiFormRes,setApiFormRes] =useState({})

      const navigate =useNavigate()
      
      // input handle function
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      
      // form sumbition handler function
      const formDataHandler = async(e)=>{
        e.preventDefault()
         try {
          // Send data to backend
        await fetch('http://localhost:5000/api/transactions', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }) // api for the get request
          .then(response => response.json())
          .then(apiRes => setApiFormRes(apiRes));
          console.log(apiFormRes.status_code,"rrrrr")
            if(apiFormRes.status_code===200){
              navigate('/table')
              console.log('after respose....')
            }

        } 
        catch (error) {
          setErrorMsg("Error submitting transaction:");
        }
      
      }

    return (
        <div className="container mt-2">
        <h2 className="text-center mb-4">Transaction Form</h2>
        <form onSubmit={formDataHandler}>
         
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input onChange={handleChange}  name="amount" value={formData.amount} type="number" className="form-control" placeholder="Enter the amount" required/>
          </div>
    
    
          <div className="mb-3">
            <label  className="form-label">Transaction Type</label>
            <select   value={formData.transactionType}
                onChange={handleChange} className="form-select"   name="transactionType" id="transactionType" required>
              <option value="">Choose...</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
    
    
          <div className="mb-3">
            <label  className="form-label">Reason</label>
            <textarea name='reason' onChange={handleChange} value={formData.reason}  className="form-control" id="reason" rows="3" placeholder="Enter the reason" required></textarea>
          </div>
    
    
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <p>{errormsg}</p>
        </form>
      </div>
      );
}

export default Form