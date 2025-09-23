export type ColorPickerProps = {
  onColorChange: (color: string) => void;
  currentColor: string;
};

export type ColorData = {
  Name: string;
  Hex: string;
  R: number;
  G: number;
  B: number;
};

export type ColorConverterProps = {
  color: string;
};

export type ColorModel = 'HEX' | 'RGBA' | 'HSLA';
export const COLOR_MODELS: readonly ColorModel[] = ['HEX', 'RGBA', 'HSLA'];
