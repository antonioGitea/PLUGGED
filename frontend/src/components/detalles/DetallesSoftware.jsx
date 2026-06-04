import React from "react";
import { Link } from "react-router-dom";
import PortadaPorDefecto from "../../assets/portada-default.jpg";
import { resolverRutaArchivo } from "../../utils/imagen.js";
import "./DetallesSoftware.css";

const obtenerImagen = (ruta) => {
    if (!ruta) return PortadaPorDefecto;
    return resolverRutaArchivo(ruta) || PortadaPorDefecto;
};

const DetallesSoftware = ({ swBuscado }) => {
    if (!swBuscado) return <div>Cargando...</div>;

    const { id, nombre, version, distribuidor, precio, imagen, tipo_pago, descripcion, usuario } = swBuscado;
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

                    {version && <p className="sc-gear-detail-version"><strong>Versión:</strong> {version}</p>}
                    {distribuidor && <p className="sc-gear-detail-distribuidor"><strong>Distribuidor:</strong> {distribuidor}</p>}
                    {tipo_pago && <p className="sc-gear-detail-pago"><strong>Modalidad:</strong> {tipo_pago}</p>}
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

export default DetallesSoftware;