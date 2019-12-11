import * as actionTypes from './actionTypes';
import { UserService } from '@app/src/services';

export const fetchUserRequest = () => ({
  type: actionTypes.FETCH_USER_REQUEST
});

export const fetchUserSuccess = data => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  data
});

export const fetchUserFailure = errorMessage => ({
  type: actionTypes.FETCH_USER_FAILURE,
  errorMessage
})

export const fetchUser = (user,pwd) => {
  return async dispatch => {
    dispatch(fetchUserRequest());
    try {
      const data = await UserService.get(user, pwd);
      dispatch(fetchUserSuccess(data));
    } catch (e) {
      dispatch(fetchUserFailure(e.message));
    }
  }
}