import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Todo = (props) => {
  const { title } = props;
  // Destruct State hooks
  const [TodoEntry, setTodo] = useState({ id: '', name: '' });
  const [todoList, setTodoList] = useState([]);
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const inputChangeHandler = (event) => {
    setTodo({ id: event.target.value, name: event.target.value });
  };
  /**
   * We use this hook for long running transactions like going to the network that will
   * interrupt the critical lifecycles. Put any state properties in the array argument to rerun
   * the uesEffect. Empty means don't rerun.
   * You should return a function to do cleanup operations.It will run on every unmount or render
   * lifecycle. You can use more than one Effects hook.
   */
  useEffect(() => {
    axios.get('http://localhost:3000/todos').then((resp) => {
      const todoData = resp.data;
      // console.log(todoData);
      const todos = todoData.map(todo => ({ id: todo.id, name: todo.name }));
      setTodoList(todos);
      // third param [] mean cleanup on unmount. If there is no third param the cleanup
      // runs on every render
      return () => console.log('cleanup');
    });
  }, []);

  // Singleton for todoList
  useEffect(() => {
    if (submittedTodo) {
      setTodoList(todoList.concat(submittedTodo));
    }
  }, [submittedTodo]);

  const mouseMoveHandler = (event) => {
    console.log(event.clientX, event.clientY);
  };
  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);
  const todoAddHandler = () => {
    // This code was using a closure on the todoList. On slow REST transactions there
    // can be a race condition for simultaneous Add requests. Since the post is not synchronized
    // the todoList will become stale. In this case only the last update gets put in the todoList
    // In this example we create a singleton with the useEffect hook to avoid the race condition
    axios.post('http://localhost:3000/todos',
      { id: TodoEntry.id, name: TodoEntry.name }).then((resp) => {
      // With hooks pass the current state unlike the Component setState() where we would have
      // previous state parameters. The hooks api will manage it internally.
      setSubmittedTodo({ id: resp.data.id, name: resp.data.name });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <React.Fragment>
      <h1>{ title }</h1>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={TodoEntry.name}
      />
      <button type="button" onClick={todoAddHandler}>Add</button>
      { /* Use some JSX code to map the todos to list items */ }
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
      </ul>
    </React.Fragment>
  );
};

Todo.propTypes = {
  title: PropTypes.string,
};

Todo.defaultProps = {
  title: '',
};
//
export default Todo;
