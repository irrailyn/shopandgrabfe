import Immutable from 'immutable';
import { getListParams, sort } from '../../helpers/App';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  data: [],
  count: 0,
  limit: 5,
  offset: 0,
  isError: false,
  isInit: false,
  sorts: {
    title: sort.ASC,
    UserId: sort.ASC
  },
  sortField: 'title',
  search: '',
  filters: {
    gender: '',
    marital_status: ''
  }
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  SAMPLE_LIST_FETCH_REQUEST: 'SAMPLE_LIST_FETCH_REQUEST',
  SAMPLE_LIST_FETCH_COMPLETE: 'SAMPLE_LIST_FETCH_COMPLETE',
  SAMPLE_LIST_FETCH_ERROR: 'SAMPLE_LIST_FETCH_ERROR'
};

/**
 * Public: Action Creators
 */

export function fetchSampleList(params) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    const sampleList = getState().sampleList;
    const { clientGetParams, actionParameters } = getListParams(sampleList, params);

    return dispatch({
      types: [
        actionTypes.SAMPLE_LIST_FETCH_REQUEST,
        actionTypes.SAMPLE_LIST_FETCH_COMPLETE,
        actionTypes.SAMPLE_LIST_FETCH_ERROR
      ],
      ...actionParameters,
      promise: (client) => {
        return client.get('/posts', {
          headers: {
            'Accept': 'application/json',
            'Authorization': token
          },
          params: {
            ...clientGetParams
          }
        });
      }
    });
  };
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.SAMPLE_LIST_FETCH_COMPLETE:
      const { result, limit, offset, sortField, sortOrder, search, filters } = action;
      const sorts = state.get('sorts').toJS();
      sorts[sortField] = sortOrder;

      return state.merge({
        data: result.rows,
        count: result.count,
        limit,
        offset,
        sortField,
        sorts,
        search,
        filters,
        isError: false,
        isInit: true
      });

    case actionTypes.SAMPLE_LIST_FETCH_ERROR:
      return state.merge({
        data: [],
        count: 0,
        isError: true,
      });

    default:
      return state;
  }
}
