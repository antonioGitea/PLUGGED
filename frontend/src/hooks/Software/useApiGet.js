const useApiGet = async (id) => {
    let respuesta = null;
    let peticion = await fetch(`/api/software/${id}`);
    let software = await peticion.json();

    if (software.id == id && peticion.ok) {
        respuesta = software;
    }
    return respuesta;
}

export default useApiGet;