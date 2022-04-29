

import { OrderStudent, StudenInfo } from '../interfaces/student';
import Service from "../services/api";

interface studeResponse{
    studenInfo:StudenInfo,
    studenOrders:OrderStudent[]
}


export const shearchStudenInfoAndOrders =  (studenId:string) => {
    return new Promise<studeResponse>(async(resolve,reject)=>{
        try {
            const _fetch = Service<StudenInfo>('OcJn4jYChW');
            const studenInfo = await _fetch.get(`v1/students/${studenId}/`);
            const _fetch2 = Service<OrderStudent[]>('OcJn4jYChW');
            const studenOrders = await _fetch2.get(`v1/students/${studenId}/orders/`);
            resolve( {
                studenInfo,
                studenOrders
            })
        } catch (error:any) {
            reject(error.detail)
        }
    });
    
}