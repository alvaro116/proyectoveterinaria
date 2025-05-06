import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import useForm from '../../hooks/useForm';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToRecovery: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSwitchToRegister, 
  onSwitchToRecovery 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryOptions, setShowRecoveryOptions] = useState(false);
  
  const { 
    values, 
    errors, 
    touched,
    handleChange, 
    handleBlur, 
    handleSubmit,
    isValid 
  } = useForm(
    { 
      identification: '', 
      password: '',
      email: '' 
    },
    {
      identification: { required: true, isNumber: true },
      password: { required: true, minLength: 6 },
      email: { required: showRecoveryOptions, isEmail: true }
    }
  );

  const onSubmitLogin = (formValues: Record<string, string>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formValues);
      setIsLoading(false);
      // Here you would handle authentication and redirection
    }, 1500);
  };

  const onSubmitRecovery = (formValues: Record<string, string>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Recovery submitted:', formValues);
      setIsLoading(false);
      alert('Se ha enviado un correo de recuperación a: ' + formValues.email);
      setShowRecoveryOptions(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card">
        {!showRecoveryOptions ? (
          <>
            <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
              Iniciar Sesión
            </h2>
            
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <Input
                label="Número de Identificación"
                name="identification"
                value={values.identification}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.identification ? errors.identification : ''}
                placeholder="Ingrese su número de identificación"
                icon={<User size={18} />}
              />
              
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : ''}
                placeholder="Ingrese su contraseña"
                icon={<Lock size={18} />}
              />
              
              <div className="mt-6 mb-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full"
                  isLoading={isLoading}
                  disabled={!isValid || isLoading}
                >
                  Ingresar
                </Button>
              </div>
              
              <div className="text-center text-sm">
                <button 
                  type="button" 
                  className="link mb-2 block mx-auto"
                  onClick={() => setShowRecoveryOptions(true)}
                >
                  ¿Olvidaste tu contraseña o usuario?
                </button>
                
                <p className="text-gray-600 mt-4">
                  ¿No tienes una cuenta?{' '}
                  <button 
                    type="button" 
                    className="link font-medium"
                    onClick={onSwitchToRegister}
                  >
                    Regístrate
                  </button>
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
              Recuperar Acceso
            </h2>
            
            <form onSubmit={handleSubmit(onSubmitRecovery)}>
              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : ''}
                placeholder="Ingrese su correo electrónico"
                icon={<Mail size={18} />}
              />
              
              <p className="text-sm text-gray-600 mb-4">
                Enviaremos un enlace de recuperación a tu correo electrónico para restablecer tu contraseña.
              </p>
              
              <div className="mt-6 mb-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full"
                  isLoading={isLoading}
                  disabled={!values.email || !!errors.email || isLoading}
                >
                  Enviar Instrucciones
                </Button>
              </div>
              
              <button 
                type="button" 
                className="link text-sm block mx-auto"
                onClick={() => setShowRecoveryOptions(false)}
              >
                Volver al inicio de sesión
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;