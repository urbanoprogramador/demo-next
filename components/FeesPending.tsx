import React from "react";
import {
    Box,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Grid,
    Checkbox
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectOrdesDUE } from './../redux/order/selector';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { updateOrder } from "../redux/order/reducer";
import { formatNumber } from "../helper/formatNumber";

const Order: React.FC = () => {
    const orderStudents=useSelector(selectOrdesDUE);
    const dispatch=useDispatch();

    return (<>
        <div>
            {
                orderStudents.map((orderStudent, index) => {
                    const disable = index === 0 ? false : (orderStudents[index - 1].isPay ? false : true)
                    return (
                        <Box key={orderStudent.id}>
                            <Grid container spacing={1}  >
                                <Grid item xs={6}>
                                    <Typography >
                                        {orderStudent.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>Vence el {new Date(orderStudent.due).toLocaleDateString()}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Grid container spacing={1}  >
                                        <Grid item xs={9}>
                                            <Typography > {formatNumber( orderStudent.price)}</Typography>
                                            <Typography >interes { formatNumber(orderStudent.interest)}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                checked={orderStudent.isPay ? true : false}
                                                onChange={() => {
                                                    dispatch(updateOrder(orderStudent));
                                                }} disabled={disable} />
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Box>
                    );
                })
            }

        </div>
    </>);
}



export const FeesPending: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel2');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (<div style={{padding:10}}>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography sx={{fontWeight:900,fontSize:18}}>
                            Cuotas pendientes
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {
                                expanded !== 'panel2' ? 'Dale click para expandir' : 'Puede selecionar mas de uno'
                            }</Typography>
                    </Grid>

                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Order />
            </AccordionDetails>
        </Accordion>
    </div>);
}