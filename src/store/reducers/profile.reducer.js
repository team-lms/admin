import { SET_PROFILE } from '../actions/profile';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        ...payload
      };
    default: {
      return {
        ...state
      };
    }
  }
};
