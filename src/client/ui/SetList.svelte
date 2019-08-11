<script>
    import { sentenceSets, idToRow } from '../model/demoSets.js'
    import { currentSetId, isSelectedTag as _isSelectedTag } from '../model/store.js'

    //console.log(idToRow)
    var tagCounts = {}
    sentenceSets.forEach(set => {
        tagCounts[set.tag] = tagCounts[set.tag] ? (tagCounts[set.tag] + 1) : 1
    })
    var tags = Object.keys(tagCounts)
    tags.sort((tag1, tag2) => {
        return tagCounts[tag2] - tagCounts[tag1]
    })
    var isSelectedTag = {}
    _isSelectedTag.subscribe(v => isSelectedTag = v)

    $: isAllTag = !Object.values(isSelectedTag).includes(true)
    $: filteredSets = isAllTag ? sentenceSets :
                                 sentenceSets.filter(set => isSelectedTag[set.tag])

    function toggleTag(tag) {
        if (isSelectedTag[tag]) {
            isSelectedTag[tag] = false
        } else {
            isSelectedTag[tag] = true
        }
        _isSelectedTag.set(isSelectedTag)
    }
    function selectSet(id) {
        currentSetId.set(id)
    }
</script>

<div class="outFlexDiv">
<div class="siteTitle">
    <h1>
        <ruby>
            <rb>回音</rb>
            <rt>echo</rt>
            <rb>森林</rb>
            <rt>mori</rt>
        </ruby>
    </h1>
</div>

<div class="tagContainer">
    {#if isAllTag}
        <div class="tag selected">全部({sentenceSets.length})</div>
    {:else}
        <div class="tag" on:click={() => _isSelectedTag.set({})}>全部({sentenceSets.length})</div>
    {/if}
    {#each tags as tag}
        <div class={`tag ${isSelectedTag[tag] ? "selected" : ""}`}
             on:click={()=> {toggleTag(tag)}}>
            {`${tag}(${tagCounts[tag]})`}
        </div>
    {/each}
</div>

<div class="cardContainer">
     {#each filteredSets as set}
        <div class="card" on:click={() => selectSet(set.id)}>
            <div class="difficultyLabel">{set.difficultyLabel}</div>
            <div class="title">
                {`${set.tag} (${set.tagIndex}) `}
            </div>
            <div class="exampleSentence">
                {#each set.sentenceIds as sid}
                    <div>{idToRow[sid].ch}</div>
                {/each}
            </div>
        </div>
     {/each}
</div>
</div>
<style>
    .outFlexDiv {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 600px;
        margin: 0px auto;
    }
    .siteTitle {
        width: 100%;
        padding: 0px;
        margin: 0px auto;
    }
    h1 {
        color: #60a030;
        margin: 10px auto 5px auto;
        text-align: center;
    }
    .tagContainer {
        width: 100%;
        margin: 0 auto;
        padding: 0px 10px 5px;
    }
    .tag {
        display: inline-block;
        font-size: 12px;
        padding: 1px 2px;
        margin: 0px 2px;
    }
    .tag:hover {
        background: rgba(96, 144, 48, 0.2);
        cursor: pointer;
    }
    .tag.selected, .tag.selected:hover {
        color: white;
        background: #60a030;
    }
    .cardContainer {
        width: 100%;
        border: 1px solid #eee;
        overflow: auto;
        margin: 0 auto;
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

    .difficultyLabel {
        display: inline-block;
        padding: 2px 5px;
        background: #eee;
        font-size: 24px;
    }
    .title {
        display: inline-block;
        font-size: 24px;
        font-weight: 500;
    }
    .exampleSentence {
        margin-left: 82px
    }
</style>

















