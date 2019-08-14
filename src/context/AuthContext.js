import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case signup:
      return { token: action.payload, errorMessage: '' };
    default:
      return state;
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({ type: 'signup', payload: data.token });
    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const signin = dispatch => {
  return ({ email, password }) => {};
};

const signout = dispatch => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { token: null, errorMessage: '' },
);
