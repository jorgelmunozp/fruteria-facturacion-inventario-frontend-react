import { inmuebles } from "../data/inmuebles"


export const getInmueblesByName = ( name = '' ) => {

    if ( name.length === 0 ) {
        return [];
    }

    name = name.toLowerCase();
    return inmuebles.filter( inmueble => inmueble.nombre.toLowerCase().includes(name));

}