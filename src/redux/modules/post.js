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
    age: '10',
    qwerty: 'asdfgh'
  }
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  POST_LIST_FETCH_REQUEST: 'POST_LIST_FETCH_REQUEST',
  POST_LIST_FETCH_COMPLETE: 'POST_LIST_FETCH_COMPLETE',
  POST_LIST_FETCH_ERROR: 'POST_LIST_FETCH_ERROR'
};

/**
 * Public: Action Creators
 */

export function fetchPostList(params) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    const post = getState().post;
    /* const currentSortField = post.get('sortField');
    const sorts = post.get('sorts');
    const filters = post.get('filters').toJS;
    let sortOrder;
    let parameters = {};
    let clientGetParams = {};

    if (typeof limit === 'undefined' || limit === null) {
      limit = post.get('limit');
    }

    if (typeof offset === 'undefined' || offset === null) {
      offset = post.get('offset');
    }

    if (typeof search === 'undefined' || search === null) {
      search = post.get('search');
    } else {
      offset = 0;
    }

    parameters = {
      limit,
      offset,
      search
    };

    clientGetParams = {
      limit,
      offset
    };

    if (search !== '') {
      clientGetParams.search = search;
    }

    if(filter && typeof filter.field !== 'undefined' && typeof filter.field !== 'undefined') {

    }

    if (sortField) {
      sortOrder = sorts.get(sortField);

      if (sortField === currentSortField) {
        sortOrder = (sortOrder === sort.ASC) ? sort.DESC : sort.ASC;
      }
    } else {
      sortField = currentSortField;
      sortOrder = sorts.get(sortField);
    }

    parameters.sortField = sortField;
    parameters.sortOrder = sortOrder;*/

    const { clientGetParams, actionParameters } = getListParams(post, params);

    return dispatch({
      types: [
        actionTypes.POST_LIST_FETCH_REQUEST,
        actionTypes.POST_LIST_FETCH_COMPLETE,
        actionTypes.POST_LIST_FETCH_ERROR
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

    case actionTypes.POST_LIST_FETCH_COMPLETE:
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

    case actionTypes.POST_LIST_FETCH_ERROR:
      return state.merge({
        data: [],
        count: 0,
        isError: true,
      });

    default:
      return state;
  }
}
