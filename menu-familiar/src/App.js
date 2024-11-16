import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import nuevaImagen from './Nueva-Imagen.png';
import './App.css';
import Header from './components/Header';
import MenuView from './components/MenuView';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* Ruta principal con el botón de navegación */}
          <Route
            path="/"
            element={
              <div className="home-view">
                <div className="home-content">
                  <div className="image-section">
                    <img src={nuevaImagen} className="App-logo" alt="logo" />
                  </div>
                  <div className="info-section">
                    <h1>Bienvenido! Arma tu menú a tu gusto</h1>
                    <p>
                      ¡Planifica tus comidas sin estrés y ahorra tiempo con Menú Familiar! Empieza hoy y descubre lo fácil que puede ser organizar tu semana.
                    </p>
                    <Link to="/menu">
                      <button className="start-button">Empezar</button>
                    </Link>
                  </div>
                </div>
                <div className="what-is-it">
                  <h2>Presentación</h2>
                  <p>
                    Organizar las comidas semanales y hacer las compras de alimentos puede ser una tarea desafiante y muchas veces estresante, especialmente cuando el tiempo es limitado. En Menú Familiar, hemos creado una solución simple y eficiente para ayudarte a planificar tus menús semanales y generar listas de compras personalizadas según tus preferencias.
                  </p>
                  <p>
                    Nuestra plataforma te permite armar tu menú a medida, ahorrar tiempo y optimizar tus compras de ingredientes, todo en un solo lugar. Ya sea que busques recetas rápidas o comidas familiares completas, nuestra herramienta   está diseñada para que puedas disfrutar de una experiencia culinaria sin complicaciones.
                  </p>
                  <p>
                    ¡Empieza ahora y lleva la planificación de tus comidas al siguiente nivel!
                  </p>

                </div>
              </div>
            }
          />

          {/* Ruta para MenuView */}
          <Route path="/menu" element={<MenuView />} />
        </Routes>

        {/* Agrega el Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
