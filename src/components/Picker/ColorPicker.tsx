'use client';

import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { FC, useEffect, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { Grid, InputAdornment, Collapse } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { selectColors, fetchColors } from 'lib/store/feature/colors';
import { DropInput } from './DropInput';
import ColorConverter from './ColorConverter';
import { ColorPickerProps } from 'types/picker.type';

extend([namesPlugin]);

const ColorPicker: FC<ColorPickerProps> = ({ onColorChange, currentColor }) => {
  const dispatch = useAppDispatch();

  const colorsData = useAppSelector(selectColors);

  const [color, setColor] = useState<string>(currentColor);
  const [nameColor, setNameColor] = useState<string>('Светло-морковный');
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    onColorChange(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchColors());
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

  const handleClickColorPicker = () => {
    const colorRGB = colord(color).toRgb();
    const nameColor = findClosestColor(colorRGB.r, colorRGB.g, colorRGB.b);
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
                <svg width={24} height={24} viewBox={`0 0 100 100`} style={{ paddingRight: '5px' }}>
                  <circle cx="50" cy="50" r="48" fill={color} />
                </svg>
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
        <RgbaStringColorPicker
          color={color}
          onChange={setColor}
          style={{ width: 'auto' }}
          onClick={handleClickColorPicker}
        />
        <ColorConverter color={color} />
      </Collapse>
    </Grid>
  );
};

export default ColorPicker;
