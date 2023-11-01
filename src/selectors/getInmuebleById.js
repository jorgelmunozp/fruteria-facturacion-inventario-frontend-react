import { inmuebles } from "../data/inmuebles"


export const getInmuebleById = ( id = '' ) => {

    return inmuebles.find( inmueble => inmueble.id === id);
}