<script>
    import { get } from 'svelte/store'
    import { beforeUpdate } from 'svelte'
    import { currentSetId, isPlaying, route, selectedSentenceId, scores } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { getColorByScore } from '../data/constants.js'
    import { speed } from '../data/states.js'
    import TopBar from './components/TopBar.svelte'
    import FlexDiv from './components/FlexDiv.svelte'

    var currentSet = {}
    currentSetId.subscribe(id => {
        currentSet = sentenceSets.filter(set => set.id == id)[0]
    })

    function backToMain() {
        currentSetId.set(undefined)
        isPlaying.set(false)
        route.set('/levels')
    }

    function selectSentence(sid) {
        selectedSentenceId.set(sid)
        route.set('/sentence')
    }
    function getScoreBarStyle(sid) {
        let score = get(scores)[sid]
        let color = getColorByScore(score)
        let style =
            `width:${score}%;` +
            `background: ${color};` +
            `border-left: 1px solid ${color};` +
            `border-right: 1px solid ${color};`
        console.log(style)
        return style
    }
</script>

<FlexDiv>
    <TopBar
        backRoute={'/levels'}
        title={`${currentSet.tag} - Level ${currentSet.tagIndex}`}
        starCount={3} />

    <div class="sentenceList">
        <div class="currentSetDiv">
            {#each currentSet.sentenceIds as id}
                <div
                    class="sentenceCard clickable"
                    on:click={() => {
                        selectSentence(id)
                    }}>
                    {idToRow[id].en}
                    <br />
                    {idToRow[id].ch}
                    {#if $scores[id] != undefined}
                        <div class="scoreBar" style={getScoreBarStyle(id)} />
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <div class="bottomBar">
        <div
            class="startButton clickable"
            on:click={() => {
                route.set('/game')
            }}>
            START
        </div>
    </div>
</FlexDiv>

<style>
    /* Sentence List */
    .sentenceList {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: scroll;
    }

    .currentSetDiv {
        padding: 0px 10px;
    }

    .sentenceCard {
        position: relative;
        padding: 10px;
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
    }
    .scoreBar {
        position: absolute;
        width: 100%;
        top: -1px;
        left: -1px;
        border-left: 1px solid red;
        border-right: 1px solid red;
        height: 5px;
        background: red;
    }

    /* Bottom Start Button */
    .bottomBar {
        position: relative;
        bottom: 0px;
        width: 100%;
        height: 50px;
        margin: 0px auto;
        padding: 10px 0;
        border-top: 1px solid black;
        background: white;
    }
    .startButton {
        width: 80%;
        min-width: 150px;
        background: #c4c4c4;
        margin: 0 auto;
        padding: 12px;
        text-align: center;
        border-radius: 24px;
    }
</style>
