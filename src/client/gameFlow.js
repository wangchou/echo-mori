import { speed, voice } from './model/config.js'
import { say, listen } from './speechEngine.js'
import { getTokenInfos, getRubyText } from './rubyText.js'
import { comments } from './model/store.js'
import { get } from 'svelte/store';

const sentences = [
    '逃げるは恥だが役に立つ',
    '今日はいい天気ですね',
//    'こんにちは、ともさん',
//    'そうですね。',
//    'じゃあ、またね。',
]

export const playGame = async () => {
    for (let i in sentences) {
        let sentence = sentences[i]
        let tokenInfos = await getTokenInfos(sentence)
        //console.log(getRubyText(tokenInfo))
        comments.update(x => [...x, { author: 'teacher', text: getRubyText(tokenInfos) }])

        let duration = await say(sentence, get(speed), get(voice))

        // plus 600 ms
        let recognizedText = await listen(duration + 600)
        comments.update(x => [...x, { author: 'student', text: recognizedText }])
    }
}
