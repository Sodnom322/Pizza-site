import { RootState } from "../store";

export const selectSort = (state:RootState) =>  state.filter.sort;
export const selectCurrentPage = (state:RootState) => state.filter.currentPage;
export const selectCategoryId = (state:RootState) => state.filter.categoryId;