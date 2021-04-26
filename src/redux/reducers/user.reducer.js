const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: '',
  },
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'LOGIN_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'LOGIN_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_USER_INFO_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_USER_INFO_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    case 'REGISTER_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        }
      }
    }

    case 'REGISTER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          data: data,
        }
      }
    }

    case 'REGISTER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        }
      }
    }

    default: {
      return state;
    }
  }
}
