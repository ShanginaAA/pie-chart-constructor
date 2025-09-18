'use client';

import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { FC, useEffect,  useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import {
  Grid,
  TextField,
  InputAdornment,
  styled,
  TextFieldProps,
  Box,
  Typography,
  Collapse,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { selectColors, fetchColors } from 'lib/store/feature/sectors';

extend([namesPlugin]);

const ColorPicker: FC = () => {
  const dispatch = useAppDispatch();

  const colorsData = useAppSelector(selectColors)
  // const [colorData, setColorData] = useState<ColorDataProps[]>([]);
  const [color, setColor] = useState<string>('rgba(156, 84, 98, 0.71)');
  const [nameColor, setNameColor] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
   dispatch(fetchColors())
  }, []);

  // Функция для вычисления евклидова расстояния между двумя цветами
  const calculateColorDistance = (
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number,
  ): number => {
    const rMean = (r1 + r2) / 2;
    const rDiff = r1 - r2;
    const gDiff = g1 - g2;
    const bDiff = b1 - b2;

    return Math.sqrt(
      (2 + rMean / 256) * Math.pow(rDiff, 2) +
        4 * Math.pow(gDiff, 2) +
        (2 + (255 - rMean) / 256) * Math.pow(bDiff, 2),
    );
  };

  const findClosestColor = (targetR: number, targetG: number, targetB: number) => {
    let closestColor = colorsData[0];

    let minDistance = calculateColorDistance(
      targetR,
      targetG,
      targetB,
      closestColor.R,
      closestColor.G,
      closestColor.B,
    );

    for (let i = 1; i < colorsData.length; i++) {
      const c = colorsData[i];
      const distance = calculateColorDistance(targetR, targetG, targetB, c.R, c.G, c.B);

      if (distance < minDistance) {
        minDistance = distance;
        closestColor = c;
      }
    }

    return closestColor;
  };

  const handleClick = () => {
    const colorRGB = colord(color).toRgb();
    const nameColor = findClosestColor(colorRGB.r, colorRGB.g, colorRGB.b)
    setNameColor(nameColor.Name);
  };

  return (
    <Grid className={'custom-layout'}>
      <DropInput
      value={nameColor}
        label="Цвет"
        slotProps={{
          input: {
            disableUnderline: true,
            // readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
              </InputAdornment>
            ),
          },
        }}
        onClick={() => {
          setShow(!show);
        }}
      />

      <Collapse in={show} timeout={500}>
        <RgbaStringColorPicker color={color} onChange={setColor} style={{ width: 'auto' }} onClick={handleClick}/>
        <svg width={31} height={31} viewBox={`0 0 100 100`}>
          <circle cx="50" cy="50" r="50" fill={color} />
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
      </Collapse>
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

const DropInput = styled((props: TextFieldProps) => <TextField variant="filled" {...props} />)(
  ({ theme }) => ({
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
  }),
);
