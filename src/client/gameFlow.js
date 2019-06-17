import { PlaySpeed, Voices } from './model/constants.js' 
import { say, listen } from './speechEngine.js'
import { comments } from './model/store.js'

const sentences = [
    { text: 'こんにちは、ともさん', speed: PlaySpeed.slow, voice: Voices.jaM1 },
    { text: '今日はいい天気ですね', speed: PlaySpeed.slow, voice: Voices.jaF1 },
    { text: 'そうですね。', speed: PlaySpeed.slow, voice: Voices.jaM1 },
    { text: 'じゃあ、またね。', speed: PlaySpeed.slow, voice: Voices.jaF1 },
]

export const playGame = async () => {
    for (let i in sentences) {
        let sentence = sentences[i]
        comments.update(x => [...x, { author: 'teacher', text: sentence.text }])

        let duration = await say(sentence.text, sentence.speed, sentence.voice)

        // plus 600 ms
        let recognizedText = await listen(duration + 600)
        comments.update(x => [...x, { author: 'student', text: recognizedText }])
    }
}