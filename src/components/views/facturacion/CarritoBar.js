import { formatterPeso } from '../../../helpers/formatterPeso.js';
import { formatterMiles } from '../../../helpers/formatterMiles.js';

export const CarritoBar = ({ cantidadFrutas,descuentoFrutas,proveedores }) => {
  return (
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
          { proveedores.map((proveedor,i) => (
              <tr key={i}>
                <td>{proveedor.detail.nombre}</td>
                <td>{formatterMiles.format(cantidadFrutas[i])}</td>
                <td>{formatterPeso.format(proveedor.detail.valorkilo)}</td>
                <td>{formatterPeso.format(cantidadFrutas[i] * proveedor.detail.valorkilo)}</td>
                <td>{formatterPeso.format(descuentoFrutas[i])}</td>
                <td>{formatterPeso.format(cantidadFrutas[i] * proveedor.detail.valorkilo - descuentoFrutas[i])}</td>
              </tr>              
          ))}
          <tr>
            <td colSpan="5" className='totalCarrito'>Total a pagar</td>
            <td className='totalCarrito'>{ formatterPeso.format(
                cantidadFrutas[0] * proveedores[0].detail.valorkilo - descuentoFrutas[0] +
                cantidadFrutas[1] * proveedores[1].detail.valorkilo - descuentoFrutas[1] +
                cantidadFrutas[2] * proveedores[2].detail.valorkilo - descuentoFrutas[2] +
                cantidadFrutas[3] * proveedores[3].detail.valorkilo - descuentoFrutas[3] )}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
