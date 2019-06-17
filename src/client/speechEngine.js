var recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.interimResults = false

export let listen = (duration) => {
    recognition.start();
    setTimeout(() => { recognition.stop() }, duration)


    let promise = new Promise((resolve, reject) => {
        recognition.onresult = (event) => {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                resolve(event.results[i][0].transcript)
            }
        }
        recognition.onerror = () => {
            resolve("error")
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