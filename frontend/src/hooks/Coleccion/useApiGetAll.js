const useApiGetAll = async () => {
    let respuesta = null;
    let peticion = await fetch("/api/colecciones");
    let colecciones = await peticion.json();
    console.log(colecciones);

    if (Array.isArray(colecciones) && peticion.ok) {
        respuesta = colecciones;
    }
    return respuesta;
}

export default useApiGetAll;