import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
const InventarioScreen = lazy(() => import('../components/views/inventario/InventarioScreen.js'));

export const DashboardRoutes = ({ urlBaseFrontend }) => {
  return (
    <>
      <div className="container user-select-none">
        <Routes>
            <Route path={urlBaseFrontend + "/inventario"} element={<InventarioScreen />} />
            <Route path={"/" + urlBaseFrontend} element={<InventarioScreen />} />
            <Route path={"/*"} element={<InventarioScreen />} />
            <Route path={"/"} element={<InventarioScreen />} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardRoutes;