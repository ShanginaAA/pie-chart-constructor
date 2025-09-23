export type SectorData = {
  sectorId: string;
  name: string;
  percentages: number;
  color: string;
};

export type CreateSectorProps = {
  onClose: () => void;
};
