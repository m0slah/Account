import React, {useContext} from "react";

import Home from "@/Components/Home/Home";
import Login from "@/Components/Login/Login";
import AuthContext from "@/Components/store/auth-context";

function index() {
  const ctx=useContext(AuthContext);

  return (
    <React.Fragment>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default index;
