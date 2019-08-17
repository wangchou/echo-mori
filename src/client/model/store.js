import { writable, derived } from 'svelte/store';

export const comments = writable([])
export const isPlaying = writable(false)
export const currentSetId = writable(undefined)
export const isSelectedTag = writable({})
export const isSupportRecognition = writable('webkitSpeechRecognition' in window)