import React, { useState } from 'react';

const CredentialForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || { service: '', username: '', password: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.service || !formData.username || !formData.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSubmit(formData);
    setFormData({ service: '', username: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Servicio:</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{initialData ? 'Actualizar' : 'Agregar'}</button>
      {onCancel && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default CredentialForm;
