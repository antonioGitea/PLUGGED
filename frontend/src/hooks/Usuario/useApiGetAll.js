const useApiGetAll = async () => {
    let respuesta = null;
    let peticion = await fetch("/api/usuarios");
    let usuarios = await peticion.json();
    console.log(usuarios)

    if (Array.isArray(usuarios) && peticion.ok) {
        respuesta = usuarios;
    }
    return respuesta;
}

export default useApiGetAll;