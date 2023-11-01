import React from 'react'
// import {inventario} from './inventario.js';

export const InventarioScreen = () => {
  return (
    <>
        {JSON.parse(inv)}
    </>
  )
}

const inv = '[    "inv": {        "manzanas": {          "id": 0,          "nombre": "Manzanas",          "cantidad": 7640,  "ventas": 53,          "kilos": 1214,          "total": 2505870         }       }]';