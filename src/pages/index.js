import React, {useContext} from "react";

import Home from "@/Components/Home/Home";
import Login from "@/Components/Login/Login";
import AuthContext from "@/Components/store/auth-context";
import MainHeader from "@/Components/Header/MainHeader";

function index() {
  const ctx=useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default index;
