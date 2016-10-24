export const sort = {
  ASC: 'asc',
  DESC: 'desc'
};

export function isFunction(func) {
  const getType = {};

  if (func && getType.toString.call(func) === '[object Function]') {
    return true;
  }

  return false;
}

export function getListParams(state, params) {
  let { limit, offset, sortField, search } = params;
  const { filter } = params;
  const currentSortField = state.get('sortField');
  const sorts = state.get('sorts');
  const filters = state.get('filters').toJS();
  let sortOrder;
  let actionParameters = {};
  let clientGetParams = {};

  if (typeof limit === 'undefined' || limit === null) {
    limit = state.get('limit');
  }

  if (typeof offset === 'undefined' || offset === null) {
    offset = state.get('offset');
  }

  if (typeof search === 'undefined' || search === null) {
    search = state.get('search');
  } else {
    offset = 0;
  }

  if (filter && typeof filter.field !== 'undefined' && typeof filter.value !== 'undefined' && typeof filters[filter.field] !== 'undefined') {
    filters[filter.field] = filter.value;
  }

  actionParameters = {
    limit,
    offset,
    search,
    filters
  };

  clientGetParams = {
    limit,
    offset,
    /* ...Object.keys(filters).reduce((previous, current) => {
      if (filters[current] !== '') {
        previous[current] = filters[current];
      }
      return previous;
    }, {})*/
  };

  if (search !== '') {
    clientGetParams.search = search;
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

  actionParameters.sortField = sortField;
  actionParameters.sortOrder = sortOrder;
  actionParameters.filters = filters;

  return {
    clientGetParams,
    actionParameters
  };
}

export function VerifyUniqueFields(values, dispatch, props) {
  console.log('went in');
  const activeField = props.form._active;
  const forms = props.form;
  const error = {};
  const data = {};

  for ( const key in forms ) {
    if (forms.hasOwnProperty(key) && forms[key] !== undefined) {
      error[key] = forms[key].asyncError;
    }
  }

  data[activeField] = values[activeField];
  return new Promise((resolve, reject) => {
    props.asyncFunction(data)
    .then((value) => {
      if (!value.isAvailable) {
        error[activeField] = ['This ' + activeField.toLowerCase() + ' is already taken.'];
      }
      if (Object.keys(error).length !== 0 && error.constructor === Object) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
