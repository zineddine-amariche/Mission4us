import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  color:'black',
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
};

export default function ModalDelete({open,onClose,title,onDelete}) {
 
  const theme = useTheme();
  return (
    <div>
      {/* <Button onClick={handleOuvrir}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <div style={{paddingTop:20, float:'right'}}>
          <Button variant="contained" 
          size='medium' 
          style={{backgroundColor:theme.palette.primary.light,color:theme.palette.background.default}}
          sx={{marginRight:3}}
          onClick={onDelete}
          
          >
              Oui
          </Button>
          <Button variant="contained" 
          size='medium' 
          color='error'
          onClick={onClose}
          >
              Non
          </Button>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}