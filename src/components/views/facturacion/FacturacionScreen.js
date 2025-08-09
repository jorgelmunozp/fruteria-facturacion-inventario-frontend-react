import { Suspense, lazy, useState } from 'react';
import { getFetch } from '../../../helpers/getFetch.js';
import { formatterPeso } from '../../../helpers/formatterPeso.js';
import { formatterMiles } from '../../../helpers/formatterMiles.js';
import { CiShoppingCart } from 'react-icons/ci';
import { CarritoBar } from './CarritoBar.js';
import carrito from '../../../carrito/carrito.json';

const Modal = lazy(() => import('../../modal/Modal.js'));
{/* <Suspense fallback={<></>}><Modal Icon={icons[this.type].Icon} iconColor={icons[this.type].iconColor} title={this.title} fontFamily={'century-gothic'} /></Suspense> */}

const fecha = new Date();                                           //Lee la fecha actual del sistema
const username = process.env.REACT_APP_USERNAME;

const urlApiInventario = process.env.REACT_APP_API_INVENTARIO;      //APIs de las tablas en la Base de datos
const urlApiFactura = process.env.REACT_APP_API_FACTURA;
const urlApiProveedores = process.env.REACT_APP_API_PROVEEDORES;
const urlApiDescuentos = process.env.REACT_APP_API_DESCUENTOS;
// const urlCarritoCompras = process.env.REACT_APP_API_CARRITO;
let inventario = await getFetch(urlApiInventario);                  //Leer API de la tabla con objetos JSON en la Base de datos
let factura = await getFetch(urlApiFactura);
let proveedores = await getFetch(urlApiProveedores);
let descuentos = await getFetch(urlApiDescuentos);
// let carrito = await getFetch(urlCarritoCompras);

const AgregarAlCarrito = ( setAlertMessage,cantidadFrutas,descuentoFrutas,setCantidadFrutas,setDescuentoFrutas,setTotalFrutas ) => {
  let frutaDeseada, cantidadDeseada;
  const frutaSelector = document.querySelector('input[name="frutaDeseada"]:checked');
  const cantidadSelector = document.getElementById('cantidadDeseada');

  if(frutaSelector !== null && cantidadSelector.value !== "0")  {
    frutaDeseada = frutaSelector.value;
    cantidadDeseada = cantidadSelector.value;

    for (let i in inventario) {
      if(frutaDeseada.toLowerCase() === inventario[i].detail.nombre.toLowerCase()) {       // Calcula cantidad, descuento, total a pagar y lo guarda en el Carrito de compras
        if(cantidadDeseada <= inventario[i].detail.cantidad){ setCantidadFrutas[i](cantidadDeseada); setDescuentoFrutas[i](Descuento(cantidadDeseada,proveedores[i].detail.valorkilo)); }
        else if(cantidadDeseada > inventario[i].detail.cantidad){ setCantidadFrutas[i](inventario[i].detail.cantidad); setDescuentoFrutas[i](Descuento(cantidadDeseada,proveedores[0].detail.valorkilo)); setAlertMessage("Hay " + inventario[0].detail.cantidad + " kilos"); }
        setTotalFrutas[i](cantidadDeseada * proveedores[i].detail.valorkilo - Descuento(cantidadDeseada,proveedores[i].detail.valorkilo));
      } 

      console.log("frutaSelector.value: ",frutaSelector.value);
      console.log("inventario[i].detail.nombre: ",inventario[i].detail.nombre);
      console.log("document.getElementById(inventario[i].detail.nombre): ",document.getElementById(inventario[i].detail.nombre));
      document.getElementById(inventario[i].detail.nombre).checked = false;       // Clear checkbox's
    }
    cantidadSelector.value = 0;
    setAlertMessage("");
    // GuardarCarrito(cantidadFrutas,descuentoFrutas);
    for (let i in inventario) {                                                   // Actualiza el archivo json del carrito de compras del frontend del lado del cliente
      carrito.detalle[i].fruta.kilos = cantidadFrutas[i];
      carrito.detalle[i].fruta.subtotal = cantidadFrutas[i] * proveedores[i].detail.valorkilo;
      carrito.detalle[i].fruta.descuento = descuentoFrutas[i];
      carrito.detalle[i].fruta.total = carrito.detalle[i].fruta.subtotal - descuentoFrutas[i];
    }
    
    console.log("carrito actualizado carrito.json: ",carrito)

  } else if(frutaSelector === null) {
    setAlertMessage("Elige fruta");
  } else if(cantidadSelector.value === "0") {
    setAlertMessage("Ingresa kilos");
  }
}

const Descuento = (cantidadDeseada,valorKilo) => {          // Calcula el descuento dependiendo de la cantidad de fruta
  let descuento;
  if(cantidadDeseada>=0 && cantidadDeseada<=2){ descuento = cantidadDeseada * valorKilo * descuentos[0].detail.descuento; }
    else if(cantidadDeseada>2 && cantidadDeseada<=5){ descuento = cantidadDeseada * valorKilo * descuentos[1].detail.descuento/100; } 
    else if(cantidadDeseada>5 && cantidadDeseada<=10){ descuento = cantidadDeseada * valorKilo * descuentos[2].detail.descuento/100; } 
    else if(cantidadDeseada>10){ descuento = cantidadDeseada * valorKilo * descuentos[3].detail.descuento/100; }
  return descuento;
}

/********** Actualiza el archivo json del carrito de compras del frontend del lado del cliente  *********/
const GuardarCarrito = (cantidadFrutas,descuentoFrutas) => {
console.log("GuardarCarrito cantidadFrutas: ",cantidadFrutas)
console.log("GuardarCarrito descuentoFrutas: ",descuentoFrutas)

for (let i in inventario) {
  carrito.detalle[i].fruta.kilos = cantidadFrutas[i];
  carrito.detalle[i].fruta.subtotal = cantidadFrutas[i] * proveedores[i].detail.valorkilo;
  carrito.detalle[i].fruta.descuento = descuentoFrutas[i];
  carrito.detalle[i].fruta.total = carrito.detalle[i].fruta.subtotal - descuentoFrutas[i];
}

console.log("carrito actualizado carrito.json: ",carrito)

//   fetch(urlCarritoCompras, {
//     method: 'PUT',
//     body: JSON.stringify({
//       detalle: {
//         manzanas: {
//           nombre: proveedores[0].detail.nombre,
//           kilos: cantidadFrutas[0],
//           precio: proveedores[0].detail.valorkilo,
//           subtotal: cantidadFrutas[0] * proveedores[0].detail.valorkilo,
//           descuento: descuentoFrutas[0],
//           total: cantidadFrutas[0] * proveedores[0].detail.valorkilo - descuentoFrutas[0]
//         },
//         bananos: {
//           nombre: proveedores[1].detail.nombre,
//           kilos: cantidadFrutas[1],
//           precio: proveedores[1].detail.valorkilo,
//           subtotal: cantidadFrutas[1] * proveedores[1].detail.valorkilo,
//           descuento: descuentoFrutas[1],
//           total: cantidadFrutas[1] * proveedores[1].detail.valorkilo - descuentoFrutas[1]
//         },
//         mangos: {
//           nombre: proveedores[2].detail.nombre,
//           kilos: cantidadFrutas[2],
//           precio: proveedores[2].detail.valorkilo,
//           subtotal: cantidadFrutas[2] * proveedores[2].detail.valorkilo,
//           descuento: descuentoFrutas[2],
//           total: cantidadFrutas[2] * proveedores[2].detail.valorkilo - descuentoFrutas[2]
//         },
//         fresas: {
//           nombre: proveedores[3].detail.nombre,
//           kilos: cantidadFrutas[3],
//           precio: proveedores[3].detail.valorkilo,
//           subtotal: cantidadFrutas[3] * proveedores[3].detail.valorkilo,
//           descuento: descuentoFrutas[3],
//           total: cantidadFrutas[3] * proveedores[3].detail.valorkilo - descuentoFrutas[3]
//         }
//       },
//       totalAPagar: cantidadFrutas[0] * proveedores[0].detail.valorkilo - descuentoFrutas[0] +
//                    cantidadFrutas[1] * proveedores[1].detail.valorkilo - descuentoFrutas[1] +
//                    cantidadFrutas[2] * proveedores[2].detail.valorkilo - descuentoFrutas[2] +
//                    cantidadFrutas[3] * proveedores[3].detail.valorkilo - descuentoFrutas[3]
//     }),     
//     headers: { "Content-type": "application/json", "Accept": "application/json" }
//   })
//   .then(response => response.json())
}

/********** Genera la factura de la venta *********/
const Facturar = (totalAPagar,setTotalAPagar,setAlertFactura,cantidadFrutas,descuentoFrutas,totalFrutas,setCantidadFrutas,setDescuentoFrutas,setTotalFrutas ) => {
  for(let i in inventario) {
    if(cantidadFrutas[i]!== 0) {
      if(cantidadFrutas[i] <= inventario[i].detail.cantidad ) {
        inventario[i].detail.cantidad = inventario[i].detail.cantidad - cantidadFrutas[0];
      } else if( cantidadFrutas[i] > inventario[i].detail.cantidad ) {
        inventario[i].detail.cantidad = 0;
      }
      inventario[i].detail.ventas++;
      inventario[i].detail.kilos = parseInt(inventario[i].detail.kilos) + parseInt(cantidadFrutas[i]);
      inventario[i].detail.total = parseInt(inventario[i].detail.total) + parseInt(totalFrutas[i]);
    }
  }
  
 // Factura que se envía a la base de datos del servidor mediante API
  if(cantidadFrutas[0]!== 0 || cantidadFrutas[1]!== 0 || cantidadFrutas[2]!== 0 || cantidadFrutas[3]!== 0) {
    factura.id++;
    factura.vendedor = username;
    for (let i in inventario) {
      factura.detalle[i].fruta.kilos = cantidadFrutas[i];
      factura.detalle[i].fruta.precio = proveedores[i].detail.valorkilo;
      factura.detalle[i].fruta.subtotal = cantidadFrutas[i] * proveedores[i].detail.valorkilo;
      factura.detalle[i].fruta.descuento = descuentoFrutas[i];
      factura.detalle[i].fruta.total = totalFrutas[i];
    }
    actualizarInventario(inventario);                       // Actualiza el inventario después de la compra
    actualizarFactura(factura);                             // Guarda la factura de la ultima compra en el servidor
    setTotalAPagar(totalFrutas[0] + totalFrutas[1] + totalFrutas[2] + totalFrutas[3])
    generarRecibo(totalAPagar,setAlertFactura);             // Genera la factura en PDF

    for (let i in inventario) {                             // Reinicia las variables para una nueva venta
      setCantidadFrutas[i](0);
      setDescuentoFrutas[i](0);
      setTotalFrutas[i](0);
    }
  }
}

/********** Actualiza el inventario en la base de datos del servidor mediante la API  *********/
// function actualizarInventario(inventario){
//   fetch(urlApiInventario, {
//     method: 'PUT',
//     body: JSON.stringify(
//         {
//           detail: {
//             nombre: inventario[0].detail.nombre,
//             cantidad: inventario[0].detail.cantidad,
//             ventas: inventario[0].detail.ventas,
//             kilos: inventario[0].detail.kilos,
//             total: inventario[0].detail.total
//           }, 
//           id: 1
//         },
//         {
//           detail: {
//             nombre: inventario[1].detail.nombre,
//             cantidad: inventario[1].detail.cantidad,
//             ventas: inventario[1].detail.ventas,
//             kilos: inventario[1].detail.kilos,
//             total: inventario[1].detail.total
//           }, 
//           id: 2
//         },
//         {
//           detail: {
//             nombre: inventario[2].detail.nombre,
//             cantidad: inventario[2].detail.cantidad,
//             ventas: inventario[2].detail.ventas,
//             kilos: inventario[2].detail.kilos,
//             total: inventario[2].detail.total
//           }, 
//           id: 3
//         },
//         {
//           detail: {
//             nombre: inventario[3].detail.nombre,
//             cantidad: inventario[3].detail.cantidad,
//             ventas: inventario[3].detail.ventas,
//             kilos: inventario[3].detail.kilos,
//             total: inventario[3].detail.total
//           },
//           id: 4
//         }
//     ),
//     headers: { "Content-type": "application/json" }
//   })
//   .then(response => response.json())
// }

function actualizarInventario(inventario){
  for(let i in inventario) {
    fetch(urlApiInventario + "/" + (Number(i) + Number(1)), {
      method: 'PUT',
      body: JSON.stringify(
        {
          detail: {
            nombre: inventario[i].detail.nombre,
            cantidad: inventario[i].detail.cantidad,
            ventas: inventario[i].detail.ventas,
            kilos: inventario[i].detail.kilos,
            total: inventario[i].detail.total
          }
        }
      ),
      headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
  }
}

/********** Actualiza la factura en la base de datos del servidor mediante la API  *********/
function actualizarFactura(factura){
  fetch(urlApiFactura, {
    method: 'PUT',
    body: JSON.stringify({
      id: factura.id,
      vendedor: username,
      detalle: [
        {
          fruta: {
            nombre: factura.detalle[0].fruta.nombre,
            kilos: factura.detalle[0].fruta.kilos,
            precio: factura.detalle[0].fruta.precio,
            subtotal: factura.detalle[0].fruta.subtotal,
            descuento: factura.detalle[0].fruta.descuento,
            total: factura.detalle[0].fruta.total
          },
          id: 1
        },
        {
          fruta: {
            nombre: factura.detalle[1].fruta.nombre,
            kilos: factura.detalle[1].fruta.kilos,
            precio: factura.detalle[1].fruta.precio,
            subtotal: factura.detalle[1].fruta.subtotal,
            descuento: factura.detalle[1].fruta.descuento,
            total: factura.detalle[1].fruta.total
          },
          id: 2
        },
        {
          fruta: {
            nombre: factura.detalle[2].fruta.nombre,
            kilos: factura.detalle[2].fruta.kilos,
            precio: factura.detalle[2].fruta.precio,
            subtotal: factura.detalle[2].fruta.subtotal,
            descuento: factura.detalle[2].fruta.descuento,
            total: factura.detalle[2].fruta.total
          },
          id: 3
        },
        {
          fruta: {
            nombre: factura.detalle[3].fruta.nombre,
            kilos: factura.detalle[3].fruta.kilos,
            precio: factura.detalle[3].fruta.precio,
            subtotal: factura.detalle[3].fruta.subtotal,
            descuento: factura.detalle[3].fruta.descuento,
            total: factura.detalle[3].fruta.total
          },
          id: 4
        }
      ]
    }),
    headers: { "Content-type": "application/json" }
  })
  .then(response => response.json())
}

/********************* Genera el recibo de la factura en pdf  *******************/
function generarRecibo(totalAPagar,setAlertFactura){
  var options = {             // options: Opciones de configuración del pdf
   //format: 'letter',
   width: "15cm",             // Anchuraa de la factura (Unidades: mm, cm, in, px)
   height: "14cm",            // Altura de la factura
   header: {
       height: "0",
       contents: ""
   },
   footer: {
       height: "10mm",
       contents: "Gracias por tu compra"
   },
   base: 'file:///public/images/'
  };
                             // contenido: Contenido HTML del pdf
   var contenido = `
                 <style>
                 *{
                   font: 20px 'Century Gothic';
                   text-align: center;
                 }
                 #header{							/***** Contenedor div del header *****/
                   background: url("http://localhost:3001/images/banner.jpg") no-repeat;
                   background-size:cover;
                   width:100%;
                   height: 80px;
                   margin-left: auto;
                   margin-right:auto;
                 }
                 #contenidoHeader{
                   margin-left: auto;
                   margin-right:auto;
                 }
                 #header img{								          /***** Logo header *****/
                   width: 50px;
                   filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 1));
                 }
                 #header h1 {								        /***** Titulo header *****/
                   font-size: 32px;
                   color: white;
                   text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
                   letter-spacing: 2px;
                   margin-top: 15px;
                 }
                 #body{ font-size: 20px; }
                 #datosFactura{
                   width:100%;
                   margin-left: auto;
                   margin-right:auto;
                 }
                 
                 #detalleFactura{
                   width:100%;
                   margin-left: auto;
                   margin-right:auto;
                   border-collapse: collapse;
                 }
                 #detalleFactura th,#detalleFactura td{
                   border: 1px solid lightgray;
                 }
                 #detalleFactura th{
                   color: white;
                   background-color: #600;
                 }
                 #detalleFactura tr:nth-child(even){background-color: #f2f2f2;}
                 #detalleFactura tr:hover {background-color: #ddd;}

                 #totalFactura{
                   width:100%;
                   border-collapse: collapse;
                 }
                 #totalFactura td{
                   border: 1px solid lightgray;
                   text-align: right;
                 }
                 .totalFactura{
                   color: white;
                   background-color: #600!important;
                 }
                 #totalFactura tr:nth-child(even){background-color: #ddd;}
                 #totalFactura tr:hover {background-color: #f2f2f2;}
               </style>
               <header>
                 <div id="header">
                 <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                   <table id="contenidoHeader">
                     <th>
                       <td><img src="http://localhost:3001/images/logo.png" id="logo"/></td>
                       <td><h1> Frutería </h1></td>
                     </th>
                   </table>
                 </div>
               </header>
               <body>
                 <div id="body">
                   <p>Bienvenido a nuestra frutería</p>
                   <h1>Factura de Venta N° ${factura.id}</h1>
                   <table id="datosFactura">
                     <tr>
                       <td>Fecha: ${fecha.toLocaleDateString()}</td>
                       <td>Hora: ${fecha.toLocaleTimeString()}</td>
                     </tr>  
                   </table>
                   <p>Vendedor: ${username}</p>
                   <h1>Detalle</h1>
                   <table id="detalleFactura">
                     <tr>
                       <th>Fruta</th>
                       <th>Cantidad</th>
                       <th>Precio</th>
                       <th>Subtotal</th>
                       <th>Descuento</th>
                       <th>Total</th>	
                     </tr>
                     <tr>
                       <td>${carrito.detalle[0].fruta.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle[0].fruta.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle[0].fruta.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle[0].fruta.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle[0].fruta.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle[0].fruta.total)}</td>
                     </tr>
                     <tr>
                       <td>${carrito.detalle[1].fruta.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle[1].fruta.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle[1].fruta.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle[1].fruta.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle[1].fruta.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle[1].fruta.total)}</td>
                     </tr>	
                     <tr>
                       <td>${carrito.detalle[2].fruta.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle[2].fruta.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle[2].fruta.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle[2].fruta.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle[2].fruta.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle[2].fruta.total)}</td>
                     </tr>
                     <tr>
                       <td>${carrito.detalle[3].fruta.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle[3].fruta.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle[3].fruta.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle[3].fruta.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle[3].fruta.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle[3].fruta.total)}</td>
                     </tr>		
                   </table>
                   <br></br>
                   <table id="totalFactura">
                     <tr>
                         <td>Subtotal</td>
                         <td>${formatterPeso.format(totalAPagar-(totalAPagar*0.16))}</td>
                     <tr>
                       <td>IVA</td>
                       <td>${formatterPeso.format(totalAPagar*0.16)}</td>
                     <tr>
                       <td class="totalFactura">Total a pagar</td>
                       <td class="totalFactura">${formatterPeso.format(totalAPagar)}</td>    
                   </table>
                 </div>
               </body>
               <footer>
               </footer>
 `;
                                 //Creación de la factura de venta en pdf
  // pdf.create(contenido,options).toFile('public/facturas/factura.pdf', function(err, res) {
  //     if (err){console.log(err);}
  // });

  setAlertFactura('Ver Factura PDF');
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
  const [totalManzanas, setTotalManzanas] = useState(0);
  const [totalBananos, setTotalBananos] = useState(0);
  const [totalMangos, setTotalMangos] = useState(0);
  const [totalFresas, setTotalFresas] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [alertMessage,setAlertMessage] = useState("");
  const [alertFactura,setAlertFactura] = useState("");

  const cantidadFrutas = [ cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas ];
  const descuentoFrutas = [ descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas ];
  const totalFrutas = [ totalManzanas,totalBananos,totalMangos,totalFresas ];
  const setCantidadFrutas = [ setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas ];
  const setDescuentoFrutas = [ setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas ];
  const setTotalFrutas = [ setTotalManzanas,setTotalBananos,setTotalMangos,setTotalFresas ];
  
  return (
    <>
      <center><h5 className='my-4'>Facturación</h5></center> 
      <div className='row'> 
        <div>
          <center>
            <div>
              <table className='table table-sm table-bordered table-striped w-100'>
                <thead className="thead-light">
                  <tr>
                    <th>Fruta</th>
                    <th>Cantidad</th>
                    <th>Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <center>
                        <table id="grupoFrutas"> 
                          <tbody>
                            { proveedores.map((proveedor) => (
                                <tr key={proveedor.detail.nombre}>
                                  <td><input type="radio" name="frutaDeseada" value={proveedor.detail.nombre} id={proveedor.detail.nombre} onChange={() => setAlertMessage("")} /></td>
                                  <td><label htmlFor={proveedor.detail.nombre}>{proveedor.detail.nombre}</label></td>   
                                </tr>
                            ))}
                          </tbody>
                        </table>
                      </center>
                    </td>
                    <td><input id="cantidadDeseada" type="number" name="cantidadDeseada" defaultValue={0} min="0" placeholder="Kilos fruta" autoComplete="off" onChange={() => setAlertMessage("")} className='w-100 py-5'/></td>
                    <td>
                      <button className='w-100 py-1 px-3' onClick={() => AgregarAlCarrito(setAlertMessage,cantidadFrutas,descuentoFrutas,setCantidadFrutas,setDescuentoFrutas,setTotalFrutas)}>
                        <CiShoppingCart className='fs-3 my-3'/>
                      </button>
                      <p className='text-dark'>{ alertMessage }</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>

            <h5 className='my-4'>Carrito de Compras</h5>
            <CarritoBar cantidadFrutas={cantidadFrutas} descuentoFrutas={descuentoFrutas} proveedores={proveedores} />
            
            {/** Buttons */}
            <table className='w-100'>
              <tbody>
                <tr> 
                  <td colSpan="6">
                    <button className='w-100 py-2' onClick={() => Facturar(totalAPagar,setTotalAPagar,setAlertFactura,cantidadFrutas,descuentoFrutas,totalFrutas,setCantidadFrutas,setDescuentoFrutas,setTotalFrutas )}>Facturar</button>
                    <button className='w-100 py-2'>Cancelar</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <h5 className='my-4'>Descuentos</h5>
            <div className='overflow-auto'>
              <table className='table table-sm table-bordered table-striped w-100'>
                <thead className="thead-light">
                  <tr>
                    <th>Cantidad (Kilos)</th>
                    <th>Descuento</th>
                  </tr>
                </thead>
                <tbody>
                  { descuentos.map((descuento,index) => (
                    <tr key={'desc' + index}>
                      <td>{descuento.detail.cantidad}</td>
                      <td>{descuento.detail.descuento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/facturas/factura.pdf" target="_blank">
              <p>{ alertFactura }</p></a>
            </div>
            <hr />
          </center>
        </div>
      </div>
    </>
  )
}
