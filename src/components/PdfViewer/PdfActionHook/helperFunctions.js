

// creating unique id
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// setting isActive properties true to false
export const invisibleTab = (state = []) => {
  return state.map((_data) =>
    _data.isActive === true ? { ..._data, isActive: false } : _data
  );
};

// setting isActive properties false to true
export const visible = (state, ID) => {
  return state.map((_data) =>
    _data.id === ID ? { ..._data, isActive: true } : _data
  );
};