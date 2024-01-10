import { formatterPeso } from '../../../helpers/formatterPeso';
import { formatterMiles } from '../../../helpers/formatterMiles';
import { CiShoppingCart } from 'react-icons/ci';

export const CarritoTotalBar = ({ inventario }) => {
  return (
    <>
      <center><h3><CiShoppingCart className='fs-2 mt-4 mb-2'/></h3></center> 
      <div className='row'>
      <center>
        <div className='overflow-auto'>
            <table className='table table-sm table-bordered table-striped w-100'>
              <thead className="thead-light">
                <tr>
                  <th>Fruta</th>
                  <th>Kilos</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Descuento</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{inventario.manzanas.nombre}</td>
                  <td>{formatterMiles.format(inventario.manzanas.cantidad)}</td>
                  <td>{formatterMiles.format(inventario.manzanas.ventas)}</td>
                  <td>{formatterMiles.format(inventario.manzanas.kilos)}</td>
                  <td>{formatterPeso.format(inventario.manzanas.total)}</td>
                  <td>{formatterPeso.format(inventario.manzanas.total)}</td>
                </tr>
                <tr>
                  <td>{inventario.bananos.nombre}</td>
                  <td>{formatterMiles.format(inventario.bananos.cantidad)}</td>
                  <td>{formatterMiles.format(inventario.bananos.ventas)}</td>
                  <td>{formatterMiles.format(inventario.bananos.kilos)}</td>
                  <td>{formatterPeso.format(inventario.bananos.total)}</td>
                  <td>{formatterPeso.format(inventario.bananos.total)}</td>
                </tr>
                <tr>
                    <td>{inventario.mangos.nombre}</td>
                    <td>{formatterMiles.format(inventario.mangos.cantidad)}</td>
                    <td>{formatterMiles.format(inventario.mangos.ventas)}</td>
                    <td>{formatterMiles.format(inventario.mangos.kilos)}</td>
                    <td>{formatterPeso.format(inventario.mangos.total)}</td>
                    <td>{formatterPeso.format(inventario.mangos.total)}</td>
                </tr>
                <tr>
                  <td>{inventario.fresas.nombre}</td>
                  <td>{formatterMiles.format(inventario.fresas.cantidad)}</td>
                  <td>{formatterMiles.format(inventario.fresas.ventas)}</td>
                  <td>{formatterMiles.format(inventario.fresas.kilos)}</td>
                  <td>{formatterPeso.format(inventario.fresas.total)}</td>
                  <td>{formatterPeso.format(inventario.fresas.total)}</td>
                </tr>
              </tbody>
            </table>
            <hr />
          </div>
        </center>
      </div>
    </>
  )
}



