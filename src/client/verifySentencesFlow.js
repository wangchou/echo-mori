import { say, listen, getAudioDuration, ListenResultType } from './speechEngine.js'
import { sentences20190810 } from './sentences20190810.js'
import { LangType, calculateScore, getPhoneticCharacters } from './calculateScore.js'

// only for preprocessing, let googlte tts talk to chrome stt. verify sentences
let selfRecognized = async (text, voice, recognized) => {
    return await fetch(`/updateSelfRecognized?text=${text}&voice=${voice}&recognized=${recognized}`)
}

let getSelfRecognized = async (text, voice) => {
    return await fetch(`/selfRecognized?text=${text}&voice=${voice}`)
}

let sentences = sentences20190810.split("\n").filter(s => (s != ""))
let voices = ["enF1", "enM1"]
console.log("total number of sentence are:", sentences.length)

export const verifySentences = async () => {
    console.log(sentences, voices)
    for (var sentenceIdx in sentences) {
        let sentence = sentences[sentenceIdx]
        // var recognizedText1 = await getSelfRecognized(sentence, voices[0]).then(res => res.text())
        // var recognizedText2 = await getSelfRecognized(sentence, voices[1]).then(res => res.text())
        // var score1 = await calculateScore(sentence, recognizedText1)
        // var score2 = await calculateScore(sentence, recognizedText2)
        // if (score1 != 100 || score2 != 100) {
        //     console.log(false)
        //     console.log(`\n---`)
        //     console.log(`${sentenceIdx}/${sentences.length}`)
        //     console.log(await getPhoneticCharacters(sentence))
        //     console.log(await getPhoneticCharacters(recognizedText1), score1)
        //     console.log(await getPhoneticCharacters(recognizedText2), score2)
        // } else {
        //     console.log(true)
        // }

        for (var voiceIdx in voices) {
            let voice = voices[voiceIdx]

            var recognizedText = await getSelfRecognized(sentence, voice).then(res => res.text())

            if (recognizedText) {
                console.log("== Previous recognized text loaded ==")
                console.log(sentence, voice)
                console.log(recognizedText)
                continue
            }
            let durationInSeconds = await getAudioDuration(sentence, voice)
            console.log(durationInSeconds)
            setTimeout(() => say(sentence, 1.0, voice), 500)
            let result = await listen(durationInSeconds * 1100 + 500)

            switch (result.type) {
                case ListenResultType.success:
                    await selfRecognized(sentence, voice, result.text)
                    console.log("== New recognized text Added ==")
                    console.log(sentence, voice)
                    console.log(result.text)
                    break;
                case ListenResultType.cannotHear:
                    console.log("聽不清楚，請大聲一點。")
                    break;
                case ListenResultType.error:
                    console.log("抱歉，目前出現了一些問題。")
                    break;
            }
        }
    }
}