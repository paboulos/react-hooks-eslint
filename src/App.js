import React, { useState } from 'react';
import CustomHookTodo from './Components/customHookTodo';
import Header from './Components/header';
import Auth from './Components/authenticate';
import AuthContext from './auth-context';

const App = () => {
  const [Page, setPage] = useState('auth');
  const [AuthStatus, setAuthStatus] = useState(false);
  const switchPage = (page) => {
    setPage(page);
  };

  const login = () => {
    setAuthStatus(true);
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ status: AuthStatus, login }}>
        <Header
          onLoadTodos={() => { switchPage('todos'); }}
          onLoadAuth={() => { switchPage('auth'); }}
        />
        <hr />
        {Page === 'auth' ? <Auth prompt="login" /> : <CustomHookTodo title="Todo List" />}
      </AuthContext.Provider>
    </div>
  );
};


export default App;
