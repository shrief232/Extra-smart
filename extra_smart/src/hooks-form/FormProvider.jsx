import React from 'react';
import { FormProvider as RHFFormProvider } from 'react-hook-form';

// Rename your custom FormProvider to avoid conflicts
const CustomFormProvider = ({ children, methods, onSubmit }) => {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFFormProvider>
  );
};

export default CustomFormProvider;