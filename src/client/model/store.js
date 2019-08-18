import { writable, derived } from 'svelte/store';
import { GameMode, DisplayMode } from './constants.js'

// dataSet related
export const currentSetId = writable(undefined)
export const isSelectedTag = writable({})
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)

// game status
export const comments = writable([])
export const isPlaying = writable(false)

// setting
export const gameMode = writable(GameMode.shadowing)
export const displayMode = writable(DisplayMode.both)