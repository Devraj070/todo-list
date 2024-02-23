// ToDoList.jsx

import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    showTasks();
  }, []);

  function addTask() {
    if (inputValue.trim() === '') {
      alert("You must write something");
    } else {
      const newTask = { id: Date.now(), text: inputValue };
      setTasks([...tasks, newTask]);
    }
    setInputValue('');
    saveData();
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveData();
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    saveData();
  }

  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      padding: "0",
      fontFamily: "poppins, san-serif",
      boxSizing: "border-box",
      background: "#6D28D9", // Purple background
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "540px",
        marginTop: "100px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "40px",
        paddingBottom: "70px",
        paddingLeft: "30px",
        paddingRight: "30px",
        borderRadius: "10px",
        background: "white",
        border: "2px solid #6D28D9" // Purple border
      }}>
        <h2 style={{
          color: "#002765",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h1>To-Do List</h1>
        </h2>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#edeef0",
          borderRadius: "30px",
          paddingLeft: "20px",
          marginBottom: "25px"
        }}>
          <input type="text" id="input-box" placeholder="add your Text" value={inputValue} onChange={e => setInputValue(e.target.value)} style={{ flex: "1", border: "none", outline: "none", background: "transparent", padding: "10px" }} />
          <button onClick={addTask} style={{ border: "none", outline: "none", padding: "16px 50px", background: "#ff5945", color: "#fff", fontSize: "16px", cursor: "pointer", borderRadius: "40px" }}>Add</button>
        </div>
        <ul id="list-container" style={{ padding: "0" }}>
          {tasks.map(task => (
            <li key={task.id} className={`text-lg py-3 px-4 relative ${task.completed ? "line-through text-gray-500" : ""}`} onClick={() => toggleTask(task.id)}>
              {task.text}
              <span onClick={() => deleteTask(task.id)} className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
