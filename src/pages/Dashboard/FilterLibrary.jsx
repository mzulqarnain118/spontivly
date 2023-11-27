import { Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";
import { useTheme } from '@mui/material/styles';

const FilterLibrary = ({ isOpen, onClose }) => {
  const classes = dashboardStyles();
  const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="md">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center'}} >
                <IconButton onClick={onClose} >
                    <ClearIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
                    Filters
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display:'flex' ,flexDirection:'column',gap:theme.spacing(10)}}>
         
                    <Typography variant="h5" align="left">
                        Type
                    </Typography>
                <Box display='flex' gap={theme.spacing(6)}>
                    <Card className={classes.filterCard}>
                        <CardContent>
                            <Typography>
                                Youtube Video
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.filterCard}>
                        <CardContent>
                            <Typography>
                                PDF Document
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.filterCard} >
                        <CardContent>
                            <Typography>
                                Link
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.filterCard}>
                        <CardContent>
                            <Typography>
                                Google Doc
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Typography variant="h5" align="left">
                        Tags
                    </Typography>
            </DialogContent>
            <DialogActions>
                <common.MuiButton variant="contained" label={"Show 100+"} />
            </DialogActions>
        </Dialog>
    )
}

export default FilterLibrary
