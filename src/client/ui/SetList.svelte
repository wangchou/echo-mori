<script>
    import { sentenceSets, idToRow } from '../model/demoSets.js'

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
    $: isAllTag = !Object.values(isSelectedTag).includes(true)
    $: filteredSets = isAllTag ? sentenceSets :
                                 sentenceSets.filter(set => isSelectedTag[set.tag])

    function toggleTag(tag) {
        if (isSelectedTag[tag]) {
            isSelectedTag[tag] = false
        } else {
            isSelectedTag[tag] = true
        }
        console.log(isSelectedTag)
    }
</script>

<div class="tagContainer">
    {#if isAllTag}
        <div class="tag selected">全部({sentenceSets.length})</div>
    {:else}
        <div class="tag" on:click={() => isSelectedTag={}}>全部({sentenceSets.length})</div>
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
        <div class="card">
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

<style>
    .tagContainer {
        padding: 0px 10px 5px;
    }
    .tag {
        display: inline-block;
        font-size: 12px;
        padding: 1px 2px;
        margin: 0px 2px;
    }
    .tag:hover {
        background: #f6faf3;
    }
    .tag.selected, .tag.selected:hover {
        color: white;
        background: #60a030;
    }
    .cardContainer {
        width: 100%;
        height: 100%;
        max-width: 600px;
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

















