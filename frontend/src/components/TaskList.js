import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TaskList.css';

const TaskList = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5005/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await axios.post(
        'http://localhost:5005/tasks',
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
    console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5005/tasks/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">Tasks</h2>
      <div className="task-inputs">
        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          className="task-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className="add-task-button" onClick={handleCreateTask}>
          Add Task
        </button>
      </div>
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input className="task-title" value={task.title} readOnly />
              <button className="delete-task-button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default TaskList;
