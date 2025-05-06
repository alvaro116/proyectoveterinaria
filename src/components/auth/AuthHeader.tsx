import React from 'react';
import { PawPrint } from 'lucide-react';

const AuthHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-primary-500 p-3 rounded-full shadow-lg">
          <PawPrint size={36} className="text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
        Veterinaria Oasis
      </h1>
      
      <p className="text-gray-600 max-w-2xl mx-auto italic text-lg">
        "Más que veterinarios, somos guardianes de su bienestar, aliados de tu tranquilidad"
      </p>
    </div>
  );
};

export default AuthHeader;