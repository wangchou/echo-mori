import { writable, derived } from 'svelte/store';
import { GameMode, DisplayMode, PlaySpeed, Voice } from './constants.js'

// dataSet related
export const currentSetId = writable(14)
export const selectedTag = writable('日常')
export const selectedSentenceId = writable(undefined)
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)
export const user = writable({})
export const route = writable('/')

// game status
export const messages = writable([])        // Messenger 遊戲中的訊息
export const isPlaying = writable(false)    // 遊戲中 or 暫停

// game settings
export const gameMode = writable(GameMode.shadowing)
export const displayMode = writable(DisplayMode.both)

export const speed = writable(0.8)
export const voice1 = writable(Voice.enF1)
export const voice2 = writable(Voice.enM1)


// console log state changes
console.log(`= 句子集頁面狀態 =`)
currentSetId.subscribe(value => {
    console.log(`| currentSetId =>`, value)
})

selectedTag.subscribe(value => {
    console.log(`| selectedTag =>`, value)
})

selectedSentenceId.subscribe(value => {
    console.log(`| selectedSentenceId =>`, value)
})
user.subscribe(value => {
    console.log(`| user =>`, value)
})
route.subscribe(value => {
    console.log(`| route =>`, value)
})

console.log(`= Messenger 遊戲頁面狀態 =`)
messages.subscribe(value => {
    console.log(`| messages => `, value)
})

isPlaying.subscribe(value => {
    console.log(`| isPlaying => `, value)
})

gameMode.subscribe(value => {
    console.log(`| gameMode => `, value)
})

displayMode.subscribe(value => {
    console.log(`| displayMode => `, value)
})

speed.subscribe(value => {
    console.log(`| speed => `, value)
})
