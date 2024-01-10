import { CiShoppingCart } from 'react-icons/ci';
import { CarritoTotalBar } from './CarritoTotalBar';

const urlApiInventario = process.env.REACT_APP_API_INVENTARIO;
let inventario;

await fetch(urlApiInventario)                       //Leer API tabla INVENTARIO objeto JSON Base de datos
    .then(response => response.json())
    .then(data => inventario = data)

export const CarritoScreen = () => {
  return (
    <>
      <center><h3><CiShoppingCart className='fs-2 mt-4 mb-2'/></h3></center> 
      <div className='row'>
        <center>
          <div className='overflow-auto'>
            <CarritoTotalBar inventario={inventario} />
            <hr />
          </div>
        </center>
      </div>
    </>
  )
}



