import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
  const [delRow, setDelRow] = useState({});
  const [showFormData, setShowFormData] = useState([]);

  const navigate = useNavigate()

  const editHandler = async () => {
     await fetch(`http://localhost:5000/api/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
    .then(res=>res.json())
    .then(deleteRow =>setDelRow(deleteRow));
  };

  const deleteHandler = async (deleteData) => {
    console.log(deleteData)
    // setShowFormData(showFormData.filter((item)=> item._id !== deleteData  ))
      await fetch(`http://localhost:5000/api/${deleteData}`)
    .then(res=>res.json())
    .then(deleteRow =>setDelRow(deleteRow));
    if(delRow.status_code===200){
      setShowFormData(showFormData.filter((item)=> item._id !== deleteData  ))
    }
  };

  const formDataHandler = async () => {
    try {
      // Send data to backend
      await fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((apiRes) => setShowFormData(apiRes.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    formDataHandler();
  }, []);

  return (
    <table className="table table-success table-striped">
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Amount</th>
          <th scope="col">Select</th>
          <th scope="col">Reason</th>
          <th scope="col">Button</th>
        </tr>
      </thead>
      <tbody>
        {showFormData.map((data, i) => (
          <tr key={i} onClick={()=>{navigate('/')}}>
            <th scope="row">{i + 1}</th>
            <td>{data.amount}</td>
            <td>{data.transactionType}</td>
            <td>{data.reason}</td>
            <td>
              <button onClick={() => editHandler(data)}>Edit</button>
              <button className="mx-4" onClick={() => deleteHandler(data._id)}>
                Delete
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
