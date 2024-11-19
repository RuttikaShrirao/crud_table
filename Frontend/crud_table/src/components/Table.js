import React, { useState } from 'react'

function Table() {
const [showFormData, setShowFormData]=useState()

const editHandler =async()=>{
    const response = await fetch(`http://localhost:5000/api/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
}

const deleteHandler =async()=>{

    const response = await fetch(`http://localhost:5000/api/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
}
    const formDataHandler = async(e)=>{
        e.preventDefault()
        console.log(formData)
      
        try {
          // Send data to backend
          const response = await fetch("http://localhost:5000/api/data");
      console.log(response)
          if (response.status==='200') {
        
            setShowFormData({ amount: response.data.amount, transactionType: response.data.transactionType, reason: response.data.reason }); 
      
          } else {
            setErrorMsg("Failed to submit transaction.");
          }
        } 
        catch (error) {
          setErrorMsg("Error submitting transaction:");
        }
      
      }

  return (
    <table className="table table-success table-striped">
    <thead>
      <tr>
        <th scope="col">Amount</th>
        <th scope="col">Select</th>
        <th scope="col">Reason</th>
        <th scope="col">Button</th>
      </tr>
    </thead>
    <tbody>
{showFormData.map((data,i)=>
    <tr key={i}>
        <th scope="row">1</th>
        <td>{data.amount}</td>
        <td>{data.transactionType}</td>
        <td>{data.reason}</td>
        <td><button onClick={()=>editHandler(data)}>Edit</button></td>
        <td><button onClick={()=>deleteHandler(data)}>Delete</button></td>
      </tr>
)}
      
     
    </tbody>
  </table>
  )
}

export default Table