# 回音森林 (echo-mori)
Echoic Memory Forest (聽覺記憶森林、簡稱 echo mori)

## 目標
 - 讓學校/老師/自學者，能夠使用最新的科技/AI，提升學生的口說能力 (英、日文 or ...)
 - 建立台灣外語學習的免費語料庫，希望能照台灣學制做難度分級。 (CC-??-?? 未定授權、希望每一句外文, 都有正確的台灣華語翻譯)

## 練口說流程
 * 網站說一句
 * 學生模仿模仿說
 * 接著用語音辨識評分學生說的對不對。

`跟讀(Shadowing)`會大量使用能維持3 ~ 4秒聽覺記憶(Echoic Memory)。透過大量練習`聽覺記憶的編碼與解碼`，可以有效訓練口說。

## 使用的技術
  - Google TTS (文字轉語音)
  - Chrome 語音辨識

## 目前畫面，只有5句日文。
<img src="https://raw.githubusercontent.com/wangchou/echo-mori/master/img/20190713.jpg" height="320">

## 如何在 local 跑起來

* 安裝 nodejs
* clone 這個 repo
```sh
  cp src/server/googleAPIKey.template.js src/server/googleAPIKey.js
  # 於 googleAPIKey.js 輸入所需的 key (7/20 黑客松當天請找作者拿)
  npm install
  npm run dev
```
* 打開 chrome 在網址列輸入 chrome://flags/#allow-insecure-localhost，選擇開啟該選項
* 最後打開 `https://localhost:4000`



PS: 作者也有寫付費的 iOS App「[今話したい](https://github.com/wangchou/Shadowing)」。這個免費的新專案是為了 Web / Android 的使用者。讓這簡單的方法能幫助更多人學習。
