import Registry from '../model/Registry'

const contractionStore = Registry.contractionStore()
const contractionService = Registry.contractionService()

chrome.omnibox.onInputChanged.addListener(
  function (text, suggest) {
    let suggestions = contractionStore.queryByKeywordStartsWith(text)
    if (suggestions.length) {
      chrome.omnibox.setDefaultSuggestion({description: suggestions[0].description})
      suggestions.unshift()
    }
    suggest(suggestions)
  }
)

chrome.omnibox.onInputEntered.addListener(
  (text) => {
    chrome.tabs.getSelected(null, function (tab) {
      let url = contractionStore.queryByKeyword(text).uri
      chrome.tabs.create({url})
      contractionService.increaseHit(text)
    })
  }
)
