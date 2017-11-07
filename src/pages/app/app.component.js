import Controller from '../../core/controller';
export default {
  bindings: {},
  templateUrl: 'pages/app/app.component.html',
  controllerAs: 'vm',
  controller: class AppController extends Controller {
    constructor($ocLazyLoad,$filter) {
      'ngInject'
      super()
      this.initArgs(this,arguments)
    }

    $onInit() {
      const { $filter, $ocLazyLoad } = this;
      console.log($filter)
      console.log($ocLazyLoad)
    }

    $onChanges() {
    }

    doSome() {
      console.log('麻辣烫')
    }
  }
}
