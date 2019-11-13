import { writable, derived, get } from 'svelte/store';
import { GameMode, DisplayMode, PlaySpeed, Voice } from './constants.js'

// dataSet related
export const currentSetId = writable(14)
export const selectedTag = writable('日常')
export const selectedSentenceId = writable(1854)
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)
export const user = writable({})
export const route = writable('/')
export const userSaids = writable({ 3: "how to surprise", 1706: "not make sense", 1717: "are you angry", 1719: "are you happy", 1732: "he said no song", 1735: "this is epic", 1738: "are you keeping", 1741: "can you help me", 1869: "you work too hard", 1873: "I have no idea" }) // { sentenceId : user said text }
export const scores = writable({ 3: 70, 1706: 72, 1717: 100, 1719: 100, 1732: 67, 1735: 55, 1738: 77, 1741: 100, 1869: 100, 1873: 82 }) // {sentenceId: score}
export const gameRecords = writable([{
    endTime: 1573596848880,
    gameScore: 0.75,
    setId: 14,
    starCount: 2,
    startTime: 1573596803810
}, {
    endTime: 1573597738298,
    gameScore: 0.9,
    setId: 15,
    starCount: 3,
    startTime: 1573597691069,
}]) // sentence set id to game record object

export const starCounts = writable({}) // set id to starCount

// scores: sentenceId to score
export function updateGameRecord(set, startTime) {
    let scoreSum = 0;
    set.sentenceIds
        .map(id => get(scores)[id])
        .forEach(score => {
            if (score >= 80) {
                scoreSum += 1
            } else if (score >= 60) {
                scoreSum += 0.5
            }
        })
    let gameScore = scoreSum / set.sentenceIds.length
    let starCount = 0;
    if (gameScore >= 0.9) {
        starCount = 3
    } else if (gameScore >= 0.75) {
        starCount = 2
    } else if (gameScore >= 0.5) {
        starCount = 1
    }
    let gameRecord = {
        setId: set.id,
        startTime: startTime,
        endTime: Date.now(),
        gameScore: gameScore,
        starCount: starCount
    }

    let newGameRecords = get(gameRecords)
    newGameRecords.push(gameRecord)
    gameRecords.set(newGameRecords)

    sendPost("/gameRecord", gameRecord)
}

// post request to server
export function sendPost(path, json) {
    const method = "POST"
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify(json)
    fetch(path,
        { method, headers, body })
        .then(console.log)
        .catch(console.error);
}

export function getStarCount(setId) {
    let starCount = 0
    let records = get(gameRecords)
        .filter(record => record.setId == setId)
        .sort((r1, r2) => r2.startTime - r1.startTime)
    if (records.length > 0) {
        starCount = records[0].starCount
    }

    return starCount
}

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

function subscribeAndLog(variable, name, handler = undefined) {
    variable.subscribe(v => {
        console.log(`| ${name} => `, v);
        if (handler != undefined) {
            handler(v)
        }
    })
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
subscribeAndLog(gameRecords, 'gameRecords', (records) => {
    var newStarCounts = get(starCounts)
    records.forEach(record => {
        let oldCount = starCounts[record.setId]
        if (oldCount == undefined || oldCount < record.starCount) {
            newStarCounts[record.setId] = record.starCount
        }
    })
    starCounts.set(newStarCounts)
})
subscribeAndLog(starCounts, 'starCounts')

console.log(`= Messenger 遊戲頁面狀態 =`)
subscribeAndLog(messages, 'messages')
subscribeAndLog(isPlaying, 'isPlaying')
subscribeAndLog(gameMode, 'gameMode')
subscribeAndLog(displayMode, 'displayMode')
subscribeAndLog(speed, 'speed')