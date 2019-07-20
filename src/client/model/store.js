import { writable } from 'svelte/store';

export const comments = writable([])
export const textareaValue = writable("Hi, my name is Andy.\nHi, I'm Melody.\nNice to meet you.\nNice to meet you, too.\nHow are you today?\nGreat.")