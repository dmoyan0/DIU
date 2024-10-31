import React, {useState} from 'react';
import './MenuView.css';

function MenuView() {
  // Para mantener track de las semanas:
  const [semanas, setSemanas] = useState([{id: 1, name: "Semana 1"}]);

  const maxWeeks = 8;
  const weeksPerColumn = 4;

  // Funcion para agregar una semana:
  const AgregarSemana = () => {
    const newWeekNumber = semanas.length + 1;
    const newSemana = {id: semanas.length + 1, name: ` Semana ${newWeekNumber}`};
    setSemanas([...semanas, newSemana]);
  };

  // Funcion para eliminar una semana en especifico
  const eliminarSemana = (id) => {
    setSemanas(semanas.filter((semana) => semana.id != id));
  };

  const chunkWeeks = (weeks, size) => {
    const result = [];
    for (let i = 0; i < weeks.length; i += size) {
      result.push(weeks.slice(i, i + size));
    }
    return result;
  };

  const weekColumns = chunkWeeks(semanas, weeksPerColumn);

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
            <div key={semana.id} className='week'>
              <span>{semana.name}</span>
              <button className='add-menu-button'>+Agregar menú</button>
              <button className='delete-week-button' onClick={() => eliminarSemana(semana.id)}>
                Eliminar
              </button>
            </div>
          ))}
          </div>
        ))}
      </div>
      
      {semanas.length != 0 && (
        <button className="shopping-list-button">Obtener lista de compras</button>
      )}

    </div>
  );
}

export default MenuView;
