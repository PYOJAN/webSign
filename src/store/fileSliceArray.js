import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const fileSlice = createSlice({
  name: "fileArray",
  initialState,
  reducers: {
    // Adding new file into state if user added
    setFileDataArray(state, action) {
      const data = action.payload;
      // making all invisible pdf tab if any pdf is already there
      const prevData = invisibleTab(state);

      // creating last added tab visible and added to state
      return [
        ...prevData,
        { ...data, isActive: true, id: uuid(), place: state.length + 1 },
      ].filter((validObj) => Object.keys(validObj).length !== 0);
    },

    // ======================================
    // creating tab switch when user switch tab
    setVisible(state, action) {
      const id = action.payload.id;
      // creating invisible all tabs
      const currentVisible = invisibleTab(state);

      // making visible which user choose
      return visible(currentVisible, id);
    },

    // =======================================
    // removing chosen tab from state if user requested for close
    closeTab(state, action) {
      const id = action.payload.id;

      const nonCloseTabs = invisibleTab(state).filter((tab) => tab.id !== id);

      // if only one tab is left in state
      if (nonCloseTabs.length === 1) {
        return nonCloseTabs.map((tab) =>
          tab.isActive === false ? { ...tab, isActive: true } : tab
        );
      } else {
        // if multiple tabs are available in state
        return nonCloseTabs.map((tab, i) => {
          // getting last tab for making visible
          const biggest = nonCloseTabs.reduce((prev, cur, index, array) =>
            prev.place > cur.place ? prev.place : cur.place
          );
          // making visible last tab
          return tab.place === biggest ? { ...tab, isActive: true } : tab;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFileDataArray, setVisible, closeTab } = fileSlice.actions;

export default fileSlice.reducer;

// ============================
// Helper functions
// ============================

// creating unique id
const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// setting isActive properties true to false
const invisibleTab = (state = []) => {
  return state.map((_data) =>
    _data.isActive === true ? { ..._data, isActive: false } : _data
  );
};

// setting isActive properties false to true
const visible = (state, ID) => {
  return state.map((_data) =>
    _data.id === ID ? { ..._data, isActive: true } : _data
  );
};
