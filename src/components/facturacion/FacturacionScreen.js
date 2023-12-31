import React, { useState } from 'react';
import { formatterPeso } from '../../helpers/formatterPeso';
import { formatterMiles } from '../../helpers/formatterMiles';
import { CiShoppingCart } from 'react-icons/ci';

const urlApiInventario = process.env.REACT_APP_API_INVENTARIO;
const urlApiFactura = process.env.REACT_APP_API_FACTURA;
const urlApiProveedores = process.env.REACT_APP_API_PROVEEDORES;
const urlApiDescuentos = process.env.REACT_APP_API_DESCUENTOS;
const urlCarritoCompras = process.env.REACT_APP_API_CARRITO;
const username = process.env.REACT_APP_USERNAME;
let inventario, factura, proveedores, descuentos, carrito;
const fecha = new Date();                             //Lee la fecha actual del sistema

await fetch(urlApiInventario)                         //Leer API tabla INVENTARIO objeto JSON Base de datos
    .then(response => response.json())
    .then(data => inventario = data)

await fetch(urlApiFactura)                            //Leer API tabla FACTURA objeto JSON Base de datos
    .then(response => response.json())
    .then(data => factura = data)

await fetch(urlApiProveedores)                       //Leer API tabla PROVEEDORES objeto JSON Base de datos
    .then(response => response.json())
    .then(data => proveedores = data)

await fetch(urlApiDescuentos)                       //Leer API tabla DESCUENTOS objeto JSON Base de datos
    .then(response => response.json())
    .then(data => descuentos = data)

await fetch(urlCarritoCompras)                      //Leer API tabla CARRITO COMPRAS objeto JSON Base de datos
    .then(response => response.json())
    .then(data => carrito = data)

const AgregarAlCarrito = (cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas,setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas,setTotalManzanas,setTotalBananos,setTotalMangos,setTotalFresas,setAlertMessage) => {
  let frutaDeseada, cantidadDeseada;
  const frutaSelector = document.querySelector('input[name="frutaDeseada"]:checked');
  const cantidadSelector = document.getElementById('cantidadDeseada');

  if(frutaSelector !== null && cantidadSelector.value !== "0")  {
    frutaDeseada = frutaSelector.value;
    cantidadDeseada = cantidadSelector.value;
    if(frutaDeseada === "Manzanas") { 
      if(cantidadDeseada <= inventario.manzanas.cantidad){ setCantidadManzanas(cantidadDeseada); setDescuentoManzanas(Descuento(cantidadDeseada,proveedores.fruta1.valorkilo)); }
      else if(cantidadDeseada > inventario.manzanas.cantidad){ setCantidadManzanas(inventario.manzanas.cantidad); setDescuentoManzanas(Descuento(cantidadDeseada,proveedores.fruta1.valorkilo)); setAlertMessage("Hay " + inventario.manzanas.cantidad + " kilos"); }
      setTotalManzanas(cantidadDeseada * proveedores.fruta1.valorkilo - Descuento(cantidadDeseada,proveedores.fruta1.valorkilo));
    } else if(frutaDeseada === "Bananos") { 
      if(cantidadDeseada <= inventario.bananos.cantidad){ setCantidadBananos(cantidadDeseada); setDescuentoBananos(Descuento(cantidadDeseada,proveedores.fruta2.valorkilo)); }
      else if(cantidadDeseada > inventario.bananos.cantidad){ setCantidadBananos(inventario.bananos.cantidad); setDescuentoBananos(Descuento(cantidadDeseada,proveedores.fruta2.valorkilo)); setAlertMessage("Hay " + inventario.bananos.cantidad + " kilos"); }
      setTotalBananos(cantidadDeseada * proveedores.fruta2.valorkilo - Descuento(cantidadDeseada,proveedores.fruta2.valorkilo));
    } else if(frutaDeseada === "Mangos") { 
      if(cantidadDeseada <= inventario.mangos.cantidad){ setCantidadMangos(cantidadDeseada); setDescuentoMangos(Descuento(cantidadDeseada,proveedores.fruta3.valorkilo)); }
      else if(cantidadDeseada > inventario.mangos.cantidad){ setCantidadMangos(inventario.mangos.cantidad); setDescuentoMangos(Descuento(cantidadDeseada,proveedores.fruta3.valorkilo)); setAlertMessage("Hay " + inventario.mangos.cantidad + " kilos"); }
      setTotalMangos(cantidadDeseada * proveedores.fruta3.valorkilo - Descuento(cantidadDeseada,proveedores.fruta3.valorkilo));
    } else if(frutaDeseada === "Fresas") { 
      if(cantidadDeseada <= inventario.fresas.cantidad){ setCantidadFresas(cantidadDeseada); setDescuentoFresas(Descuento(cantidadDeseada,proveedores.fruta4.valorkilo)); }
      else if(cantidadDeseada > inventario.fresas.cantidad){ setCantidadFresas(inventario.fresas.cantidad); setDescuentoFresas(Descuento(cantidadDeseada,proveedores.fruta4.valorkilo)); setAlertMessage("Hay " + inventario.fresas.cantidad + " kilos"); }
      setTotalFresas(cantidadDeseada * proveedores.fruta4.valorkilo - Descuento(cantidadDeseada,proveedores.fruta4.valorkilo));
    }
    document.getElementById("Manzanas").checked = false;
    document.getElementById("Bananos").checked = false;
    document.getElementById("Mangos").checked = false;
    document.getElementById("Fresas").checked = false;
    cantidadSelector.value = 0;
    setAlertMessage("");
    GuardarCarrito(cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas);
  } else if(frutaSelector === null) {
    setAlertMessage("Elige fruta");
  } else if(cantidadSelector.value === "0") {
    setAlertMessage("Ingresa kilos");
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


/********** Actualiza el archivo json del carrito de compras del frontend del lado del cliente  *********/
const GuardarCarrito = (cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas) => {
  console.log("Carrito!!")
  fetch(urlCarritoCompras, {
    method: 'PUT',
    body: JSON.stringify({
      detalle: {
        manzanas: {
          nombre: proveedores.fruta1.nombre,
          kilos: cantidadManzanas,
          precio: proveedores.fruta1.valorkilo,
          subtotal: cantidadManzanas * proveedores.fruta1.valorkilo,
          descuento: descuentoManzanas,
          total: cantidadManzanas * proveedores.fruta1.valorkilo - descuentoManzanas
        },
        bananos: {
          nombre: proveedores.fruta2.nombre,
          kilos: cantidadBananos,
          precio: proveedores.fruta2.valorkilo,
          subtotal: cantidadBananos * proveedores.fruta2.valorkilo,
          descuento: descuentoBananos,
          total: cantidadBananos * proveedores.fruta2.valorkilo - descuentoBananos
        },
        mangos: {
          nombre: proveedores.fruta3.nombre,
          kilos: cantidadMangos,
          precio: proveedores.fruta3.valorkilo,
          subtotal: cantidadMangos * proveedores.fruta3.valorkilo,
          descuento: descuentoMangos,
          total: cantidadMangos * proveedores.fruta3.valorkilo - descuentoMangos
        },
        fresas: {
          nombre: proveedores.fruta4.nombre,
          kilos: cantidadFresas,
          precio: proveedores.fruta4.valorkilo,
          subtotal: cantidadFresas * proveedores.fruta4.valorkilo,
          descuento: descuentoFresas,
          total: cantidadFresas * proveedores.fruta4.valorkilo - descuentoFresas
        }
      },
      totalAPagar: cantidadManzanas * proveedores.fruta1.valorkilo - descuentoManzanas +
                    cantidadBananos * proveedores.fruta2.valorkilo - descuentoBananos +
                    cantidadMangos * proveedores.fruta3.valorkilo - descuentoMangos +
                    cantidadFresas * proveedores.fruta4.valorkilo - descuentoFresas
    }),     
    headers: { "Content-type": "application/json" }
  })
  .then(response => response.json())
}

/********** Genera la factura de la venta *********/
const Facturar = (cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas,totalManzanas,totalBananos,totalMangos,totalFresas,totalAPagar,setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas,setTotalManzanas,setTotalBananos,setTotalMangos,setTotalFresas,setTotalAPagar,setAlertFactura) => {
  if(cantidadManzanas!== 0) {
    if(cantidadManzanas <= inventario.manzanas.cantidad ) {
      inventario.manzanas.cantidad = inventario.manzanas.cantidad - cantidadManzanas;
    } else if( cantidadManzanas > inventario.manzanas.cantidad ) {
      inventario.manzanas.cantidad = 0;
    }
    inventario.manzanas.ventas++;
    inventario.manzanas.kilos = parseInt(inventario.manzanas.kilos) + parseInt(cantidadManzanas);
    inventario.manzanas.total = parseInt(inventario.manzanas.total) + parseInt(totalManzanas);
  }
  if(cantidadBananos!== 0) {
    if(cantidadBananos <= inventario.bananos.cantidad ) {
      inventario.bananos.cantidad = inventario.bananos.cantidad - cantidadBananos;
    } else if( cantidadBananos > inventario.bananos.cantidad ) {
      inventario.bananos.cantidad = 0;
    }
    inventario.bananos.ventas++;
    inventario.bananos.kilos = parseInt(inventario.bananos.kilos) + parseInt(cantidadBananos);
    inventario.bananos.total = parseInt(inventario.bananos.total) + parseInt(totalBananos);
  }
  if(cantidadMangos!== 0) {
    if(cantidadMangos <= inventario.mangos.cantidad ) {
      inventario.mangos.cantidad = inventario.mangos.cantidad - cantidadMangos;
    } else if( cantidadMangos > inventario.mangos.cantidad ) {
      inventario.mangos.cantidad = 0;
    }
    inventario.mangos.ventas++;
    inventario.mangos.kilos = parseInt(inventario.mangos.kilos) + parseInt(cantidadMangos);
    inventario.mangos.total = parseInt(inventario.mangos.total) + parseInt(totalMangos);
  }
  if(cantidadFresas!== 0) {
    if(cantidadFresas <= inventario.fresas.cantidad ) {
      inventario.fresas.cantidad = inventario.fresas.cantidad - cantidadFresas;
    } else if( cantidadFresas > inventario.fresas.cantidad ) {
      inventario.fresas.cantidad = 0;
    }
    inventario.fresas.ventas++;
    inventario.fresas.kilos = parseInt(inventario.fresas.kilos) + parseInt(cantidadFresas);
    inventario.fresas.total = parseInt(inventario.fresas.total) + parseInt(totalFresas);
  }

 // Factura que se envía a la base de datos del servidor mediante API
  if(cantidadManzanas!== 0 || cantidadBananos!== 0 || cantidadMangos!== 0 || cantidadFresas!== 0) {
    factura.id++;
    factura.vendedor = username;
    factura.detalle.manzanas.kilos = cantidadManzanas;
    factura.detalle.manzanas.precio = proveedores.fruta1.valorkilo;
    factura.detalle.manzanas.subtotal = cantidadManzanas * proveedores.fruta1.valorkilo;
    factura.detalle.manzanas.descuento = descuentoManzanas;
    factura.detalle.manzanas.total = totalManzanas;
    factura.detalle.bananos.kilos = cantidadBananos;
    factura.detalle.bananos.precio = proveedores.fruta2.valorkilo;
    factura.detalle.bananos.subtotal = cantidadBananos * proveedores.fruta2.valorkilo;
    factura.detalle.bananos.descuento = descuentoBananos;
    factura.detalle.bananos.total = totalBananos;
    factura.detalle.mangos.kilos = cantidadMangos;
    factura.detalle.mangos.precio = proveedores.fruta3.valorkilo;
    factura.detalle.mangos.subtotal = cantidadMangos * proveedores.fruta3.valorkilo;
    factura.detalle.mangos.descuento = descuentoMangos;
    factura.detalle.mangos.total = totalMangos;
    factura.detalle.fresas.kilos = cantidadFresas;
    factura.detalle.fresas.precio = proveedores.fruta4.valorkilo;
    factura.detalle.fresas.subtotal = cantidadFresas * proveedores.fruta4.valorkilo;
    factura.detalle.fresas.descuento = descuentoFresas;
    factura.detalle.fresas.total = totalFresas;

    actualizarInventario(inventario);                       // Actualiza el inventario después de la compra
    actualizarFactura(factura);                             // Guarda la factura de la ultima compra en el servidor
    setTotalAPagar(totalManzanas + totalBananos + totalMangos + totalFresas)
    generarRecibo(totalAPagar,setAlertFactura);                             // Genera la factura en PDF

    setCantidadManzanas(0);
    setCantidadBananos(0);
    setCantidadMangos(0);
    setCantidadFresas(0);
    setDescuentoManzanas(0);
    setDescuentoBananos(0);
    setDescuentoMangos(0);
    setDescuentoFresas(0);
    setTotalManzanas(0);
    setTotalBananos(0);
    setTotalMangos(0);
    setTotalFresas(0);
  }
}

/********** Actualiza el inventario en la base de datos del servidor mediante la API  *********/
function actualizarInventario(inventario){
  fetch(urlApiInventario, {
    method: 'PUT',
    body: JSON.stringify({
      manzanas: {
        id: 0,
        nombre: inventario.manzanas.nombre,
        cantidad: inventario.manzanas.cantidad,
        ventas: inventario.manzanas.ventas,
        kilos: inventario.manzanas.kilos,
        total: inventario.manzanas.total
      },
      bananos: {
        id: 1,
        nombre: inventario.bananos.nombre,
        cantidad: inventario.bananos.cantidad,
        ventas: inventario.bananos.ventas,
        kilos: inventario.bananos.kilos,
        total: inventario.bananos.total
      },
      mangos: {
        id: 2,
        nombre: inventario.mangos.nombre,
        cantidad: inventario.mangos.cantidad,
        ventas: inventario.mangos.ventas,
        kilos: inventario.mangos.kilos,
        total: inventario.mangos.total
      },
      fresas: {
        id: 3,
        nombre: inventario.fresas.nombre,
        cantidad: inventario.fresas.cantidad,
        ventas: inventario.fresas.ventas,
        kilos: inventario.fresas.kilos,
        total: inventario.fresas.total
      }
    }),
    headers: { "Content-type": "application/json" }
  })
  .then(response => response.json())
}

/********** Actualiza la factura en la base de datos del servidor mediante la API  *********/
function actualizarFactura(factura){
  fetch(urlApiFactura, {
    method: 'PUT',
    body: JSON.stringify({
      id: factura.id,
      vendedor: username,
      detalle: {
        manzanas: {
          nombre: factura.detalle.manzanas.nombre,
          kilos: factura.detalle.manzanas.kilos,
          precio: factura.detalle.manzanas.precio,
          subtotal: factura.detalle.manzanas.subtotal,
          descuento: factura.detalle.manzanas.descuento,
          total: factura.detalle.manzanas.total
        },
        bananos: {
          nombre: factura.detalle.bananos.nombre,
          kilos: factura.detalle.bananos.kilos,
          precio: factura.detalle.bananos.precio,
          subtotal: factura.detalle.bananos.subtotal,
          descuento: factura.detalle.bananos.descuento,
          total: factura.detalle.bananos.total
        },
        mangos: {
          nombre: factura.detalle.mangos.nombre,
          kilos: factura.detalle.mangos.kilos,
          precio: factura.detalle.mangos.precio,
          subtotal: factura.detalle.mangos.subtotal,
          descuento: factura.detalle.mangos.descuento,
          total: factura.detalle.mangos.total
        },
        fresas: {
          nombre: factura.detalle.fresas.nombre,
          kilos: factura.detalle.fresas.kilos,
          precio: factura.detalle.fresas.precio,
          subtotal: factura.detalle.fresas.subtotal,
          descuento: factura.detalle.fresas.descuento,
          total: factura.detalle.fresas.total
        }
      }
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
                 #body{
                   font-size: 20px;
                 }
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
                       <td>${carrito.detalle.manzanas.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle.manzanas.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle.manzanas.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle.manzanas.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle.manzanas.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle.manzanas.total)}</td>
                     </tr>
                     <tr>
                       <td>${carrito.detalle.bananos.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle.bananos.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle.bananos.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle.bananos.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle.bananos.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle.bananos.total)}</td>
                     </tr>	
                     <tr>
                       <td>${carrito.detalle.mangos.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle.mangos.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle.mangos.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle.mangos.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle.mangos.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle.mangos.total)}</td>
                     </tr>
                     <tr>
                       <td>${carrito.detalle.fresas.nombre}</td>
                       <td>${formatterMiles.format(carrito.detalle.fresas.kilos)}</td>
                       <td>${formatterPeso.format(carrito.detalle.fresas.precio)}</td>
                       <td>${formatterPeso.format(carrito.detalle.fresas.subtotal)}</td>
                       <td>${formatterPeso.format(carrito.detalle.fresas.descuento)}</td>
                       <td>${formatterPeso.format(carrito.detalle.fresas.total)}</td>
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

  //Timeout al enlace de descarga para que alcance a generarse la factura en pdf !!
  setAlertFactura('Ver Factura PDF');
  // setTimeout(function (setAlertFactura) {
  //   setAlertFactura('Ver Factura PDF');
  // }, 5000);
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
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [totalFresas, setTotalFresas] = useState(0);
  const [alertMessage,setAlertMessage] = useState("");
  const [alertFactura,setAlertFactura] = useState("");

  return (
    <>
      <hr />
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
                    <th>Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <center>
                        <table id="grupoFrutas"> 
                          <tbody>
                            <tr>
                              <td><input type="radio" name="frutaDeseada" value="Manzanas" id="Manzanas" onChange={() => setAlertMessage("")} /></td>
                              <td><label htmlFor="Manzanas">Manzanas</label></td>
                            </tr>
                            <tr>
                              <td><input type="radio" name="frutaDeseada" value="Bananos" id="Bananos" onChange={() => setAlertMessage("")} /></td>
                              <td><label htmlFor="Bananos">Bananos</label></td>
                            </tr>
                            <tr>
                              <td><input type="radio" name="frutaDeseada" value="Mangos" id="Mangos" onChange={() => setAlertMessage("")} /></td>
                              <td><label htmlFor="Mangos">Mangos</label></td>
                            </tr>
                            <tr>
                              <td><input type="radio" name="frutaDeseada" value="Fresas" id="Fresas" onChange={() => setAlertMessage("")} /></td>
                              <td><label htmlFor="Fresas">Fresas</label></td>
                            </tr>
                          </tbody>
                        </table>
                      </center>
                    </td>
                    <td><input id="cantidadDeseada" type="number" name="cantidadDeseada" defaultValue={0} min="0" placeholder="Kilos fruta" autoComplete="off" onChange={() => setAlertMessage("")}/></td>
                    <td>
                      <button className='w-100 py-1' onClick={() => AgregarAlCarrito(cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas,setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas,setTotalManzanas,setTotalBananos,setTotalMangos,setTotalFresas,setAlertMessage)}>
                        <CiShoppingCart className='fs-3'/>
                      </button>
                      <p className='alertMessage'>{ alertMessage }</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
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
                  <td>{formatterMiles.format(cantidadManzanas)}</td>
                  <td>{formatterPeso.format(proveedores.fruta1.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadManzanas * proveedores.fruta1.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoManzanas)}</td>
                  <td>{formatterPeso.format(cantidadManzanas * proveedores.fruta1.valorkilo - descuentoManzanas)}</td>
                </tr>
                <tr>
                  <td>Bananos</td>
                  <td>{formatterMiles.format(cantidadBananos)}</td>
                  <td>{formatterPeso.format(proveedores.fruta2.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadBananos * proveedores.fruta2.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoBananos)}</td>
                  <td>{formatterPeso.format(cantidadBananos * proveedores.fruta2.valorkilo - descuentoBananos)}</td>
                </tr>
                <tr>
                  <td>Mangos</td>
                  <td>{formatterMiles.format(cantidadMangos)}</td>
                  <td>{formatterPeso.format(proveedores.fruta3.valorkilo)}</td>
                  <td>{formatterPeso.format(cantidadMangos * proveedores.fruta3.valorkilo)}</td>
                  <td>{formatterPeso.format(descuentoMangos)}</td>
                  <td>{formatterPeso.format(cantidadMangos * proveedores.fruta3.valorkilo - descuentoMangos)}</td>
                </tr>
                <tr>
                  <td>Fresas</td>
                  <td>{formatterMiles.format(cantidadFresas)}</td>
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
                    <button className='w-100 py-2' onClick={() => Facturar(cantidadManzanas,cantidadBananos,cantidadMangos,cantidadFresas,descuentoManzanas,descuentoBananos,descuentoMangos,descuentoFresas,totalManzanas,totalBananos,totalMangos,totalFresas,totalAPagar,setCantidadManzanas,setCantidadBananos,setCantidadMangos,setCantidadFresas,setDescuentoManzanas,setDescuentoBananos,setDescuentoMangos,setDescuentoFresas,setTotalManzanas,setTotalBananos,setTotalMangos,setTotalFresas,setTotalAPagar,setAlertFactura)}>Facturar</button>
                    <button className='w-100 py-2'>Cancelar</button>
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
              <p>{ alertFactura }</p></a>
            </div>
            <hr />
          </center>
        </div>
      </div>
    </>
  )
}



