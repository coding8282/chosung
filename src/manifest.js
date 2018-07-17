module.exports = {
  name: '초성검색',
  description: '"https://naver..." 아직도 주소를 타이핑하시나요? 이제 한손으로 초성만 입력하세요! "ㄴㅇㅂ" 이렇게 초성만 입력하시면 바로 이동합니다~',
  author: 'hyunsu <coding8282@gmail.com>',
  version: '1.0.0',
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
    '128': 'icons/128.png'
  },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'background',
    'unlimitedStorage',
    'storage'
  ],
  browser_action: {
    default_title: '초성검색',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: true,
    page: 'pages/background.html'
  },
  devtools_page: 'pages/devtools.html',
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/content.js'
    ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  manifest_version: 2,
  content_security_policy: 'script-src \'self\'; object-src \'self\'',
  web_accessible_resources: [
    'panel.html',
    'js/content.js'
  ],
  omnibox: {
    keyword: '3'
  }
}
