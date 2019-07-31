import { writable } from 'svelte/store';

export const comments = writable([])
export const textareaValue = writable("Hi, my name is Andy.|嗨，我叫做安迪。\nHi, I'm Melody.|嗨我叫美樂蒂。\nNice to meet you.|很高興認識你。\nNice to meet you, too.|我也很高興認識你。\nHow are you today?|你今天過得還好嗎？\nGreat.|很好。")