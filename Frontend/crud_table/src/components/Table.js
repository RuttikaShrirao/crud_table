import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counterSlice';

function Table() {
  const [delRow, setDelRow] = useState({});
  const [showFormData, setShowFormData] = useState([]);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const editHandler = async (update_id) => {
    //  await fetch(`http://localhost:5000/api/update`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(),
    // })
    // .then(res=>res.json())
    // .then(deleteRow =>setDelRow(deleteRow));
    navigate(`/${update_id}?`)
  };

  const deleteHandler = async (deleteData) => {
    // setShowFormData(showFormData.filter((item)=> item._id !== deleteData  ))
      await fetch(`http://localhost:5000/api/${deleteData}`,{
        method: "DELETE",
      })
    .then(res=>res.json())
    .then(deleteRow =>setDelRow(deleteRow));
      setShowFormData(showFormData.filter((item)=> item._id !== deleteData  ))
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
          <tr key={i} >
            <th scope="row">{i + 1}</th>
            <td>{data.amount}</td>
            <td>{data.transactionType}</td>
            <td>{data.reason}</td>
            <td>
              <button onClick={() => editHandler(data._id)}>Edit</button>
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
