import React from 'react';

// contexy properties are Dynamic.You can overrride them in the Provider props.
const authContext = React.createContext({ status: false, login: () => {} });

export default authContext;
