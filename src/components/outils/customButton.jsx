import React from 'react';
import { Button } from '@material-ui/core';

const CustomButton = (props) => {
  return (
    <Button
      variant={props.variant}
      color={props.color}
      size={props.size}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}

export default CustomButton;