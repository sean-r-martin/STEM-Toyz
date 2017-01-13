import axios from 'axios';
import store from '../store';

const initialState = {
  selectUser: {}
}

const SELECT_USER = 'SELECT_USER';

export const fetchUser = userId => {
  return function(dispatch) {
    axios.get(`/api/users/${userId}`)
    .then(user => store.dispatch(setUser(user.data)));
  }
}

export const setUser = user => {
  return {
    type: SELECT_USER,
    user
  }
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case SELECT_USER:
      newState.selectUser = action.user;
      break;
  }

  return newState;
}

export default reducer;
