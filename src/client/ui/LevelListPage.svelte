<script>
    import { selectedTag as _selectedTag, route, currentSetId } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { afterUpdate } from 'svelte'
    var selectedTag = undefined
    _selectedTag.subscribe(v => {
        selectedTag = v
    })
    $: sets = sentenceSets
        .filter(set => selectedTag == set.tag)
        .sort((set1, set2) => set2.tagIndex - set1.tagIndex)
    function selectSet(id) {
        currentSetId.set(id)
        route.set('/game')
    }
    let cardDiv
    afterUpdate(() => {
        cardDiv.scrollTo(0, cardDiv.scrollHeight)
    })
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
    .navigationBar {
        position: relative;
        width: 100%;
        margin: 0 auto;
        height: 36px;
    }
    .backArrow {
        position: absolute;
        left: 12px;
        top: 12px;
    }
    .backArrow:hover {
        cursor: pointer;
        color: blue;
    }
    .centerTitle {
        position: absolute;
        width: 100%;
        margin: 0px auto;
        top: 12px;
        text-align: center;
    }
    .threeStars {
        position: absolute;
        top: 12px;
        right: 12px;
    }
    .cardContainer {
        width: 100%;
        border-top: 1px solid #eee;
        overflow: auto;
        margin: 0 auto;
        margin-top: 36px;
    }
    .card {
        min-height: 50px;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .levelIndex {
        display: inline-block;
        font-size: 24px;
        font-weight: 500;
    }
</style>

<div class="outFlexDiv">
    <div class="navigationBar">
        <div class="centerTitle">{selectedTag}</div>
        <div
            on:click={() => {
                route.set('/')
                console.log('click backarrow')
            }}>
            <i class="fas fa-chevron-left backArrow" />
        </div>
        <div class="threeStars">
            <i class="fas fa-star" />
            ??/{sets.length * 3}
        </div>
    </div>
    <div class="cardContainer" bind:this={cardDiv}>
        {#each sets as set}
            <div class="card clickable" on:click={() => selectSet(set.id)}>
                <div class="levelIndex">{`(${set.tagIndex}) `}</div>
                <i class="far fa-star" />
                <i class="far fa-star" />
                <i class="far fa-star" />
            </div>
        {/each}
    </div>
</div>
