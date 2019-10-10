import {
    getJaType,
    JaType,
    katakanaToHiragana,
    kanjiOrNumberRxGlobal,
    getHiraganaOnly,
    getTokenInfos
} from './misc.js'

let getRubyPair = (rb, rt = '') => ({ rb: rb, rt: rt })

function isNoKanji(str) {
    return getJaType(str) == JaType.noKanjiAndNumber
}

// input
//      parts: [逃 | げるは | 恥 | だが | 役 | に | 立 | つ]
//      kana: にげるははじだがやくにたつ
// output:
//      [{rb: "逃", rt: "に"}, {rb: "げるは", rt: ""}, {rb: "恥", rt: "はず"}, ...]
export let getRubyPairs = (parts, kana) => {
    var pairs = []
    if (parts.length == 1) {
        pairs.push(getRubyPair(
            parts[0],
            isNoKanji(parts[0]) ? '' : kana)
        )
        return pairs
    }

    // divider is first non "kanji or number part" in parts
    for (let dividerIndex = 0; dividerIndex < parts.length; dividerIndex++) {
        let divider = parts[dividerIndex]
        if (!isNoKanji(divider)) { continue }
        let dividerHiragana = katakanaToHiragana(divider)
        let patternCountsInKana = kana.match(new RegExp(`${dividerHiragana}`, "g")).count
        let patternCountsInParts = parts.filter(x => (katakanaToHiragana(x) == dividerHiragana)).count
        if (patternCountsInKana != patternCountsInParts) { continue }

        let kanaIndex = kana.indexOf(dividerHiragana)
        // before divider
        pairs = [...pairs, ...getRubyPairs(
            parts.slice(0, dividerIndex),
            kana.slice(0, kanaIndex)
        )]

        // divider
        pairs.push(getRubyPair(divider))

        // after divider
        if (dividerIndex + 1 < parts.length) {
            pairs = [...pairs, ...getRubyPairs(
                parts.slice(dividerIndex + 1, parts.length),
                kana.slice(kanaIndex + divider.length, kana.length)
            )]
        }
        return pairs
    }

    return [getRubyPair(parts.join(''), kana)]

}

export let getParts = (str) => {
    return str.replace(kanjiOrNumberRxGlobal, "👻$1👻")
        .split("👻")
        .filter(x => x != "")
}

// tokenInfo = [kanji, 詞性, furikana, yomikana]
export let getRubyText = (tokenInfos) => {
    var pairs = []
    var result = ""
    tokenInfos.forEach(tokenInfo => {
        if (tokenInfo[3] == "*") {
            pairs.push(getRubyPair(tokenInfo[0]))
        } else if (tokenInfo[1] == "記号") {
            pairs.push(getRubyPair(tokenInfo[0]))
        } else {
            let kana = katakanaToHiragana(tokenInfo[2])
            let parts = getParts(tokenInfo[0])
            pairs = [...pairs, ...getRubyPairs(parts, kana)]
        }
    })

    var innerText = pairs.map(pair => {
        let rb = pair.rb
        if (pair.rt == '') {
            return rb
        }
        let rt = katakanaToHiragana(pair.rt)
        return `<ruby><rb>${rb}</rb><rt>${rt}</rt></ruby>`
    }).join('')
    return innerText
}