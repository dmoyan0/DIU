import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './MenuView.css';

function MenuView() {
  const [semanas, setSemanas] = useState([{ id: 1, name: "Día 1", menu: [] }]);
  const [showModal, setShowModal] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(1);
  const [menuOptions, setMenuOptions] = useState(['Arroz con pollo y ensalada', 'Lentejas con arroz', 'Tacos', 'Pasta']);
  const [ingredients, setIngredients] = useState({
    'Arroz con pollo y ensalada': ['Arroz', 'Pollo', 'Lechuga', 'Tomate'],
    'Lentejas con arroz': ['Lentejas', 'Arroz', 'Cebolla', 'Ajo'],
    'Tacos': ['Tortillas', 'Carne', 'Queso', 'Lechuga', 'Tomate'],
    'Pasta': ['Pasta', 'Tomate', 'Queso', 'Aceite de oliva']
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const maxWeeks = 14;
  const daysPerWeek = 7;

  const AgregarSemana = () => {
    const newWeekNumber = semanas.length + 1;
    const newSemana = { id: newWeekNumber, name: `Día ${newWeekNumber}`, menu: [] };
    setSemanas([...semanas, newSemana]);
    setCurrentWeekId(newWeekNumber);
  };

  const eliminarSemana = (id) => {
    setSemanas(semanas.filter((semana) => semana.id !== id));
    if (id === currentWeekId && semanas.length > 1) {
      setCurrentWeekId(semanas[semanas.length - 2].id);
    }
  };

  const openModal = (weekId) => {
    setCurrentWeekId(weekId); 
    setShowModal(true);
    setShowRecipeForm(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowRecipeForm(false);
    setNewRecipeName('');
    setIngredientsList([]);
    setSearchQuery('');
    setFilteredOptions([]);
    setShowRecipeDetails(false);
    setSelectedRecipe(null);
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
    setCurrentWeekId(weekId);
  };

  const chunkWeeks = (weeks, size) => {
    const result = [];
    for (let i = 0; i < weeks.length; i += size) {
      result.push(weeks.slice(i, i + size));
    }
    return result;
  };

  const weekColumns = chunkWeeks(semanas, daysPerWeek);

  const openRecipeForm = () => {
    setShowRecipeForm(true);
  };

  const addIngredient = () => {
    if (newIngredient) {
      setIngredientsList([...ingredientsList, newIngredient]);
      setNewIngredient('');
    }
  };

  const saveNewRecipe = () => {
    if (newRecipeName && ingredientsList.length) {
      setMenuOptions([...menuOptions, newRecipeName]);
      setIngredients({ ...ingredients, [newRecipeName]: ingredientsList });
      closeModal();
    }
  };

  const generateShoppingListPDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;
    doc.setFontSize(16);
    doc.text('Lista de Compras', 10, yPosition);
    yPosition += 10;

    semanas.forEach((semana, semanaIndex) => {
      doc.setFontSize(14);
      doc.text(`Semana ${semanaIndex + 1}`, 10, yPosition);
      yPosition += 8;

      semana.menu.forEach((dish) => {
        doc.setFontSize(12);
        doc.text(`Día ${semana.id}: ${dish}`, 10, yPosition);
        yPosition += 7;
        ingredients[dish].forEach((ingredient) => {
          doc.text(`- ${ingredient}`, 20, yPosition);
          yPosition += 7;
        });
        yPosition += 5;
      });
      yPosition += 5;
    });

    doc.save('lista_de_compras.pdf');
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = menuOptions.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetails(true);
  };

  const closeRecipeDetails = () => {
    setShowRecipeDetails(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="menu-view">
      {semanas.length < maxWeeks && (
        <button className="add-week-button" onClick={AgregarSemana}>
          +Agregar Día
        </button>
      )}

      <input
        type="text"
        placeholder="Buscar receta..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="input search-bar"
      />
      {filteredOptions.length > 0 && (
        <div className="search-suggestions">
          {filteredOptions.map((option, index) => (
            <div key={index} className="menu-option" onClick={() => handleRecipeClick(option)}>
              {option}
            </div>
          ))}
        </div>
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
                    <div className="action-buttons">
                      <button className="add-more-button" onClick={() => openModal(semana.id)}>
                        + Agregar otro platillo
                      </button>
                      <button className="delete-week-button" onClick={() => eliminarSemana(semana.id)}>
                        Eliminar día
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button className="add-menu-button" onClick={() => openModal(semana.id)}>
                      +Agregar menú
                    </button>
                    <button className="delete-week-button" onClick={() => eliminarSemana(semana.id)}>
                      Eliminar día
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="recommendations-button" onClick={() => setShowModal(true)}>Recomendaciones</button>
      <button className="shopping-list-button" onClick={() => setShowShoppingList(true)}>Obtener lista de compras</button>

      {showShoppingList && (
        <div className="modal-overlay">
          <div className="modal shopping-list-modal">
            <h3>Lista de Compras</h3>
            <button className="add-more-button list-download-button" onClick={generateShoppingListPDF}>
              Descargar lista
            </button>
            <button className="close-modal-button" onClick={() => setShowShoppingList(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {!showRecipeForm ? (
              <>
                <h3>Buscar Receta:</h3>
                <input
                  type="text"
                  placeholder="Buscar receta"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input"
                />
                <div className="menu-options">
                  {(filteredOptions.length > 0 ? filteredOptions : menuOptions).map((option, index) => (
                    <div key={index} className="menu-option" onClick={() => selectMenuOption(option)}>
                      {option}
                    </div>
                  ))}
                </div>
                <div className="modal-action-buttons">
                  <button className="add-more-button" onClick={openRecipeForm}>
                    + Crear nueva receta
                  </button>
                  <button className="close-modal-button" onClick={closeModal}>Cerrar</button>
                </div>
              </>
            ) : (
              <>
                <h3>Nueva receta</h3>
                <input
                  type="text"
                  placeholder="Nombre de la receta"
                  value={newRecipeName}
                  onChange={(e) => setNewRecipeName(e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  className="input"
                />
                <button className="add-more-button" onClick={addIngredient}>
                  Agregar Ingrediente
                </button>
                <ul>
                  {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <div className="modal-action-buttons">
                  <button className="save-recipe-button" onClick={saveNewRecipe}>Guardar</button>
                  <button className="close-modal-button" onClick={closeModal}>Cerrar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showRecipeDetails && selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal recipe-details-modal">
            <h3>{selectedRecipe}</h3>
            <ul>
              {ingredients[selectedRecipe]?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <button className="close-modal-button" onClick={closeRecipeDetails}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuView;
