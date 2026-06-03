const useApiGet = async (id) => {
    let respuesta = null;
    let peticion = await fetch(`/api/eventos/${id}`);
    let evento = await peticion.json();

    if (evento.id == id && peticion.ok) {
        respuesta = evento;
    }
    return respuesta;
}

export default useApiGet;