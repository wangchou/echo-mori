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
        recognition.onend = () => {
            resolve("聽不清楚")
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

export let getTokenInfo = async (jpnStr) => {
    return await fetch(`/mecab?jpnStr=${jpnStr}`)
        .then(res =>
            res.json()
        )
}

export let getRubyText = (tokenInfo) => {
    var innerText = tokenInfo.map(info => {
        return `<rb>${info[0]}</rb><rt>${info[2]}</rt>`
    }).join('')
    return `<ruby>${innerText}</ruby>`
}







