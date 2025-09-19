import Sector from 'components/Sector/Sector';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { fetchSectors, sectorsFetchStatus, selectSectors } from 'lib/store/feature/sectors';
import SkeletonSectors from 'modules/common/skeleton/SkeletonSectors';
import React, { FC, useCallback, useEffect } from 'react';
import { SectorData } from 'types/sector.type';

const SectorsList: FC = () => {
  const dispatch = useAppDispatch();
  const sectorData = useAppSelector(selectSectors);
  const fetchingStatus = useAppSelector(sectorsFetchStatus);

  useEffect(() => {
    dispatch(fetchSectors());
  }, []);

  const renderSectors = useCallback(() => {
    if (fetchingStatus === 'idle' || fetchingStatus === 'loading') {
      return <SkeletonSectors />;
    } else if (sectorData && sectorData.length > 0) {
      return sectorData.map((sector: SectorData, index: number) => (
        <Sector key={`sector-${sector.sector_id}`} {...sector} />
      ));
    }
  }, [fetchingStatus, sectorData]);

  return <>{renderSectors()}</>;
};

export default SectorsList;
