import {React} from "react";
import { resolverRutaArchivo } from "../../utils/imagen.js";

const Software = (props) => {
    const {id, nombre, imagen} = props.datosSoftware;
    const imagenProcesada = resolverRutaArchivo(imagen);
    return (
        <>
            <article className='tarjeta-software' id={id ? id : crypto.randomUUID()}>
                <img src={imagenProcesada} alt="Imagen Software" />
                <div className='nombre-hardware'>{nombre ? nombre : 'Nombre no disponible'}</div>
            </article>
        </>
    );
}

export default Software;