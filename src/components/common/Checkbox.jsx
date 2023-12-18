import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

export default function Checkbox(props) {

    const { name, label, value, onChange, disabled, size, key } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        // <FormControl>
        <FormControlLabel
            key={key}
            control={<MuiCheckbox
                size={size}
                name={name}
                checked={value}
                disabled={(disabled) ? disabled : false}
                onChange={onChange}
            />}
            label={label}
        />
        // </FormControl>
    )
}
