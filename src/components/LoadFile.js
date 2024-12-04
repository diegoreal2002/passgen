import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const LoadFile = ({ onAccessGranted }) => {
  const [fileContent, setFileContent] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsedContent = JSON.parse(content);
      setFileContent(parsedContent);
      setError('');
    } catch (err) {
      setError('Error al cargar el archivo. Asegúrate de que sea un JSON válido.');
    }
  };

  const handlePasswordSubmit = () => {
    if (!fileContent) {
      setError('Primero debes cargar un archivo.');
      return;
    }

    const { masterPasswordHash } = fileContent;
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (hashedPassword === masterPasswordHash) {
      setError('');
      onAccessGranted(fileContent); // Navegar al dashboard
    } else {
      setError('La contraseña maestra es incorrecta.');
    }
  };

  return (
    <div>
      <h2>Cargar Archivo Existente</h2>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <div>
        <label>Contraseña Maestra:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordSubmit}>Acceder</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoadFile;
