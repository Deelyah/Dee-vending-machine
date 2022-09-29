let initialState = {
  register: {},
  login: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state, register: action.payload };

    case "LOGIN":
      state.login = action.payload;
      return { ...state, login: action.payload };

    default:
      return state;
  }
};
export default reducers;
