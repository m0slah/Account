import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  isSignedUp: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
  onSignup: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const storedUserSignupInfo = localStorage.getItem("isSignedUp");
    // setIsSignedUp(true) && storedUserSignupInfo === "1";
  }, []);

  const signupHandler = (email, password) => {
    setIsSignedUp(true);
  };

  const loginHandler = (email, password) => {
    // console.log("email: " + localStorage.getItem.isLoggedIn);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSignedUp,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
