import React, { useState, useEffect } from "react";
import { submitData, fetchData, apiUrl } from "./core/services/apifile";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("formData")) || [];
    setStoredData(localData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = [...storedData, formData];
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setStoredData(updatedData);

    await submitData(formData);
    setFormData({ name: "", email: "" });
  };

  const handleFetchData = async () => {
    const data = await fetchData();
    console.log("Fetched API Data:", data);
  };

  return (
    <div className="container">
      <h2>React Form with API and Local Storage</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleFetchData} className="fetch-button">
        Refresh API Data
      </button>

      <h3>Stored Data:</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {storedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
