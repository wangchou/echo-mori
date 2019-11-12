import { writable, derived, get } from 'svelte/store';
import { GameMode, DisplayMode, PlaySpeed, Voice } from './constants.js'

// dataSet related
export const currentSetId = writable(14)
export const selectedTag = writable('日常')
export const selectedSentenceId = writable(1854)
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)
export const user = writable({})
export const route = writable('/levelDetail')
export const userSaids = writable({ 3: "how to surprise", 1706: "not make sense", 1717: "are you angry", 1719: "are you happy", 1732: "he said no song", 1735: "this is epic", 1738: "are you keeping", 1741: "can you help me", 1869: "you work too hard", 1873: "I have no idea" }) // { sentenceId : user said text }
export const scores = writable({ 3: 70, 1706: 72, 1717: 100, 1719: 100, 1732: 67, 1735: 55, 1738: 77, 1741: 100, 1869: 100, 1873: 82 }) // {sentenceId: score}

// game status
export const messages = writable([])        // Messenger 遊戲中的訊息
export const isPlaying = writable(false)    // 遊戲中 or 暫停

// game settings
export const gameMode = writable(GameMode.shadowing)
export const displayMode = writable(DisplayMode.both)

export const speed = writable(0.8)
export const voice1 = writable(Voice.enF1)
export const voice2 = writable(Voice.enM1)

export function updateUserSaidAndScore(sid, userSaid, score) {
    let newUserSaid = get(userSaids)
    newUserSaid[sid] = userSaid
    userSaids.set(newUserSaid)

    let newScores = get(scores)
    newScores[sid] = score
    scores.set(newScores)
}

function subscribeAndLog(variable, name) {
    variable.subscribe(v => console.log(`| ${name} => `, v))
}

// console log state changes
console.log(`= 句子集頁面狀態 =`)
subscribeAndLog(currentSetId, 'currentSetId')
subscribeAndLog(selectedTag, 'selectedTag')
subscribeAndLog(selectedSentenceId, 'selectedSentenceId')
subscribeAndLog(user, 'user')
subscribeAndLog(route, 'route')
subscribeAndLog(userSaids, 'userSaids')
subscribeAndLog(scores, 'scores')

console.log(`= Messenger 遊戲頁面狀態 =`)
subscribeAndLog(messages, 'messages')
subscribeAndLog(isPlaying, 'isPlaying')
subscribeAndLog(gameMode, 'gameMode')
subscribeAndLog(displayMode, 'displayMode')
subscribeAndLog(speed, 'speed')