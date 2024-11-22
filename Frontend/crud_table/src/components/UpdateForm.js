import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateForm() {
  const [formData, setFormData] = useState({
    amount: "",
    transactionType: "",
    reason: "",
  });

  const [errormsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  //   params
  let { update_id } = useParams();

  // getting data from backend
  const getUpdateDataHandler = () => {
    try {
      fetch(`http://localhost:5000/api/${update_id}`) // api for the get request
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((apiRes) => {
          setFormData(apiRes.document);
          //   apiRes.status_code === 200 ? navigate("/table") : navigate("/");
        })
        .catch((err) => {
          setErrorMsg("Error submitting transaction:");
        });
    } catch (error) {
      setErrorMsg("Error submitting transaction:");
    }
  };

  useEffect(() => {
    getUpdateDataHandler();
  }, []);

  // input handle function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // form sumbition handler function
  const formDataHandler = (e) => {
    e.preventDefault();
    try {
      //   Send data to backend
      fetch(`http://localhost:5000/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((apiRes) => {
          apiRes.status_code === 200 ? navigate("/table") : navigate("/");
        })
        .catch((err) => {
          setErrorMsg("Error submitting transaction:");
        });
    } catch (error) {
      console.log(error, "===err");
      setErrorMsg("Error submitting transaction:");
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Transaction Form</h2>
      <form onSubmit={formDataHandler}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            onChange={handleChange}
            name="amount"
            value={formData.amount}
            type="number"
            className="form-control"
            placeholder="Enter the amount"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Transaction Type</label>
          <select
            value={formData.transactionType}
            onChange={handleChange}
            className="form-select"
            name="transactionType"
            id="transactionType"
            required
          >
            <option value="">Choose...</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="reason"
            onChange={handleChange}
            value={formData.reason}
            className="form-control"
            id="reason"
            rows="3"
            placeholder="Enter the reason"
            required
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
          Edit
          </button>
        </div>
        <p>{errormsg}</p>
      </form>
    </div>
  );
}

export default UpdateForm;
