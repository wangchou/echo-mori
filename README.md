# 回音森林 (echo-mori)
Echoic Memory Forest (聽覺記憶之森、簡稱 echo mori)

#### 目標
 - 讓學校/老師/自學者，能夠使用最新的科技/AI，提升學生的口說能力 (英、日文 or ...)
 - 建立台灣外語學習的免費語料庫，希望能照台灣學制做難度分級。 (CC-??-?? 未定授權、希望每一句外文, 都有正確的台灣華語翻譯)

#### 練口說流程
 * 網站說一句
 * 學生模仿模仿說
 * 接著用語音辨識評分學生說的對不對。

`跟讀(Shadowing)`會大量使用能維持3 ~ 4秒聽覺記憶(Echoic Memory)。透過大量練習`聽覺記憶的編碼與解碼`，可以有效訓練口說。

#### 使用的技術
  - Google TTS (文字轉語音)
  - Chrome 語音辨識

### 目前畫面，只有1500句英文。
<img src="https://raw.githubusercontent.com/wangchou/echo-mori/master/img/20190713.jpg" height="320">

#### 如何在 local 跑起來

* 安裝 nodejs (node version > **v12.12.0**)
* clone 這個 repo
```sh
  cp src/server/googleAPIKey.template.js src/server/googleAPIKey.js
  # 於其中輸入你申請的 Google TTS API Key
  npm install
  npm run dev
```
* 打開 chrome 在網址列輸入 `chrome://flags/#allow-insecure-localhost` 選擇開啟該選項
* 最後打開 `https://localhost:4000`

#### 程式架構 (2019.Oct.11th)
前端使用 Svelte Framework 來刻 UI，所以是 MVVM 的架構，state 放在 ```src/data/states.js```。當 state 更動時，UI 會跟著變、console 也會 log 變動。目前只有兩個頁面 (句字集頁 & 遊戲頁)，1500句的資料都是直接塞到前端。

遊戲的流程放在 ```gameFlow.js```，和 UI 頁面是分開的。主要透過 **messages & isPlaying** 等 state 來溝通。打算以後同個遊戲流程，可以對應到多種不同 UI。

後端目前沒有資料庫。最近會加 user & game history table。

#### 目錄
- client/
  - core: 遊戲流程、語音(合成 & 辨識)、計算句子分數
  - data: 1500句子(tag, 翻譯...)、MVVM 的 states
  - ui: Svelte Components
  - utils
- preprocess/
    - 前處理，把 Google Spreadsheet 的句子資料，補上難度和音節長度、移除無法辨識的，整理後包成 json
- server/
    - serve /public 目錄。(rollup 會把 client 的相關檔案打包後放到 /public 目錄下。並且會 auto build & live reload)
    - endpoints
        - /tts: 把字串丟給 Google Text-to-Speech API 然後傳音檔到前端
        - /mecab: 傳回日文字串的假名、詞性等資訊
        - /selfRecognized & /updateSelfRecognized: 前處理時，暫存辨識結果用。
- test/ :測試們
- ava.config.js: 測試的 config
- rollup.config.js: bundler 的 config

#### 附錄
- [提案投影片 @ g0v 35th](https://docs.google.com/presentation/d/1DMdIVLqwIjcZRoVV7quEEByhs_opCq0Q8VC1tB6H8ew/edit?usp=sharing)

- 作者也有寫付費的 iOS App「[今話したい](https://github.com/wangchou/Shadowing)」。這個免費的新專案是為了 Web / Android 的使用者。以簡單的工具能幫助更多人指導/學習。
