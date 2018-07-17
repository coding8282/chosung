import storage from '../ext/storage'
import Constraction from './Constraction'

class ContractionStore {
  existsByKeyword (keyword) {
    let contractions = storage.get('contractions')
    return _.some(contractions, {keyword})
  }

  isEmpty () {
    let contractions = storage.get('contractions')
    return contractions === null || contractions.length === 0
  }

  countAll () {
    let contractions = storage.get('contractions') || []
    return contractions.length
  }

  add (contraction) {
    let contractions = storage.get('contractions') || []
    let idx = _.findIndex(contractions, {keyword: contraction.keyword})
    if (idx === -1) {
      contractions.push(contraction)
    } else {
      contractions[idx] = contraction
    }
    storage.set('contractions', contractions)
  }

  addAll (contractions) {
    for (let contraction of contractions) {
      this.add(contraction)
    }
  }

  getByKeyword (keyword) {
    let contractions = storage.get('contractions')
    let constraction = _.filter(contractions, {keyword})[0]
    if (constraction) {
      return new Constraction(constraction)
    }
    return null
  }

  removeAll () {
    storage.remove('contractions')
  }

  removeByKeyword (keyword) {
    let contractions = storage.get('contractions')
    _.remove(contractions, {keyword})
    storage.set('contractions', contractions)
  }

  // Query 전용 기능
  queryAll (keyword) {
    return storage.get('contractions')
  }

  queryByKeyword (keyword) {
    let contractions = storage.get('contractions')
    return _.filter(contractions, {keyword})[0]
  }

  queryByKeywordStartsWith (theKeyword) {
    let contractions = storage.get('contractions')
    let dtos = []
    for (let contraction of contractions) {
      if (contraction.keyword.startsWith(theKeyword)) {
        dtos.push({
          content: contraction.keyword,
          description: `${contraction.keyword} | ${contraction.label} | ${contraction.hit}회 검색 | ${contraction.uri}`
        })
      }
    }
    return dtos
  }
}

export default ContractionStore
