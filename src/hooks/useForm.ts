import { useState, ChangeEvent, FormEvent } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  isEmail?: boolean;
  isNumber?: boolean;
  custom?: (value: string) => boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

type FormValues = Record<string, string>;

interface UseFormReturn {
  values: FormValues;
  errors: ValidationErrors;
  touched: Record<string, boolean>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (values: FormValues) => void) => (e: FormEvent) => void;
  reset: () => void;
  isValid: boolean;
}

const useForm = (
  initialValues: FormValues,
  validationRules: Record<string, ValidationRules> = {}
): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'Este campo es requerido';
    }

    if (rules.isEmail && !/\S+@\S+\.\S+/.test(value)) {
      return 'Email inválido';
    }

    if (rules.isNumber && !/^\d+$/.test(value)) {
      return 'Solo se permiten números';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Debe tener al menos ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `No debe exceder ${rules.maxLength} caracteres`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Formato inválido';
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Valor inválido';
    }

    return '';
  };

  const validateForm = (): ValidationErrors => {
    const formErrors: ValidationErrors = {};

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, values[key] || '');
      if (error) {
        formErrors[key] = error;
      }
    });

    return formErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Validate on change if field was already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (onSubmit: (values: FormValues) => void) => (e: FormEvent): void => {
    e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields: Record<string, boolean> = {};
    Object.keys(validationRules).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Submit if no errors
    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    }
  };

  const reset = (): void => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.keys(errors).length === 0 && 
                  Object.keys(touched).length === Object.keys(validationRules).length;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid
  };
};

export default useForm;