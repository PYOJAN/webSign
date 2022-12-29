import { invisibleTab, visible, uuid } from "./helperFunctions";
import { pdfActions, defaultState } from "./constantValue";

// custom reducer
export const reducer = (state, actionTrigger) => {
  const { action, data } = actionTrigger;

  // console.log(data);

  const SCALE_RATIO = 0.02;

  // let updateData;
  switch (action) {
    case pdfActions.ZOOM_IN:
      return state.map((doc) =>
      doc.isActive ? { ...doc, scale: doc.scale + SCALE_RATIO } : doc
    );
    case pdfActions.ZOOM_OUT:
      return state.map((doc) =>
        doc.isActive ? { ...doc, scale: doc.scale - SCALE_RATIO } : doc
      );
    case pdfActions.TOTAL_PAGE:
      return totalPages(state, data);

    case pdfActions.PAGE_WIDTH:
      return state;
    case pdfActions.CURRENT_PAGE:
      return {
        ...state,
        currentPage: data.currentPage,
      };
    case pdfActions.NEW_FILE_ADD:
      const prevData = invisibleTab(state);

      return [
        ...prevData,
        {
          ...data,
          ...defaultState,
          id: uuid(),
          isActive: true,
          place: state.length + 1,
        },
      ].filter((validObj) => Object.keys(validObj).length !== 0);

    case pdfActions.CHANGE_TAB:
      // creating invisible all tabs
      const allTabs = invisibleTab(state);
      // making visible which user choose
      return visible(allTabs, data.id);

    case pdfActions.CLOSE_TAB:
      return closeTab(state, data);
    default:
      return state;
  }
};

// ?====================
function totalPages(state = [], data = {}) {
  return state.map((Obj) =>
    Obj.id === data.id ? { ...Obj, totalPages: data.totalPages } : Obj
  );
}

// ? Close clicked tab
function closeTab(state = [], data = {}) {
  const nonCloseTabs = invisibleTab(state).filter((tab) => tab.id !== data.id);

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
}
