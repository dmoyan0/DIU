import React from 'react';
import './MenuView.css';

function MenuView() {
  return (
    <div className="menu-view">
      <button className="add-week-button">+Agregar Semana</button>
      
      <div className="week">
        <span>Semana 1</span>
        <button className="add-menu-button">+Agregar menú</button>
      </div>
      
      <button className="shopping-list-button">Obtener lista de compras</button>
    </div>
  );
}

export default MenuView;
