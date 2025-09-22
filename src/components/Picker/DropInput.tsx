import { styled, TextField, TextFieldProps } from '@mui/material';

export const DropInput = styled((props: TextFieldProps) => (
  <TextField variant="filled" {...props} />
))(({ theme }) => ({
  '&': {
    width: '100%',
    paddingBottom: '16px',
  },
  '& .MuiInputBase-root': {
    cursor: 'pointer',
  },
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
      cursor: 'pointer',
    },

    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    },
  },
}));
