import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { ErrorMessage } from './components/ErrorMessage';
import { authService } from './services/auth.service';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      setError('');
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.signup(email, password);
      }
      // Handle successful auth (e.g., redirect to dashboard)
      console.log('Authentication successful');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={() => setError('')} 
        />
      )}
      <AuthForm
        isLogin={isLogin}
        onSubmit={handleSubmit}
        onToggle={() => setIsLogin(!isLogin)}
      />
    </div>
  );
}

export default App;