import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // We will add simple styles next

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // 1. Fetch tasks from backend when app loads
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 2. Function to Add a Task
  const addTask = () => {
    if (!text) return alert("Task cannot be empty!");
    
    axios.post("http://localhost:5000/add", { text })
      .then((res) => {
        // Add the new task to our list immediately
        setTasks([...tasks, res.data]); 
        setText(""); // Clear the input box
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>MERN To-Do List ✅</h1>
      
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter a task..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;