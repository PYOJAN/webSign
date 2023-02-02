export const pdfActions = {
  // Scale control of document
  ZOOM_IN: "ZOOM_IN",
  ZOOM_OUT: "ZOOM_OUT",
  // Current viewer page
  CURRENT_PAGE: "CURRENT_PAGE",
  TOTAL_PAGE: "TOTAL_PAGE",
  PAGE_WIDTH: "PAGE_WIDTH",

  // Rotation control of document
  ROTATE_CLOCKWISE: "ROTATE_CLOCKWISE",
  ROTATE_ANTI_CLOCKWISE: "ROTATE_ANTI_CLOCKWISE",

  NEW_FILE_ADD: "NEW_FILE_ADD",

  // Tabs
  CHANGE_TAB: "CHANGE_TAB",
  CLOSE_TAB: "CLOSE_TAB",
};

export const defaultState = {
  scale: 1,
  totalPages: 1,
  rotation: 0,
  currentPage: 1,
  pageWidth: 700,
};
