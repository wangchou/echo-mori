<script>
    import { fly } from 'svelte/transition'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { currentSetId, selectedTag as _selectedTag } from '../data/states.js'

    var tagCounts = {}
    sentenceSets.forEach(set => {
        tagCounts[set.tag] = tagCounts[set.tag] ? tagCounts[set.tag] + 1 : 1
    })
    var tags = Object.keys(tagCounts)
    tags.sort((tag1, tag2) => {
        return tagCounts[tag2] - tagCounts[tag1]
    })

    var selectedTag = new Set()
    _selectedTag.subscribe(value => (selectedTag = value))

    $: isAllTag = selectedTag.size == 0
    $: filteredSets = isAllTag ? sentenceSets : sentenceSets.filter(set => selectedTag.has(set.tag))

    function toggleTag(tag) {
        if (selectedTag.has(tag)) {
            selectedTag.delete(tag)
        } else {
            selectedTag.add(tag)
        }
        _selectedTag.set(selectedTag)
    }

    function selectSet(id) {
        currentSetId.set(id)
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
    .siteTitle {
        width: 100%;
        padding: 0px;
        margin: 0px auto;
    }
    h1 {
        color: #60a030;
        margin: 5px auto 0px auto;
        text-align: center;
    }
    rt {
        color: black;
        font-weight: 400;
    }
    .tagContainer {
        border-top: 1px solid #eee;
        width: 100%;
        padding: 5px 0px;
        background: #fafafa;
    }
    .tag {
        display: inline-block;
        color: #666;
        font-size: 14px;
        padding: 2px 2px;
        margin: 1px 0px 1px 2px;
    }
    .tag:hover {
        color: #333;
        background: #eee;
        cursor: pointer;
    }
    .tag.selected,
    .tag.selected:hover {
        color: white;
        background: #60a030;
    }
    .cardContainer {
        width: 100%;
        border-top: 1px solid #eee;
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
        margin-left: 82px;
        color: #444;
    }
</style>

<div class="outFlexDiv" transition:fly={{ x: -300, duration: 200 }}>
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
            <div class="tag" on:click={() => _selectedTag.set(new Set())}>
                全部({sentenceSets.length})
            </div>
        {/if}
        {#each tags as tag}
            <div
                class={`tag ${selectedTag.has(tag) ? 'selected' : ''}`}
                on:click={() => {
                    toggleTag(tag)
                }}>
                {`${tag}(${tagCounts[tag]})`}
            </div>
        {/each}
    </div>

    <div class="cardContainer">
        {#each filteredSets as set}
            <div class="card" on:click={() => selectSet(set.id)}>
                <div class="difficultyLabel">{set.difficultyLabel}</div>
                <div class="title">{`${set.tag} (${set.tagIndex}) `}</div>
                <div class="exampleSentence">
                    {#each set.sentenceIds as sid}{idToRow[sid].ch}{/each}
                </div>
            </div>
        {/each}
    </div>
</div>
