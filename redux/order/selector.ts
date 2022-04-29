import { statusPay } from  '../../interfaces/student';
import { RootState } from '../store';
export const selectOrdesAll = (state: RootState) => state.order.entity;
export const selectOrdesOUTSTANDING = (state: RootState) => state.order.entity.filter((e) => e.status === statusPay.OUTSTANDING);
export const selectOrdesPAID = (state: RootState) => state.order.entity.filter((e) => e.status === statusPay.PAID);
export const selectOrdesDUE = (state: RootState) => state.order.entity.filter((e) => e.status === statusPay.DUE);
export const selectOrdesDUEIsPaid = (state: RootState): boolean => {
    const payments = state.order.entity.filter((e) => e.status === statusPay.DUE);
    const last = payments[payments.length - 1]?.isPay;
    return (typeof last === 'undefined') ? true : !last as boolean;
};
export const selecteTotalPaid = (state: RootState) => {
    const payments = state.order.entity.filter((e) => typeof e.isPay !== 'undefined' ? e.isPay : false);
    let descu=true;
    const total = payments.reduce(
        (previousValue, currentValues) => {
            if(currentValues.status===statusPay.DUE){
                return previousValue + (currentValues.price+currentValues.interest)
            }
            if(currentValues.status===statusPay.OUTSTANDING){
                if(descu){
                    descu=false;
                    return previousValue + currentValues.price
                }else{
                    return previousValue + (currentValues.price-(currentValues.price*0.1))
                }
            }
            return previousValue + currentValues.price
        }
        , 0);
    return total;
}
export const selectOrdesState = (state: RootState) => state.order.status;

