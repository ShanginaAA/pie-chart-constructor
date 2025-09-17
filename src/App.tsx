import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { PieChartData } from './types/chart.type';
import PieChart from './components/PieChart';
import { Button, Container, Grid, Typography } from '@mui/material';
import Sector from './components/Sector';
import { useDialog } from './lib/hooks/useDialog';
import Modal from './components/Modal/Modal';
import CreateSector from './modules/sectors/create-sector/CreateSector';

function App() {
  const [chartData, setChartData] = useState<PieChartData[]>([
    {
      label: 'Сектор-1',
      value: 45,
      color: 'rgba(255, 99, 132, 0.8)',
    },
    {
      label: 'Сектор-2',
      value: 25,
      color: 'rgba(54, 162, 235, 0.8)',
    },
    {
      label: 'Сектор-3',
      value: 30,
      color: 'rgba(255, 206, 86, 0.8)',
    },
  ]);

  const { openId, isOpen, handleDialogOpen, handleDialogClose } = useDialog();

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
            {chartData.map((x, i) => (
              <Sector key={i} color={x.color} />
            ))}
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
              onClick={handleDialogOpen}>
              Добавить сектор
            </Button>
          </Grid>
          <Grid width={'500px'} height={'500px'}>
            <PieChart data={chartData} />
          </Grid>
        </Grid>
      </Grid>

      <Modal title="Добавление сектора" open={isOpen} onClose={handleDialogClose}>
        <CreateSector />
      </Modal>
    </Container>
  );
}

export default App;
