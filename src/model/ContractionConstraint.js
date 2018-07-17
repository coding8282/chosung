import ContractionError from './ContractionError'

class ContractionConstraint {
  constructor (store) {
    this.store = store
  }

  rejectIfCapacityExceeded () {
    let count = this.store.countAll()
    if (count >= 100) {
      throw new ContractionError('e-CapacityExceeded', `키워드는 최대 100개까지 추가 가능합니다.`)
    }
  }

  rejectIfKeywordAlreadyExists (keyword) {
    if (this.store.existsByKeyword(keyword)) {
      throw new ContractionError('e-KeywordAlreadyExists', `동일한 키워드가 이미 존재합니다: ${keyword}`)
    }
  }

  checkExistsAndGet (keyword) {
    let contraction = this.store.getByKeyword(keyword)
    if (!contraction) {
      throw new ContractionError('e-NotFound', `해당 단축키는 존재하지 않습니다: ${keyword}`)
    }
    return contraction
  }
}

export default ContractionConstraint
