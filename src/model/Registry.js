import ContractionService from './ContractionService'
import ContractionStore from './ContractionStore'
import ContractionConstraint from './ContractionConstraint'
import ConfigStore from './ConfigStore'

const contractionStore = new ContractionStore()
const configStore = new ConfigStore()
const constraint = new ContractionConstraint(contractionStore)
const service = new ContractionService(contractionStore, constraint)

Object.freeze(service)
Object.freeze(contractionStore)
Object.freeze(constraint)

class Registry {
  static contractionService () {
    return service
  }

  static configStore () {
    return configStore
  }

  static contractionStore () {
    return contractionStore
  }

  static contractionConstraint () {
    return constraint
  }
}

export default Registry
