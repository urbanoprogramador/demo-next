import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Grid,
    Box,
    Checkbox
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectOrdesOUTSTANDING,selectOrdesDUEIsPaid } from "../redux/order/selector";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { updateOrder } from '../redux/order/reducer';
import { formatNumber } from "../helper/formatNumber";


const Order: React.FC = () => {
    const orderStudents=useSelector(selectOrdesOUTSTANDING);
    const isPaid=useSelector(selectOrdesDUEIsPaid);
    const dispatch=useDispatch();

    return (<>
        <div>
            {
                orderStudents.map((orderStudent, index) => {
                    const disable = index === 0 
                    ? isPaid 
                    : (orderStudents[index - 1].isPay ? false : true)
                    return (
                        <Box key={orderStudent.id}>
                            <Grid container spacing={1}  >
                                <Grid item xs={6}>
                                    <Typography >
                                        {orderStudent.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>

                                        {index === 0 ? 'Vence el' : 'Ahorra hasta'}
                                        {new Date(orderStudent.due).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Grid container spacing={1}  >
                                        <Grid item xs={9}>
                                            <Typography >{index === 0
                                                    ? orderStudent.price
                                                    : <>
                                                        <Typography 
                                                            component="span" 
                                                            sx={{textDecoration:'line-through',mx:1}}
                                                            >
                                                            {formatNumber(orderStudent.price)}
                                                            </Typography>
                                                        <Typography component="span">{
                                                            formatNumber(orderStudent.price - (orderStudent.price * 0.1))}</Typography>
                                                    </>
                                                }
                                            </Typography>
                                            <Typography >
                                                {
                                                    index === 0
                                                        ? ''
                                                        : 'Ahorra ' + formatNumber(orderStudent.price * 0.1)
                                                }
                                            </Typography>
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


//FeesFuture

export const FeesFuture: React.FC= () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel3');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (< div style={{padding:10}}>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
            >
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography sx={{fontWeight:900,fontSize:18}}>
                            Cuotas pagadas
                        </Typography>
                    </Grid>
                    {
                        expanded !== 'panel3' &&
                        <Grid item xs={6}>
                            <Typography sx={{ color: 'text.secondary' }}>Dale click para expandir</Typography>
                        </Grid>
                    }
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Order/>
            </AccordionDetails>
        </Accordion>
    </div>);
}