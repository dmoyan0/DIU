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
                    <h1>Bienvenido! 
                      Arma tu menú a tu gusto</h1>
                    <p>
                      ¡Planifica tus comidas sin estrés y ahorra tiempo con Menú Familiar! Empieza hoy y descubre lo fácil que puede ser organizar tu semana.
                    </p>
                    <Link to="/menu">
                      <button className="start-button">Empezar</button>
                    </Link>
                  </div>
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
