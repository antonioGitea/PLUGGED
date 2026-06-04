import React from "react";
import { Link } from "react-router-dom";
import PortadaPorDefecto from "../../assets/portada-default.jpg";
import { resolverRutaArchivo } from "../../utils/imagen.js";
import "./DetallesHardware.css";

const obtenerImagen = (ruta) => {
    if (!ruta) return PortadaPorDefecto;
    return resolverRutaArchivo(ruta) || PortadaPorDefecto;
};

const DetallesHardware = ({ hwBuscado }) => {
    if (!hwBuscado) return <div>Cargando...</div>;

    const { id, nombre, marca, precio, imagen, descripcion, usuario } = hwBuscado;
    const imagenUrl = obtenerImagen(imagen);

    return (
        <div className="sc-gear-detail-page">
            <div className="sc-gear-detail-container">
                <div className="sc-gear-detail-imagen">
                    <img
                        src={imagenUrl}
                        alt={nombre}
                        onError={(e) => (e.target.src = PortadaPorDefecto)}
                    />
                </div>

                <div className="sc-gear-detail-info">
                    <h1 className="sc-gear-detail-nombre">{nombre}</h1>

                    {marca && <p className="sc-gear-detail-marca"><strong>Marca:</strong> {marca}</p>}
                    {precio && <p className="sc-gear-detail-precio"><strong>Precio:</strong> {precio} €</p>}
                    {usuario && (
                        <p className="sc-gear-detail-usuario">
                            <strong>Añadido por:</strong>
                            <Link to={`/mostrar/usuario/${usuario.id}`} className="sc-user-link">
                                {usuario.nombre || usuario.nick}
                            </Link>
                        </p>
                    )}

                    {descripcion && (
                        <div className="sc-gear-detail-descripcion">
                            <h3>Descripción</h3>
                            <p>{descripcion}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetallesHardware;