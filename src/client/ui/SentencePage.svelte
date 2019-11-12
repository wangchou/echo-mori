<script>
    import TopBar from './components/TopBar.svelte'
    import { route } from '../data/states.js'
    import FlexDiv from './components/FlexDiv.svelte'
    import SentencePair from './components/SentencePair.svelte'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { selectedSentenceId } from '../data/states.js'

    var sid = undefined
    selectedSentenceId.subscribe(v => {
        sid = v
    })
</script>

<FlexDiv style="position: relative">
    <TopBar closeOnly={true} backRoute={'/levelDetail'} />
    <div class="centerContent">
        <SentencePair {sid} />
    </div>
    <div class="bottomBar">
        <div class="startButton clickable">START</div>
        <div class="halfButton prevPosition clickable">PREV</div>
        <div class="halfButton nextPosition clickable">NEXT</div>
    </div>
</FlexDiv>

<style>
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
