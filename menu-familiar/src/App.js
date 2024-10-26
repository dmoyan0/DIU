import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MenuView from './components/MenuView';

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
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Bienvenido: Arma tu menú a tu gusto</h1>
                <p>Planifica tus comidas familiares y genera automáticamente tu lista de compras semanal.</p>
                <Link to="/menu">
                  <button className="start-button">Empezar</button>
                </Link>
              </div>
            }
          />

          {/* Ruta para MenuView */}
          <Route path="/menu" element={<MenuView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
