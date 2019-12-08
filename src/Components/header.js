import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../auth-context';

const Header = ({ onLoadTodos, onLoadAuth }) => {
  const { status } = useContext(AuthContext);
  return (
    <header>
      { status ? <button type="button" onClick={onLoadTodos}>TodoList</button> : null }
      <button type="button" onClick={onLoadAuth}>Auth</button>
    </header>
  );
};
Header.propTypes = {
  onLoadTodos: PropTypes.func,
  onLoadAuth: PropTypes.func,
};

Header.defaultProps = {
  onLoadTodos: () => '',
  onLoadAuth: () => '',
};
export default Header;
