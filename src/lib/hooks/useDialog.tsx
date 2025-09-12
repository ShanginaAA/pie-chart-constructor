import { useRef, useState } from 'react';

export const useDialog = () => {
  const [isOpen, setOpenDialog] = useState(false);
  const openId = useRef<number>(1);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    openId.current = openId.current + 1;
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    openId.current = openId.current + 1;
  };

  return {
    openId,
    isOpen,
    handleDialogOpen,
    handleDialogClose,
  };
};
