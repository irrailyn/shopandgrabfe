export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return {
    path: '/',
    component: require('./ui/core/App'),
    indexRoute: {
      component: require('./ui/login/Login'),
    },
    childRoutes: [
      ...require('./ui/test'),
      ...require('./ui/resetPassword/'),
      ...require('./ui/resetPassword/otp'),
      ...require('./ui/resetPassword/success'),
      ...require('./ui/resetPassword/changePassword'),
      {
        component: require('./ui/login/LoginRequired'),
        childRoutes: [{
          component: require('./ui/core/AppLayout'),
          childRoutes: [
            ...require('./ui/dashboard'),
            ...require('./ui/list'), // example usage list
            ...require('./ui/user')
          ]
        }]
      },
      ...require('./ui/registration_v2'),
      ...require('./ui/registration_v1'),
      ...require('./ui/registration_v3'),
      ...require('./ui/registration_social'),
    ],
  };
};
