import { speed, voice, voiceM2 } from './model/config.js'
import { LangType, calculateScore } from './calculateScore.js'
import { say, listen, ListenResultType } from './speechEngine.js'
import { getRubyText } from './rubyText.js'
import { getTokenInfos, captialFirstChar, wait } from './utils.js'
import { comments, isPlaying, currentSetId, gameMode, displayMode } from './model/store.js'
import { get } from 'svelte/store';
import { Voices, GameMode, DisplayMode } from './model/constants.js'
import { sentenceSets, idToRow } from './model/demoSets.js'

export const playGame = async (isDemo) => {
    isPlaying.set(true)
    comments.set([])
    let currentId = get(currentSetId)
    var sentenceSet = sentenceSets.filter( set => set.id == currentId)[0]
    var sentences = sentenceSet.sentenceIds.map(id => idToRow[id].en)
    var translations = sentenceSet.sentenceIds.map(id => idToRow[id].ch)

    for (let i in sentences) {
        if (!get(isPlaying)) { return }
        // show left text
        let sentence = sentences[i]
        let translation = translations[i]
        //var tokenInfos = await getTokenInfos(sentence)
        var teacherText = ""
        switch(get(displayMode)) {
            case DisplayMode.both:
                teacherText = `${sentence}<br><span style="font-size:0.8em">${translation}</span>`
                break;
            case DisplayMode.original:
                teacherText = `${sentence}`
                break;
            case DisplayMode.translation:
                teacherText = `${translation}`
                break;
        }

        comments.update(x => [...x, { type: 'teacher', text: teacherText }])

        let localVoice = i % 2 ==0 ? voiceM2 : voice
        let duration = await say(sentence, get(speed), get(localVoice))

        if (!get(isPlaying)) { return }

        if (get(gameMode) == GameMode.echo) {
            comments.update(x => [...x, { type: 'echo', text: `聽心中回音` }])
            await wait(duration + 200)
        }

        if (!get(isPlaying)) { return }

        // show listening text
        comments.update(x => [...x, { type: 'listening', text: '正在聽你說...' }])

        // plus 400 ms
        if (isDemo) {
            setTimeout(() => say(sentence, get(speed), Voices.enF3), 200)
        }
        let result = await listen(duration * 1.1 + 500)

        if (!get(isPlaying)) { return }

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
            case ListenResultType.notSupport:
                displayText = "你使用的瀏覽器不支援「語音辨識」。" // need i18n later
                continue;
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
    isPlaying.set(false)
}