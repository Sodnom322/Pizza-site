import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartSliceState ,CartItem} from './types';
import { calcTotalPrice } from '../../utils/carttotalPrice';
import { getCartFromLs } from '../../utils/getCartFromLocalStorage';



const initialState:CartSliceState =  getCartFromLs()


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      if (state.items.length === 0) {
        state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
