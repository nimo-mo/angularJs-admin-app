import index from './index.component';
// import indexState from './index.state';

export const indexModule = angular.module('app')
  // .config(['$stateRegistryProvider', function ($stateRegistry) {
  //   $stateRegistry.register(indexState);
  // }])
  .component('index', index);
