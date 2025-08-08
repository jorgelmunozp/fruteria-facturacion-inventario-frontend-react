import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext.js';
import { types } from '../../types/types.js';

import { CiLemon,CiApple,CiShop } from 'react-icons/ci';
import { LoginForm } from './LoginForm.js';
import './login.css';

const user = process.env.REACT_APP_USER;
const password = process.env.REACT_APP_PASSWORD;
const username = process.env.REACT_APP_USERNAME;

export const LoginScreen = ({ myTitle,myColor }) => {

  const [userInput,setUserInput] = useState("");
  const [passwordInput,setPasswordInput] = useState("");
  const [alertMessage,setAlertMessage] = useState("");
  
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    if( userInput === user && passwordInput === password ) {
      setAlertMessage("");
      const action = {
        type: types.login,
        payload: { name: username }
      }
      dispatch(action);
  
      const lastPath = localStorage.getItem('lastPath') || '/';
      navigate(lastPath, {
        replace: true
      });
    } else if( userInput === "" && passwordInput === "" ) {
      setAlertMessage("Ingrese usuario y contraseña");
    } else {
      setUserInput("");
      setPasswordInput("");
      setAlertMessage("Usuario o contraseña no válidos");
    }
  }

  return (

    <div className='container mt-5 text-center user-select-none'>
      <h3 className='main-color'>{ myTitle }</h3>
      <hr />
      <h4>Facturación | Inventario</h4>
      <h1><CiLemon className='icon'/><CiShop className='icon'/><CiApple className='icon'/></h1>
      <br/>
      <LoginForm userInput={userInput} setUserInput={setUserInput}
                   passwordInput={passwordInput} setPasswordInput={setPasswordInput}
                   alertMessage={alertMessage} setAlertMessage={setAlertMessage}
                   handleLogin={handleLogin} placeholderUser={'Usuario'}
                   placeholderPassword={'Contraseña'} buttonTitle={'Ingresar'}
        />
    </div>
  )
}
