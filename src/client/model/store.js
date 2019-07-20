import { writable } from 'svelte/store';

export const comments = writable([])
export const textareaValue = writable("Hi~\nEnter your own text?\n")