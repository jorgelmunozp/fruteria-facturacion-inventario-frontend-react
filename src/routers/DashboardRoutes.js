import { Routes, Route } from "react-router-dom";
import { InventarioScreen } from "../components/inventario/InventarioScreen";

export const DashboardRoutes = ({ urlBaseFrontend }) => {
  return (
    <>
      <div className="container user-select-none">
        <Routes>
            {/* <Route path={urlBaseFrontend + "/facturacion"} element={<FacturacionScreen urlBaseFrontend={urlBaseFrontend} />} /> */}
            {/* <Route path={urlBaseFrontend + "/carrito"} element={<CarritoScreen />} /> */}
            <Route path={urlBaseFrontend + "/inventario"} element={<InventarioScreen />} />
            <Route path={"/" + urlBaseFrontend} element={<InventarioScreen />} />
        </Routes>
      </div>
    </>
  )
}
