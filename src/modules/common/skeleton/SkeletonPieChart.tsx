import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonPieChart = () => {
  return (
    <Grid display={'flex'} justifyContent={'center'}>
      <Skeleton variant="circular" width={410} height={410} sx={{ bgcolor: 'grey.100', m: 2 }} />
    </Grid>
  );
};

export default SkeletonPieChart;
