import { writable, derived } from 'svelte/store';
import { GameMode, DisplayMode, PlaySpeed, Voice } from './constants.js'

// dataSet related
export const currentSetId = writable(undefined)
export const isSelectedTag = writable({})
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)

// game status
export const messages = writable([])        // Messenger 遊戲中的訊息
export const isPlaying = writable(false)    // 遊戲中 or 暫停

// game settings
export const gameMode = writable(GameMode.shadowing)
export const displayMode = writable(DisplayMode.both)

export const speed = writable(0.8)
export const voice1 = writable(Voice.enF1)
export const voice2 = writable(Voice.enM1)