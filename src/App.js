import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import SetMasterPassword from './components/SetMasterPassword';
import LoadFile from './components/LoadFile';
import Dashboard from './components/Dashboard';

const App = () => {
  const [step, setStep] = useState('start'); // 'start', 'set-password', 'load-file', 'dashboard'
  const [fileData, setFileData] = useState(null);

  const handleFileAction = (action) => {
    if (action === 'create') {
      setStep('set-password');
    } else if (action === 'load') {
      setStep('load-file');
    }
  };

  const handleAccessGranted = (data) => {
    setFileData(data);
    setStep('dashboard');
  };

  const handleSaveFile = (blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'credenciales_actualizadas.json';
    link.click();
  };

  return (
    <div>
      {step === 'start' && <StartScreen onFileAction={handleFileAction} />}
      {step === 'set-password' && (
        <SetMasterPassword onFileCreated={() => setStep('load-file')} />
      )}
      {step === 'load-file' && (
        <LoadFile
          onAccessGranted={(data) => handleAccessGranted(data)}
        />
      )}
      {step === 'dashboard' && fileData && (
        <Dashboard initialData={fileData} onSave={handleSaveFile} />
      )}
    </div>
  );
};

export default App;
