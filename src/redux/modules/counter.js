import Immutable from 'immutable';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  count: 0
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  COUNTER_INCREMENT: 'COUNTER_INCREMENT',
  COUNTER_DECREMENT: 'COUNTER_DECREMENT',
};

/**
 * Public: Action Creators
 */

export function increment() {
  return {
    type: actionTypes.COUNTER_INCREMENT,
    incrementBy: 1,
    whammy: 'slammy',
    whoIsTheCoolest: 'Elementz!!!'
  };
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.COUNTER_INCREMENT:
      return state.set('count', state.get('count') + action.incrementBy);

    default:
      return state;
  }
}
