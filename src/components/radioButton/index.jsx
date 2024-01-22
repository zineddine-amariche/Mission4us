import { Radio, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';

function RadionButton(id,onChange,value,label) {
  const [selected, setSelected] = useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    
  };

  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : "";
};


  return (
    <FormControl>
      <RadioGroup row value={selected} onChange={selectionChangeHandler} >
        <FormControlLabel id={id} value="first" control={<Radio />} label={"je Confirme la date de debut"}  />
        
      </RadioGroup>
    </FormControl>
  );
}

export default RadionButton;