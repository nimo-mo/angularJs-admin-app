import './styles/index.scss';
import angular from 'angular';
console.log(angular,jQuery)

const appModule = angular.module('app', [
  'ui.router',
]);

export default appModule