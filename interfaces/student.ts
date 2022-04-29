export interface Guardian {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    tax_id: string;
};
export interface School {
    id: string;
    name: string;
    logo?: string;
    country: string;
    city?: string,
    address: string;
    zip_code?: string;
}

export interface StudenInfo {
    id: string;
    first_name: string;
    last_name: string;
    guardian: Guardian
    cohort: string;
    school: School;
    monthly_grant_type?: string;
    monthly_grant_value?: string;
    inscription_grant_value?: string;
    inscription_grant_type?: string;
}

export interface Payin {
    id: string;
    created: string
}

export enum statusPay{
    OUTSTANDING='OUTSTANDING',
    DUE='DUE',
    PAID='PAID'
}
export enum priceCurrency{
    MXN="MXN"
}
export interface OrderStudent {
    id: string;
    concept: string;
    name: string;
    price: number;
    price_currency: priceCurrency;
    due: string;
    status: statusPay;
    interest: number;
    payin?: Payin,
    isPay?:Boolean
}