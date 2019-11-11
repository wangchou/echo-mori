import { get } from 'svelte/store';

import { messages, isPlaying, currentSetId, gameMode, displayMode, speed, voice1, voice2, route } from '../data/states.js'
import { Voice, GameMode, DisplayMode, MessageType } from '../data/constants.js'
import { sentenceSets, idToRow } from '../data/demoSets.js'

import { LangType, calculateScore } from './calculateScore.js'
import { say, listen, ListenResultType } from './speechEngine.js'
import { getTokenInfos, captializeFirstChar, wait } from '../utils/misc.js'

export const playGame = async (isDemo) => {
    isPlaying.set(true)
    messages.set([])

    let currentId = get(currentSetId)
    var sentenceSet = sentenceSets.filter(set => set.id == currentId)[0]
    var sentences = sentenceSet.sentenceIds.map(id => idToRow[id].en)
    var translations = sentenceSet.sentenceIds.map(id => idToRow[id].ch)

    for (let i in sentences) {
        if (!get(isPlaying)) { return }

        // 1. 在左側，顯示 Google 老師說的字
        let sentence = sentences[i]
        let translation = translations[i]
        var teacherText = ""
        switch (get(displayMode)) {
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

        messages.update(x => [...x, { type: MessageType.teacher, text: teacherText }])

        let localVoice = i % 2 == 0 ? voice2 : voice1
        let duration = await say(sentence, get(speed), get(localVoice))

        if (!get(isPlaying)) { return }

        // 2. 在中間，顯示回音法提示泡泡 (optional)
        if (get(gameMode) == GameMode.echo) {
            messages.update(x => [...x, { type: MessageType.echo, text: `聽心中回音` }])
            await wait(duration + 200)
        }

        if (!get(isPlaying)) { return }

        // 3. 在右邊，顯示「正在聽你說」，然後聽使用者說 / 展示時電腦說
        messages.update(x => [...x, { type: MessageType.listening, text: '正在聽你說...' }])

        if (isDemo) {
            setTimeout(() => say(sentence, get(speed), Voice.enF3), 200)
        }
        let result = await listen(duration * 1.1 + 500)

        if (!get(isPlaying)) { return }

        // 4. 在右邊，顯示辨識結果與分數
        var displayText = "default display text"
        var score = 0
        switch (result.type) {
            case ListenResultType.success:
                //tokenInfos = await getTokenInfos(result.text)
                score = await calculateScore(sentence, result.text)
                displayText = captializeFirstChar(result.text)
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

        messages.update(x => [
            ...x.slice(0, x.length - 1),
            { type: MessageType.user, text: displayText, score: score }
        ])

        // 5. 唸出句子的判定
        var judgement = ""
        if (score == 100) { judgement = "Excellent" }
        else if (score >= 80) { judgement = "Great" }
        else if (score >= 60) { judgement = "Good" }
        else { judgement = "Not Right" }
        await say(judgement, 1.0, Voice.enF1)
    }
    isPlaying.set(false)
    route.set('/gameResult')
}