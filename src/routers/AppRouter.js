import { lazy } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "../components/menu/Navbar.js";
import { FacturacionScreen } from '../components/views/facturacion/FacturacionScreen.js';
import { PublicRoute } from "./PublicRoute.js";
import { myColor, myTitle } from "../global.js";

const PrivateRoute = lazy(() => import('./PrivateRoute.js'));
const DashboardRoutes = lazy(() => import('./DashboardRoutes.js'));
const CarritoScreen = lazy(() => import('../components/views/carritocompras/CarritoScreen.js'));
const LoginScreen = lazy(() => import('../components/login/LoginScreen.js'));

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const AppRouter = ({ Logo, theme, handleTheme }) => {
  return (
    <Router>
      <Navbar urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} />

      <div className="container user-select-none">
        <Routes>
          <Route path={urlBaseFrontend + "/facturacion"} element={ <PublicRoute><FacturacionScreen /></PublicRoute> } />
          <Route path={urlBaseFrontend + "/carrito"} element={ <PublicRoute><CarritoScreen /></PublicRoute>} />
          <Route path={urlBaseFrontend + "/login"} element={ <PublicRoute><LoginScreen myTitle={myTitle} myColor={myColor} /></PublicRoute>} />
          <Route path={"/" + urlBaseFrontend} element={ <PublicRoute><FacturacionScreen /></PublicRoute>} />
          <Route path={"/"} element={ <PublicRoute><FacturacionScreen /></PublicRoute> } />
          <Route path="/*" element={ <PrivateRoute><DashboardRoutes urlBaseFrontend={urlBaseFrontend} /></PrivateRoute> } />
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter;