import { Box, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";
import { useTheme } from '@mui/material/styles';
import youtube from 'assets/images/icons8-youtube-48.png'
import doc from 'assets/images/ddd.png'
import pdf from 'assets/images/icons8-pdf-48.png'
import link from 'assets/images/icons8-link-24 (1).png'

const FilterLibrary = ({ isOpen, onClose }) => {
    const classes = dashboardStyles();
    const theme = useTheme();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [selectedTypes, setSelectedTypes] = useState([]);


    const checkboxes = [
        { id: 'gilad', name: 'Gilad Gray', label: 'Gilad Gray' },
        { id: 'jason', name: 'jason', label: 'Jason Killian' },
        { id: 'antoine', name: 'antoine', label: 'Antoine Llorca' },
        { id: 'emma', name: 'emma', label: 'Emma Johnson' },
        { id: 'lucas', name: 'lucas', label: 'Lucas Smith' },
        { id: 'mia', name: 'mia', label: 'Mia Thompson' },
        { id: 'oliver', name: 'oliver', label: 'Oliver Wilson' },
        { id: 'sophia', name: 'sophia', label: 'Sophia Garcia' },
    ];
    const types = [
        { id: '1', name: 'youtube', label: 'Youtube', img: youtube },
        { id: '2', name: 'doc', label: 'Document', img: doc },
        { id: '3', name: 'pdf', label: 'PDF', img: pdf },
        { id: '4', name: 'link', label: 'Link', img: link },
    ];
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCheckboxes((prevSelected) => ({
            ...prevSelected,
            [name]: checked,
        }));
    };
    const handleClear = () => {
        setSelectedCheckboxes({})
    };
    const handleTypeSelection = (typeId) => {
        console.log('typeId', typeId)
        if(selectedTypes.includes(typeId)){
            setSelectedTypes(selectedTypes.filter((type)=>type !== typeId));
        }
        else{
            setSelectedTypes([...selectedTypes,typeId])
        }
    };
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            // fullWidth
            maxWidth='48.75rem'
        >
            <DialogTitle className={classes.filterDialogTitle}>
                <IconButton onClick={onClose} >
                    <ClearIcon />
                </IconButton>
                <Typography variant="h6" className={classes.filterDialogTypography}>
                    Filters
                </Typography>
            </DialogTitle>
            <DialogContent className={classes.filterDialogContent}>

                <Typography variant="h5" align="left">
                    Type
                </Typography>
                <Grid container spacing={2}>
                    {types.map((card, index) => (
                        <Grid key={index} item xs={6} sm={6} md={6} lg={3}>
                            <common.FilterContentTypeCard title={card.label} img={card.img} selected={selectedTypes.includes(card.id)} onClick={() => handleTypeSelection(card.id)} />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" align="left">
                    Tags
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={6} md={6} display="flex" alignContent='flex-start'>
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                {checkboxes.slice(0, Math.ceil(checkboxes.length / 2)).map((checkbox) => (
                                    <common.Checkbox label={checkbox.label} key={checkbox.id} name={checkbox.name} size='large' onChange={handleChange} value={selectedCheckboxes[checkbox.name] || false} />

                                ))}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} display="flex" alignContent='flex-start'>

                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                {checkboxes.slice(Math.ceil(checkboxes.length / 2)).map((checkbox) => (
                                    <common.Checkbox label={checkbox.label} key={checkbox.id} name={checkbox.name} size='large' onChange={handleChange} value={selectedCheckboxes[checkbox.name] || false} />

                                ))}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Link>
                        Show more
                    </Link>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.filterDialogActions} >
                <Link onClick={handleClear}>
                    Clear all
                </Link>
                <common.MuiButton size="medium" variant="contained" label={"Show 100+"} minWidth='117px' />
            </DialogActions>
        </Dialog>
    )
}

export default FilterLibrary
