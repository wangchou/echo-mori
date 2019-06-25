import fetch from 'node-fetch'
import API_KEY from "../../../secret/api_key.js"

const Voices = {
    jaF1: { name: 'ja-JP-Wavenet-B', languageCode: 'ja-JP' },
    jaF2: { name: 'ja-JP-Wavenet-A', languageCode: 'ja-JP' },
    jaM1: { name: 'ja-JP-Wavenet-C', languageCode: 'ja-JP' },
    jaM2: { name: 'ja-JP-Wavenet-D', languageCode: 'ja-JP' },
}

const GOOGLE_TEXT_TO_SPEECH_URL = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + API_KEY

export let ttsAPI = async (req, res) => {
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
    res.set('Cache-Control', 'public, max-age=30000000');
    res.send(response.audioContent)
}
