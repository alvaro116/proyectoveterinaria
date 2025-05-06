import React from 'react';

const AuthBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/80 via-primary-50/60 to-secondary-100/70"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-accent-200 rounded-full filter blur-3xl opacity-20"></div>
      
      {/* Paw print patterns (optional) */}
      <div className="hidden md:block absolute top-10 right-10 opacity-5">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary-900">
          <path d="M12,8.5L9.1,13.4L6.5,12.5L3.7,15.3L4.6,18L7.4,15.2L10,16.1L12.9,11.2L15.8,16.1L18.4,15.2L21.2,18L22.1,15.3L19.3,12.5L16.7,13.4L13.8,8.5L12,8.5Z" />
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-20 left-20 opacity-5 rotate-45">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-primary-900">
          <path d="M12,8.5L9.1,13.4L6.5,12.5L3.7,15.3L4.6,18L7.4,15.2L10,16.1L12.9,11.2L15.8,16.1L18.4,15.2L21.2,18L22.1,15.3L19.3,12.5L16.7,13.4L13.8,8.5L12,8.5Z" />
        </svg>
      </div>
    </div>
  );
};

export default AuthBackground;