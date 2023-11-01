import { inmuebles } from "../data/inmuebles"


export const getInmueblesByCategoria = ( categoria ) => {
    
    const InmueblesValidos = ['Apartamento','Casa'];

    if( !InmueblesValidos.includes( categoria )){
        throw new Error( `${ categoria } no es un categoria de inmueble válido` );

    }

    return inmuebles.filter( inmueble => inmueble.categoria === categoria )
}