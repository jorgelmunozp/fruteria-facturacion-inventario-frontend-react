import { formatterPeso } from '../../../helpers/formatterPeso.js';
import { formatterMiles } from '../../../helpers/formatterMiles.js';

const urlApiInventario = process.env.REACT_APP_API_INVENTARIO;
const urlApiProveedores = process.env.REACT_APP_API_PROVEEDORES;
let inventario,frutas;

await fetch(urlApiInventario)                       //Leer API tabla INVENTARIO objeto JSON Base de datos
    .then(response => response.json())
    .then(data => inventario = data)

await fetch(urlApiProveedores)                          //Leer API tabla FACTURA objeto JSON Base de datos
    .then(response => response.json())
    .then(data => frutas = data)

export const InventarioScreen = () => {

  return (
    <>
      <center><h5 className='my-4'>Inventario</h5></center> 
      <div className='row'> 
        <center>
          <div className='overflow-auto'>
            <table className='table table-sm table-bordered table-striped w-100'>
              <thead className="thead-light">
                <tr>
                  <th>Fruta</th>
                  <th>Disponibilidad</th>
                  <th>Ventas</th>
                  <th>Kilos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                { inventario.map(inventario => (
                    <tr key={inventario.detail.nombre}>
                      <td>{inventario.detail.nombre}</td>
                      <td>{formatterMiles.format(inventario.detail.cantidad)}</td>
                      <td>{formatterMiles.format(inventario.detail.ventas)}</td>
                      <td>{formatterMiles.format(inventario.detail.kilos)}</td>
                      <td>{formatterPeso.format(inventario.detail.total)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div >
            <h5 className='my-4'>Proveedores</h5>
            <div className='overflow-auto'>
              <table className='table table-sm table-bordered table-striped w-100'>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Fruta</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Valor (K)</th>
                    <th scope="col">Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  { frutas.map(fruta => (
                      <tr key={fruta.detail.nombre}>
                        <td>{fruta.detail.nombre}</td>
                        <td>{fruta.detail.descripcion}</td>
                        <td>{formatterPeso.format(fruta.detail.valorkilo)}</td>
                        <td className='text-nowrap text-truncate'>{fruta.detail.proveedor}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </center>
      </div>
    </>
  )
}

export default InventarioScreen;