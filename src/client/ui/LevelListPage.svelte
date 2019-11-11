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
    .card:hover {
        background: #f6faf3;
        cursor: pointer;
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
            <svg
                width="34"
                height="111"
                viewBox="0 0 340 222"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="62.3501" y="68.0705" width="225.948" height="153.302" fill="#E2BE6E" />
                <path
                    d="M168.898 89.8458L168.898 1.32993L301.741 75.9787L301.741 164.495L168.898
                    89.8458Z"
                    fill="#BF7628" />
                <path
                    d="M171.102 90.0318L171.102 1.51588L38.2589 76.1647L38.2589 164.681L171.102
                    90.0318Z"
                    fill="#BF7628" />
                <rect
                    x="170.997"
                    y="88.7753"
                    width="151.014"
                    height="7.43628"
                    transform="rotate(30 170.997 88.7753)"
                    fill="#B26B1F" />
                <rect
                    width="151.014"
                    height="7.43628"
                    transform="matrix(-0.866025 0.5 0.5 0.866025 170.251 88.2772)"
                    fill="#B26B1F" />
                <rect x="143.005" y="156.162" width="54.914" height="65.2104" fill="#9C8148" />
            </svg>

        </div>
        <div class="threeStars">
            <i class="fas fa-star" />
            ??/{sets.length * 3}
        </div>
    </div>
    <div class="cardContainer" bind:this={cardDiv}>
        {#each sets as set}
            <div class="card" on:click={() => selectSet(set.id)}>
                <div class="levelIndex">{`(${set.tagIndex}) `}</div>
                <i class="far fa-star" />
                <i class="far fa-star" />
                <i class="far fa-star" />
            </div>
        {/each}
    </div>
</div>
