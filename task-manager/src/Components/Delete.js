import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { deleteTask } from "./taskServices";

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteTask(id);
    alert("Task deleted successfully");
    navigate("/tasklist");
  };

  const handleCancel = () => {
    navigate("/tasklist");
  };

  return (
    <div className="mt-3">
      <h2>Are you sure you want to delete this task?</h2>
      <div className="d-flex gap-2">
        <Button variant="danger" onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
