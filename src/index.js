import appStates from './routers/app.router'
import app from './pages/app/app.component'
import './styles/index.scss';

angular.module('app', [
  'ui.router',
  'oc.lazyLoad'
])
  .config(appStates)
  .component('app', app)
