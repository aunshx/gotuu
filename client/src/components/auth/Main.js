import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChangePassword from './ChangePassword';
import Login from './Login';
import ChangePassword2 from './ChangePassword2';
import store from '../../store';
import { DARK_MODE, LIGHT_MODE, SECURITY_CODE_CHECK_LOADING_COMPLETE, SECURITY_CODE_LOADING_COMPLETE } from '../../redux/actions/types';

const Main = (props) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (localStorage.theme === "dark") {
        console.log(localStorage.theme);
        store.dispatch({
          type: DARK_MODE,
        });
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }

      if (localStorage.theme === "light") {
        store.dispatch({
          type: LIGHT_MODE,
        });
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    }, []);


    const goLoginToChangePass = () => {
        setCount(1)
    }

    const goChangePassToLogin = () => {
        setCount(0)
        store.dispatch({
          type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
        });
        store.dispatch({
          type: SECURITY_CODE_LOADING_COMPLETE,
        });
    }

    const goChangePassToChangePass2 = () => {
        setCount(2)
    }

    const goChangePass2ToChangePass = () => {
        setCount(1)
         store.dispatch({
            type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
          });
          store.dispatch({
            type: SECURITY_CODE_LOADING_COMPLETE,
          });
    }

    const goChangePass2ToLogin = () => {
      setCount(0)
      store.dispatch({
        type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
      });
      store.dispatch({
        type: SECURITY_CODE_LOADING_COMPLETE,
      });
    }

  return (
    <div>
      {count === 0 && <Login goLoginToChangePass={goLoginToChangePass} />}
      {count === 1 && (
        <ChangePassword
          goChangePassToLogin={goChangePassToLogin}
          goChangePassToChangePass2={goChangePassToChangePass2}
        />
      )}
      {count === 2 && (
        <ChangePassword2
          goChangePass2ToChangePass={goChangePass2ToChangePass}
          goChangePass2ToLogin={goChangePass2ToLogin}
          setCount={setCount}
        />
      )}
    </div>
  );
};

Main.propTypes = {};

export default Main;