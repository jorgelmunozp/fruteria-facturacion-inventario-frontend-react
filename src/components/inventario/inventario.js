import React from 'react'


export const Inventario = () => {
  return (
    <div>
      <center><h1>Inventario</h1></center>
      <hr />
      <div>{inv}</div>
    </div>
  )
}

const inv = `
{
    "inventario": {
        "manzanas": {
          "id": 0,
          "nombre": "Manzanas",
          "cantidad": 7640,
          "ventas": 53,
          "kilos": 1214,
          "total": 2505870
        },
        "bananos": {
          "id": 1,
          "nombre": "Bananos",
          "cantidad": 65918,
          "ventas": 40,
          "kilos": 1250,
          "total": 123716160
        },
        "mangos": {
          "id": 2,
          "nombre": "Mangos",
          "cantidad": 90801,
          "ventas": 41,
          "kilos": 2357,
          "total": 8967750
        },
        "fresas": {
          "id": 3,
          "nombre": "Fresas",
          "cantidad": 90756,
          "ventas": 41,
          "kilos": 3583,
          "total": 8761440
        }
      }
}
`;