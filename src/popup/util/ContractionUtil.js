let cho = []
cho['ㄱ'] = 'r'
cho['ㄲ'] = 'R'
cho['ㄴ'] = 's'
cho['ㄷ'] = 'e'
cho['ㄸ'] = 'E'
cho['ㄹ'] = 'f'
cho['ㅁ'] = 'a'
cho['ㅂ'] = 'q'
cho['ㅃ'] = 'Q'
cho['ㅅ'] = 't'
cho['ㅆ'] = 'T'
cho['ㅇ'] = 'd'
cho['ㅈ'] = 'w'
cho['ㅉ'] = 'W'
cho['ㅊ'] = 'c'
cho['ㅋ'] = 'z'
cho['ㅌ'] = 'x'
cho['ㅍ'] = 'v'
cho['ㅎ'] = 'g'
let han = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

class ContractionUtil {
  static rules = {
    keywordKor: [
      {required: true, message: '키워드는 필수입니다.', trigger: 'blur'},
      {min: 1, max: 20, message: '검색어는 1~20자까지 가능합니다.', trigger: 'blur'}
    ],
    keywordEng: [
      {required: false, message: '키워드는 필수입니다.', trigger: 'blur'},
      {min: 1, max: 20, message: '검색어는 1~20자까지 가능합니다.', trigger: 'blur'}
    ],
    label: [
      {required: true, message: '라벨은 필수입니다.', trigger: 'blur'},
      {min: 1, max: 30, message: '라벨은 1~30자까지 가능합니다.', trigger: 'blur'}
    ],
    uri: [
      {required: true, message: 'URI는 필수입니다.', trigger: 'blur'},
      {min: 1, max: 1500, message: 'URI는 1~1500자까지 가능합니다.', trigger: 'blur'}
    ],
    memo: [
      {required: false, message: '메모는 필수입니다.', trigger: 'blur'},
      {min: 1, max: 50, message: '메모는 1~50자까지 가능합니다.', trigger: 'blur'}
    ]
  }

  static toHangul (eng) {
    let result = ''
    for (let i = 0; i < eng.length; i++) {
      let code = eng.charCodeAt(i) - 44032
      if (code > -1 && code < 11172) {
        result += han[Math.floor(code / 588)]
      } else {
        result += eng[i]
      }
    }
    return result
  }

  static toEnglish (kor) {
    let result = ''
    for (let i = 0; i < kor.length; i++) {
      result += cho[kor[i]] || kor[i]
    }
    return result
  }
}

export default ContractionUtil
