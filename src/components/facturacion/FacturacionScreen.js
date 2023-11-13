import React from 'react';

const urlApiInventario = 'https://jorgelmunozp.github.io/express-fruteria-inventario-backend/inventario.json';
const urlApiFrutas = 'https://jorgelmunozp.github.io/express-fruteria-inventario-backend/frutas.json';
let inventario,frutas;

const formatterPeso = new Intl.NumberFormat('es-CO', {   //Formato moneda $ pesos Colmbianos
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});
const formatterMiles = new Intl.NumberFormat('es-CO', {   //Formato miles para cantidades
  style: 'decimal',
  minimumFractionDigits: 0
});

await fetch(urlApiInventario)                       //Leer API tabla INVENTARIO objeto JSON Base de datos
    .then(response => response.json())
    .then(data => inventario = data)

await fetch(urlApiFrutas)                          //Leer API tabla FACTURA objeto JSON Base de datos
    .then(response => response.json())
    .then(data => frutas = data)

export const FacturacionScreen = () => {

  return (
    <>
      <center><h3>Facturación</h3></center> 
      <hr />
      <div className='row'> 
        <div>
          <center>
            <h4>Frutas Disponibles</h4>
            <hr />
            <table className='table table-sm table-bordered table-striped w-100'>
              <thead className="thead-light">
                <tr>
                  <th>Fruta</th>
                  <th>Disponibilidad</th>
                  <th>Ventas</th>
                  <th>Kilos vendidos</th>
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
                </tr>
                <tr>
                  <td>{inventario.bananos.nombre}</td>
                  <td>{formatterMiles.format(inventario.bananos.cantidad)}</td>
                  <td>{formatterMiles.format(inventario.bananos.ventas)}</td>
                  <td>{formatterMiles.format(inventario.bananos.kilos)}</td>
                  <td>{formatterPeso.format(inventario.bananos.total)}</td>
                </tr>
                <tr>
                    <td>{inventario.mangos.nombre}</td>
                    <td>{formatterMiles.format(inventario.mangos.cantidad)}</td>
                    <td>{formatterMiles.format(inventario.mangos.ventas)}</td>
                    <td>{formatterMiles.format(inventario.mangos.kilos)}</td>
                    <td>{formatterPeso.format(inventario.mangos.total)}</td>
                </tr>
                <tr>
                  <td>{inventario.fresas.nombre}</td>
                  <td>{formatterMiles.format(inventario.fresas.cantidad)}</td>
                  <td>{formatterMiles.format(inventario.fresas.ventas)}</td>
                  <td>{formatterMiles.format(inventario.fresas.kilos)}</td>
                  <td>{formatterPeso.format(inventario.fresas.total)}</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <hr />
        <div >
          <center>
            <h4>Carrito de Compras</h4>
            <hr />
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
          </center>
        </div>
      </div>
    </>
  )
}



