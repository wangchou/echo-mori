<script>
    import { get } from 'svelte/store'
    import { beforeUpdate } from 'svelte'
    import { currentSetId, isPlaying, route, selectedSentenceId } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { speed } from '../data/states.js'
    import TopBar from './components/TopBar.svelte'
    import FlexDiv from './components/FlexDiv.svelte'

    var currentSet = {}
    var isShowContent = true
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
</script>

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
        padding: 10px;
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid #cdcdcd;
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
                </div>
            {/each}
        </div>
    </div>
    <div class="bottomBar">
        <div class="startButton clickable">START</div>
    </div>
</FlexDiv>
