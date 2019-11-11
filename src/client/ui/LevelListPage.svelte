<script>
    import { selectedTag as _selectedTag, route, currentSetId } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { afterUpdate } from 'svelte'
    import TopBar from './components/TopBar.svelte'
    import FlexDiv from './components/FlexDiv.svelte'
    var selectedTag = undefined
    _selectedTag.subscribe(v => {
        selectedTag = v
    })
    $: sets = sentenceSets
        .filter(set => selectedTag == set.tag)
        .sort((set1, set2) => set2.tagIndex - set1.tagIndex)
    function selectSet(id) {
        currentSetId.set(id)
        route.set('/levelDetail')
    }
    let cardDiv
    afterUpdate(() => {
        cardDiv.scrollTo(0, cardDiv.scrollHeight)
    })
</script>

<style>
    .cardContainer {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: scroll;
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

<FlexDiv>
    <TopBar backRoute={'/'} title={selectedTag} totalStarText={`??/${sets.length * 3}`} />
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
</FlexDiv>
