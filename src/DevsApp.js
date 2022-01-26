// import React from 'react';
import { useState } from 'react';
import { AuthContext } from './components/auth/AuthContext';
import { AppRouter } from './routers/AppRouter';
import './styles/devsApp.css'

export const DevsApp = () => {

  const init = {
    name: '',
    uid: '',
    logged: false
  }

  const [user, setUser] = useState(init);

  return( 
      <AuthContext.Provider value={{
        user,
        setUser
      }}>
        <AppRouter />
      </AuthContext.Provider>
  );
};
