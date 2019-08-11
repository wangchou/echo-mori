import fs from 'fs'
import csv from 'fast-csv'
let fname = './echo-mori-20190810.csv'

async function loadCSV() {
    var rows = []
    return new Promise((resolve, reject) => {
        fs.createReadStream(fname)
            .pipe(csv.parse({ headers: true }))
            .on('data', row => {
                rows.push(row)
            })
            .on('error', error => {
                console.error(error)
                resolve(error)
            })
            .on('end', rowCount => {
                console.log(`Parsed ${rowCount} rows`)
                resolve(rows)
            })
    })
}

function getDifficultyLabel(difficulty) {
    if (difficulty < 5) return "入門一"
    if (difficulty < 7) return "入門二"
    if (difficulty < 9) return "初級一"
    if (difficulty < 11) return "初級二"
    if (difficulty < 13) return "中級一"
    if (difficulty < 15) return "中級二"
    if (difficulty < 17) return "中高級一"
    if (difficulty < 19) return "中高級二"
    if (difficulty < 21) return "中高級三"
    return "高級一"
}

async function main() {
    let rows = await loadCSV()
    let idToRow = {}
    let tagToSentenceIds = {}
    // Deduplicated english sentences
    let enToId = {}
    rows.forEach(row => enToId[row.en] = row)
    rows = Object.values(enToId)

    // sort
    rows.sort((row1, row2) => {
          return parseFloat(row1.combinedDifficulty) - parseFloat(row2.combinedDifficulty)
        })
        .filter(row => row.isOneHundredPoints)
        .map(row => {
            let tags = []
            row.manualTag.split(",").filter(t => t != "").forEach(tag => tags.push(tag.replace(/ /g, "")))
            row.tranlatedTag.split(",").filter(t => t != "").forEach(tag => tags.push(tag.replace(/ /g, "")))
            let newRow = row
            delete newRow.manualTag
            delete newRow.translatedTag
            newRow.tags = tags
            return newRow
        })
        .forEach(row => {
            idToRow[row.id] = row
            row.tags.forEach(tag => {
                if (!tagToSentenceIds[tag]) {
                    tagToSentenceIds[tag] = []
                }
                tagToSentenceIds[tag].push(row.id)
            })
        })
    //console.log(rows)

    // generate sentenceSets, each set has 5-10 sentences
    var sentenceSets = []
    var setnenceSetId = 0
    Object.keys(tagToSentenceIds)
        .filter(key => tagToSentenceIds[key].length >= 5)
        .forEach(key => {
            console.log(key, tagToSentenceIds[key].length)
            let sentenceCount = tagToSentenceIds[key].length
            var tagIndex = 1
            let index = 0
            while (index + 14 < sentenceCount) {
                let sentenceSet = {
                    id: setnenceSetId,
                    tag: key,
                    tagIndex: tagIndex,
                    sentenceIds: tagToSentenceIds[key].slice(index, index + 10)
                }
                tagIndex += 1
                sentenceSets.push(sentenceSet)
                setnenceSetId += 1
                index += 10
            }
            if (sentenceCount - index <= 10) {
                let sentenceSet = {
                    id: setnenceSetId,
                    tag: key,
                    tagIndex: tagIndex,
                    sentenceIds: tagToSentenceIds[key].slice(index, sentenceCount)
                }
                sentenceSets.push(sentenceSet)
                setnenceSetId += 1
                tagIndex += 1
            } else {
                var sentenceSet = {
                    id: setnenceSetId,
                    tag: key,
                    tagIndex: tagIndex,
                    sentenceIds: tagToSentenceIds[key].slice(index, sentenceCount - 5)
                }
                sentenceSets.push(sentenceSet)
                setnenceSetId += 1
                tagIndex += 1
                sentenceSet = {
                    id: setnenceSetId,
                    tag: key,
                    tagIndex: tagIndex,
                    sentenceIds: tagToSentenceIds[key].slice(sentenceCount - 5, sentenceCount)
                }
                sentenceSets.push(sentenceSet)
                setnenceSetId += 1
                tagIndex += 1
            }
        })
    sentenceSets.map(sentenceSet => {
        var newSet = sentenceSet
        var difficultySum = sentenceSet.sentenceIds.reduce((acc, sentenceId) => {
            return parseFloat(acc) + parseFloat(idToRow[sentenceId].combinedDifficulty)
        }, 0.0)
        newSet.difficulty = difficultySum/sentenceSet.sentenceIds.length

        var syllablesSum = sentenceSet.sentenceIds.reduce((acc, sentenceId) => {
            return parseFloat(acc) + parseFloat(idToRow[sentenceId].syllablesCount)
        }, 0.0)
        newSet.syllablesCount = syllablesSum/sentenceSet.sentenceIds.length

        var wordDifficultySum = sentenceSet.sentenceIds.reduce((acc, sentenceId) => {
            return parseFloat(acc) + parseFloat(idToRow[sentenceId].wordDifficulty)
        }, 0.0)
        newSet.wordDifficulty = wordDifficultySum/sentenceSet.sentenceIds.length
        newSet.difficultyLabel = getDifficultyLabel(newSet.difficulty)
        //console.log(newSet.difficulty, difficultySum, sentenceSet.sentenceIds.length)
        return newSet
    })
    sentenceSets.sort((set1, set2) => {
        return set1.difficulty - set2.difficulty
    })
    //console.log(sentenceSets)
    sentenceSets.forEach(set => {
        console.log("\n")
        var title = "= " + set.tag + "(" + set.tagIndex + "), " + set.difficultyLabel + ", "
        title += "平均音節數：" + set.syllablesCount.toFixed(1) + ", 單字難度：" + set.wordDifficulty.toFixed(1) + " ="
        console.log(title)
        set.sentenceIds.forEach(id => {
            let row = idToRow[id]
            console.log(row.en, row.ch)
        })
    })

    const jsonString = JSON.stringify(sentenceSets)
    fs.writeFile('./sentenceSets.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    const jsonString2 = JSON.stringify(idToRow)
    fs.writeFile('./idToRow.json', jsonString2, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

main()
