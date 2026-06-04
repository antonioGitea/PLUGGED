import {React} from "react";
import { resolverRutaArchivo } from "../../utils/imagen.js";

const Hardware = (props) => {
    const {id, nombre, imagen} = props.datosHardware;
    const imagenProcesada = resolverRutaArchivo(imagen);
    return (
        <>
            <article className='tarjeta-hardware' id={id ? id : crypto.randomUUID()}>
                <img src={imagenProcesada} alt="Imagen Hardware" />
                <div className='nombre-hardware'>{nombre ? nombre : 'Nombre no disponible'}</div>
            </article>
        </>
    );
}

export default Hardware;