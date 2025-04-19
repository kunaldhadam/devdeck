import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Check if there's a todo list saved in localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const timestamp = localStorage.getItem("timestamp");

    // If it's not expired, load the saved todos
    if (storedTodos && timestamp && Date.now() - timestamp < 86400000) {
      setTodos(storedTodos);
    } else {
      // Clear the todos if expired (older than 24 hours)
      localStorage.removeItem("todos");
      localStorage.removeItem("timestamp");
    }

    // Save the current timestamp to track expiration
    localStorage.setItem("timestamp", Date.now().toString());
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewTodo(""); // Reset the input field
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-container">
      <h3 className="todo-title">One Task at a Time!</h3>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <button onClick={() => handleDeleteTodo(index)} className="delete-btn text-sm text-red-600">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
