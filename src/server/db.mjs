export let getTTS = (db, text, voiceName) => {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT audio_content FROM tts WHERE voice_name = ' + db.escape(voiceName) + " and text = " + db.escape(text);
        var qur = db.query(sql, function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows[0].audio_content.toString())
            }
        });
    })
}

export let saveTTS = (db, text, voiceName, audioContent) => {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO tts (voice_name, text, audio_content) VALUES (
            ${db.escape(voiceName)},
            ${db.escape(text)},
            ${db.escape(audioContent)}
            ) ON DUPLICATE KEY UPDATE audio_content = ${db.escape(audioContent)}`;
        var qur = db.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve()
            }
        });
    })
}

export let updateTTSRecognized = (db, text, voiceName, recognized) => {
    return new Promise((resolve, reject) => {
        var sql = 'UPDATE tts SET recognized = ' + db.escape(recognized) +
                  ' WHERE id = ' + db.escape(voiceName) + " and text = " + db.escape(text);
        var qur = db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve()
                console.log(result.affectedRows + " record(s) updated");
            }
        });
    })
}