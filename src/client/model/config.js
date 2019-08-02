import { PlaySpeed, Voices } from './constants.js'
import { writable } from 'svelte/store'

export var speed = writable(0.8)
export var voice = writable(Voices.enF1)
export var voiceM2 = writable(Voices.enM1)