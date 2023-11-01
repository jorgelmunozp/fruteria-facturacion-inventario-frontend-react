import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

import { CiLemon,CiApple,CiShop,CiShoppingBasket,CiShoppingCart } from 'react-icons/ci';

export const LoginScreen = () => {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {

      const action = {
        type: types.login,
        payload: { name: 'Jorge' }
      }

      dispatch(action);

      const lastPath = localStorage.getItem('lastPath') || '/';

      navigate(lastPath, {
        replace: true
      });
  }

  return (
    <div className='container mt-5 text-center'>
      <h1>La Frutería</h1>
      <hr />
      <h4>Facturación | Inventario</h4>
      <h1><CiLemon className='icon'/><CiShop className='icon'/><CiApple className='icon'/></h1>
      <br/>
      <div className="d-grid gap-2 col-4 mx-auto">
        <input type='text' placeholder='Usuario' autoComplete='off' className='text-center'></input>
        <input type='password' placeholder='Contraseña' autoComplete='off' className='text-center'></input>
        <button className='btn-login btn btn-lg btn-outline-warning shadow-sm' onClick={ handleLogin }>
          Ingresar
        </button>
      </div>
    </div>
  )
}
