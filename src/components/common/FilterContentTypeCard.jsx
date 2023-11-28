import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import dashboardStyles from 'styles/components/dashboardStyles';
import common from "components/common";

const FilterContentTypeCard = ({img,title}) => {
    const classes = dashboardStyles();

    return (
        <Card className={classes.filterCard}>
            <CardContent className={classes.filterCardContent}>
                <Card className={classes.filterCardIcon}>
                    <common.Img src={img} />
                </Card>
                <Typography>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FilterContentTypeCard
