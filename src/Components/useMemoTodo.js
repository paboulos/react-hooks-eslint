/**
 * This Component is an enhancement to the Todo by adding the useMemo hook to
 * improve performance. Pass a “create” function and an array of inputs. useMemo
 * will only recompute the memoized value when one of the inputs has changed.
 * This optimization helps to avoid expensive calculations on every render.
 */
import React, {
  useState, useEffect, useReducer, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from './List';

const MemoTodo = (props) => {
  const { title } = props;
  // Destruct State hooks
  const [TodoEntry, setTodo] = useState({ id: null, name: '' });
  const [inputIsValid, setInputIsValid] = useState(false);
  /**
   * Component Reducer isolates state transitions on todoList into one function
   * @param {Array} state
   *   the state of the component
   * @param {Object} action
   *   contains the type and payload of the action
   */
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  // configure the useReducer hook with initial state and reducer function
  const [todoList, dispatch] = useReducer(todoListReducer, []);
  // Input listener for text box
  const inputChangeHandler = (event) => {
    const { value } = event.target;
    if (value && value.length > 0) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }

    setTodo({ id: value, name: value });
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
      dispatch({ type: 'SET', payload: todos });
      // third param [] mean cleanup on unmount. If there is no third param the cleanup
      // runs on every render
      return () => console.log('cleanup');
    });
  }, []);

  // Creates unique ids for todo
  const IDMgr = () => {
    const filter = val => (todoList.filter(todo => todo.id === val));
    if (todoList && todoList.length > 0) {
      let guess = todoList.length;
      let match = filter(guess);
      while (match && match.length > 0) {
        guess += 1;
        match = filter(guess);
      }
      return guess;
    }
    return 0;
  };

  const todoAddHandler = () => {
    // This code was using a closure on the todoList. On slow REST transactions there
    // can be a race condition for simultaneous Add requests. Since the post is not synchronized
    // the todoList will become stale. In this case only the last update gets put in the todoList
    // In this example we create a singleton with the useEffect hook to avoid the race condition
    axios.post('http://localhost:3000/todos',
      { id: IDMgr({ type: 'POP' }), name: TodoEntry.name }).then((resp) => {
      // With hooks pass the current state unlike the Component setState() where we would have
      // previous state parameters. The hooks api will manage it internally.
      const todo = { id: resp.data.id, name: resp.data.name };
      dispatch({ type: 'ADD', payload: todo });
    }).catch((err) => {
      console.log(err);
    });
  };

  const todoRemoveHandler = (todoId) => {
    axios.delete(`http://localhost:3000/todos/${todoId}`).then().catch(err => console.log('Remove', err));
    IDMgr({ type: 'PUSH', payload: todoId });
    dispatch({ type: 'REMOVE', payload: todoId });
  };

  return (
    <React.Fragment>
      <h1>{ title }</h1>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={TodoEntry.name}
        style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
      />
      <button type="button" onClick={todoAddHandler}>Add</button>
      { /* Use some JSX code to map the todos to list items */ }
      {useMemo(
        () => <List Items={todoList} OnClick={todoRemoveHandler} />, [todoList],
      )}
    </React.Fragment>
  );
};

MemoTodo.propTypes = {
  title: PropTypes.string,
};

MemoTodo.defaultProps = {
  title: '',
};
//
export default MemoTodo;
