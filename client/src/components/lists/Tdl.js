import React from "react";
import TodoForm from '../lists/TodoForm';
import TodoList from '../lists/TodoList';
import usedTodoState from '../lists/usedTodoState';

export default function Tdl(props) {
    const { todos, addTodo, deleteTodo } = usedTodoState([]);
    return (
      <div className="Tdl">
        <TodoForm
        saveTodo={(todoText) => {
          const trimmedText = todoText.trim();
          if (trimmedText.length > 0) {
            addTodo(trimmedText);
          }
        }}
        />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    );
  };