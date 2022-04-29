import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectOrdesPAID } from "../redux/order/selector";


const Order: React.FC = () => {
    const orderStudent=useSelector(selectOrdesPAID);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (<>
        <div>
            {
                orderStudent.map((e) => {
                    return (
                        <Accordion expanded={expanded === e.id} onChange={handleChange(e.id)} key={e.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={e.id + "bh-content"}
                                id={e.id + "bh-header"}
                            >
                                <Grid container spacing={1} >
                                    <Grid item xs={12}>
                                        <Typography >
                                            {e.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ color: 'text.secondary' }}>Pago el {new Date(e.payin?.created || '').toLocaleDateString()}</Typography>
                                    </Grid>
                                </Grid>


                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                    );
                })
            }

        </div>
    </>);
}



export const FeesPaid: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (<div style={{padding:10}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"

            >
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography  sx={{fontWeight:900,fontSize:18}}>
                            Cuotas pagadas
                        </Typography>
                    </Grid>
                    {
                        expanded !== 'panel1' &&
                        <Grid item xs={6}>
                            <Typography sx={{ color: 'text.secondary' }}>Dale click para expandir</Typography>
                        </Grid>
                    }
                </Grid>


            </AccordionSummary>
            <AccordionDetails>
                <Order  />
            </AccordionDetails>
        </Accordion>
    </div>);
}