import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
// import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT_P') {
    return { value: action.val, isValidPassw: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR_P') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValidPassw: false }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValidPassw: null });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //1
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  // });
  //2
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  // }, []);
  //3
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, [enteredPassword]);


  const { isValid: emailIsValid } = emailState;
  const { isValidPassw: passwordIsValid } = passwordState;


  useEffect(() => {
    // console.log('Cheking form validation');
    const identifier = setTimeout(() => {
      console.log('Cheking form validation');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);
    clearTimeout();

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };

  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    // event.target.value.includes('@') && enteredPassword.trim().length > 6
    // emailState.value.isValid && enteredPassword.trim().length > 6
    //   emailState.value.isValid && passwordState.value.isValidPassw
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT_P', val: event.target.value });

    // setFormIsValid(
    // emailState.value.includes('@') && event.target.value.trim().length > 6
    //   emailState.isValid && passwordState.isValidPassw
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR_P' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
        emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
