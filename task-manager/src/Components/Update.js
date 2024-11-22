

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate(); // For redirection

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });


  useEffect(() => {
    axios
      .get(`http://localhost:8088/task/findtask/${id}`)
      .then((response) => {
        setFormData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        alert("Failed to load task details. or id is invalid");
        navigate("/tasklist"); 
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    axios
      .put(`http://localhost:8088/task/update/${id}`, formData)
      .then(() => {
        alert("Task updated successfully!");
        navigate("/tasklist"); // Redirect to task list
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("Failed to update the task.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Task</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Completed</label>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="completed"
              value={true}
              checked={formData.completed === true}
              onChange={() => setFormData({ ...formData, completed: true })}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="completed"
              value={false}
              checked={formData.completed === false}
              onChange={() => setFormData({ ...formData, completed: false })}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        Update Task
      </button>
    </form>
  );
};

export default UpdateTask;
