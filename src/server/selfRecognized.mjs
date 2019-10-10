import { updateSelfRecognized, getSelfRecognized } from "./db.mjs"
import { Voice } from "./tts.mjs"

export let selfRecognizedAPI = async (req, res) => {
    let text = req.query.text
    let voiceName = Voice[req.query.voice].name
    let recognizedText = req.query.recognized
    console.log("post selfRecognized", text, voiceName, recognizedText)

    await updateSelfRecognized(req.db, text, voiceName, recognizedText)
    res.send()
}

export let getSelfRecognizedAPI = async (req, res) => {
    let text = req.query.text
    let voiceName = Voice[req.query.voice].name
    console.log("get selfRecognized", text, voiceName)

    let recognizedText = await getSelfRecognized(req.db, text, voiceName)
    res.send(recognizedText)
}