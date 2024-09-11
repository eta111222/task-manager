const express = require('express');
const router = express.Router();
const db = require('../database');
const verifyToken = require('../middleware/verifyToken'); 

router.post('/', verifyToken, (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;  

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  db.run(
    'INSERT INTO tasks (title, description, userId) VALUES (?, ?, ?)',
    [title, description, userId],
    function (err) {
      if (err) return res.status(500).send('Error creating task');
      res.status(200).send({ message: 'Task created successfully!' });
    }
  );
});

router.get('/', verifyToken, (req, res) => {
  const userId = req.userId;

  db.all('SELECT * FROM tasks WHERE userId = ?', [userId], (err, tasks) => {
    if (err) return res.status(500).send('Error fetching tasks');
    res.status(200).json(tasks);
  });
});

router.put('/:id', verifyToken, (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  db.run(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND userId = ?',
    [title, description, req.params.id, userId],
    function (err) {
      if (err) return res.status(500).send('Error updating task');
      res.status(200).send({ message: 'Task updated successfully!' });
    }
  );
});

router.delete('/:id', verifyToken, (req, res) => {
  const userId = req.userId;

  db.run('DELETE FROM tasks WHERE id = ? AND userId = ?', [req.params.id, userId], function (err) {
    if (err) return res.status(500).send('Error deleting task');
    res.status(200).send({ message: 'Task deleted successfully!' });
  });
});

module.exports = router;
