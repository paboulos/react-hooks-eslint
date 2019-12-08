import React from 'react';
import PropTypes from 'prop-types';

const List = ({ Items, OnClick }) => {
  const buttonStyle = {
    color: 'blue',
    marginLeft: '3px',
  };
  /* Use some JSX code to map the todos to list items */
  return (
    <ul>
      {Items.map(todo => <li key={todo.id}>{todo.name} <button style={buttonStyle} type="button" onClick={OnClick.bind(this, todo.id)}>delete</button></li>)}
    </ul>
  );
};
List.propTypes = {
  Items: PropTypes.arrayOf(String),
  OnClick: PropTypes.func,
};

List.defaultProps = {
  Items: [],
  OnClick: () => {},
};
//
export default List;
