package com.taskmanagement.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.customexception.TaskHandlingException;
import com.taskmanagement.dao.TaskRepository;
import com.taskmanagement.pojos.TaskManagement;
import com.taskmanagement.service.ItaskService;

@RestController
@RequestMapping("task")
@CrossOrigin("*")
public class TaskController {

	@Autowired
	private ItaskService taskService;
	@Autowired
	private TaskRepository taskRepo;


//  http://localhost:8088/task/add
	@PostMapping("/add")
	public TaskManagement register(@RequestBody TaskManagement task) {
		return taskService.addTask(task);
	}

//  http://localhost:8088/task/gettasks
	@GetMapping("/gettasks")
	public List<TaskManagement> fetchTasks() {
		return taskService.getAllTasks();
	}

//  http://localhost:8088/task/findtask/2
	@GetMapping("/findtask/{id}")
	public TaskManagement getOneTask(@PathVariable long id) {
		return taskService.getTask(id);
	}

//  http://localhost:8088/task/delete/2
	@DeleteMapping("/delete/{id}")
	public String deleteTaskById(@PathVariable int id) {
			taskService.deleteTask(id);
			return "Task deleted successfully";
	}

//  http://localhost:8088/task/update/3
	@PutMapping("/update/{id}")
	public TaskManagement putTask(@PathVariable long id , @RequestBody TaskManagement  updatedTask) {
		
				TaskManagement Oldtask=taskService.getTask(id);
				return taskService.updateTask( updatedTask,Oldtask);
	}

}
