
const lazyLoadIndex = $ocLazyLoad => System.import('../pages/index/index.module').then(mod => $ocLazyLoad.load(mod.indexModule))


export default function ($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject'
  $stateProvider
    .state('app',{
      url: '/app',
      title: 'app',
      component: 'app',
    })
    .state('app.index',{
      url: '/index',
      title: 'index',
      component: 'index',
      resolve: { lazyLoadIndex }
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
