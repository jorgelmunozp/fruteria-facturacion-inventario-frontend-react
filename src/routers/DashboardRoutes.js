import { Routes, Route } from "react-router-dom";
import { InventarioScreen } from "../components/views/inventario/InventarioScreen";

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
