// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      sx={{
        bgcolor:'#353232',
        
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field.value || ''}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
          
        />
      )}
    />
  );
}