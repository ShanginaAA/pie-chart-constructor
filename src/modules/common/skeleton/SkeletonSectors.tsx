import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonSectors = () => {
  return (
    <>
      {[...Array(3)].map((row, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={541}
          height={60}
          sx={{ borderRadius: '10px', bgcolor: 'grey.100' }}
        />
      ))}
    </>
  );
};

export default SkeletonSectors;
