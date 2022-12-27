import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: true,
  ltv: false,
  timestamp: false,
  customText: {
    location: "",
    reason: "",
    custom: "",
  },
};

export const signatureSlice = createSlice({
  name: "signature",
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
    setCustomText(state, action) {
      const { searchKey, value } = action.payload;
      const { customText } = state;

      if (searchKey) {
        return {
          ...state,
          customText: {
            ...customText,
            [searchKey]: value,
          },
        };
      } else {
        return state;
      }
    },
    reset(state, action) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle, setCustomText, reset } = signatureSlice.actions;

export default signatureSlice.reducer;
