import Constraction from './Constraction'
import {developerSample, sample} from './Sample'

class ContractionService {
  constructor (store, constraint) {
    this.store = store
    this.constraint = constraint
  }

  isInitialized () {
    return !this.store.isEmpty()
  }

  init () {
    this.store.removeAll()
  }

  loadSample () {
    this.store.removeAll()
    this.store.addAll(sample)
  }

  loadDeveloperSample () {
    this.store.removeAll()
    this.store.addAll(developerSample)
  }

  findAll () {
    return this.store.getAll()
  }

  findByKeyword (keyword) {
    let constraction = this.store.getByKeyword(keyword)
    return new Constraction(constraction)
  }

  make (command) {
    this.constraint.rejectIfCapacityExceeded()
    this.constraint.rejectIfKeywordAlreadyExists(command.keyword)
    let constraction = Constraction.createNew(command)
    this.store.add(constraction)
  }

  increaseHit (keyword) {
    const constraction = this.constraint.checkExistsAndGet(keyword)
    constraction.increaseHit()
    this.store.add(constraction)
  }

  modify (command) {
    const constraction = this.store.getByKeyword(command.keyword)
    if (constraction) {
      constraction.update(command)
      this.store.add(constraction)
    } else {
      this.make(command)
    }
  }

  eraseByKeyword (keyword) {
    this.store.removeByKeyword(keyword)
  }
}

export default ContractionService
