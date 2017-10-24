export const appState = {
  name: 'app',
  url: '/app',
  component: 'app'
};

export const indexState = {
  parent: 'app',
  name: 'index.**',
  url: '/index',
  lazyLoad: function(transition) {
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return System.import('../index/index.module').then(mod => $ocLazyLoad.load(mod.indexModule))
  }
};