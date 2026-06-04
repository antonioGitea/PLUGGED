import {React} from "react";
import { resolverRutaArchivo } from "../../utils/imagen.js";

const Evento = (props) => {
    const {id, nombre, nombre_sala, imagen} = props.datosEvento;
    const imagenProcesada = resolverRutaArchivo(imagen);
    return (
        <>
            <article className='tarjeta-evento' id={id ? id : crypto.randomUUID()}>
                <img src={imagenProcesada} alt="Imagen Evento" />
                <div className='nombre-evento'>{nombre ? nombre : 'Nombre no disponible'}</div>
                <div className='nombre-sala'>{nombre_sala ? nombre_sala : 'Nombre Sala no disponible'}</div>
            </article>
        </>
    );
}

export default Evento;