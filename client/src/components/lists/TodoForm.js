import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { set } from 'mongoose';
import useInputState from '../lists/useInputState';

const TodoForm = ({ saveTodo }) => {
    const { value, reset, onChange } = useInputState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveTodo(value);
        reset();
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default TodoForm;
