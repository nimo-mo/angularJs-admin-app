
export default  {
  bindings: {
    
  },
  templateUrl: 'pages/index/index.component.html',
  controllerAs: 'vm',
  controller: class IndexController {
    constructor() {
    }

    $onInit() {
      this.output = '1234';
    }

    $onChanges() {

    }

    doSome() {
      console.log(this)
    }
  }
}