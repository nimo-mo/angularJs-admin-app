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
        // lazyLoad: $ocLazyLoad => {
        //   console.log($ocLazyLoad.load('../pages/index/index.component.js'))
        // }
      }
      // templateUrl: '../pages/index/index.component.html',
      // onEnter: routerAccessProvider.access,
    })
    .state('app.not-found',{
      url: '/not-found',
      title: '404',
      component: null,
    })

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix(null);
  $urlRouterProvider.otherwise('/app/not-found');
}