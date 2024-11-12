import React, { useState } from 'react';
import './Footer.css';
import { FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSendMessage = (event) => {
    event.preventDefault();
    alert("Mensaje enviado correctamente");
    handleCloseModal();
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Menú Familiar® - Todos los derechos reservados</p>
      </div>
      <div className="footer-center">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FaInstagram size={24} />
        </a>
        <a href="https://github.com/dmoyan0/menu-familiar" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FaGithub size={24} />
        </a>
      </div>
      <div className="footer-right">
        <p className="contact-link" onClick={handleOpenModal}>Contáctanos</p>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Contáctanos</h2>
            <form onSubmit={handleSendMessage}>
              <label>Email:</label>
              <input type="email" placeholder="Tu correo" required />

              <label>Tipo de mensaje:</label>
              <select required>
                <option value="">Selecciona una opción</option>
                <option value="consulta">Consulta</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="reclamo">Reclamo</option>
              </select>

              <label>Mensaje:</label>
              <textarea placeholder="Escribe tu mensaje aquí" required></textarea>

              <div className="button-container">
                <button type="submit" className="send-button">Enviar</button>
                <button type="button" className="cancel-button" onClick={handleCloseModal}>Cerrar</button>
               
                
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
