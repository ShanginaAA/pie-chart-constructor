import { Button, Grid } from '@mui/material';
import ColorPicker from 'components/Picker/ColorPicker';
import CTextFields from 'modules/common/TextFields/CTextFields';
import { FC } from 'react';

const CreateSector: FC = () => {
  const handleCreate = () => {};

  return (
    <Grid display={'flex'} flexDirection={'column'} gap={2}>
      <CTextFields label="Наименование" />
      <CTextFields label="Значение" />
      <ColorPicker />

      <Button
        variant="contained"
        sx={{
          height: '60px',
          textTransform: 'none',
          fontWeight: '400',
          fontSize: '16px',
          borderRadius: '10px',
        }}
        onClick={handleCreate}
      >
        Добавить сектор
      </Button>
    </Grid>
  );
};

export default CreateSector;
