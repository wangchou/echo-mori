import { getTokenInfos } from './utils.js'
import editDistance from 'js-levenshtein'

export let LangType = {
    ja: "ja",
    others: "others"
}

// tokenInfo[2] = furigana, here use tokenInfo[3] = yomikana
let getYomiKana = async (text) => {
    let tokenInfos = await getTokenInfos(text)
    return tokenInfos.reduce((kanaStr, tokenInfo) => {
        if (tokenInfo.length < 2 || tokenInfo[1] == "記号") {
            return kanaStr
        }

        let curKanaStr = tokenInfo[tokenInfo.length - 1] == "*" ? tokenInfo[0] : tokenInfo[tokenInfo.length - 1]
        return kanaStr + curKanaStr
    }, "")
}

export let getPhoneticCharacters = async (text, lang) => {
    switch (lang) {
        case LangType.ja:
            return getYomiKana(text)
        default:
            return text.replace(" ", "").replace(",", "").replace(".", "").replace("?", "")
    }
}

export let calculateScore = async (str1, str2, lang) => {
    let phStr1 = await getPhoneticCharacters(str1, lang)
    let phStr2 = await getPhoneticCharacters(str2, lang)
    let len = Math.max(phStr1.length, phStr2.length)
    return Math.ceil(100 * (len - editDistance(phStr1, phStr2)) / len)
}