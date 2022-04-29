import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { selecteTotalPaid } from './../redux/order/selector';

import { formatNumber } from "../helper/formatNumber";
type Props = {
    fullName: string,
    cohort: string
}

export const Title: React.FC<Props> = ({
    fullName,
    cohort,
}) => {
    const pay = useSelector(selecteTotalPaid );
    return (
<div style={{padding:10}}>
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Typography className="studenName" variant="h6" gutterBottom sx={{textAlign:'left'}}>
                        {fullName}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{textAlign:'right'}}>
                        {cohort}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom sx={{textAlign:'left'}}>
                    Total a pagar
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{textAlign:'right'}}>
                    $ {pay===0?'---':formatNumber( pay)}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    </div>
    );
}