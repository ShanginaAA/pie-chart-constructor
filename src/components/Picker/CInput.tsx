import { styled, TextField, TextFieldProps } from '@mui/material';

export const CInput = styled((props: TextFieldProps) => (
  <TextField variant="standard" {...props} />
))(({ theme }) => ({
  '&': {
    width: '100%',
    paddingTop: '16px',
  },
  '& .MuiInputBase-root': {
    height: '28px',
    textDecoration: 'none',
    fontSize: 14,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #DBDFE9',
    borderRadius: '5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '4px 6px',
    '&:hover': {
      borderColor: `#B2BAC2`,
    },

    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
