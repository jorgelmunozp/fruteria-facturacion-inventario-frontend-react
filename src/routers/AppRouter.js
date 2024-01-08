import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { LoginScreen } from "../components/login/LoginScreen";
import { FacturacionScreen } from '../components/facturacion/FacturacionScreen';
import { CarritoScreen } from "../components/carritocompras/CarritoScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar urlBaseFrontend={urlBaseFrontend} />

      <Routes>
        <Route path={urlBaseFrontend + "/login"} element={
            <PublicRoute>
                <LoginScreen />
            </PublicRoute>
          } 
        />

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

        <Route path="/*" element={
            <PrivateRoute>
                <DashboardRoutes urlBaseFrontend={urlBaseFrontend} />
            </PrivateRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  )
}
