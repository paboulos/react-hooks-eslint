/**
 * This Component is an enhancement to the useMemoTodo by adding the useFormInput custom
 * hook to improve separation of concerns. This optimization helps to avoid complexity,
 * and duplication.
 */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import useFormInput from '../hooks/useForm';
import useList from '../hooks/useList';

const MemoTodo = (props) => {
  const { title } = props;
  // Destruct State hooks
  const { value, onChange, validity } = useFormInput();
  const { todoList, todoAddHandler, todoRemoveHandler } = useList(value);
  return (
    <React.Fragment>
      <h1>{ title }</h1>
      <input
        type="text"
        placeholder="Todo"
        onChange={onChange}
        value={value}
        style={{ backgroundColor: validity ? 'transparent' : 'red' }}
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
