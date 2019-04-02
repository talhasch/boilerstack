import { User } from 'radiks';


import {userSession} from '../blockstack-config';

export const USER_SIGNIN = '@user/SIGN-IN';
export const USER_SIGNOUT = '@user/SIGN-OUT';

const initialState = null;

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        username: action.payload
      };
    case USER_SIGNOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

/* Actions */

export const signIn = (userData) => {
  return (dispatch) => {

    const {username} = userData;

    dispatch(signInAct(username));

    User.createWithCurrentUser();
  }
};

export const signOut = () => {
  return (dispatch) => {
    userSession.signUserOut();
    dispatch(signOutAct());
  }
};

/* Action creators */

export const signInAct = (username) => ({
  type: USER_SIGNIN,
  payload: username
});

export const signOutAct = () => ({
  type: USER_SIGNOUT
});
