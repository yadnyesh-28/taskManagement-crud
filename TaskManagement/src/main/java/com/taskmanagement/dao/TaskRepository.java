package com.taskmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanagement.pojos.TaskManagement;

public interface TaskRepository extends JpaRepository<TaskManagement, Long> {

}
