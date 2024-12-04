import React, { useState } from 'react';
import CredentialForm from './CredentialForm';

const Dashboard = ({ initialData, onSave }) => {
  const [credentials, setCredentials] = useState(initialData.credentials);
  const [editingCredential, setEditingCredential] = useState(null);

  // Agregar una nueva credencial
  const addCredential = (newCredential) => {
    setCredentials([...credentials, newCredential]);
  };

  // Editar una credencial existente
  const updateCredential = (updatedCredential) => {
    const updatedCredentials = credentials.map((cred) =>
      cred.id === updatedCredential.id ? updatedCredential : cred
    );
    setCredentials(updatedCredentials);
  };

  // Eliminar una credencial
  const deleteCredential = (id) => {
    const updatedCredentials = credentials.filter((cred) => cred.id !== id);
    setCredentials(updatedCredentials);
  };

  // Guardar cambios en el archivo JSON
  const handleSaveToFile = () => {
    const fileContent = {
      ...initialData,
      credentials,
    };
    const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
      type: 'application/json',
    });
    onSave(blob);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleSaveToFile}>Guardar Cambios</button>
      <ul>
        {credentials.map((cred) => (
          <li key={cred.id}>
            <strong>{cred.service}</strong> - {cred.username}
            <button onClick={() => setEditingCredential(cred)}>Editar</button>
            <button onClick={() => deleteCredential(cred.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {editingCredential ? (
        <CredentialForm
          initialData={editingCredential}
          onSubmit={(updatedCredential) => {
            updateCredential(updatedCredential);
            setEditingCredential(null);
          }}
          onCancel={() => setEditingCredential(null)}
        />
      ) : (
        <CredentialForm
          onSubmit={(newCredential) => addCredential({ ...newCredential, id: Date.now() })}
        />
      )}
    </div>
  );
};

export default Dashboard;
