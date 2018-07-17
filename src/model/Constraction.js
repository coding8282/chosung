class Constraction {
  constructor (obj) {
    this.keyword = obj.keyword
    this.label = obj.label
    this.uri = obj.uri
    this.hit = obj.hit
  }

  static createNew (p) {
    p.hit = 0
    return new Constraction(p)
  }

  update (obj) {
    this.keyword = obj.keyword
    this.label = obj.label
    this.uri = obj.uri
  }

  increaseHit () {
    this.hit++
  }
}

export default Constraction
