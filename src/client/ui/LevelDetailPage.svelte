<script>
    import { get } from 'svelte/store'
    import { beforeUpdate } from 'svelte'

    import { currentSetId, isPlaying, route, selectedSentenceId } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { speed } from '../data/states.js'

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
        //route.set('/sentence')
    }
</script>

<style>
    .outFlexDiv {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 600px;
        margin: 0px auto;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
    }

    /* Navigation Bar */
    .topBar {
        position: relative;
        height: 30px;
        padding: 5px 0px;
        margin: 0px 20px;
        padding-bottom: 20px;
    }

    .backButton {
        position: absolute;
        font-size: 20px;
    }

    .backButton:hover {
        background: rgba(96, 144, 48, 0.1);
        cursor: pointer;
    }

    .title {
        position: absolute;
        width: 100%;
        font-size: 20px;
        text-align: center;
    }

    .threeStars {
        position: absolute;
        right: 0px;
        top: 7px;
    }

    /* Sentence List */
    .sentenceList {
        width: 100%;
        overflow-y: auto;
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

<div class="outFlexDiv">
    <div class="topBar">
        <div class="backButton" on:click={backToMain}>
            <i class="fas fa-chevron-left backArrow" />
        </div>
        <div class="title">{`${currentSet.tag} - Level ${currentSet.tagIndex}`}</div>
        <div class="threeStars">
            <i class="fas fa-star" />
            <i class="fas fa-star" />
            <i class="fas fa-star" />
        </div>
    </div>

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
</div>
