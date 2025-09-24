import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';

import SectorsList from 'modules/constructor/components/sectors/list/SectorsList';
import CreateSector from 'modules/constructor/components/sectors/create-sector/CreateSector';
import { useDialog } from 'lib/hooks/useDialog';
import PieChart from '../PieChart';
import CModal from 'components/Modal/CModal';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { fetchColors } from 'lib/store/feature/colors';

const ConstructorView = () => {
  const dispatch = useAppDispatch();
  const { openId, isOpen, handleDialogOpen, handleDialogClose } = useDialog();

  useEffect(() => {
    dispatch(fetchColors());
  }, []);

  return (
    <Container>
      <Grid container direction={'column'} mt={'30px'}>
        <Grid sx={{ p: '0px 10px 30px 10px', borderBottom: '1px solid #DBDFE9' }}>
          <Typography fontWeight={600} fontSize={32} color="#252F4A">
            Круговая диаграмма
          </Typography>
        </Grid>
        <Grid container spacing={8} mt={'30px'}>
          <Grid width={'541px'} display={'flex'} flexDirection={'column'} gap={'5px'}>
            <SectorsList />
            <Button
              variant="contained"
              sx={{
                mt: 3,
                height: '60px',
                textTransform: 'none',
                fontWeight: '400',
                fontSize: '16px',
                borderRadius: '10px',
              }}
              onClick={handleDialogOpen}
            >
              Добавить сектор
            </Button>
          </Grid>
          <Grid width={'500px'} height={'500px'}>
            <PieChart />
          </Grid>
        </Grid>
      </Grid>

      <CModal title="Добавление сектора" open={isOpen} onClose={handleDialogClose}>
        <CreateSector onClose={handleDialogClose} />
      </CModal>
    </Container>
  );
};

export default ConstructorView;
