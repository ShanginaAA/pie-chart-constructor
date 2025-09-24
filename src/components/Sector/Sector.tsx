import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, IconButton } from '@mui/material';
import { useDialog } from 'lib/hooks/useDialog';
import DeleteSector from 'modules/constructor/components/sectors/delete-sector/DeleteSector';
import EditSector from 'modules/constructor/components/sectors/edit-sector/EditSector';
import { FC, useState } from 'react';
import { SectorData } from 'types/sector.type';

const Sector: FC<SectorData> = ({ ...props }) => {
  const { sectorId, name, percentages, color } = props;
  const { openId, isOpen, handleDialogOpen, handleDialogClose } = useDialog();

  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const onEdit = () => {
    setCurrentModal('edit');
    handleDialogOpen();
  };

  const onDelete = () => {
    setCurrentModal('delete');
    handleDialogOpen();
  };

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
        mb: '5px',
        // transition: 'all 0.3s ease-in-out',
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
      <Grid display={'flex'} gap={'20px'} height={24} alignItems={'center'}>
        <IconButton
          onClick={onEdit}
          sx={{
            width: '24px',
            height: '24px',
            padding: '0px',
            margin: '-5px',
            color: '#99A1B7',
          }}
        >
          <FontAwesomeIcon icon={faPen} size="2xs" />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{
            width: '24px',
            height: '24px',
            padding: '0px',
            margin: '-5px',
            color: '#99A1B7',
          }}
        >
          <FontAwesomeIcon icon={faTrash} size="2xs" />
        </IconButton>
      </Grid>
      <EditSector
        open={currentModal === 'edit' && isOpen}
        sector={props}
        onClose={handleDialogClose}
      />
      <DeleteSector
        open={currentModal === 'delete' && isOpen}
        sector={{ id: props.sectorId, name: props.name }}
        onClose={handleDialogClose}
      />
    </Grid>
  );
};

export default Sector;
