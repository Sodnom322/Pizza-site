type FetchPizzasArgs = {
    sortBy:string
    order:string
    category:string
    search:string
    currentPage:string
  }
  
  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }
  
  
  export type SearchPizzaParams = {
    order:string, sortBy:string, category:string, search:string, currentPage:string
  }
  
  export type Pizza = {
    id: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    imageUrl: string;
  }
  
  export interface PizzaSliceState {
    items: Pizza[];
    status: Status
  }