import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Task() {
  

  const navigate = useNavigate();

  const title = useRef();
  const description = useRef();
  const completed = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get and trim the value
    if (!title) {
      alert("Title is required!");
      return;
    }
    // Proceed with form submission
    const task = { title, description: description.current.value, completed: false };
    console.log("Task to submit:", task);
    const isCompleted = completed.current.value === "true"; // Convert string to boolean
    console.log("Completed:", isCompleted);

    axios.post("http://localhost:8088/task/add", {
      title: title.current.value,
      description: description.current.value,
      completed: completed.current.value
    })
      .then((res) => {
        console.log(res.data)
        alert("task Registered Succesfully!!");
        navigate("/task");
        
      }).catch((err) => {
        console.error(err);
      })
  }
  return (
    <>
      <div className='container'>
        <br />
        <h1>Task</h1>
        <br />
        <div className='row mb-4'>
          <div className='col-lg-4'>
            <form>
              <div class="mb-3">
                <label class="form-label">Enter Title</label>
                <input  type="text" class="form-control required" ref={title} required />
              </div>
              <div class="mb-3">
                <label class="form-label">Enter Description</label>
                <input type="text" class="form-control" ref={description} />
              </div>
              <div class="mb-3">
                <label class="form-label">Task Completed</label>
                <div>
                  <div class="form-check">
                    <input 
                      class="form-check-input"
                      type="radio"
                      name="completed"
                      value="true"
                      id="completedTrue"
                      ref={completed}
                      
                    />
                    <label class="form-check-label" for="completedTrue">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input 
                      class="form-check-input"
                      type="radio"
                      name="completed"
                      value="false"
                      id="completedFalse"
                      ref={completed}
                      
                    />
                    <label class="form-check-label" for="completedFalse">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
