import React, { useEffect } from 'react';
import { Title } from '@/components/Title';
import { FeesPaid } from '@/components/FeesPaid';
import { FeesPending } from '@/components/FeesPending';
import { FeesFuture } from '@/components/FeesFuture';
import {
    Alert,
    Box, Button, CircularProgress
} from '@mui/material';


import { StudenInfo } from '../interfaces/student';

import { Header } from '@/components/Header';
import { useSelector } from 'react-redux';
import { pendingOrder, rejectedOrder, StatusOrder, succededOrder } from '../redux/order/reducer';
import { useDispatch } from 'react-redux';
import { shearchStudenInfoAndOrders } from '../conection/searchOrder';
import { selecteTotalPaid,selectOrdesState } from './../redux/order/selector';

export const IndexApp = () => {
    const [values, setValues] = React.useState<StudenInfo | null>(null);
    const [error, setError] = React.useState<string>('');
    const orderStatus = useSelector(selectOrdesState);
    const dispatch = useDispatch();
    const total = useSelector(selecteTotalPaid);

    useEffect(() => {
        if (orderStatus === StatusOrder.idle) {
            dispatch(pendingOrder());
            shearchStudenInfoAndOrders('3b35fb50-3d5e-41b3-96d6-c5566141fab0').then(res => {
                dispatch(succededOrder(res.studenOrders || []));
                setValues(res.studenInfo || null);
            }).catch((error) => {
                dispatch(rejectedOrder());
                setError(error);
            });
        }
    

    }, [orderStatus, dispatch,setError,setValues]);

    switch (orderStatus) {
        case StatusOrder.succeded:
            return (<Box sx={{ flexGrow: 1 }}>
                <Header />
                {
                    /* Ejemplo pasando el valor por parametros  */
                    values &&
                    <Title
                        fullName={values.first_name + '' + values.last_name}
                        cohort={values.cohort}
                    />
                }
                {/* y ejemplo usando redux */}
                
                <FeesPaid />
                <FeesPending />
                <FeesFuture />
                {
                    total > 0 && 
                    <Box sx={{my:5, display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}><Button variant="contained" href="#contained-buttons" size="large">
                        Pagar
                    </Button></Box>
                }


            </Box>);
        case StatusOrder.rejected:
            return (
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            );

        default:
            return (
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                    <CircularProgress />
                </Box>
            );
    }
}