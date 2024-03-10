import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async params => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://657855a6f08799dc8044f459.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
