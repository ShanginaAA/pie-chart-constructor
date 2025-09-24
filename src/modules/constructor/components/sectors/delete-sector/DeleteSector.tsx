import { Button, Grid, Typography } from '@mui/material';
import CModal from 'components/Modal/CModal';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { deleteSector, removeSector } from 'lib/store/feature/sectors';
import { FC, useState } from 'react';
import { DeleteSectorProps } from 'types/sector.type';

const DeleteSector: FC<DeleteSectorProps> = ({ open, sector, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteSector = () => {
    setLoading(true);
    dispatch(deleteSector(sector.id))
      .unwrap()
      .then((response) => {
        dispatch(removeSector(response.sectorId));
        onClose();
      })
      .catch(({ errors }) => {
        console.log(errors);
      })
      .finally(() => setLoading(false));
  };

  return (
    <CModal title="Удаление сектора" open={open} onClose={onClose}>
      <Grid display={'flex'} flexDirection={'column'} gap={2}>
        <Typography fontSize={'.915rem'} fontWeight={400} color={'#637381'} textAlign={'center'}>
          Вы действительно хотите удалить сектор '{sector.name}'?
        </Typography>
        <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-around'} gap={2}>
          <Button
            variant="contained"
            color="error"
            loading={loading}
            onClick={onClose}
            sx={{
              width: '100%',
              height: '38px',
              textTransform: 'none',
              fontWeight: '400',
              fontSize: '16px',
              borderRadius: '10px',
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            loading={loading}
            sx={{
              width: '100%',
              height: '38px',
              textTransform: 'none',
              fontWeight: '400',
              fontSize: '16px',
              borderRadius: '10px',
            }}
            onClick={handleDeleteSector}
          >
            Удалить
          </Button>
        </Grid>
      </Grid>
    </CModal>
  );
};

export default DeleteSector;
