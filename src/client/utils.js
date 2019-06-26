// https://stackoverflow.com/questions/43657034/javascript-regex-alphanumeric-english-and-japanese

var pHiragana = "[\\u3041-\\u3096\\u309D-\\u309F]|\\uD82C\\uDC01|\\uD83C\\uDE00";
var pKatakana = "[\\u30A1-\\u30FA\\u30FD-\\u30FF\\u31F0-\\u31FF\\u32D0-\\u32FE\\u3300-\\u3357\\uFF66-\\uFF6F\\uFF71-\\uFF9D]|\\uD82C\\uDC00";
var pHan = "[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uF900-\\uFA6D\\uFA70-\\uFAD9]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]";

export let kanjiOrNumberRxGlobal = new RegExp(`((${pHan}|\\d)+)`, 'g')

export let JaType = {
    noKanjiAndNumber: 'noKanjiAndNumber',
    kanjiAndNumber: 'kanjiAndNumber',
    mixed: 'mixed'
}

export var kanjiOrNumberRx = new RegExp(`(${pHan}|\\d)+`)
export let getJaType = (str) => {
    let match = str.match(kanjiOrNumberRx)
    if (match == null) {
        return JaType.noKanjiAndNumber
    }
    if (match[0] == match.input) {
        return JaType.kanjiAndNumber
    }
    return JaType.mixed
}

export let katakanaToHiragana = (str) => {
    let result = ""

    for(let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i)
        if(charCode >= 0x30A0 && charCode <= 0x30FB) {
            result += String.fromCharCode(charCode - 0x60)
        } else {
            result += str.charAt(i)
        }
    }
    return result
}

var hasKanaRx = new RegExp(`(${pHiragana}|ー)+`)
export let getHiraganaOnly = str => {
    let hiragana = katakanaToHiragana(str)
    let match = hiragana.match(hasKanaRx)
    if (match == null) {
        return ""
    }
    return match[0]
}