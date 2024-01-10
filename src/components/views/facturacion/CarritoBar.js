import { formatterPeso } from '../../../helpers/formatterPeso';
import { formatterMiles } from '../../../helpers/formatterMiles';

export const CarritoBar = ({ cantidades,descuentos,cantidadManzanas,descuentoManzanas,cantidadBananos,descuentoBananos,cantidadMangos,descuentoMangos,cantidadFresas,descuentoFresas,proveedores }) => {
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
                <td>{formatterMiles.format(cantidades[i])}</td>
                <td>{formatterPeso.format(proveedor.detail.valorkilo)}</td>
                <td>{formatterPeso.format(cantidades[i] * proveedor.detail.valorkilo)}</td>
                <td>{formatterPeso.format(descuentos[i])}</td>
                <td>{formatterPeso.format(cantidades[i] * proveedor.detail.valorkilo - descuentos[i])}</td>
              </tr>              
          ))}
            {/* <tr>
              <td>Manzanas</td>
              <td>{formatterMiles.format(cantidadManzanas)}</td>
              <td>{formatterPeso.format(proveedores[0].detail.valorkilo)}</td>
              <td>{formatterPeso.format(cantidadManzanas * proveedores[0].detail.valorkilo)}</td>
              <td>{formatterPeso.format(descuentoManzanas)}</td>
              <td>{formatterPeso.format(cantidadManzanas * proveedores[0].detail.valorkilo - descuentoManzanas)}</td>
            </tr>
            <tr>
              <td>Bananos</td>
              <td>{formatterMiles.format(cantidadBananos)}</td>
              <td>{formatterPeso.format(proveedores[1].detail.valorkilo)}</td>
              <td>{formatterPeso.format(cantidadBananos * proveedores[1].detail.valorkilo)}</td>
              <td>{formatterPeso.format(descuentoBananos)}</td>
              <td>{formatterPeso.format(cantidadBananos * proveedores[1].detail.valorkilo - descuentoBananos)}</td>
            </tr>
            <tr>
              <td>Mangos</td>
              <td>{formatterMiles.format(cantidadMangos)}</td>
              <td>{formatterPeso.format(proveedores[2].detail.valorkilo)}</td>
              <td>{formatterPeso.format(cantidadMangos * proveedores[2].detail.valorkilo)}</td>
              <td>{formatterPeso.format(descuentoMangos)}</td>
              <td>{formatterPeso.format(cantidadMangos * proveedores[2].detail.valorkilo - descuentoMangos)}</td>
            </tr>
            <tr>
              <td>Fresas</td>
              <td>{formatterMiles.format(cantidadFresas)}</td>
              <td>{formatterPeso.format(proveedores[3].detail.valorkilo)}</td>
              <td>{formatterPeso.format(cantidadFresas * proveedores[3].detail.valorkilo)}</td>
              <td>{formatterPeso.format(descuentoFresas)}</td>
              <td>{formatterPeso.format(cantidadFresas * proveedores[3].detail.valorkilo - descuentoFresas)}</td>
            </tr> */}
            <tr>
              <td colSpan="5" className='totalCarrito'>Total a pagar</td>
              <td className='totalCarrito'>{ formatterPeso.format(
                    cantidadManzanas * proveedores[0].detail.valorkilo - descuentoManzanas +
                    cantidadBananos * proveedores[1].detail.valorkilo - descuentoBananos +
                    cantidadMangos * proveedores[2].detail.valorkilo - descuentoMangos +
                    cantidadFresas * proveedores[3].detail.valorkilo - descuentoFresas )}</td>
            </tr>
        </tbody>
        </table>
    </div>
  )
}
