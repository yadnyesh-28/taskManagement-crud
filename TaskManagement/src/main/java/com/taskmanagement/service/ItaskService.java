package com.taskmanagement.service;

import java.util.List;

import com.taskmanagement.pojos.TaskManagement;

public interface ItaskService {
	TaskManagement addTask(TaskManagement task);

	// get Users
	List<TaskManagement> getAllTasks();

	// get specific user
	TaskManagement getTask(long id);

	// delete specific user
	String deleteTask(long id);

	// update specific user
	TaskManagement updateTask(TaskManagement updatedTask, TaskManagement oldTask);
}
