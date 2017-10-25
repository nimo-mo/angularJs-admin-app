import './styles/index.scss';
import angular from 'angular';
import ocLazyLoad from "oclazyload";
// import uiRouter from "@uirouter/angularjs";
// import { StickyStatesPlugin } from '@uirouter/sticky-states';
// import { DSRPlugin } from '@uirouter/dsr';
// import { visualizer } from "@uirouter/visualizer";
import appRouterConfig from './routers/app.router'

// import { appState, indexState } from './pages/app/app.states';
import app from './pages/app/app.component';
// import index from './pages/index/index.component';

angular.module('app', [
  'ui.router',
  ocLazyLoad,
])

angular.module('app')
  // configs
  .config(appRouterConfig)
  // .config([
  //   '$uiRouterProvider',
  //   '$stateRegistryProvider',
  //   '$stateProvider',
  //   '$locationProvider',
  //   '$urlRouterProvider',
  //   ($uiRouter, $stateRegistry, $stateProvider, $locationProvider, $urlRouterProvider) => {
  //   $uiRouter.plugin(StickyStatesPlugin);
  //   $uiRouter.plugin(DSRPlugin);
  //   // $uiRouter.trace.enable(1);
  //   $locationProvider.hashPrefix(null);
  //   $locationProvider.html5Mode(true);
  //   $urlRouterProvider.otherwise('/app/not-found');
  //   // $uiRouter.urlService.rules.otherwise({ state: 'app' });
  //   $stateRegistry.register(appState);
  //   $stateRegistry.register(indexState);
  //   // Show the UI-Router Visualizer
  //   // visualizer($uiRouter);
  // }])

  // components
  .component('app', app)