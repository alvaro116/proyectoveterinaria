import React, { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AuthHeader from './components/auth/AuthHeader';
import AuthBackground from './components/auth/AuthBackground';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const switchToLogin = () => setAuthMode('login');
  const switchToRegister = () => setAuthMode('register');

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-center relative">
      <AuthBackground />
      
      <div className="w-full max-w-4xl mx-auto z-10">
        <AuthHeader />
        
        {authMode === 'login' ? (
          <LoginForm 
            onSwitchToRegister={switchToRegister}
            onSwitchToRecovery={() => {}} // Handled within the component
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={switchToLogin}
          />
        )}
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Veterinaria Oasis. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;