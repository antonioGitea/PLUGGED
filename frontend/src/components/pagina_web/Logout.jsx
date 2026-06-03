import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/ProveedorAuth.jsx';
import useApiLogout from '../../hooks/Auth/useApiLogout.js';

export const Logout = () => {
    const { desconectar } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const cerrarSesion = async () => {
            await useApiLogout(); // Avisa a Laravel (Axios pone el token solo)
            desconectar();        // Limpia React y LocalStorage
            navigate('/login');   // Te echa al login
        };
        
        cerrarSesion();
    }, [desconectar, navigate]);

    return <p>Cerrando sesión...</p>;
};