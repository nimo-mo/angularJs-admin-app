export default appRouterConfig

/* @ngInject */
function appRouterConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    .state('app',{
      url: '/app',
      title: 'app',
      component: 'app',
      // onEnter: routerAccessProvider.access,
    })
    .state('app.index',{
      url: '/index',
      title: 'index',
      component: 'index',
      resolve: {
        lazyLoad: $ocLazyLoad => System.import('../pages/index/index.module').then(mod => $ocLazyLoad.load(mod.indexModule))
      }
      // templateUrl: '../pages/index/index.component.html',
      // onEnter: routerAccessProvider.access,
    })
    // .state('frame.not-found',{
    //   url: '/not-found',
    //   controllerAs: 'vm',
    //   controller: 'NotFoundController',
    //   templateUrl: 'pages/not-found/not-found.controller.html',
    //   onEnter: routerAccessProvider.access,
    //   title: '404'
    // })

  $locationProvider.hashPrefix(null);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/frame/not-found');
}