import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import useForm from '../../hooks/useForm';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  
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
      firstName: '',
      lastName: '',
      identification: '',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      password: '',
      confirmPassword: ''
    },
    {
      firstName: { required: true, minLength: 2 },
      lastName: { required: true, minLength: 2 },
      identification: { required: true, isNumber: true },
      phone: { required: true, isNumber: true, minLength: 7 },
      email: { required: true, isEmail: true },
      address: { required: true, minLength: 5 },
      occupation: { required: true },
      password: { required: true, minLength: 6 },
      confirmPassword: { 
        required: true, 
        custom: (value) => value === values.password 
      }
    }
  );

  const onSubmitRegister = (formValues: Record<string, string>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Register submitted:', formValues);
      setIsLoading(false);
      // Here you would handle registration
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      onSwitchToLogin();
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
          Registro de Usuario
        </h2>
        
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombres"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName ? errors.firstName : ''}
              placeholder="Ingrese sus nombres"
              icon={<User size={18} />}
            />
            
            <Input
              label="Apellidos"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName ? errors.lastName : ''}
              placeholder="Ingrese sus apellidos"
              icon={<User size={18} />}
            />
            
            <Input
              label="Número de Identificación"
              name="identification"
              value={values.identification}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.identification ? errors.identification : ''}
              placeholder="Ingrese su número de identificación"
              icon={<Calendar size={18} />}
            />
            
            <Input
              label="Número de Teléfono"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone ? errors.phone : ''}
              placeholder="Ingrese su número de teléfono"
              icon={<Phone size={18} />}
            />
            
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
            
            <Input
              label="Dirección de Vivienda"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address ? errors.address : ''}
              placeholder="Ingrese su dirección de vivienda"
              icon={<MapPin size={18} />}
            />
            
            <Input
              label="Ocupación"
              name="occupation"
              value={values.occupation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.occupation ? errors.occupation : ''}
              placeholder="Ingrese su ocupación"
              icon={<Briefcase size={18} />}
            />
            
            <div className="md:col-span-2">
              <hr className="my-4 border-gray-200" />
            </div>
            
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ''}
              placeholder="Cree una contraseña"
            />
            
            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              placeholder="Confirme su contraseña"
            />
          </div>
          
          <div className="mt-6 mb-4">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
            >
              Registrarse
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <button 
                type="button" 
                className="link font-medium"
                onClick={onSwitchToLogin}
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;