import { PlaySpeed, Voices } from './constants.js'
import { writable } from 'svelte/store'

export var speed = writable(0.85)

export var voice = writable(Voices.enF1)