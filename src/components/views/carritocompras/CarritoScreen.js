import { CiShoppingCart } from 'react-icons/ci';
import { CarritoBar } from './CarritoComprasBar.js';
import carrito from '../../../carrito/carrito.json';

export const CarritoScreen = () => {
  return (
    <>
      <center><h3><CiShoppingCart className='fs-2 mt-4 mb-2'/></h3></center> 
      <div className='row'>
        <center>
            <CarritoBar carrito={carrito} />
        </center>
      </div>
    </>
  )
}

export default CarritoScreen;