import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material";
import { memo } from "react";

const ModalAdd = memo(({ onClose, ModelComponent, open }) => {
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: theme.palette.neutral.main,
    color: "black",
    boxShadow: 24,
    p: 3,
    borderRadius: 1,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModelComponent />
      </Box>
    </Modal>
  );
});

export default ModalAdd;
