import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { SectorData } from 'types/sector.type';

const Sector: FC<SectorData> = ({ sectorId, name, percentages, color }) => {
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
        <Grid width={'120px'} sx={{ borderRight: '2px solid rgba(219, 223, 233, 1)' }}>
          {name}
        </Grid>
        <Grid width={'55px'} sx={{ borderRight: '2px solid rgba(219, 223, 233, 1)' }}>
          {percentages}%
        </Grid>
        <Grid>
          <svg width={24} height={24} viewBox={`0 0 100 100`}>
            <circle cx="50" cy="50" r="40" fill={color} role="img" />
          </svg>
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default Sector;
