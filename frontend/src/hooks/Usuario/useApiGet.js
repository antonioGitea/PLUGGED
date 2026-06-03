const useApiGet = async (id) => {
    let respuesta = null;
    let peticion = await fetch(`/api/usuarios/${id}`);
    let usuario = await peticion.json();

    if (usuario.id == id && peticion.ok) {
        respuesta = usuario;
    }
    return respuesta;
}

export default useApiGet;