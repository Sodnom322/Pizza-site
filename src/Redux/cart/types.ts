export type CartItem = {
    id:string;
    price:number;
    title:string;
    imageUrl:string
    type: string;
    size: number;
    count:number;
  }
  
  export interface CartSliceState{
    totalPrice:number;
    items:CartItem[]
  }