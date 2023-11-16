import React, { useState } from 'react';

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

const AgregarAlCarrito = (setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas) => {
  let frutaDeseada, cantidadDeseada;
  const frutaSelector = document.querySelector('input[name="frutaDeseada"]:checked');
  const cantidadSelector = document.getElementById('cantidadDeseada');
  
  if ((frutaSelector != null) && (cantidadSelector.value != 0))  {
    frutaDeseada = frutaSelector.value;
    cantidadDeseada = cantidadSelector.value;
    if(frutaDeseada == "Manzanas"){ setCantidadManzanas(cantidadDeseada); }
    if(frutaDeseada == "Bananos"){ setCantidadBananos(cantidadDeseada); }
    if(frutaDeseada == "Mangos"){ setCantidadMangos(cantidadDeseada); }
    if(frutaDeseada == "Fresas"){ setCantidadFresas(cantidadDeseada); }
  } else if(frutaSelector == null){
    console.log("Seleccionar fruta a comprar");
  } else if(cantidadSelector.value == 0){
    console.log("Ingresar cantidad de fruta a comprar");
  }
}


export const FacturacionScreen = () => {
  const [cantidadManzanas, setCantidadManzanas] = useState(0);
  const [cantidadBananos, setCantidadBananos] = useState(0);
  const [cantidadMangos, setCantidadMangos] = useState(0);
  const [cantidadFresas, setCantidadFresas] = useState(0);
  
  return (
    <>
      <center><h3>Facturación</h3></center> 
      <hr />
      <div className='row'> 
        <div>
          <center>
            <div>
              <table className='table table-sm table-bordered table-striped w-100'>
                <thead className="thead-light">
                  <tr>
                    <th>Fruta</th>
                    <th>Cantidad</th>
                    <th>Carrito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>  
                      <table id="grupoFrutas" border="3" frame="void" rules="all"> 
                        <tbody>
                          <tr>
                            <td><input type="radio" name="frutaDeseada" value="Manzanas" id="Manzanas"/></td>
                            <td><label htmlFor="Manzanas">Manzanas</label></td>
                          </tr>
                          <tr>
                            <td><input type="radio" name="frutaDeseada" value="Bananos" id="Bananos"/></td>
                            <td><label htmlFor="Bananos">Bananos</label></td>
                          </tr>
                          <tr>
                            <td><input type="radio" name="frutaDeseada" value="Mangos" id="Mangos"/></td>
                            <td><label htmlFor="Mangos">Mangos</label></td>
                          </tr>
                          <tr>
                            <td><input type="radio" name="frutaDeseada" value="Fresas" id="Fresas"/></td>
                            <td><label htmlFor="Fresas">Fresas</label></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td><input id="cantidadDeseada" type="number" name="cantidadDeseada" defaultValue={0} min="0" placeholder=" Kilos de fruta" autoComplete="off"/></td>
                    <td>
                      <input type="submit" value="Agregar" name="botones" id="Agregar" onClick={() => AgregarAlCarrito(setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas)}/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br/>
              <p></p>
            </div>
            <div>
            <form method="GET">
            <table className='table table-sm table-bordered table-striped w-100'>
                <thead className="thead-light">
                  <tr>
                    <th>Total a Pagar</th>
                    <th>
                      <input id="totalCompra" type="text" name="totalCompra" placeholder=" Total a pagar" autoComplete="off" disabled/>
                    </th>
                  </tr>
                </thead>
              </table>
              <hr />
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
                    <td>Manzanas</td>
                    <td>{cantidadManzanas}</td>
                    <td>{formatterPeso.format(frutas.fruta1.valorkilo)}</td>
                    <td>{formatterPeso.format(cantidadManzanas * frutas.fruta1.valorkilo)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Bananos</td>
                    <td>{cantidadBananos}</td>
                    <td>{formatterPeso.format(frutas.fruta2.valorkilo)}</td>
                    <td>{formatterPeso.format(cantidadBananos * frutas.fruta2.valorkilo)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Mangos</td>
                    <td>{cantidadMangos}</td>
                    <td>{formatterPeso.format(frutas.fruta3.valorkilo)}</td>
                    <td>{formatterPeso.format(cantidadMangos * frutas.fruta3.valorkilo)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Fresas</td>
                    <td>{cantidadFresas}</td>
                    <td>{formatterPeso.format(frutas.fruta4.valorkilo)}</td>
                    <td>{formatterPeso.format(cantidadFresas * frutas.fruta4.valorkilo)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="5">Total a pagar</td>
                    <td></td>
                  </tr>
                  <tr> 
                    <td colSpan="6">
                      <input type="submit" value="Facturar" name="botones" id="Facturar"/>
                      <input type="submit" value="Cancelar" name="botones" id="Cancelar"/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <a href="/facturas/factura.pdf" target="_blank">
                <p></p></a>
            </form>
          </div>
          <hr />
          <h4>Descuentos</h4>
          <hr />
            <table className='table table-sm table-bordered table-striped w-100'>
              <thead className="thead-light">
                <tr>
                  <th>Cantidad (Kilos)</th>
                  <th>Descuento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0 - 2</td>
                  <td>0 %</td>
                </tr>
                <tr>
                  <td>2 - 5</td>
                  <td>5 %   </td>
                </tr>
                <tr>
                  <td>5 - 10</td>
                  <td>10 %</td>
                </tr>
                <tr>
                  <td>10+</td>
                  <td>15 %</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <hr />
      </div>
    </>
  )
}



