import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function TaskList() {
  const [tasks,setTasks]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:8088/task/gettasks").then((res)=>{
        console.log(res.data);
        setTasks(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

// const handleDelete1=((id)=>{
//   axios.delete(`http://localhost:8088/task/delete/${id}`).then((resp) => {
//     alert(resp.data)

//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//   })
//   .catch((error) => console.log('Error', error))
// })

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    axios
      .delete(`http://localhost:8088/task/delete/${id}`)
      .then((resp) => {
        alert("Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        navigate('/tasklist')
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Failed to delete the task. Please try again.");
        navigate('/tasklist')
      });
  }
};

 const onEdit=(id)=>{
  navigate(`/update/${id}`);

};


  return (
    <>
    <div className='container'>
       
        <h1>Tasks</h1>
         
        
        <div className='row'>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Complete</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task) => {
                  return (
                    <tr>
                      <td>{task.id}</td>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.completed ? "Yes" : "No"}</td>
                      <td>
                        
                          <button className='btn btn-primary' onClick={() => onEdit(task.id)}>Update</button>
                  
                      </td>
                      <td><button className='btn btn-danger'onClick={() => handleDelete(task.id)}>Delete</button></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
          <Link to="/task"><button class="btn btn-outline-success " type="submit">Add New Task</button></Link>
        </div>
      </div>
    </>
  )
}
