import React, { useReducer, useState, useContext } from "react";

import Card from "../UI/Card";
import classes from "./Signup.module.css";
import Button from "../UI/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input";

const firstNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const firstLetterIsUpperCase =
      action.val.charAt(0) === action.val.charAt(0).toUpperCase();
    const isNotBlank = action.val.trim().length !== 0;
    return {
      value: action.val,
      isValid: firstLetterIsUpperCase && isNotBlank,
    };
  }
  if (action.type === "INPUT_BLUR") {
    const firstLetterIsUpperCase =
      state.value.charAt(0) === state.value.charAt(0).toUpperCase();
    const isNotBlank = state.value.trim().length !== 0;
    return {
      value: state.value,
      isValid: firstLetterIsUpperCase && isNotBlank,
    };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Signup = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const firstNameChangeHandler = (event) => {
    const firstLetterIsUpperCase =
      event.target.value.charAt(0) ===
      event.target.value.charAt(0).toUpperCase();

    const isNotBlank = event.target.value.trim().length !== 0;
    setFormIsValid(firstLetterIsUpperCase && isNotBlank);

    dispatchFirstName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const emailChangeHandler = (event) => {
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        firstNameState.isValid
    );

    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setFormIsValid(
      firstNameState.isValid &&
        emailState.isValid &&
        event.target.value.trim().length > 6
    );

    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const validateFirstNameHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onSignup(
      firstNameState.value,
      emailState.value,
      passwordState.value
    );

   
  };

  return (
    <Card>
      <form className={classes.signup} onSubmit={submitHandler}>
        <Input
          id="fname"
          label="First Name"
          type="fname"
          isValid={firstNameIsValid}
          value={firstNameState.value}
          onChange={firstNameChangeHandler}
          onBlur={validateFirstNameHandler}
        />
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
            onClick={authCtx.onSignup}
          >
            Signup
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Signup;
