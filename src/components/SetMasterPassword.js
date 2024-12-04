import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';

const SetMasterPassword = ({onFileCreated }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSaveFile = () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.trim() === '') {
      setError('La contraseña no puede estar vacía');
      return;
    }

    setError('');

    // Generar el hash de la contraseña maestra
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Crear la estructura inicial del archivo JSON
    const fileContent = {
      masterPasswordHash: hashedPassword,
      credentials: [],
    };

    // Convertir el contenido a JSON
    const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
      type: 'application/json',
    });

    // Pedir al usuario que elija un nombre y guarde el archivo
    saveAs(blob, 'credenciales.json');

    onFileCreated(); // Redirige al flujo de carga
  };

  return (
    <div>
      <h2>Establece tu Contraseña Maestra</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Contraseña Maestra:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={handleSaveFile}>
          Guardar Archivo
        </button>
      </form>
    </div>
  );
};

export default SetMasterPassword;
