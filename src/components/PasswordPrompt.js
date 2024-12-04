import React from 'react';

const PasswordPrompt = ({ onSubmit }) => {
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = () => {
      if (password.trim() === '') {
        alert('Por favor, ingresa una contraseña');
        return;
      }
      onSubmit(password);
    };
  
    return (
      <div>
        <h2>Introduce tu contraseña maestra</h2>
        <input
          type="password"
          placeholder="Contraseña maestra"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Continuar</button>
      </div>
    );
  };
  export default PasswordPrompt;
  