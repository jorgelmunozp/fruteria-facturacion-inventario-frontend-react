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
            <form method="GET">
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
                          <tr>
                            <td> 
                              <input type="radio" name="frutaDeseada" value="Manzanas" id="Manzanas"/>
                            </td>
                            <td>
                              <label htmlFor="Manzanas">Manzanas</label>
                            </td>
                          </tr>
                          <tr>
                            <td> 
                              <input type="radio" name="frutaDeseada" value="Bananos" id="Bananos"/>
                            </td>
                            <td>
                              <label htmlFor="Bananos">Bananos</label>
                            </td>
                          </tr>
                          <tr>
                            <td> 
                              <input type="radio" name="frutaDeseada" value="Mangos" id="Mangos"/>
                            </td>
                            <td>
                              <label htmlFor="Mangos">Mangos</label>
                            </td>
                          </tr>
                          <tr>
                            <td> 
                              <input type="radio" name="frutaDeseada" value="Fresas" id="Fresas"/>
                            </td>
                            <td>
                              <label htmlFor="Fresas">Fresas</label>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <input id="cantidadDeseada" type="number" name="cantidadDeseada" value="0" min="0" placeholder=" Kilos de fruta" autocomplete="off"/>
                      </td>
                      <td>
                        <input type="submit" value="Agregar" name="botones" id="Agregar"/>
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
                        <input id="totalCompra" type="text" name="totalCompra" placeholder=" Total a pagar" autocomplete="off" disabled/>
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
                      <td></td>
                      <td>  </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Bananos</td>
                      <td></td>
                      <td>  </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Mangos</td>
                      <td></td>
                      <td>  </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Fresas</td>
                      <td></td>
                      <td>  </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="5">Total a pagar</td>
                      <td></td>
                    </tr>
                    <tr> 
                      <td colspan="6">
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
          </form>
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



