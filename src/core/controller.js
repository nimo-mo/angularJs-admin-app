export default class Controller {
  constructor(){
    this.name = 'controller';
  }
  initArgs(){
    if (arguments.length < 2) return
    const args = [...arguments]
    // args[0].$inject.forEach((key,index)=>this[key]=args[1][index])
    args[0].constructor
      .toString() // constructor stringify
        .match(/\((.*)\)/)[1] // match arguments
          .replace(/\s/g,'') // replace space
            .split(',') // to array
              .forEach((k,i)=>this[k]=args[1][i]) // assign arguments
  }
}
