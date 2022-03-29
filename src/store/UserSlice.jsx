import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Here is the asyncthunk funtion which will handel the Api call and provide the extrareducres to handle the various possible responses.
export const fetchAsyncUser = createAsyncThunk(
  "newUser/fetchAsyncUser",
  async (currentPage) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${currentPage}`
    );
    // console.log(currentPage,response.data);w
    return response.data;
  }
);

const userSlice = createSlice({
  name: "newUser",
  initialState: {
    newUser: [],
    reqStatus: "",
    currentPage: 1,
    totalPage: 2,
  },
  reducers: {
    setPageNumber(state, action) {
      state.currentPage = action.payload;
    },
  },
  // Here are the implementation of the extra reducres to handle the various type of responses for the api call

  extraReducers: {
    [fetchAsyncUser.pending]: (state) => {
      state.reqStatus = "loading";
    },
    [fetchAsyncUser.fulfilled]: (state, { payload }) => {
      state.reqStatus = "successfull";
      state.newUser = payload.data;
      state.currentPage = payload.page;
      state.totalPage = payload.total_pages;
    },
    [fetchAsyncUser.rejected]: (state) => {
      state.reqStatus = "failed";
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
