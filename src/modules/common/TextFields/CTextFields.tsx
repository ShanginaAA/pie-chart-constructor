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
  '& .MuiInputBase-root': {},
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 10,
    border: '1px solid',
    backgroundColor: '#fff',
    borderColor: '#DBDFE9',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&.Mui-error ': {
      borderColor: '#d32f2f',
      '&.Mui-focused': {
        border: 'solid 2px #d32f2f',
      },
      '&:hover': { borderColor: '#d32f2f' },
    },
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#B2BAC2',
    },
    '& input.MuiInputBase-input, & input.MuiAutocomplete-input': {
      height: '25px',
    },
  },
}));

export default CTextFields;
