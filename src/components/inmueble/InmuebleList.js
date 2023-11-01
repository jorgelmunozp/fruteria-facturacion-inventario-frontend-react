import React, { useMemo } from 'react'
import { getInmueblesByCategoria } from '../../selectors/getInmueblesByCategoria'
import { InmuebleCard } from './InmuebleCard';

export const InmuebleList = ({ categoria, name }) => {

  const inmuebles = useMemo( () => getInmueblesByCategoria(categoria),[ categoria ] );

  return (
    <div className='row row-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>
        { 
            inmuebles.map( inmueble => (
                <InmuebleCard 
                    key={ inmueble.id } 
                    { ...inmueble }
                    name={name}
                />
            ))
        }
    </div>
  )
}
