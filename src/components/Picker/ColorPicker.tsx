import { colord } from 'colord';
import { FC, useMemo, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { Grid, TextField, InputAdornment, styled, TextFieldProps } from '@mui/material';

const ColorPicker: FC = () => {
  const [color, setColor] = useState<string>('rgba(156, 84, 98, 0.71)');
  console.log(color);
  return (
    <Grid>
      <RgbaStringColorPicker color={color} onChange={setColor} style={{ width: 'auto' }} />

      <Grid>
        <Input
          value={colord(color).toHex().substring(1)}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ColorPicker;

const Input = styled((props: TextFieldProps) => <TextField variant="standard" {...props} />)(
  ({ theme }) => ({
    '&': {
      width: '100%',
      paddingTop: '16px',
    },
    '& .MuiInputBase-root': {
      textDecoration: 'none',
      fontSize: 14,
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid #DBDFE9',
      borderRadius: '5px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '6px 4px',
      '&:hover': {
        borderColor: `#B2BAC2`,
      },

      '&.Mui-focused': {
        borderColor: theme.palette.primary.main,
      },
    },
  }),
);
