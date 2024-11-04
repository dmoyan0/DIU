import React, { useState } from 'react';
import './MenuView.css';

function MenuView() {
  const [semanas, setSemanas] = useState([{ id: 1, name: "Semana 1", menu: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false); // Estado para la lista de compras
  const [currentWeekId, setCurrentWeekId] = useState(null); 
  const [menuOptions] = useState(['Arroz con pollo y ensalada', 'Lentejas con arroz', 'Tacos', 'Pasta']);

  const maxWeeks = 8;
  const weeksPerColumn = 4;

  const ingredients = {
    'Arroz con pollo y ensalada': ['Arroz', 'Pollo', 'Lechuga', 'Tomate', 'Aceite de oliva'],
    'Lentejas con arroz': ['Lentejas', 'Arroz', 'Cebolla', 'Zanahoria', 'Pimiento rojo'],
    'Tacos': ['Tortillas', 'Carne molida', 'Lechuga', 'Tomate', 'Queso'],
    'Pasta': ['Pasta', 'Salsa de tomate', 'Queso parmesano', 'Albahaca', 'Ajo']
  };

  const AgregarSemana = () => {
    const newWeekNumber = semanas.length + 1;
    const newSemana = { id: newWeekNumber, name: `Semana ${newWeekNumber}`, menu: [] };
    setSemanas([...semanas, newSemana]);
  };

  const eliminarSemana = (id) => {
    setSemanas(semanas.filter((semana) => semana.id !== id));
  };

  const openModal = (weekId) => {
    setCurrentWeekId(weekId); 
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentWeekId(null); 
  };

  const selectMenuOption = (option) => {
    setSemanas(semanas.map((semana) =>
      semana.id === currentWeekId ? { ...semana, menu: [...semana.menu, option] } : semana
    ));
    closeModal();
  };

  const removeMenuOption = (weekId, option) => {
    setSemanas(semanas.map((semana) =>
      semana.id === weekId
        ? { ...semana, menu: semana.menu.filter((dish) => dish !== option) }
        : semana
    ));
  };

  const chunkWeeks = (weeks, size) => {
    const result = [];
    for (let i = 0; i < weeks.length; i += size) {
      result.push(weeks.slice(i, i + size));
    }
    return result;
  };

  const weekColumns = chunkWeeks(semanas, weeksPerColumn);

  const openShoppingList = () => {
    setShowShoppingList(true);
  };

  const closeShoppingList = () => {
    setShowShoppingList(false);
  };

  return (
    <div className="menu-view">
      {semanas.length < maxWeeks && (
        <button className="add-week-button" onClick={AgregarSemana}>
          +Agregar Semana
        </button>
      )}

      <div className="week-container">
        {weekColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="weekColumn"> 
            {column.map((semana) => (
              <div key={semana.id} className="week">
                <span>{semana.name}</span>
                
                {semana.menu.length > 0 ? (
                  <div className="selected-menu-list">
                    {semana.menu.map((dish, index) => (
                      <div key={index} className="selected-menu">
                        <span>{dish}</span>
                        <button className="delete-menu-button" onClick={() => removeMenuOption(semana.id, dish)}>
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button className="add-more-button" onClick={() => openModal(semana.id)}>
                      + Agregar otro platillo
                    </button>
                  </div>
                ) : (
                  <button className="add-menu-button" onClick={() => openModal(semana.id)}>
                    +Agregar menú
                  </button>
                )}
                
                <button className="delete-week-button" onClick={() => eliminarSemana(semana.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="shopping-list-button" onClick={openShoppingList}>Obtener lista de compras</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Seleccionar menú:</h3>
            <div className="menu-options">
              {menuOptions.map((option, index) => (
                <div key={index} className="menu-option" onClick={() => selectMenuOption(option)}>
                  {option}
                </div>
              ))}
            </div>
            <button className="close-modal-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {showShoppingList && (
          <div className="modal-overlay">
              <div className="modal shopping-list-modal">
                  <h3>Lista de Compras</h3>
                  <div className="shopping-list">
                    {Array.from(new Set(semanas.flatMap(semana => semana.menu))).map((dish, index) => (
                      <div key={index} className="shopping-item">
                        <strong>{dish}</strong>
                        <ul>
                          {ingredients[dish].map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <button className="close-modal-button" onClick={closeShoppingList}>Cerrar</button>
              </div>
          </div>
      )}

    </div>
  );
}

export default MenuView;
