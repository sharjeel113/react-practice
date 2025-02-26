import React, { useState, useEffect } from "react";
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

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    setFormData({ name: "", email: "" });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const data = await response.json();
      console.log("Fetched API Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h2>React + Axios Form with API and Local Storage</h2>
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

      <button onClick={fetchData} className="fetch-button">
        Fetch API Data
      </button>

      <h3>Stored Data:</h3>
      <ul className="data-list">
        {storedData.map((item, index) => (
          <li key={index}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
