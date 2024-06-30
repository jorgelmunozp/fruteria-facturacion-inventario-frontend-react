export const getFetch = async (urlApi) => {
    let arrayData;
    await fetch(urlApi)                         //Leer API tabla objeto JSON Base de datos
        .then(response => response.json())
        .then(data => arrayData = data)

    return arrayData;
}
