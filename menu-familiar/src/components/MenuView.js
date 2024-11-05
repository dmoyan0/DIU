import React, { useState } from 'react';
import './MenuView.css';

function MenuView() {
  const [semanas, setSemanas] = useState([{ id: 1, name: "Día 1", menu: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(1);  // Inicializamos en la primera semana
  const [menuOptions] = useState(['Arroz con pollo y ensalada', 'Lentejas con arroz', 'Tacos', 'Pasta']);

  const ingredients = {
    'Arroz con pollo y ensalada': ['Arroz', 'Pollo', 'Lechuga', 'Tomate'],
    'Lentejas con arroz': ['Lentejas', 'Arroz', 'Cebolla', 'Ajo'],
    'Tacos': ['Tortillas', 'Carne', 'Queso', 'Lechuga', 'Tomate'],
    'Pasta': ['Pasta', 'Tomate', 'Queso', 'Aceite de oliva']
  };

  const maxWeeks = 14;
  const daysPerWeek = 7;

  const AgregarSemana = () => {
    const newWeekNumber = semanas.length + 1;
    const newSemana = { id: newWeekNumber, name: `Día ${newWeekNumber}`, menu: [] };
    setSemanas([...semanas, newSemana]);
    setCurrentWeekId(newWeekNumber);  // Actualiza la última semana creada como la actual
  };

  const eliminarSemana = (id) => {
    setSemanas(semanas.filter((semana) => semana.id !== id));
    if (id === currentWeekId && semanas.length > 1) {
      // Si se elimina la última semana, actualizar a la semana anterior
      setCurrentWeekId(semanas[semanas.length - 2].id);
    }
  };

  const openModal = (weekId) => {
    setCurrentWeekId(weekId); 
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentWeekId(null); 
  };

  const openRecommendations = () => {
    setShowRecommendations(true);
  };

  const closeRecommendations = () => {
    setShowRecommendations(false);
  };

  const selectMenuOption = (option) => {
    setSemanas(semanas.map((semana) =>
      semana.id === currentWeekId ? { ...semana, menu: [...semana.menu, option] } : semana
    ));
    closeModal();
  };

  // Nueva función para agregar platillo de recomendaciones a la última semana modificada
  const selectRecommendationOption = (option) => {
    setSemanas(semanas.map((semana) =>
      semana.id === currentWeekId ? { ...semana, menu: [...semana.menu, option] } : semana
    ));
    closeRecommendations();
  };

  const removeMenuOption = (weekId, option) => {
    setSemanas(semanas.map((semana) =>
      semana.id === weekId
        ? { ...semana, menu: semana.menu.filter((dish) => dish !== option) }
        : semana
    ));
    setCurrentWeekId(weekId);  // Actualiza la semana modificada
  };

  const chunkWeeks = (weeks, size) => {
    const result = [];
    for (let i = 0; i < weeks.length; i += size) {
      result.push(weeks.slice(i, i + size));
    }
    return result;
  };

  const weekColumns = chunkWeeks(semanas, daysPerWeek);

  const openShoppingList = () => {
    setShowShoppingList(true);
  };

  const closeShoppingList = () => {
    setShowShoppingList(false);
  };

  const getWeeklyShoppingList = () => {
    return weekColumns.map((week, index) => {
      const weeklyIngredients = week.reduce((acc, day) => {
        day.menu.forEach(dish => {
          ingredients[dish].forEach(ingredient => {
            acc[ingredient] = (acc[ingredient] || 0) + 1;
          });
        });
        return acc;
      }, {});

      return { weekNumber: index + 1, ingredients: weeklyIngredients };
    });
  };

  const weeklyShoppingList = getWeeklyShoppingList();

  return (
    <div className="menu-view">
      {semanas.length < maxWeeks && (
        <button className="add-week-button" onClick={AgregarSemana}>
          +Agregar Día
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
                    {Object.entries(
                      semana.menu.reduce((acc, dish) => {
                        acc[dish] = (acc[dish] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([dish, count], index) => (
                      <div key={index} className="selected-menu">
                        <span>{dish}{count > 1 && ` x${count}`}</span>
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

      {/* Botón de recomendaciones */}
      <button className="recommendations-button" onClick={openRecommendations}>Recomendaciones</button>

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

      {showRecommendations && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Recomendaciones:</h3>
            <div className="menu-options">
              {menuOptions.map((option, index) => (
                <div key={index} className="menu-option" onClick={() => selectRecommendationOption(option)}>
                  {option}
                </div>
              ))}
            </div>
            <button className="close-modal-button" onClick={closeRecommendations}>Cerrar</button>
          </div>
        </div>
      )}

      {showShoppingList && (
        <div className="modal-overlay">
          <div className="modal shopping-list-modal">
            <h3>Lista de Compras por Semana</h3>
            <div className="shopping-list">
              {weeklyShoppingList.map((week, index) => (
                <div key={index} className="shopping-item">
                  <h4>Semana {week.weekNumber}</h4>
                  <ul>
                    {Object.entries(week.ingredients).map(([ingredient, quantity], idx) => (
                      <li key={idx}>{ingredient}: {quantity}</li>
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
