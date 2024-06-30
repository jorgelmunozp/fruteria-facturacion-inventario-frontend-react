export const getData = async( urlApi ) => {
    const response = await fetch( urlApi );
    const responseReturn = await response.json();

    return responseReturn;
}