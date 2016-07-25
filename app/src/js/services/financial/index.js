import { Subject, BehaviorSubject } from 'rx'
import reduce from 'lodash/reduce'

let sourceStore = {}

export class FinancialSource {

  constructor(...types) {
    this.types = types
  }

  buildCollection(collection) {
    return reduce(this.types, (result, value) => {
      result[value] = result[value]? result[value] : [];
      return result
    }, collection)
  }

  init() {
    this.updates = new Subject()
    this.addType = new Subject()
    this.add = new Subject()

    //init store
    sourceStore = this.buildCollection({});

    this.sourceStream = this.updates
      .startWith( collection => collection )
      .scan((collection, operation) => {
        return operation(collection)
      }, sourceStore)
      .shareReplay(1)

    this.addType
      .map( () => collection => this.buildCollection(collection) )
      .subscribe(this.updates)

    this.add
      .map( newData => collection => {
        collection[newData.type] = (collection[newData.type])? collection[newData.type].concat(newData.data) : [newData.data];
        return this.buildCollection(collection)
      })
      .subscribe(this.updates)

    return this.source
  }

  get sourceTypes() {
    return this.types
  }

  get source() {
    return this.sourceStream.asObservable()
  }

  addSource(type) {
    if(this.types.indexOf(type) == -1) {
      this.types = this.types.concat(type)
      this.addType && this.addType.onNext()
    }
  }

  addData(type, data) {
    this.add.onNext({ type, data })
  }

}
