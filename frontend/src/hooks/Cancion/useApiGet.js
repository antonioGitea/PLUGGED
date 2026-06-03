const useApiGet = async (id) => {
    let respuesta = null;
    let peticion = await fetch(`/api/canciones/${id}`);
    let cancion = await peticion.json();

    if (cancion.id == id && peticion.ok) {
        respuesta = cancion;
    }
    return respuesta;
}

export default useApiGet;