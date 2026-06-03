import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import { Header } from './components/estructura_web/Header.jsx'
import { NavBar } from './components/estructura_web/NavBar.jsx'
import { Footer } from './components/estructura_web/Footer.jsx'
import { Contenido } from './components/estructura_web/Contenido.jsx'

import Reproductor from './components/Reproductor.jsx'
import ContenedorNotificaciones from './components/ContenedorNotificaciones.jsx'
import ProveedorAuth from './contexts/ProveedorAuth.jsx';
import ProveedorUsuario from './contexts/ProveedorUsuario.jsx';
import ProveedorMusica from './contexts/ProveedorMusica.jsx';
import ProveedorEquipamiento from './contexts/ProveedorEquipamiento.jsx';
import ProveedorEvento from './contexts/ProveedorEvento.jsx';
import ProveedorNotificaciones from './contexts/ProveedorNotificaciones.jsx';

import './App.css'

import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        <ProveedorNotificaciones>
          <ContenedorNotificaciones />
          <ProveedorAuth>
              <ProveedorUsuario>
                <NavBar />
                <ProveedorMusica>
                      <ProveedorEquipamiento>
                        <ProveedorEvento>
                          <Contenido />
                          <Reproductor />
                        </ProveedorEvento>
                      </ProveedorEquipamiento>
                </ProveedorMusica>
                <Footer />
              </ProveedorUsuario>
          </ProveedorAuth>
        </ProveedorNotificaciones>
      </>
    </BrowserRouter>
  )
}

export default App
