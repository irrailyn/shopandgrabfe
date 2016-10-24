import Immutable from 'immutable';
import { routeActions } from 'react-router-redux';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  isLoggedIn: false,
  token: null,
  redirectTo: null,
  redirectOnLogin: false,
  user: {},
  err: {},
  isError: false,
  isUnauthorized: false,
  registrationStep: 1,
  registrationv3: 'company',
  socialAuth: false,
  registerRedirect: false
});

const statusValues = ['ONBOARDING1', 'ONBOARDING2', 'ACTIVE'];


/**
 * Public: Action Types
 */

export const actionTypes = {
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_COMPLETE: 'USER_LOGIN_COMPLETE',
  USER_LOGIN_UNAUTHORIZED: 'USER_LOGIN_UNAUTHORIZED',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',

  USER_LOGIN_FB: 'USER_LOGIN_FB',
  USER_LOGIN_FBLOGIN: 'USER_LOGIN_FBLOGIN',

  USER_LOGIN_SOCIALREQUEST: 'USER_LOGIN_SOCIALREQUEST',
  USER_LOGIN_SOCIALSUCCESS: 'USER_LOGIN_SOCIALSUCCESS',
  USER_LOGIN_SOCIALERROR: 'USER_LOGIN_SOCIALERROR',

  USER_FETCH_REQUEST: 'USER_FETCH_REQUEST',
  USER_FETCH_COMPLETE: 'USER_FETCH_COMPLETE',
  USER_FETCH_ERROR: 'USER_FETCH_ERROR',

  USER_CREATE_REQUEST: 'USER_CREATE_REQUEST',
  USER_CREATE_COMPLETE: 'USER_CREATE_COMPLETE',
  USER_CREATE_ERROR: 'USER_CREATE_ERROR',

  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_SOCIAL: 'USER_LOGOUT_SOCIAL',

  USER_FORCE_LOGIN: 'USER_FORCE_LOGIN',
  USER_FORCE_LOGIN_WITH_REDIRECT: 'USER_FORCE_LOGIN_WITH_REDIRECT',

  USER_CLEAR_REDIRECT: 'USER_CLEAR_REDIRECT',

  USER_SIGNUP_REDIRECT: 'USER_SIGNUP_REDIRECT',
  USER_SIGNUP_STEPBACK: 'USER_SIGNUP_STEPBACK',

  USER_SIGNUP_STEP_REQUEST: 'USER_SIGNUP_STEP_REQUEST',
  USER_SIGNUP_STEP_COMPLETE: 'USER_SIGNUP_STEP_COMPLETE',
  USER_SIGNUP_STEP_ERROR: 'USER_SIGNUP_STEP_ERROR',

  USER_SIGNUP_STEP_COMPLETE_V2FILEUPLOAD: 'USER_SIGNUP_STEP_COMPLETE_V2FILEUPLOAD',
  USER_SIGNUP_STEP_ERROR_V2FILEUPLOAD: 'USER_SIGNUP_STEP_ERROR_V2FILEUPLOAD',

  USER_SIGNUP_RESET: 'USER_SIGNUP_RESET',

  USER_SIGNUPV1_REQUEST: 'USER_SIGNUPV1_REQUEST',
  USER_SIGNUPV1_COMPLETE: 'USER_SIGNUPV1_COMPLETE',
  USER_SIGNUPV1_ERROR: 'USER_SIGNUPV1_ERROR',

  USER_SIGNUPV1AVATAR_REQUEST: 'USER_SIGNUPV1AVATAR_REQUEST',
  USER_SIGNUPV1AVATAR_COMPLETE: 'USER_SIGNUPV1AVATAR_COMPLETE',
  USER_SIGNUPV1AVATAR_ERROR: 'USER_SIGNUPV1AVATAR_ERROR',

  USER_SIGNUPV1AUTH_REQUEST: 'USER_SIGNUPV1AUTH_REQUEST',
  USER_SIGNUPV1AUTH_COMPLETE: 'USER_SIGNUPV1AUTH_COMPLETE',
  USER_SIGNUPV1AUTH_ERROR: 'USER_SIGNUPV1AUTH_ERROR',

  USER_SIGNUPV3_COMPANY: 'USER_SIGNUPV3_COMPANY',
  USER_SIGNUPV3_COMPANYSUCCESS: 'USER_SIGNUPV3_COMPANYSUCCESS',
  USER_SIGNUPV3_COMPANYERROR: 'USER_SIGNUPV3_COMPANYERROR',

  USER_SIGNUPV3_INDIVIDUAL: 'USER_SIGNUPV3_INDIVIDUAL',
  USER_SIGNUPV3_INDIVIDUALSUCCESS: 'USER_SIGNUPV3_INDIVIDUALSUCCESS',
  USER_SIGNUPV3_INDIVIDUALERROR: 'USER_SIGNUPV3_INDIVIDUALERROR',

  USER_SIGNUPV3_SWITCHCOMP: 'USER_SIGNUPV3_SWITCHCOMP',
  USER_SIGNUPV3_SWITCHINDI: 'USER_SIGNUPV3_SWITCHINDI',

  FIELD_AVAILABLE_REQUEST: 'FIELD_AVAILABLE_REQUEST',
  FIELD_AVAILABLE_COMPLETE: 'FIELD_AVAILABLE_COMPLETE',
  FIELD_AVAILABLE_ERROR: 'FIELD_AVAILABLE_ERROR'
};

/**
 * Public: Action Creators
 */

export function loginUser(userName, password) {
  console.log('userName', userName);
  console.log('password', password);
  return {
    types: [
      actionTypes.USER_LOGIN_REQUEST,
      actionTypes.USER_LOGIN_COMPLETE,
      actionTypes.USER_LOGIN_ERROR
    ],
    promise: (client) => client.post('/auth', {
      data: {
        userName,
        password
      }
    })
  };
}

export function fetchUser() {
  console.log('fetching user function');
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    console.log('fetching user function token: ', token);
    return dispatch({
      types: [
        actionTypes.USER_FETCH_REQUEST,
        actionTypes.USER_FETCH_COMPLETE,
        actionTypes.USER_FETCH_ERROR
      ],
      promise: (client) => {
        return client.get(`/users/me`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': token
          }
        });
      }
    });
  };
}

export function getTokenAfterRegistrationAvatar(userName, password) {
  return {
    types: [
      actionTypes.USER_SIGNUPV1AUTH_REQUEST,
      actionTypes.USER_SIGNUPV1AUTH_COMPLETE,
      actionTypes.USER_SIGNUPV1AUTH_ERROR
    ],
    promise: (client) => client.post('/auth', {
      data: {
        userName,
        password
      }
    })
  };
}

export function registerUserV1(formData) {
  console.log('registerUserV1 data: ', formData);
  return (dispatch) => {
    return dispatch({
      types: [
        actionTypes.USER_SIGNUPV1_REQUEST,
        actionTypes.USER_SIGNUPV1_COMPLETE,
        actionTypes.USER_SIGNUPV1_ERROR
      ],
      promise: (client) => client.post('/users', {
        headers: {
          'Accept': 'multipart/form-data',
        },
        data: formData
      }).then(() => {
        return dispatch(getTokenAfterRegistrationAvatar(formData.userName, formData.password));
      })
    });
  };
}


export function registerUserV1Avatar(formData) {
  console.log('registerUserV1Avatar image: ', formData);
  return (dispatch, getState) => {
    const { auth } = getState();
    const token = auth.get('token');
    return dispatch({
      types: [
        actionTypes.USER_SIGNUPV1AVATAR_REQUEST,
        actionTypes.USER_SIGNUPV1AVATAR_COMPLETE,
        actionTypes.USER_SIGNUPV1AVATAR_ERROR
      ],
      promise: (client) => client.put('/users/me/avatar', {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryrbKcQ2iqGM4mBD9p'
          // 'content-disposition': 'form-data; name="' + formData.type + '"; filename="' + formData.name + '"'
        },
        params: {
          'resizeHeight': 100,
          'resizeWidth': 100,
          'cropLeft': 10,
          'cropTop': 10,
          'cropWidth': 10,
          'cropHeight': 10
        },
        data: {
          'avatarImageFile': formData
        }
      })
    });
  };
}

export function fileImageUpload(fileData, token) {
  console.log('fileImageUpload', fileData);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const imageFormData = new FormData();
      const xhr = new XMLHttpRequest();
      imageFormData.append('avatarImageFile', fileData);
      imageFormData.append('resizeHeight', 10);
      imageFormData.append('resizeWidth', 10);
      imageFormData.append('cropLeft', 1);
      imageFormData.append('cropTop', 1);
      imageFormData.append('cropHeight', 1);
      imageFormData.append('cropWidth', 1);
      xhr.open('put', 'http://genesis-cdb6a456.f71a5e36.svc.dockerapp.io:8069/users/me/avatar');
      xhr.setRequestHeader('authorization', token);
      xhr.onload = () => {
        const arraybuffer = xhr.response;
        if ( arraybuffer.avatarImageUrl !== null || arraybuffer.avatarImageUrl !== undefined) {
          dispatch({
            type: actionTypes.USER_SIGNUPV1AVATAR_COMPLETE,
            arraybuffer,
            token
          });
          console.log('resolve', resolve);
        } else {
          dispatch({ type: actionTypes.USER_SIGNUPV1AVATAR_ERROR });
          console.log('reject', reject);
        }
      };
      xhr.send(imageFormData);
      console.log('imageFormData', imageFormData);
    });
  };
}

export function fileImageUploadV2(fileData) {
  console.log('i am fileImageUpload v2', fileData);
  return (dispatch, getState) => {
    const auth = getState().auth;
    const token = auth.get('token');
    return new Promise((resolve, reject) => {
      const imageFormData = new FormData();
      const xhr = new XMLHttpRequest();
      imageFormData.append('avatarImageFile', fileData);
      imageFormData.append('resizeHeight', 10);
      imageFormData.append('resizeWidth', 10);
      imageFormData.append('cropLeft', 1);
      imageFormData.append('cropTop', 1);
      imageFormData.append('cropHeight', 1);
      imageFormData.append('cropWidth', 1);
      xhr.open('put', 'http://genesis-cdb6a456.f71a5e36.svc.dockerapp.io:8069/users/me/avatar');
      xhr.setRequestHeader('authorization', token);
      xhr.onload = () => {
        const arraybuffer = xhr.response;
        if ( arraybuffer.avatarImageUrl !== null || arraybuffer.avatarImageUrl !== undefined) {
          dispatch({
            type: actionTypes.USER_SIGNUP_STEP_COMPLETE_V2FILEUPLOAD,
            arraybuffer,
            token
          });
          console.log('resolve', resolve);
        } else {
          dispatch({ type: actionTypes.USER_SIGNUP_STEP_ERROR_V2FILEUPLOAD });
          console.log('reject', reject);
        }
      };
      xhr.send(imageFormData);
      console.log('imageFormData', imageFormData);
    });
  };
}

export function registerRedirectLogin() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_CLEAR_REDIRECT,
    });

    return dispatch(routeActions.replace({ pathname: '/' }));
  };
}

export function registerCompany(formData) {
  console.log('registerCompany formData:', formData);
  return (dispatch) => {
    return dispatch({
      types: [
        actionTypes.USER_SIGNUPV3_COMPANY,
        actionTypes.USER_SIGNUPV3_COMPANYSUCCESS,
        actionTypes.USER_SIGNUPV3_COMPANYERROR
      ],
      promise: (client) => client.post('/users', {
        data: formData
      }).then(() => {
        return dispatch(getTokenAfterRegistrationAvatar(formData.userName, formData.password));
      })
    });
  };
}

export function registerIndividual(formData) {
  console.log('registerIndividual formData:', formData);
  return (dispatch) => {
    return dispatch({
      types: [
        actionTypes.USER_SIGNUPV3_INDIVIDUAL,
        actionTypes.USER_SIGNUPV3_INDIVIDUALSUCCESS,
        actionTypes.USER_SIGNUPV3_INDIVIDUALERROR
      ],
      promise: (client) => client.post('/users', {
        data: formData
      }).then(() => {
        return dispatch(getTokenAfterRegistrationAvatar(formData.userName, formData.password));
      })
    });
  };
}

export function switchCompany() {
  return {
    type: actionTypes.USER_SIGNUPV3_SWITCHCOMP
  };
}

export function switchIndividual() {
  return {
    type: actionTypes.USER_SIGNUPV3_SWITCHINDI
  };
}

export function resetRegisterSteps() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_SIGNUP_RESET,
    });

    return dispatch(routeActions.replace({ pathname: '/register' }));
  };
}

export function registerUserStep1(formData) {
  formData.status = 'ONBOARDING1';
  return (dispatch) => {
    return dispatch({
      types: [
        actionTypes.USER_SIGNUP_STEP_REQUEST,
        actionTypes.USER_SIGNUP_STEP_COMPLETE,
        actionTypes.USER_SIGNUP_STEP_ERROR
      ],
      promise: (client) => client.post('/users', {
        data: formData
      }).then(() => {
        dispatch(loginUser(formData.userName, formData.password));
      })
    });
  };
}

export function registerUserStepOthers(formData) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    const token = auth.get('token');
    const step = auth.get('registrationStep') - 1;
    const status = auth.get('user').get('status');

    if ((statusValues.indexOf(status)) < step) {
      formData.status = statusValues[step];
    } else {
      formData.status = status;
    }
    return dispatch({
      types: [
        actionTypes.USER_SIGNUP_STEP_REQUEST,
        actionTypes.USER_SIGNUP_STEP_COMPLETE,
        actionTypes.USER_SIGNUP_STEP_ERROR
      ],
      promise: (client) => {
        return client.put(`/users/me`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': token
          },
          data: formData
        }).then(() => {
          console.log('fetching user');
          dispatch(fetchUser());
        });
      }
    });
  };
}

export function stepBack() {
  return {
    type: actionTypes.USER_SIGNUP_STEPBACK
  };
}

export function logoutUsersocial() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_LOGOUT_SOCIAL
    });
    window.FB.logout();
  };
}

export function logoutUser() {
  // window.FB.logout(function mess(response) {
  //   console.log('response:', response);
  // });

  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_LOGOUT
    });
  };
}

export function isUserLoaded(globalState) {
  return globalState.auth && globalState.auth.get('user').size === 0;
}

export function forceLogin() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_FORCE_LOGIN,
    });

    return dispatch(routeActions.replace({ pathname: '/' }));
  };
}

export function fbLoginUser(response) {
  console.log('response', response);
  return (dispatch, getState) => {
    const { auth } = getState();
    if ( auth.get('user').get('status') === undefined && response.status === 'status' ) {
      dispatch({
        type: actionTypes.USER_CLEAR_REDIRECT
      });
      return dispatch(routeActions.replace({ pathname: '/' }));
    } else if ( response.status === undefined ) {
      dispatch({
        types: [
          actionTypes.USER_LOGIN_SOCIALREQUEST,
          actionTypes.USER_LOGIN_SOCIALSUCCESS,
          actionTypes.USER_LOGIN_SOCIALERROR
        ],
        promise: (client) => {
          return client.post(`/users/facebook/register`, {
            headers: {
              'Accept': 'application/json',
            },
            data: {
              'firstName': response.first_name,
              'lastName': response.last_name,
              'email': response.email,
              'facebookId': response.userID,
              'status': 'ACTIVE'
            }
          });
        }
      });
      // return dispatch(routeActions.replace({ pathname: '/dashboard' }));
    }
  };
}

export function forceLoginWithRedirect(pathname, query) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_FORCE_LOGIN_WITH_REDIRECT,
      pathname,
      query
    });

    return dispatch(routeActions.replace({ pathname: '/' }));
  };
}

export function redirectToRegistration() {
  return (dispatch, getState) => {
    const { auth } = getState();
    const status = auth.get('user').get('status');

    if (status === 'ONBOARDING1') {
      dispatch({
        type: actionTypes.USER_SIGNUP_REDIRECT,
        step: 2
      });
    } else if (status === 'ONBOARDING2') {
      dispatch({
        type: actionTypes.USER_SIGNUP_REDIRECT,
        step: 3
      });
    }

    return dispatch(routeActions.replace({ pathname: '/register_v2' }));
  };
}

export function redirectLoggedInUser() {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (auth.get('redirectOnLogin')) {
      const redirect = auth.get('redirect');
      dispatch({
        type: actionTypes.USER_CLEAR_REDIRECT
      });

      return dispatch(
        routeActions.replace({
          pathname: redirect.get('pathname'),
          query: redirect.get('query').toJS()
        })
      );
    }

    return dispatch(
      routeActions.replace({
        pathname: '/dashboard'
      })
    );
  };
}

export function verifyUserMail(data) {
  console.log('asyncFieldTest data: ', data);
  return (dispatch) => {
    return dispatch({
      types: [
        actionTypes.FIELD_AVAILABLE_REQUEST,
        actionTypes.FIELD_AVAILABLE_COMPLETE,
        actionTypes.FIELD_AVAILABLE_ERROR
      ],
      promise: (client) => client.get('/users/verify', {
        params: {
          ...data
        }
      })
    });
  };
}
/**
 * Public: Reducer
 */

export default (cookie) => {
  const cookiedInitialState = initialState.merge({
    token: cookie.get('token'),
    isLoggedIn: (cookie.get('token')) ? true : false
  });

  return function reducer(state = cookiedInitialState, action = {}) {
    switch (action.type) {
      case actionTypes.USER_SIGNUPV1_REQUEST:
        return state.merge({
          // registerRedirect: false
          isError: false
        });

      case actionTypes.USER_SIGNUPV1_COMPLETE:
        return state.merge({
          // registerRedirect: true,
          isError: false
        });

      case actionTypes.USER_SIGNUPV1_ERROR:
        return state.merge({
          // registerRedirect: false,
          err: action.error,
          isError: true
        });

      case actionTypes.USER_SIGNUPV1AUTH_REQUEST:
        return state.merge({
          registerRedirect: false
        });

      case actionTypes.USER_SIGNUPV1AUTH_COMPLETE:
        // const { result } = action;
        cookie.set('token', action.result.token, { path: '/', maxage: 1000 * 60 * 60 * 24 });
        return state.merge({
          user: action.result,
          token: action.result.token
        });

      case actionTypes.USER_SIGNUPV1AUTH_ERROR:
        return state.merge({
          err: action.error,
          isError: true
        });

      case actionTypes.USER_SIGNUPV1AVATAR_REQUEST:
        console.log('USER_SIGNUPV1AVATAR_REQUEST');
        return state.merge({
          registerRedirect: false
        });

      case actionTypes.USER_SIGNUPV1AVATAR_COMPLETE:
        console.log('USER_SIGNUPV1AVATAR_COMPLETE');
        return state.merge({
          registerRedirect: true,
          user: {},
          token: {},
          isError: false,
          isLoggedIn: false
        });

      case actionTypes.USER_SIGNUPV1AVATAR_ERROR:
        console.log('USER_SIGNUPV1AVATAR_ERROR');
        return state.merge({
          registerRedirect: false,
          err: action,
          isError: true,
          user: {},
          token: {}
        });

      case actionTypes.USER_LOGIN_COMPLETE:
        const { result } = action;
        cookie.set('token', result.token, { path: '/', maxage: 1000 * 60 * 60 * 24 });
        return state.merge({
          user: action.result,
          token: action.result.token,
          isLoggedIn: true,
          err: {},
          isError: false,
          isUnauthorized: false
        });

      case actionTypes.USER_LOGIN_UNAUTHORIZED:
        cookie.remove('token', { path: '/' });
        return state.merge({
          user: {},
          token: null,
          isLoggedIn: false,
          err: action.error || {},
          isError: false,
          isUnauthorized: true,
          redirectOnLogin: false,
          redirect: undefined
        });

      case actionTypes.USER_LOGIN_ERROR:
        cookie.remove('token', { path: '/' });
        return state.merge({
          user: {},
          token: null,
          isLoggedIn: false,
          err: action.error || {},
          isError: true,
          isUnauthorized: false,
          redirectOnLogin: false,
          redirect: undefined
        });

      case actionTypes.USER_FETCH_COMPLETE:
        console.log('fetching complete');
        return state.merge({
          user: action.result,
          registrationStep: statusValues.indexOf(action.result.status) + 2
        });

      case actionTypes.USER_FETCH_ERROR:
      case actionTypes.USER_LOGOUT:
        cookie.remove('token', { path: '/' });
        return state.merge({
          isLoggedIn: false,
          user: {},
          token: null,
          err: {},
          socialAuth: false
        });

      case actionTypes.USER_LOGOUT_SOCIAL:
        cookie.remove('token', { path: '/' });
        return state.merge({
          isLoggedIn: false,
          user: {},
          token: null,
          err: {},
          socialAuth: false
        });

      case actionTypes.USER_FORCE_LOGIN:
        cookie.remove('token', { path: '/' });
        return state.merge({
          user: {},
          err: {},
          token: null,
          isLoggedIn: false,
          isError: false,
          isUnauthorized: false,
          redirectOnLogin: false,
          redirect: undefined,
          socialAuth: false
        });

      case actionTypes.USER_FORCE_LOGIN_WITH_REDIRECT:
        cookie.remove('token', { path: '/' });
        return state.merge({
          user: {},
          err: {},
          isError: false,
          token: null,
          isLoggedIn: false,
          isUnauthorized: false,
          redirectOnLogin: true,
          redirect: {
            pathname: action.pathname,
            query: action.query
          }
        });

      case actionTypes.USER_CLEAR_REDIRECT:
        return state.merge({
          redirectOnLogin: false,
          redirect: undefined
        });

      case actionTypes.USER_SIGNUP_STEPBACK:
        return state.merge({
          registrationStep: state.get('registrationStep') - 1
        });

      case actionTypes.USER_SIGNUP_STEP_COMPLETE_V2FILEUPLOAD:
        console.log('USER_SIGNUP_STEP_COMPLETE_V2FILEUPLOAD', action);
        return state.merge({
          err: {},
          isError: false,
          user: JSON.parse(action.arraybuffer)
        });

      case actionTypes.USER_SIGNUP_STEP_ERROR_V2FILEUPLOAD:
        console.log('signup step error', action.error);
        return state.merge({
          err: action.error || {},
          isError: false
        });

      case actionTypes.USER_SIGNUP_STEP_COMPLETE:
        console.log('USER_SIGNUP_STEP_COMPLETE');
        return state.merge({
          err: {},
          isError: false,
          registrationStep: state.get('registrationStep') + 1
        });

      case actionTypes.USER_SIGNUP_STEP_ERROR:
        console.log('signup step error', action.error);
        return state.merge({
          err: action.error || {},
          isError: true
        });

      case actionTypes.USER_SIGNUP_REDIRECT:
        return state.merge({
          registrationStep: action.step
        });

      case actionTypes.USER_SIGNUPV3_COMPANY:
        return state.merge({
          registrationv3: 'company',
          registerRedirect: false
        });

      case actionTypes.USER_SIGNUPV3_COMPANYSUCCESS:
        return state.merge({
          registrationv3: 'company',
          registerRedirect: true,
          isError: false
        });

      case actionTypes.USER_SIGNUPV3_COMPANYERROR:
        return state.merge({
          registrationv3: 'company',
          registerRedirect: false,
          err: action.error || {},
          isError: true
        });

      case actionTypes.USER_SIGNUPV3_INDIVIDUAL:
        return state.merge({
          registrationv3: 'individual',
          registerRedirect: false,
          isError: false
        });

      case actionTypes.USER_SIGNUPV3_INDIVIDUALSUCCESS:
        return state.merge({
          registrationv3: 'individual',
          registerRedirect: true,
          isError: false
        });

      case actionTypes.USER_SIGNUPV3_INDIVIDUALERROR:
        return state.merge({
          registrationv3: 'individual',
          registerRedirect: false,
          err: action.error || {},
          isError: true
        });

      case actionTypes.USER_SIGNUPV3_SWITCHCOMP:
        return state.merge({
          registrationv3: 'company',
          err: {},
          isError: false
        });

      case actionTypes.USER_SIGNUPV3_SWITCHINDI:
        return state.merge({
          registrationv3: 'individual',
          err: {},
          isError: false
        });

      case actionTypes.USER_LOGIN_FB:
        cookie.remove('token', { path: '/' });
        return state.merge({
          isLoggedIn: false,
          user: {},
          token: null,
          err: action.error,
          socialAuth: false
        });

      case actionTypes.USER_LOGIN_FBLOGIN:
        return state.merge({
          isLoggedIn: true,
          user: action.response,
          token: action.response.accessToken,
          isUnauthorized: false,
          socialAuth: true
        });

      case actionTypes.USER_LOGIN_SOCIALREQUEST:
        return state.merge({
          isLoggedIn: false,
          user: action,
          isUnauthorized: false,
          socialAuth: true,
          registerRedirect: false,
          err: {}
        });

      case actionTypes.USER_LOGIN_SOCIALSUCCESS:
        cookie.set('token', action.result.token, { path: '/', maxage: 1000 * 60 * 60 * 24 });
        return state.merge({
          user: action.result,
          token: action.result.token,
          isLoggedIn: true,
          err: {},
          isError: false,
          isUnauthorized: false,
          socialAuth: true,
          registerRedirect: true
        });

      case actionTypes.USER_LOGIN_SOCIALERROR:
        return state.merge({
          user: {},
          token: {},
          socialAuth: false,
          err: action.error || {},
          isError: true,
        });

      case actionTypes.USER_SIGNUP_RESET:
        return state.merge({
          registrationStep: 1
        });

      default:
        return state;
    }
  };
};
