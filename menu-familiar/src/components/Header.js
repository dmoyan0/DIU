import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Menú Familiar</div>
      <nav>
        <a href="/">Home</a>
        <a href="/">Seleccionar menú</a>
        <a href="/">Acerca</a>
        <a href="/">Iniciar sesión</a>
        <a href="/">Registrarse</a>
      </nav>
      <div className="social-icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
      </div>
    </header>
  );
}

export default Header;
