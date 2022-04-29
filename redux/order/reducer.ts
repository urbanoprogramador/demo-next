import { createSlice } from '@reduxjs/toolkit';
import { OrderStudent } from '../../interfaces/student';
export enum statusPay {
  OUTSTANDING = 'OUTSTANDING',
  DUE = 'DUE',
  PAID = 'PAID'
}
export enum StatusOrder {
  pending = 'pending',
  rejected = 'rejected',
  succeded = 'succeded',
  idle = 'idle'
}
let order: OrderStudent[] = [];
if (typeof window !== "undefined") {
  order = JSON.parse(localStorage.getItem('order') || '[]') as OrderStudent[];

}

interface initialState {
  status: StatusOrder,
  entity: OrderStudent[]
}


const initialState: initialState = {
  status: order.length > 0 ? StatusOrder.succeded : StatusOrder.idle,
  entity: order
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    pendingOrder(state) {
      state.status = StatusOrder.pending;
    },
    rejectedOrder(state) {
      state.status = StatusOrder.rejected;
    },
    succededOrder(state, action: { payload: OrderStudent[] }) {
      state.entity = action.payload.map((order)=>{
        return {
          ...order,
          interest:parseFloat(order.interest+''),
          price:parseFloat(order.price+'')
        }
      });
      state.status = StatusOrder.succeded;
    },
    updateOrder(state, action: { payload: OrderStudent }) {
      let disableNext = false;
      state.entity = state.entity.map((e) => {
        if (disableNext) {
          return { ...e, isPay: false};
        }
        if (e.id === action.payload.id) {
          if(e.isPay){
            disableNext=true
          }
          return { ...action.payload, isPay: (action.payload.isPay) ? false : true };
        }
        return e
      });
      state.status = StatusOrder.succeded;
    }
  },
})

export const {
  pendingOrder, rejectedOrder, succededOrder, updateOrder
} = orderSlice.actions

export default orderSlice.reducer;


