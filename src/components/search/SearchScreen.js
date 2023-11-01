import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { getInmueblesByName } from '../../selectors/getInmueblesByName';
import { InmuebleCard } from '../inmueble/InmuebleCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [ formValues,handleInputChange ] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;
  const inmueblesFiltered = useMemo( () => getInmueblesByName(q), [q] );

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${ searchText }`);
  };

  return (
    <>
        <center><h1>Buscar Inmueble</h1></center> 
        <hr />

        <div className='row'> 
            <div className='col-5'>
              <h4>Que tipo de inmueble buscas?</h4>
              <hr />

              <form onSubmit={ handleSearch }>
                <input 
                  type='text'
                  placeholder='Ingresa el nombre del inmueble'
                  className='form-control'
                  name='searchText'
                  autoComplete='off'
                  value={ searchText }
                  onChange={ handleInputChange }
                />
                <br/>
                <div className="d-grid gap-2 col-6 mx-md-0">
                  <button className='btn-buscar btn btn-lg btn-outline-info mt-1' type='submit'>
                    Buscar
                  </button>
                </div>
              </form>

            </div>

            <div className='col-7'>
              <h4>Inmuebles disponibles</h4>
              <hr />

              {
                  (q === '')
                      ? <div className="alert alert-warning"> Inmuebles </div>
                      : ( inmueblesFiltered.length === 0 ) 
                          && <div className="alert alert-danger"> No hay resultados: { q } </div>
              }

              {
                  inmueblesFiltered.map(inmueble => (
                      <InmuebleCard
                          key={ inmueble.id }
                          { ...inmueble }
                      />
                  ))
              }
            </div>
        </div>
    </>
  )
}



