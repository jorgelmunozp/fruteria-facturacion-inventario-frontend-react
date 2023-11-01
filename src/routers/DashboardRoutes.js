import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar"
import { ApartamentosScreen } from "../components/apartamentos/ApartamentosScreen";
import { CasasScreen } from "../components/casas/CasasScreen";
import { InventarioScreen } from "../components/inventario/InventarioScreen";

const name = "fruteria-facturacion-inventario-frontend-react";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar name={name} />

      <div className="container">
        <Routes>
            <Route path={name + "/Facturacion"} element={<ApartamentosScreen name={name} />} />
            <Route path={name + "/Carrito"} element={<CasasScreen />} />
            <Route path={name + "/Inventario"} element={<InventarioScreen />} />
            <Route path={"/" + name} element={<ApartamentosScreen />} />
        </Routes>
      </div>
    </>
  )
}
