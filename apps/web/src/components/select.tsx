import React from 'react';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

const SelectWrapper = ({
  name,
  handleOnChange,
  items,
  helperText,
  label,
  labelId,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>Currency</InputLabel>
      <Select
        labelId={labelId}
        defaultValue=""
        sx={{ mb: 2 }}
        fullWidth
        label={label}
        variant="outlined"
        name={name}
        onChange={handleOnChange}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectWrapper;
