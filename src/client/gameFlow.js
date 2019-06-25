import { speed, voice } from './model/config.js'
import { say, listen, getTokenInfo, getRubyText } from './speechEngine.js'
import { comments } from './model/store.js'
import { get } from 'svelte/store';

const sentences = [
    '今日はいい天気ですね',
//    'こんにちは、ともさん',
//    'そうですね。',
//    'じゃあ、またね。',
]

export const playGame = async () => {
    for (let i in sentences) {
        let sentence = sentences[i]
        let tokenInfo = await getTokenInfo(sentence)
        //console.log(getRubyText(tokenInfo))
        comments.update(x => [...x, { author: 'teacher', text: getRubyText(tokenInfo) }])

        let duration = await say(sentence, get(speed), get(voice))

        // plus 600 ms
        let recognizedText = await listen(duration + 600)
        comments.update(x => [...x, { author: 'student', text: recognizedText }])
    }
}
