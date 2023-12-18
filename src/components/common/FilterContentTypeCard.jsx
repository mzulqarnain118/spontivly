import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";

const FilterContentTypeCard = ({img,title,selected,onClick}) => {
    const classes = dashboardStyles();
    const handleCardClick = () =>{
        onClick();
    }
    return (
        <Card className={`${classes.filterCard} ${selected? classes.selectedCard :''}`} onClick={handleCardClick}>
            <CardContent className={classes.filterCardContent}>
                <Card className={classes.filterCardIcon}>
                    <common.Img src={img} className={classes.imgLogo} />
                </Card>
                <Typography>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FilterContentTypeCard
