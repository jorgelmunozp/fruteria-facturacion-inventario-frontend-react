import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar"
import { FacturacionScreen } from "../components/facturacion/FacturacionScreen";
import { CarritoScreen } from "../components/carritocompras/CarritoScreen";
import { InventarioScreen } from "../components/inventario/InventarioScreen";

const name = "fruteria-facturacion-inventario-frontend-react";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar name={name} />

      <div className="container">
        <Routes>
            <Route path={name + "/facturacion"} element={<FacturacionScreen name={name} />} />
            <Route path={name + "/fruteria-facturacion-inventario-frontend-react/facturacion"} element={<FacturacionScreen />} />
            <Route path={name + "/carrito"} element={<CarritoScreen />} />
            <Route path={name + "/fruteria-facturacion-inventario-frontend-react/carrito"} element={<CarritoScreen />} />
            <Route path={name + "/inventario"} element={<InventarioScreen />} />
            <Route path={name + "/fruteria-facturacion-inventario-frontend-react/inventario"} element={<InventarioScreen />} />
            <Route path={"/" + name} element={<FacturacionScreen />} />
        </Routes>
      </div>
    </>
  )
}
