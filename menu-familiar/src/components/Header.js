import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Cargar el nombre de usuario solo si hay un usuario guardado en localStorage
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUserName(savedUser.name);
      setIsLoggedIn(true); // Asegura que el estado refleje que el usuario está autenticado
    } else {
      setUserName('');
      setIsLoggedIn(false);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { name, email, password };
    
    // Guardar los datos de usuario en localStorage y actualizar el estado
    localStorage.setItem('user', JSON.stringify(user));
    setUserName(name);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setUserName(savedUser.name);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setError('');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    // Eliminar la sesión del usuario y actualizar el estado
    setIsLoggedIn(false);
    setUserName('');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setError(''); // Limpiar el error al abrir el modal de inicio de sesión
  };

  return (
    <header className="header">
      <Link to="/" className="logo">Menú Familiar</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Seleccionar menú</Link>
      </nav>

      <div className="social-icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
      </div>

      <div className="auth-section">
        {isLoggedIn ? (
          <>
            <span className="user-name">Bienvenido, {userName}</span>
            <button className="auth-button" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className="auth-button" onClick={openLoginModal}>Iniciar sesión</button>
            <button className="auth-button" onClick={() => setShowRegisterModal(true)}>Registrarse</button>
          </>
        )}
      </div>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <input type="email" name="email" placeholder="Correo electrónico" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit" className="auth-button">Ingresar</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button className="close-button" onClick={() => setShowLoginModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
              <input type="text" name="name" placeholder="Nombre" required />
              <input type="email" name="email" placeholder="Correo electrónico" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit" className="auth-button">Registrar</button>
            </form>
            <button className="close-button" onClick={() => setShowRegisterModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
