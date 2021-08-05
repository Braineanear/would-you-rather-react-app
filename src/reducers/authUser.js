import { SET_AUTH_USER } from '../actions/authUser';

const authUser = (state = null, action) => {
  if (action.type === SET_AUTH_USER) {
    return action.id;
  }
  return state;
};

export default authUser;
