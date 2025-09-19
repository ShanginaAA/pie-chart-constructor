import { Grid } from '@mui/material';
import { FC } from 'react';
import { SectorData } from 'types/sector.type';

const Sector: FC<SectorData> = ({ sector_id, name, percentages, color }) => {
  return (
    <Grid
      container
      // display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        height: '60px',
        backgroundColor: 'rgba(219, 223, 233, 0.2)',
        borderRadius: '10px',
        pl: 3,
        pr: 3,
      }}
    >
      <Grid container gap={3} width={'253px'} height={'24px'}>
        <Grid sx={{ borderRight: '2px solid rgba(219, 223, 233, 1)', pr: 3 }}>{name}</Grid>
        <Grid sx={{ borderRight: '2px solid rgba(219, 223, 233, 1)', pr: 3 }}>{percentages}%</Grid>
        <Grid>
          <svg width={24} height={24} viewBox={`0 0 100 100`}>
            <circle cx="50" cy="50" r="40" fill={color} />
          </svg>
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default Sector;
