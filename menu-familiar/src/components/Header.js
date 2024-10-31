import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


function Header() {
  return (
    <header className="header">

      {/* // <div className="logo">Menú Familiar</div> */}
      
      <Link to="/" className = "logo">
        Menú Familiar
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Seleccionar menú</Link>
        <Link to="/">Acerca</Link>
        <Link to="/">Iniciar sesión</Link>
        <Link to="/">Registrarse</Link>
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
