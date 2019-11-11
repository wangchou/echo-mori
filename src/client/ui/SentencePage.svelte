<script>
    import TopBar from './components/TopBar.svelte'
    import { route } from '../data/states.js'
    import FlexDiv from './components/FlexDiv.svelte'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { selectedSentenceId } from '../data/states.js'

    var sid = undefined
    selectedSentenceId.subscribe(v => {
        sid = v
    })
</script>

<style>
    .centerContent {
        flex-grow: 1;
        flex-basis: 0;
    }
    .sentenceCard {
        position: relative;
        padding: 10px;
        margin: 0 20px 20px 20px;
        border: 1px solid #cdcdcd;
        padding-right: 20px;
    }
    .rightCenter {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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

<FlexDiv style="position: relative">
    <TopBar closeOnly={true} backRoute={'/levelDetail'} />
    <div class="centerContent">
        <div class="sentenceCard clickable">
            {idToRow[sid].en}
            <br />
            {idToRow[sid].ch}
            <div class="rightCenter">
                <i class="fas fa-volume-up" />
            </div>
        </div>
        <div class="sentenceCard clickable">
            what you said
            <br />
            ...
            <div class="rightCenter">
                <i class="far fa-play-circle" />
            </div>
        </div>
    </div>
    <div class="bottomBar">
        <div class="startButton clickable">START</div>
        <div class="halfButton prevPosition clickable">PREV</div>
        <div class="halfButton nextPosition clickable">NEXT</div>
    </div>
</FlexDiv>
