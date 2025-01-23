// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('static'));


// Sample dataset of 100 students
const students = Array.from({ length: 100 }, (_, index) => {
  const subjects = ["math", "science", "english", "history", "geography"];
  const marks = subjects.reduce((acc, subject) => {
    acc[subject] = Math.floor(Math.random() * 51) + 50; // Random marks between 50 and 100
    return acc;
  }, {});
  return {
    student_id: `${index + 1}`,
    name: `Student ${index + 1}`,
    marks,
    total: Object.values(marks).reduce((sum, mark) => sum + mark, 0),
  };
});

// POST /students/above-threshold
app.post("/students/above", (req, res) => {
  const { threshold } = req.body;

  // Validate input
  if (typeof threshold !== "number" || isNaN(threshold)) {
    return res.status(400).json({ error: "Invalid threshold. Please provide a number." });
  }

    // Filter students based on the threshold
    const filteredStudents = students
    .filter(student => student.total > threshold)
    .map(student => ({
      name: student.name,
      total: student.total,
    }));

  // Return response
  res.json({
    count: filteredStudents.length,
    students: filteredStudents,
  });
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


