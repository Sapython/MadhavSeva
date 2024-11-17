export type paymentDetail = {
    sevakName: string;
    sevakPhone: string;
    sevaDate: any;
    monthlySeva: boolean;
    gift: boolean;
    giftedPerson: string;
    mode: 'offline' | 'online';
    recipent: string;
    seva:Seva;
    offline?:boolean;
    orderDetail?:any;
    date: any;
    approved?:boolean;
    id?:string;
}
export type Seva = {
    name: string;
    price: number;
    image: string;
    id?: string;
    subscriptionPlanId: string;
}