import React from 'react';
import { OutlinedInputProps, TextField, TextFieldProps, styled } from '@mui/material';

const CTextFields = styled((props: TextFieldProps) => (
  <TextField
    variant="filled"
    slotProps={{
      input: { disableUnderline: true } as Partial<OutlinedInputProps>,
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 10,
    border: '1px solid',
    backgroundColor: '#fff',
    borderColor: '#DBDFE9',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#B2BAC2',
    },
    '& input.MuiInputBase-input, & input.MuiAutocomplete-input': {
      height: '25px',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    },

    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#1A2027',
    //   borderColor: '#2D3843',
    // }),
  },
}));

export default CTextFields;
