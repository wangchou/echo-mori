<script>
    import { sentenceSets, idToRow } from '../model/demoSets.js'

    console.log(idToRow)
    var selectedTags = ["戀愛"]
    var filteredSets = selectedTags.length == 0 ? sentenceSets :
                                                  sentenceSets.filter(set => {selectedTags.includes(set.tag)})
</script>


<div class="cardContainer">
     {#each sentenceSets as set}
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

















