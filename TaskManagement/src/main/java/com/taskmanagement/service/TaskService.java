package com.taskmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.customexception.TaskHandlingException;
import com.taskmanagement.dao.TaskRepository;
import com.taskmanagement.pojos.TaskManagement;

@Service
public class TaskService implements ItaskService {

	
	@Autowired
	private TaskRepository taskRepo;
	@Override
	public TaskManagement addTask(TaskManagement task) {
		taskRepo.save(task);
        return task;
		
	}

	@Override
	public List<TaskManagement> getAllTasks() {
		return taskRepo.findAll();
	}

	@Override
	public TaskManagement getTask(long id) {
		return taskRepo.findById(id).orElseThrow(()->new TaskHandlingException("Invalid Id.."+id));
	}

	@Override
	public String deleteTask(long id) {
		
		 taskRepo.deleteById(id);
		 return "Task"+id+"  is deleted successfully";
	}

	@Override
	public TaskManagement updateTask(TaskManagement updatedTask, TaskManagement oldTask) {
		oldTask.setTitle(updatedTask.getTitle());
		oldTask.setDescription(updatedTask.getDescription());
		oldTask.setCompleted(updatedTask.isCompleted());
		return taskRepo.save(oldTask);
	}

}
