import Immutable from 'immutable';
import { routeActions } from 'react-router-redux';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  action: null,
  response: {},
  err: {},
  isError: false,
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  ACTION_CREATE_COMPLETE: 'ACTION_CREATE_COMPLETE',

  SENDLINK_CREATE_REQUEST: 'SENDLINK_CREATE_REQUEST',
  SENDLINK_CREATE_COMPLETE: 'SENDLINK_CREATE_COMPLETE',
  SENDLINK_CREATE_ERROR: 'SENDLINK_CREATE_ERROR',

  SENDOTP_CREATE_REQUEST: 'SENDOTP_CREATE_REQUEST',
  SENDOTP_CREATE_COMPLETE: 'SENDOTP_CREATE_COMPLETE',
  SENDOTP_CREATE_ERROR: 'SENDOTP_CREATE_ERROR',

  INPUT_OTP_REDIRECT: 'INPUT_OTP_REDIRECT',
  RESET_REDIRECT_SUCCESS: 'RESET_REDIRECT_SUCCESS',
  OTPRESET_REDIRECT_SUCCESS: 'OTPRESET_REDIRECT_SUCCESS',

  PASSWORD_CHANGE_REQUEST: 'PASSWORD_CHANGE_REQUEST',
  PASSWORD_CHANGE_COMPLETE: 'PASSWORD_CHANGE_COMPLETE',
  PASSWORD_CHANGE_ERROR: 'PASSWORD_CHANGE_ERROR',

  OTP_VERIFY_REQUEST: 'OTP_VERIFY_REQUEST',
  OTP_VERIFY_COMPLETE: 'OTP_VERIFY_COMPLETE',
  OTP_VERIFY_ERROR: 'OTP_VERIFY_ERROR'
};

/**
 * Public: Action Creators
 */

export function setAction(option) {
  return (dispatch) => {
    dispatch({
      option,
      type: actionTypes.ACTION_CREATE_COMPLETE,
    });
  };
}

export function sendResetLink(email) {
  return {
    types: [
      actionTypes.SENDLINK_CREATE_REQUEST,
      actionTypes.SENDLINK_CREATE_COMPLETE,
      actionTypes.SENDLINK_CREATE_ERROR
    ],
    promise: (client) => client.post('/auth/resetpassword', {
      data: {
        email
      },
    })
  };
}

export function sendOTP(formData) {
  return {
    formData,
    types: [
      actionTypes.SENDOTP_CREATE_REQUEST,
      actionTypes.SENDOTP_CREATE_COMPLETE,
      actionTypes.SENDOTP_CREATE_ERROR
    ],
    promise: (client) => client.post('/auth/otp', {
      data: {
        email: formData.email,
        phoneNumber: formData.phoneNumber
      },
    })
  };
}

// export function answerSecurityQuestions(questions) {
//   return {
//     types: [
//       actionTypes.POST_CREATE_REQUEST,
//       actionTypes.POST_CREATE_COMPLETE,
//       actionTypes.POST_CREATE_ERROR
//     ],
//     promise: (client) => client.post('/posts', {
//       data: {
//         questions
//       },
//     })
//   };
// }

export function redirectToSuccessPage(token) {
  return (dispatch, getState) => {
    const { resetPassword } = getState();
    const redirect = resetPassword.get('redirect');

    if (redirect) {
      dispatch({
        token,
        type: actionTypes.RESET_REDIRECT_SUCCESS
      });

      return dispatch(
        routeActions.replace({
          pathname: redirect.get('pathname'),
          query: redirect.get('query').toJS()
        })
      );
    }
  };
}

export function redirectToChangePasswordPage(token) {
  return (dispatch, getState) => {
    const { resetPassword } = getState();
    const redirect = resetPassword.get('redirect');

    if (redirect) {
      dispatch({
        token,
        type: actionTypes.OTPRESET_REDIRECT_SUCCESS
      });

      return dispatch(
        routeActions.replace({
          pathname: redirect.get('pathname'),
          query: redirect.get('query').toJS()
        })
      );
    }
  };
}

export function redirectToOTPVerification(formData) {
  return (dispatch, getState) => {
    const { resetPassword } = getState();
    if (resetPassword.get('action')) {
      dispatch({
        formData,
        type: actionTypes.INPUT_OTP_REDIRECT
      });

      return dispatch(
        routeActions.replace({
          pathname: '/resetPassword/otp'
        })
      );
    }
  };
}

export function changePassword(password, token) {
  return {
    types: [
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_CHANGE_COMPLETE,
      actionTypes.PASSWORD_CHANGE_ERROR
    ],
    promise: (client) => client.put('/auth/resetpassword', {
      headers: {
        'Accept': 'application/json',
        'Authorization': token
      },
      data: {
        password
      }
    })
  };
}

export function verifyOTP(formData) {
  return {
    formData,
    types: [
      actionTypes.OTP_VERIFY_REQUEST,
      actionTypes.OTP_VERIFY_COMPLETE,
      actionTypes.OTP_VERIFY_ERROR
    ],
    promise: (client) => client.post('/auth/otp/verify/' + formData.code, {
      data: {
        email: formData.email,
        phoneNumber: formData.phoneNumber
      }
    })
  };
}

/**
* Public: Reducer
*/

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.ACTION_CREATE_COMPLETE:
      const { option } = action;
      return state.merge({
        response: {},
        option,
        err: {},
        isError: false,
      });

    case actionTypes.SENDLINK_CREATE_COMPLETE:
      const { result } = action;
      return state.merge({
        action: 'email',
        response: result,
        err: {},
        isError: false,
        redirect: {
          pathname: '/resetPassword/success',
          query: {
            option: 'email'
          }
        }
      });

    case actionTypes.SENDLINK_CREATE_ERROR:
      return state.merge({
        response: {},
        err: action.err,
        isError: true,
        redirect: undefined
      });

    case actionTypes.SENDOTP_CREATE_COMPLETE:
      return state.merge({
        action: 'otp',
        response: action.formData,
        err: {},
        isError: false,
        redirect: undefined
      });

    case actionTypes.SENDOTP_CREATE_ERROR:
      return state.merge({
        response: {},
        err: action.err,
        isError: true,
        redirect: undefined
      });

    case actionTypes.INPUT_OTP_REDIRECT:
      return state.merge({
        action: null,
        response: action.formData,
        err: {},
        isError: false,
        redirect: undefined
      });

    case actionTypes.RESET_REDIRECT_SUCCESS:
      return state.merge({
        action: null,
        response: action,
        err: {},
        isError: false,
        redirect: undefined
      });

    case actionTypes.OTPRESET_REDIRECT_SUCCESS:
      return state.merge({
        action: null,
        response: action,
        err: {},
        isError: false,
        redirect: undefined
      });

    case actionTypes.PASSWORD_CHANGE_COMPLETE:
      return state.merge({
        response: result,
        err: {},
        isError: false,
        redirect: {
          pathname: '/resetPassword/success',
          query: {
            option: undefined
          }
        }
      });

    case actionTypes.PASSWORD_CHANGE_ERROR:
      return state.merge({
        response: {},
        err: action.error,
        isError: true,
        isUnauthorized: true
      });

    case actionTypes.OTP_VERIFY_COMPLETE:
      return state.merge({
        response: action,
        err: {},
        isError: false,
        isUnauthorized: false,
        redirect: {
          pathname: '/changePassword',
          query: {
            option: undefined
          }
        }
      });

    case actionTypes.OTP_VERIFY_ERROR:
      return state.merge({
        response: {},
        err: action.error,
        isError: true,
        isUnauthorized: true
      });

    default:
      return state;
  }
}
