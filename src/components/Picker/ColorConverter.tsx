import { MouseEvent, useState, FC, useEffect } from 'react';
import { Grid, InputAdornment, Typography, IconButton } from '@mui/material';
import { CInput } from './CInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ColorConverterProps, ColorModel, COLOR_MODELS } from '../../types/picker.type';
import { colord } from 'colord';

const ColorConverter: FC<ColorConverterProps> = ({ color }) => {
  const [currentColorModel, setCurrentColorModel] = useState<ColorModel>('HEX');
  const [currentColor, setCurrentColor] = useState<string>(color);

  useEffect(() => {
    switch (currentColorModel) {
      case 'HEX':
        setCurrentColor(colord(color).toHex());
        break;
      case 'RGBA':
        setCurrentColor(colord(color).toRgbString());
        break;
      case 'HSLA':
        setCurrentColor(colord(color).toHslString());
        break;
    }
  }, [currentColorModel, color]);

  const handleClickArrowUp = (event: MouseEvent<HTMLButtonElement>) => {
    const curIndex = COLOR_MODELS.indexOf(currentColorModel);
    const nextIndex = curIndex === 0 ? COLOR_MODELS.length - 1 : curIndex - 1;
    setCurrentColorModel(COLOR_MODELS[nextIndex]);
  };

  const handleClickArrowDown = (event: MouseEvent<HTMLButtonElement>) => {
    const curIndex = COLOR_MODELS.indexOf(currentColorModel);
    const nextIndex = curIndex === COLOR_MODELS.length - 1 ? 0 : curIndex + 1;
    setCurrentColorModel(COLOR_MODELS[nextIndex]);
  };
  return (
    <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginTop={2}>
      <Grid
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        width={'322px'}
        height={'56px'}
        gap={1}
      >
        <CInput
          value={currentColor.toUpperCase()}
          slotProps={{
            input: {
              disableUnderline: true,
              // startAdornment: (
              //   <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: 14 } }}>
              //     {currentColorModel}
              //   </InputAdornment>
              // ),
            },
          }}
        />
        <Typography fontWeight={400} fontSize={14} lineHeight={'20px'} color="#99A1B7">
          {currentColorModel}
        </Typography>
      </Grid>
      <Grid
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'3px'}
        marginRight={1}
      >
        <IconButton
          onClick={handleClickArrowUp}
          sx={{
            padding: '0px',
            margin: '-5px',
            color: '#9CA3AF',
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} size="2xs" />
        </IconButton>
        <IconButton
          onClick={handleClickArrowDown}
          sx={{
            padding: '0px',
            margin: '-5px',
            color: '#9CA3AF',
          }}
        >
          <FontAwesomeIcon icon={faChevronDown} size="2xs" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ColorConverter;
