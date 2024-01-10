import { formatterPeso } from '../../../helpers/formatterPeso';
import { formatterMiles } from '../../../helpers/formatterMiles';

export const CarritoTotalBar = ({ inventario }) => {
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
                  inventario.map(inventario =>(
                    <tr>
                    <td>{inventario.detail.nombre}</td>
                    <td>{formatterMiles.format(inventario.detail.cantidad)}</td>
                    <td>{formatterMiles.format(inventario.detail.ventas)}</td>
                    <td>{formatterMiles.format(inventario.detail.kilos)}</td>
                    <td>{formatterPeso.format(inventario.detail.total)}</td>
                    <td>{formatterPeso.format(inventario.detail.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        </center>
      </div>
    </>
  )
}



