export const formatterPeso = new Intl.NumberFormat('es-CO', {   //Formato moneda $ pesos Colmbianos
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});