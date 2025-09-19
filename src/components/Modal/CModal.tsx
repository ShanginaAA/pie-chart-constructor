import { Dialog, Box, Grid, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const CModal: FC<ModalProps> = ({ title, open, onClose, children }) => {
  return (
    <Dialog
      sx={{
        '& .MuiPaper-root.MuiDialog-paper': {
          borderRadius: '15px',
          overflow: 'unset',
          width: '390px',
        },
        '& .MuiPaper-root': {
          background: 'white',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          },
        },
      }}
      scroll="body"
      onClose={onClose}
      open={open}
    >
      <Box padding={'20px'}>
        <Grid display={'flex'} marginBottom={'16px'}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            aria-label="close"
            sx={{
              marginLeft: 'auto',
              padding: '0px',
              width: '24px',
              color: '#333',
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </Grid>
        {children}
      </Box>
    </Dialog>
  );
};

export default CModal;
