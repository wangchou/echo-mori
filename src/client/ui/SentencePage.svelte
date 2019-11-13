<script>
    import { get } from 'svelte/store'
    import { route, scores } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { selectedSentenceId, currentSetId } from '../data/states.js'
    import TopBar from './components/TopBar.svelte'
    import FlexDiv from './components/FlexDiv.svelte'
    import SentencePair from './components/SentencePair.svelte'
    import { stillWorking } from '../utils/misc.js'

    var sid = undefined
    selectedSentenceId.subscribe(v => {
        sid = v
    })
    let currentSet = sentenceSets.filter(set => set.id == get(currentSetId))[0]
    let ids = currentSet.sentenceIds

    function nextSentence() {
        let index = ids.indexOf(sid)
        let nextSid = ids[(index + 1) % ids.length]
        selectedSentenceId.set(nextSid)
    }
    function prevSentence() {
        let index = ids.indexOf(sid)
        let prevSid = ids[(index + ids.length - 1) % ids.length]
        selectedSentenceId.set(prevSid)
    }
</script>

<FlexDiv style="position: relative">
    <TopBar closeOnly={true} backRoute={'/levelDetail'} />
    <div class="scoreDiv">
        Previous score:
        <div class="score">{$scores[sid] ? $scores[sid] : 0}</div>
    </div>
    <div class="centerContent">
        <SentencePair {sid} />
    </div>
    <div class="bottomBar">
        <div class="startButton clickable" on:click={stillWorking}>TRY AGAIN</div>
        <div class="halfButton prevPosition clickable" on:click={nextSentence}>PREV</div>
        <div class="halfButton nextPosition clickable" on:click={prevSentence}>NEXT</div>
    </div>
</FlexDiv>

<style>
    .scoreDiv {
        font-size: 14px;
        width: 100%;
        text-align: center;
    }
    .score {
        font-size: 48px;
    }
    .centerContent {
        flex-grow: 1;
        flex-basis: 0;
    }
    .bottomBar {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 120px;
        padding: 10px 30px;
    }
    .startButton {
        width: 100%;
        background: #c4c4c4;
        padding: 12px 0;
        text-align: center;
        border-radius: 24px;
    }
    .halfButton {
        position: absolute;
        padding: 12px 0;
        width: 40%;
        text-align: center;
        border-radius: 24px;
        border: 1px solid #c4c4c4;
    }
    .prevPosition {
        top: 65px;
        left: 5%;
    }
    .nextPosition {
        top: 65px;
        left: 55%;
    }
</style>
