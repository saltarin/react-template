import * as actionTypes from './actionTypes';

export interface State {
  isFetching: boolean;
  error: boolean;
  errorMessage?: string;
  data?: {
    id: string;
    text: string;
  };
}

const initialState: State = {
  isFetching: false,
  error: false
}

export const user = (state = initialState, action): State => {
  switch (action.type) {
  case actionTypes.FETCH_USER_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case actionTypes.FETCH_USER_SUCCESS:
    const { data } = action;
    return {
      ...state,
      isFetching: false,
      data
    };
  case actionTypes.FETCH_USER_FAILURE:
    const { errorMessage } = action;
    return {
      ...state,
      isFetching: false,
      error: true,
      errorMessage
    };
  default:
    return state;
  }
}