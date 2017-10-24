export {
  httpConfig,
  httpUnhandledConfig
}

/* @ngInject */
function httpConfig($httpProvider) {
  $httpProvider.interceptors.push(interceptor)
}

/* @ngInject */
function httpUnhandledConfig($qProvider) {
  // do not throw response error in console
  $qProvider.errorOnUnhandledRejections(false);
}

/* @ngInject */
function interceptor($q,$state,toaster,envService,storageService,utilService) {
  return {
    request: request,
    response: response,
    requestError: requestError,
    responseError: responseError
  }

  function request(config) {
    config.timeout = 60*1000;
    config.headers['X-User-Token'] = storageService.getItem('X-User-Token', 'sso');
    config.headers['X-User-Mobile'] = storageService.getItem('X-User-Mobile', 'sso');

    var url = config.url;
    var apiPrefix = envService.getApiPrefix();
    var iamApiPrefix = envService.getIamApiPrefix(apiPrefix);

    // local|http|plain
    if (isHttpUrl(url) || isLocalUrl(url) || isPlainRequest(url)) {
      return config
    }

    // iam server
    if (isIamUrl(url)) {
      config.url = iamApiPrefix + config.url
      return config;
    }

    // audio server
    if (isAudioUrl(url)) {
      config.url = (apiPrefix + config.url).replace('/approval/api/','/')
      return config;
    }

    // approval server
    config.url = apiPrefix + config.url
    return config;
  }

  function response(response) {
    return isPlainRequest(response.config.url) || useOrigin(response) ? response : response.data
  }

  function requestError(rejection) {
    return useOrigin(rejection) ? $q.reject(rejection) : $q.reject(rejection.data);
  }

  function responseError(rejection) {
    var redirect = utilService.getQueryString('redirect');
    var unfeedback = rejection.data.message || rejection.data.error;
    var errorMessage = getResponseError(rejection.status,unfeedback);
    if (!defineError(rejection)) toaster.pop('error','处理失败',errorMessage);
    if (rejection.status===401&&!redirect) location.href = '#/login?redirect='+location.href;
    return useOrigin(rejection) ? $q.reject(rejection) : $q.reject(rejection.data)
  }

  function useOrigin(res) {
    return res.config.useOrigin
  }

  function defineError(res) {
    return res.config.defineError
  }

  function isHttpUrl(input) {
    return /^https?:\/\//.test(input)
  }

  function isIamUrl(input) {
    return /^(sso|iam|iam\-.*)\//.test(input)
  }

  function isAudioUrl(input) {
    return /^audio\/api\//.test(input)
  }

  function isLocalUrl(input) {
    return /^(pages|widgets)\//.test(input)
  }

  function isPlainRequest(input) {
    return /\.(html?|xml|txt)$/.test(input)
  }
  
  function getResponseError(input,unfeedback) {
    return {
      '-1': '服务器异常，请联系网站管理员',
      '401': '您的会话已过期，请重新登录',
      '403': '您的权限受到限制，请咨询管理员获取权限',
      '404': '错误的参数或请求地址，请检查',
      '500': '服务器内部错误',
      'undefined': '请求失败'
    }[input] || unfeedback
  }
}