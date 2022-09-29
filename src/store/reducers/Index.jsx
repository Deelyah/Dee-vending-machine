let initialState = {
  login: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      state.login = action.payload;
      return state;

    default:
      return state;
  }
};
export default reducers;
