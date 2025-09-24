export type SectorData = {
  sectorId: string;
  name: string;
  percentages: number;
  color: string;
};

export type CreateSectorProps = {
  onClose: () => void;
};

export type EditSectorProps = {
  open: boolean;
  sector: SectorData;
  onClose: () => void;
};

export type DeleteSectorProps = {
  open: boolean;
  sector: { id: string; name: string };
  onClose: () => void;
};
