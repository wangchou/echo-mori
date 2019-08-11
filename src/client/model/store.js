import { writable, derived } from 'svelte/store';

export const comments = writable([])
export const isPlaying = writable(false)
export const textareaValue = writable("What's up, Andy.|Andy，最近好嗎？\nHi. How are you doing today?|嗨，今天過得如何？\nPretty good!|非常棒。\nThanks for coming.|謝謝你過來。\nAre you ready for watching the video?|你準備好要來看影片了嗎？\nI was born today.|我生來就準備好了！")
export const currentSetId = writable(undefined)
export const isSelectedTag = writable({})