import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 1,
  currentPage: 1,
  sort: {
    name: 'пополярности',
    sortProperty: 'raiting',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
