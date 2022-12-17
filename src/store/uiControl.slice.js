import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSettingActive: false
};

export const uiControlSlice = createSlice({
  name: "uiControl",
  initialState,
  reducers: {
    toggle(state, action) {
      const { toggleKey } = action.payload;
      if (toggleKey)
        return {
          ...state,
          [toggleKey]: !state[toggleKey],
        };
      else return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = uiControlSlice.actions;

export default uiControlSlice.reducer;
