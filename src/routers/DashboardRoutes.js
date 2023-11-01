import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar"
import { ApartamentosScreen } from "../components/apartamentos/ApartamentosScreen";
import { CasasScreen } from "../components/casas/CasasScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { InmuebleScreen } from "../components/inmueble/InmuebleScreen";
// import inventario from '../inventario.json';
import { InventarioScreen } from "../components/inventario/InventarioScreen";

const name = "react-inmobiliaria";

export const DashboardRoutes = () => {
  // console.log(inventario)
  return (
    <>
      <Navbar name={name} />

      <div className="container">
        <Routes>
            <Route path={name + "/Facturacion"} element={<ApartamentosScreen name={name} />} />
            <Route path={name + "/Carrito"} element={<CasasScreen />} />
            <Route path={name + "/Inventario"} element={<SearchScreen />} />
            <Route path={"/" + name} element={<ApartamentosScreen />} />
        </Routes>
      </div>
    </>
  )
}
