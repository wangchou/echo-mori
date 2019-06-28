import { speed, voice } from './model/config.js'
import { say, listen, ListenResultType } from './speechEngine.js'
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
        // show left text
        let sentence = sentences[i]
        var tokenInfos = await getTokenInfos(sentence)
        comments.update(x => [...x, { type: 'teacher', text: getRubyText(tokenInfos) }])

        let duration = await say(sentence, get(speed), get(voice))

        // show listening text
        comments.update(x => [...x, { type: 'listening', text: '正在聽你說...' }])


        // plus 400 ms
        let result = await listen(duration + 400)
        var displayText = "default display text"
        switch (result.type) {
            case ListenResultType.success:
                tokenInfos = await getTokenInfos(result.text)
                displayText = getRubyText(tokenInfos)
                break;
            case ListenResultType.cannotHear:
                displayText = "聽不清楚，請大聲一點。" // need i18n later
                break;
            case ListenResultType.error:
                displayText = "抱歉，目前出現了一些問題。" // need i18n later
                break;
        }

        // remove listening text and show recognized text with score
        comments.update(x => [...x.slice(0, x.length - 1),
                              { type: 'user', text: displayText}
                             ]
                       )
    }
}
