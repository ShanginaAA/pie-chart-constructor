import { colord } from 'colord';
import { FC, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import {
  Grid,
  TextField,
  InputAdornment,
  styled,
  TextFieldProps,
  Box,
  Typography,
} from '@mui/material';

const ColorPicker: FC = () => {
  const [color, setColor] = useState<string>('rgba(156, 84, 98, 0.71)');
  console.log(color);
  return (
    <Grid className={'custom-layout'}>
      <RgbaStringColorPicker color={color} onChange={setColor} style={{ width: 'auto' }} />
      <svg width={32} height={32} viewBox={`0 0 100 100`}>
        <circle cx="50" cy="50" r="45" fill={color} />
      </svg>

      <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Grid
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          width={'322px'}
          gap={1}>
          <Input
            value={colord(color).toHex().substring(1)}
            slotProps={{
              input: {
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ '& .MuiTypography-root': { fontSize: 14 } }}>
                    #
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography fontWeight={400} fontSize={14} lineHeight={'20px'} color="#99A1B7">
            HEX
          </Typography>
        </Grid>

        <Box component="img" sx={{ height: '20px', width: '20px' }} src="./images/arrow.png" />
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
  }),
);
