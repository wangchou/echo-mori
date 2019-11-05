import fetch from 'node-fetch'
import configs from "./configs/configs.js"

export const Voice = {
    jaF1: { name: 'ja-JP-Wavenet-A', languageCode: 'ja-JP' },
    jaF2: { name: 'ja-JP-Wavenet-B', languageCode: 'ja-JP' },
    jaM1: { name: 'ja-JP-Wavenet-C', languageCode: 'ja-JP' },
    jaM2: { name: 'ja-JP-Wavenet-D', languageCode: 'ja-JP' },
    enM1: { name: 'en-US-Wavenet-A', languageCode: 'en-US' },
    enM2: { name: 'en-US-Wavenet-B', languageCode: 'en-US' },
    enM3: { name: 'en-US-Wavenet-D', languageCode: 'en-US' },
    enF1: { name: 'en-US-Wavenet-C', languageCode: 'en-US' },
    enF2: { name: 'en-US-Wavenet-E', languageCode: 'en-US' },
    enF3: { name: 'en-US-Wavenet-F', languageCode: 'en-US' },
}

const GOOGLE_TEXT_TO_SPEECH_URL = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + configs.googleAPIKey
console.log(GOOGLE_TEXT_TO_SPEECH_URL)

export let ttsAPI = async (req, res) => {
    let text = req.query.text
    let voiceName = Voice[req.query.voice].name
    console.log(text, voiceName)

    const body = JSON.stringify({
        input: { text: req.query.text },
        voice: Voice[req.query.voice],
        audioConfig: {
            audioEncoding: 'OGG_OPUS',
            speakingRate: 1.0,
        },
    })

    let response = await fetch(GOOGLE_TEXT_TO_SPEECH_URL, {
        method: 'POST',
        body
    }).then(res => res.json())

    // res.set('Cache-Control', 'public, max-age=30000000');
    res.send(response.audioContent)
}
