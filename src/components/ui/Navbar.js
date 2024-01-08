import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

import { CiLemon } from 'react-icons/ci';

export const Navbar = ({urlBaseFrontend}) => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate('/facturacion', { replace: true });
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-lg user-select-none">
                <div className="container-fluid">
                    &nbsp;
                    <CiLemon className='icon fs-4'/>&nbsp;
                    <Link className="navbar-brand main-color" to="/fruteria-facturacion-inventario-frontend-react">La Frutería</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"  id="navbarContent">
                        <div className="navbar-nav">
                            {
                                (user.logged)
                                    ?   <>
                                            <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                                                to={urlBaseFrontend+"/inventario"}>Inventario</NavLink>
                                        </>
                                    :   <>
                                            <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                                                to={urlBaseFrontend+"/facturacion"}>Facturación</NavLink>
                                            <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                                                to={urlBaseFrontend+"/carrito"}>Carrito</NavLink>
                                        </>
                            }
                        </div>
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                            <ul className="navbar-nav ml-auto">
                                {/* <span className='nav-item nav-link text'>{user.name}</span> */}
                                <span className='nav-item nav-link main-text'>{user.logged ? user.name : ''}</span>
                                <button className="nav-item nav-link btn" onClick={ handleLogout }>{ user.logged ? 'Salir' : 'Ingresar' }</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}