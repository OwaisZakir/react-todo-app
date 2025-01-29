import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/style.css";
const App = () => {
  const [userValue, setUserValue] = useState("");
  const [todoItemsArray, setTodoItems] = useState([]);
  const addTodoItem = () => {
    if (userValue.trim() === "") return;
    setTodoItems([...todoItemsArray, { text: userValue }]);
    setUserValue("");
  };

  return (
    <div className="todo-app">
      <header>
        <div className="todo-header">
          <h1>To-Do List</h1>
        </div>
      </header>
      <main>
        <div className="todo-input-container">
          <input
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
            type="text"
            className="todo-input"
            placeholder="Add a new task..."
          />
          <button
            className="add-btn"
            aria-label="Add task"
            onClick={addTodoItem}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul className="todo-list">
          {todoItemsArray.map((item, index) => (
            <li
              className={`todo-item ${item.completed ? "completed" : ""}`}
              key={index}
              id={item.id ? item.id : index + 1}
            >
              <span className="todo-text">{item.text}</span>
              <div className="todo-actions">
                <button
                  className="action-btn complete-btn"
                  title="Complete"
                  onClick={() => {
                    setTodoItems(
                      todoItemsArray.map((todo, i) =>
                        i === index
                          ? { ...todo, completed: !todo.completed }
                          : todo
                      )
                    );
                    console.log(todoItemsArray);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="action-btn edit-btn"
                  title="Edit"
                  onClick={() => {
                    const editedItem = prompt(
                      "Edit task",
                      todoItemsArray[index].text.trim()
                    );
                    if (editedItem) {
                      setTodoItems(
                        todoItemsArray.map((item, i) =>
                          i === index ? { ...item, text: editedItem } : item
                        )
                      );
                    } else {
                      alert("Please enter a valid task");
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Delete"
                  onClick={() => {
                    setTodoItems(todoItemsArray.filter((_, i) => i !== index));
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="clear-all-btn"
          onClick={() => {
            setTodoItems([]);
          }}
        >
          Clear All Tasks
        </button>
      </main>
      <footer className="app-footer">
        <p>
          Developed by <strong>Owais Zakir</strong>
        </p>
      </footer>
    </div>
  );
};

export default App;
