import React from 'react';

const StartScreen = ({ onFileAction }) => {
    return (
      <div>
        <h1>Administrador de Credenciales</h1>
        <button onClick={() => onFileAction('create')}>Crear nuevo archivo</button>
        <button onClick={() => onFileAction('load')}>Cargar archivo existente</button>
      </div>
    );
  };
  export default StartScreen;
  