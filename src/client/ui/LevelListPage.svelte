<script>
    import { selectedTag as _selectedTag, route, currentSetId, starCounts } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { afterUpdate } from 'svelte'
    import { get } from 'svelte/store'
    import TopBar from './components/TopBar.svelte'
    import ThreeStars from './components/ThreeStars.svelte'
    import FlexDiv from './components/FlexDiv.svelte'
    import Platform from './svg/Platform.svelte'
    import Tree from './svg/Tree.svelte'
    import House from './svg/House.svelte'
    var selectedTag = undefined
    var sets = []
    var totalStarCount = 0
    _selectedTag.subscribe(v => {
        selectedTag = v
        sets = sentenceSets
            .filter(set => v == set.tag)
            .sort((set1, set2) => set2.tagIndex - set1.tagIndex)
        totalStarCount = 0
        sets.forEach(set => {
            if (get(starCounts)[set.id] != undefined) {
                totalStarCount += get(starCounts)[set.id]
            }
        })
    })
    function selectSet(id) {
        currentSetId.set(id)
        route.set('/levelDetail')
    }
    let cardDiv
    afterUpdate(() => {
        cardDiv.scrollTo(0, cardDiv.scrollHeight)
    })
    function getHash(id, range, shift) {
        return `${((id * (id * 29 + 127)) % range) + shift}`
    }
    function getTreePos(id) {
        let hash = getHash(id, 23, 1)
        let lr = hash % 2 == 0 ? 'left' : 'right'
        return `${lr}:${hash}%`
    }
    function getPlatformPos(id) {
        return `position: absolute; left:${getHash(id, 40, 30)}%;`
    }
    function getHousePos(id) {
        let hash = getHash(id, 23, 1)
        let lr = hash % 2 == 1 ? 'left' : 'right'
        return `${lr}:${hash}%`
    }
</script>

<FlexDiv>
    <TopBar
        backRoute={'/'}
        title={selectedTag}
        totalStarText={`${totalStarCount}/${sets.length * 3}`} />
    <div class="cardContainer" bind:this={cardDiv}>
        {#each sets as set}
            <div class="card clickable" on:click={() => selectSet(set.id)}>
                <div class="tree" style={getTreePos(set.id)}>
                    <Tree />
                    {#if (set.id * 11) % 7 > 3}
                        <div style="margin-top: -20px; margin-right:-20px">
                            <Tree />
                        </div>
                    {/if}
                </div>
                {#if getHash(set.id, 37, 0) % 5 == 0}
                    <div class="house" style={getHousePos(set.id)}>
                        <House />
                    </div>
                {/if}
                <div style={getPlatformPos(set.id)}>
                    <div class="plate">
                        <Platform />
                    </div>
                    <div class="levelIndex">{`${set.tagIndex}`}</div>
                    <div class="stars">
                        <ThreeStars starCount={$starCounts[set.id]} />
                    </div>
                </div>
            </div>
        {/each}
    </div>
</FlexDiv>

<style>
    .cardContainer {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: scroll;
        background: #fdf3d8;
    }
    .card {
        position: relative;
        min-height: 80px;
        padding-top: 40px;
        text-align: center;
    }
    .levelIndex {
        font-size: 36px;
        font-weight: 600;
        margin-top: -67px;
        color: #695e3c;
    }
    .plate {
        margin-bottom: -15px;
    }
    .tree,
    .house {
        position: absolute;
    }
    .stars {
        margin-top: 15px;
    }
</style>
