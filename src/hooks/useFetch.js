
import { useState, useEffect } from 'react'
import { getData } from '../helpers/getData';

export const useFetch = ( urlApi ) => {
    
    const [state, setState] = useState({
        data: [],
    });

    useEffect( () => {
         getData( urlApi )
            .then( datos => {
                setState({
                    data: datos,
                });                   
            })
    }, [])

    return state;
}