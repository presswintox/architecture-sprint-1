import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
        dispatchEvent(new CustomEvent("profile-update", {
          detail: userData
        }));
        setCurrentUser(userData);
    })
    .catch((err) => console.log(err));
    }, []);

    const currentUserHandler = event => {
        setCurrentUser(event.detail);
    };

    React.useEffect(() => {
        addEventListener('profile-update', currentUserHandler);
        return () => removeEventListener('profile-update', currentUserHandler);
    }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;