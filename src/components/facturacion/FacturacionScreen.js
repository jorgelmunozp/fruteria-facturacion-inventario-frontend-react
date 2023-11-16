import React, { useState } from 'react';

const urlApiInventario = 'https://jorgelmunozp.github.io/express-fruteria-inventario-backend/inventario.json';
const urlApiProveedores = 'https://jorgelmunozp.github.io/express-fruteria-inventario-backend/proveedores.json';
const urlApiDescuentos = 'https://jorgelmunozp.github.io/express-fruteria-inventario-backend/descuentos.json';
const urlCarritoCompras = 'https://jorgelmunozp.github.io/fruteria-facturacion-inventario-frontend-react/carritocompras/carrito.json';

let inventario, proveedores, descuentos;

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

await fetch(urlApiProveedores)                      //Leer API tabla PROVEEDORES objeto JSON Base de datos
    .then(response => response.json())
    .then(data => proveedores = data)

await fetch(urlApiDescuentos)                       //Leer API tabla DESCUENTOS objeto JSON Base de datos
    .then(response => response.json())
    .then(data => descuentos = data)

const AgregarAlCarrito = (setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas) => {
  let frutaDeseada, cantidadDeseada, descuento;
  const frutaSelector = document.querySelector('input[name="frutaDeseada"]:checked');
  const cantidadSelector = document.getElementById('cantidadDeseada');
  if ((frutaSelector !== null) && (cantidadSelector.value !== 0))  {
    frutaDeseada = frutaSelector.value;
    cantidadDeseada = cantidadSelector.value;
    if(frutaDeseada === "Manzanas"){ setCantidadManzanas(cantidadDeseada); setDescuentoManzanas(Descuento(cantidadDeseada,proveedores.fruta1.valorkilo)); }
    if(frutaDeseada === "Bananos"){ setCantidadBananos(cantidadDeseada); setDescuentoBananos(Descuento(cantidadDeseada,proveedores.fruta2.valorkilo)); }
    if(frutaDeseada === "Mangos"){ setCantidadMangos(cantidadDeseada); setDescuentoMangos(Descuento(cantidadDeseada,proveedores.fruta3.valorkilo)); }
    if(frutaDeseada === "Fresas"){ setCantidadFresas(cantidadDeseada); setDescuentoFresas(Descuento(cantidadDeseada,proveedores.fruta4.valorkilo)); }
    Carrito();
  } else if(frutaSelector === null){
    console.log("Seleccionar fruta a comprar");
  } else if(cantidadSelector.value === 0){
    console.log("Ingresar cantidad de fruta a comprar");
  }
}

const Descuento = (cantidadDeseada,valorKilo) => {
  let descuento;
  if(cantidadDeseada>=0 && cantidadDeseada<=2){ descuento = cantidadDeseada * valorKilo * descuentos.descuento1.descuento; }
    else if(cantidadDeseada>2 && cantidadDeseada<=5){ descuento = cantidadDeseada * valorKilo * descuentos.descuento2.descuento/100; } 
    else if(cantidadDeseada>5 && cantidadDeseada<=10){ descuento = cantidadDeseada * valorKilo * descuentos.descuento3.descuento/100; } 
    else if(cantidadDeseada>10){ descuento = cantidadDeseada * valorKilo * descuentos.descuento4.descuento/100; }
  return descuento;
}

const Carrito = () => {
  // let carrito = JSON.parse(fs.readFileSync('carrito/carrito.json'))    //Convierte JSON a objecto Javascript
  // console.log(carrito);

  // console.log(loadJsonFile('carrito/carrito.json'))

  // fs.writeFileSync('carrito/carrito.json', JSON.stringify({"detalle":"hola"}, null, 2), error => {
  //   if (error) console.log(error);
  // });
}

export const FacturacionScreen = () => {
  const [cantidadManzanas, setCantidadManzanas] = useState(0);
  const [cantidadBananos, setCantidadBananos] = useState(0);
  const [cantidadMangos, setCantidadMangos] = useState(0);
  const [cantidadFresas, setCantidadFresas] = useState(0);
  const [descuentoManzanas, setDescuentoManzanas] = useState(0);
  const [descuentoBananos, setDescuentoBananos] = useState(0);
  const [descuentoMangos, setDescuentoMangos] = useState(0);
  const [descuentoFresas, setDescuentoFresas] = useState(0);
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
                      <input type="submit" value="Agregar" name="botones" id="Agregar" onClick={() => AgregarAlCarrito(setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas)}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
            <form method="GET">
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
                  <td>{formatterPeso.format(proveedores.fruta1.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadManzanas * proveedores.fruta1.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoManzanas)}</td>
                  <td>{formatterPeso.format(cantidadManzanas * proveedores.fruta1.valorkilo - descuentoManzanas)}</td>
                </tr>
                <tr>
                  <td>Bananos</td>
                  <td>{cantidadBananos}</td>
                  <td>{formatterPeso.format(proveedores.fruta2.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadBananos * proveedores.fruta2.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoBananos)}</td>
                  <td>{formatterPeso.format(cantidadBananos * proveedores.fruta2.valorkilo - descuentoBananos)}</td>
                </tr>
                <tr>
                  <td>Mangos</td>
                  <td>{cantidadMangos}</td>
                  <td>{formatterPeso.format(proveedores.fruta3.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadMangos * proveedores.fruta3.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoMangos)}</td>
                  <td>{formatterPeso.format(cantidadMangos * proveedores.fruta3.valorkilo - descuentoMangos)}</td>
                </tr>
                <tr>
                  <td>Fresas</td>
                  <td>{cantidadFresas}</td>
                  <td>{formatterPeso.format(proveedores.fruta4.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadFresas * proveedores.fruta4.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoFresas)}</td>
                  <td>{formatterPeso.format(cantidadFresas * proveedores.fruta4.valorkilo - descuentoFresas)}</td>
                </tr>
                <tr>
                  <td colSpan="5" className='totalCarrito'>Total a pagar</td>
                  <td className='totalCarrito'>{ formatterPeso.format(
                        cantidadManzanas * proveedores.fruta1.valorkilo - descuentoManzanas +
                        cantidadBananos * proveedores.fruta2.valorkilo - descuentoBananos +
                        cantidadMangos * proveedores.fruta3.valorkilo - descuentoMangos +
                        cantidadFresas * proveedores.fruta4.valorkilo - descuentoFresas )}</td>
                </tr>
                <tr> 
                  <td colSpan="6">
                    <input type="submit" value="Facturar" name="botones" id="Facturar"/>
                    <input type="submit" value="Cancelar" name="botones" id="Cancelar"/>
                  </td>
                </tr>
              </tbody>
            </table>
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
                  <td>3 - 5</td>
                  <td>5 %   </td>
                </tr>
                <tr>
                  <td>6 - 10</td>
                  <td>10 %</td>
                </tr>
                <tr>
                  <td>11+</td>
                  <td>15 %</td>
                </tr>
              </tbody>
            </table>
            <a href="/facturas/factura.pdf" target="_blank">
              <p></p></a>
            </form>
          </div>
          <hr />
          </center>
        </div>
        <hr />
      </div>
    </>
  )
}



