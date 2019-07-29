import fetch from 'node-fetch'
import API_KEY from "./googleAPIKey.js"

const Voices = {
    jaF1: { name: 'ja-JP-Wavenet-A', languageCode: 'ja-JP' },
    jaF2: { name: 'ja-JP-Wavenet-B', languageCode: 'ja-JP' },
    jaM1: { name: 'ja-JP-Wavenet-C', languageCode: 'ja-JP' },
    jaM2: { name: 'ja-JP-Wavenet-D', languageCode: 'ja-JP' },
    enM1: { name: 'en-US-Wavenet-A', languageCode: 'en-US' },
    enM2: { name: 'en-US-Wavenet-B', languageCode: 'en-US' },
    enM3: { name: 'en-US-Wavenet-D', languageCode: 'en-US' },
    enF1: { name: 'en-US-Wavenet-C', languageCode: 'en-US' },
    enF2: { name: 'en-US-Wavenet-E', languageCode: 'en-US' },
    enM3: { name: 'en-US-Wavenet-F', languageCode: 'en-US' },
}

const GOOGLE_TEXT_TO_SPEECH_URL = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + API_KEY

export let ttsAPI = async (req, res) => {
    console.log(req.query.text, req.query.voice)
    const body = JSON.stringify({
        input: { text: req.query.text },
        voice: Voices[req.query.voice],
        audioConfig: {
            audioEncoding: 'OGG_OPUS',
            speakingRate: 1.0,
        },
    })
    const response = await fetch(GOOGLE_TEXT_TO_SPEECH_URL, {
        method: 'POST',
        body
    }).then(res => res.json())
    // res.set('Cache-Control', 'public, max-age=30000000');
    res.send(response.audioContent)
}
