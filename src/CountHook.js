import React, { useState } from 'react';

let firstRender = true;

export default () => {
  let initName;
  if (firstRender) {
    [initName] = useState('foo');
    firstRender = false;
  }
  const [firstName, setFirstName] = useState(initName);
  const [lastName, setLastName] = useState('bar');
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>
        {firstName} {lastName} clicked {count} times
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <input
        placeholder="First Name"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setFirstName(e.target.value);
          }
        }}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        value={firstName}
      />
      <input
        placeholder="Last Name"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setLastName(e.target.value);
          }
        }}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        value={lastName}
      />
    </div>
  );
};
