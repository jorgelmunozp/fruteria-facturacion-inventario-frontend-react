import { formatterPeso } from '../../../helpers/formatterPeso.js';
import { formatterMiles } from '../../../helpers/formatterMiles.js';

export const CarritoBar = ({ carrito }) => {
  return (
    <>
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
                {
                  carrito.detalle.map(carrito =>(
                    <tr key={carrito.fruta.nombre}>
                      <td>{carrito.fruta.nombre}</td>
                      <td>{formatterMiles.format(carrito.fruta.kilos)}</td>
                      <td>{formatterMiles.format(carrito.fruta.precio)}</td>
                      <td>{formatterMiles.format(carrito.fruta.subtotal)}</td>
                      <td>{formatterPeso.format(carrito.fruta.descuento)}</td>
                      <td>{formatterPeso.format(carrito.fruta.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    </>
  )
}



