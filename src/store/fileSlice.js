import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const fileSlice = createSlice({
  name: "fileStore",
  initialState,
  reducers: {
    setFileData(state, action) {
      const data = action.payload;
      return {...data}
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFileData } = fileSlice.actions;

export default fileSlice.reducer;
