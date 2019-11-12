<script>
    import TopBar from './components/TopBar.svelte'
    import { route, userSaid } from '../data/states.js'
    import FlexDiv from './components/FlexDiv.svelte'
    import SentencePair from './components/SentencePair.svelte'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import {
        selectedSentenceId,
        currentSetId,
        selectedTag as _selectedTag,
    } from '../data/states.js'

    var sid = undefined
    selectedSentenceId.subscribe(v => {
        sid = v
    })
    var currentSet = {}
    currentSetId.subscribe(id => {
        currentSet = sentenceSets.filter(set => set.id == id)[0]
    })
    var selectedTag = undefined
    _selectedTag.subscribe(v => {
        selectedTag = v
    })
    $: sets = sentenceSets
        .filter(set => selectedTag == set.tag)
        .sort((set1, set2) => set2.tagIndex - set1.tagIndex)
</script>

<FlexDiv style="position: relative">
    <TopBar closeOnly={true} backRoute={'/levels'} />
    <div class="gameStars">
        <br />
        <div class="center">
            <i class="far fa-star leftStar" />
            <i class="far fa-star topStar" />
            <i class="far fa-star rightStar" />
        </div>
        <div class="center">{`${currentSet.tag} - Level ${currentSet.tagIndex}`}</div>
    </div>
    <div class="centerContent">
        <div class="contentTitle">Diagnosis</div>
        {#each currentSet.sentenceIds as sid}
            <SentencePair {sid} />
            {#if sid != currentSet.sentenceIds.slice(-1)[0]}
                <div class="separator" />
            {/if}
        {/each}
    </div>
    <div class="bottomBar">
        <div
            class="halfButton prevPosition clickable"
            on:click={() => {
                route.set('/game')
            }}>
            Try again
        </div>
        <div
            class="halfButton nextPosition clickable"
            on:click={() => {
                var nextSetId = (currentSet.tagIndex + 2) % sets.length
                currentSetId.set(nextSetId)
                route.set('/game')
            }}>
            Next Level
        </div>
    </div>
</FlexDiv>

<style>
    .gameStars {
        position: relative;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid black;
    }
    .center {
        position: relative;
        width: 150px;
        height: 40px;
        text-align: center;
        margin: 0px auto;
    }
    .leftStar {
        position: absolute;
        left: 0px;
    }
    .topStar {
        position: absolute;
        top: -15px;
        left: 65px;
    }
    .rightStar {
        position: absolute;
        right: 0px;
    }
    .centerContent {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: scroll;
    }
    .contentTitle {
        width: 100%;
        padding: 20px 0px 0px;
        text-align: center;
    }
    .separator {
        border-top: 1px solid #c4c4c4;
    }
    .bottomBar {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 65px;
        padding: 10px 30px;
        border-top: 1px solid black;
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
        left: 5%;
    }
    .nextPosition {
        left: 55%;
    }
</style>
