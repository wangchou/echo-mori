var recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.interimResults = false

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

export let say = async (text, speed, voice) => {
    var startMS = getMS()
    var response = await fetch(`/tts?text=${text}&voice=${voice}`)
        .then(res =>
            res.text()
        )

    const audio = new Audio('data:audio/wav;base64,' + response)
    let promise = new Promise(function (resolve, reject) {
        audio.onended = () => {
            resolve(getMS() - startMS)
        }
    })
    audio.play()
    audio.playbackRate = speed
    return promise
}
