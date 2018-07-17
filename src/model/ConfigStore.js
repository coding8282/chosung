import storage from '../ext/storage'

class ConfigStore {
  save (withKeywordEng) {
    storage.set('config', {withKeywordEng})
  }

  get () {
    return storage.get('config') || {}
  }
}

export default ConfigStore
