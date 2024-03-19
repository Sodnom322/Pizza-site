import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
      const { order, sortBy, category, search, currentPage } = params;
      const { data } = await axios.get<Pizza[]>(
        `https://657855a6f08799dc8044f459.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
      );
     
      return data 
    },
  );
  