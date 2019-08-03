import { speed, voice, voiceM2 } from './model/config.js'
import { LangType, calculateScore } from './calculateScore.js'
import { say, listen, ListenResultType } from './speechEngine.js'
import { getRubyText } from './rubyText.js'
import { getTokenInfos, captialFirstChar } from './utils.js'
import { comments } from './model/store.js'
import { textareaValue } from './model/store.js'
import { get } from 'svelte/store';
import { Voices } from './model/constants.js'

export const playGame = async (isDemo) => {
    comments.set([])
    var sentences = []
    var translations = {}
    textareaValue.update(texts => {
        let sentenceAndTranslations = texts.split("\n").filter(t => t!="")
        sentenceAndTranslations.forEach(sentenceAndTranslation => {
            let strings = sentenceAndTranslation.split("|")
            sentences.push(strings[0])
            translations[strings[0]] = strings.length > 1 ? strings[1] : ""
        })
        return texts
    })

    for (let i in sentences) {
        // show left text
        let sentence = sentences[i]
        //var tokenInfos = await getTokenInfos(sentence)
        comments.update(x => [...x, { type: 'teacher', text: `${sentence}<br><span style="font-size:0.8em">${translations[sentence]}</span>` }])

        let localVoice = i % 2 ==0 ? voiceM2 : voice
        let duration = await say(sentence, get(speed), get(localVoice))

        // show listening text
        comments.update(x => [...x, { type: 'listening', text: '正在聽你說...' }])


        // plus 400 ms
        if (isDemo) {
            setTimeout(() => say(sentence, get(speed), Voices.enF3), 100)
        }
        let result = await listen(duration + 400)


        var displayText = "default display text"
        var score = 0
        switch (result.type) {
            case ListenResultType.success:
                //tokenInfos = await getTokenInfos(result.text)
                score = await calculateScore(sentence, result.text)
                displayText = captialFirstChar(result.text)
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
                              { type: 'user', text: displayText, score: score}
                             ]
                       )
        var judgement = ""
        if (score == 100) { judgement = "Excellent" }
        else if ( score >= 80 ) { judgement = "Great" }
        else if ( score >= 60 ) { judgement = "Good"　}
        else { judgement = "Not Right"}
        await say(judgement, 1.0, Voices.enF1 )
    }
}
