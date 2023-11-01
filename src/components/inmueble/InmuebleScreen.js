import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate} from 'react-router-dom'
import { inmuebleImages } from '../../helpers/inmuebleImages';
import { getInmuebleById } from '../../selectors/getInmuebleById';

export const InmuebleScreen = () => {

  const { inmuebleId } = useParams();

  const inmueble = useMemo( () => getInmuebleById(inmuebleId),[ inmuebleId ] );

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate( -1 );
  }

  if(!inmueble) {
    return <Navigate to='/' />
  };

  const {
    id,
    nombre,
    categoria,
    tipo,
    habitaciones,
    baños,
    parqueaderos,
    valor,
    descripcion,
    ciudad,
    ubicacion

  } = inmueble;


  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img 
          src={ inmuebleImages(`./${id}.jpg`) } 
          alt={ nombre }
          className='shadow img-thumbnail animate__animated animate__fadeInLeft'
        />
      </div>

      <div className='col-8 animate__animated animate__fadeIn'>
        <h1>{ nombre }</h1>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Tipo:</b> { tipo }</li>
          <li className='list-group-item'> <b>Categoría:</b> { categoria }</li>
          <li className='list-group-item'> <b>Habitaciones:</b> { habitaciones } 
                                           &nbsp;&nbsp;&nbsp;&nbsp;
                                           <b>Baños:</b> { baños } 
                                           &nbsp;&nbsp;&nbsp;&nbsp;
                                           <b>Parqueadero:</b> { parqueaderos }</li>

        </ul>

        <h5 className='mt-3'>Valor</h5>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><p>{ valor }</p></li>
        </ul>
        <h5 className='mt-3'>Descripción</h5>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><p>{ descripcion }</p></li>
        </ul>
        <h5 className='mt-3'>Localización</h5>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Ciudad:</b> { ciudad }</li>
          <li className='list-group-item'><b>Ubicación:</b>{ ubicacion }</li>
        </ul>
        <br></br>
        <div className="d-grid gap-2 col-4 mx-md-0">
          <button className='btn-inmueble btn btn-md btn-warning' onClick={ handleReturn }>
            Regresar
          </button>
        </div>
      </div>

    </div>
  )
}
