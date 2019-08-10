var recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.interimResults = false
recognition.lang = "en-US"

export let ListenResultType = {
    success: 'success',
    error: 'error',
    cannotHear: 'cannotHear'
}

export let listen = (duration) => {
    recognition.start();
    recognition.lang = "en-US"
    setTimeout(() => { recognition.stop() }, duration)

    let promise = new Promise((resolve, reject) => {
        recognition.onresult = (event) => {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                resolve({
                    text: event.results[i][0].transcript,
                    type: ListenResultType.success
                })
            }
        }
        recognition.onerror = () => {
            resolve({text: '', type: ListenResultType.error})
        }
        recognition.onend = () => {
            resolve({text: '', type: ListenResultType.cannotHear})
        }
    })
    return promise
}

function getMS() {
    return new Date().getTime()
}

var lastText = ""
var lastVoice = ""
var lastAudio = ""

export let getAudioDuration = async (text, voice) => {
    lastText = ""
    lastVoice = ""
    lastAudio = undefined
    var response = await fetch(`/tts?text=${text}&voice=${voice}`)
        .then(res =>
            res.text()
        )
    return new Promise((resolve, reject) => {
        lastText = text
        lastVoice = voice
        lastAudio = new Audio('data:audio/wav;base64,' + response)
        lastAudio.onloadedmetadata = () => {
            resolve(lastAudio.duration)
        }
        // todo handling time out error
    })
}

export let say = async (text, speed, voice) => {
    var startMS = getMS()
    if (text != lastText || voice != lastVoice) {
        var response = await fetch(`/tts?text=${text}&voice=${voice}`)
            .then(res =>
                res.text()
            )
        lastText = text
        lastVoice = voice
        lastAudio = new Audio('data:audio/wav;base64,' + response)
    }
    let promise = new Promise(function (resolve, reject) {
        lastAudio.onended = () => {
            resolve(getMS() - startMS)
        }
    })
    lastAudio.play()
    lastAudio.playbackRate = speed
    return promise
}
