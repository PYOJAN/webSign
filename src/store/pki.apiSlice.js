import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domain: "127.0.0.1",
  port: 1620,
};

export const pkiApiSlice = createSlice({
  name: "pkiApi",
  initialState,
  reducers: {
    setValue(state, action) {
      const { searchKey, value } = action.payload;
      return {
        ...state,
        [searchKey]: value,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = pkiApiSlice.actions;

export default pkiApiSlice.reducer;
