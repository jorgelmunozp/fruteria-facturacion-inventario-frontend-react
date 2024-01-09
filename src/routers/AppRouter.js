import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "../components/menu/Navbar";
import { LoginScreen } from "../components/login/LoginScreen";
import { FacturacionScreen } from '../components/views/facturacion/FacturacionScreen';
import { CarritoScreen } from "../components/views/carritocompras/CarritoScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { myColor, myTitle } from "../global";

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} />

      <div className="container user-select-none">
        <Routes>
          <Route path={urlBaseFrontend + "/facturacion"} element={
              <PublicRoute>
                <FacturacionScreen />
              </PublicRoute>
            } 
          />

          <Route path={urlBaseFrontend + "/carrito"} element={
              <PublicRoute>
                <CarritoScreen />
              </PublicRoute>
            } 
          />

          <Route path={urlBaseFrontend + "/login"} element={
              <PublicRoute>
                  <LoginScreen myTitle={myTitle} myColor={myColor} />
              </PublicRoute>
            } 
          />

          <Route path={"/" + urlBaseFrontend} element={
              <PublicRoute>
                <FacturacionScreen />
              </PublicRoute>
            } 
          />

          <Route path={"/"} element={
              <PublicRoute>
                <FacturacionScreen />
              </PublicRoute>
            } 
          />

          <Route path="/*" element={
              <PrivateRoute>
                  <DashboardRoutes urlBaseFrontend={urlBaseFrontend} />
              </PrivateRoute>
            } 
          />

        </Routes>
      </div>
    </BrowserRouter>
  )
}
