import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../auth-context';

// useContext hook, can have more than one so needs an identifier (e.g. auth-context)
const Authenticate = ({ prompt }) => {
  // destructure
  const { login } = useContext(AuthContext);
  return (
    <React.Fragment>
      <button type="button" onClick={login}>{prompt}</button>
    </React.Fragment>
  );
};
Authenticate.propTypes = {
  prompt: PropTypes.string,
};

Authenticate.defaultProps = {
  prompt: '',
};
export default Authenticate;
