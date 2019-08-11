<script>
    import { comments, currentSetId, isPlaying } from '../model/store.js'
    import { beforeUpdate, afterUpdate } from 'svelte'
    import { sentenceSets, idToRow } from '../model/demoSets.js'
    import { fly } from 'svelte/transition';
    import { get } from 'svelte/store';
    import { playGame } from '../gameFlow.js'
    import { speed } from '../model/config.js'

    let outDiv
    let inDiv
    let autoscroll
    var lastComment = {}
    var currentSet = {}
    var isShowContent = true
    currentSetId.subscribe(id => {
        currentSet = sentenceSets.filter(set => set.id == id)[0]
    })

	const unsubscribe = comments.subscribe(array => {
		lastComment = array.length > 0 ? array[array.length - 1] : {}
	});

    beforeUpdate(() => {
        autoscroll = inDiv &&
                     lastComment.type == "teacher" &&
                     (inDiv.offsetHeight - outDiv.scrollTop > outDiv.offsetHeight + 135)
        if (autoscroll) outDiv.scrollTo(0, outDiv.scrollTop + 300)
    })
    function backToMain() {
        currentSetId.set(undefined)
        isPlaying.set(false)
    }
</script>

{#if $currentSetId != undefined}
<div>
    <div class="topBar">
        <div class="backButton" on:click={backToMain}>←</div>
        <div class="setBarContainer">
            <div class="setTitle">{`${currentSet.tag} ${currentSet.tagIndex}`}</div>
            <div class="setInfo">來自 Tatoeba</div>
            <br>
            <div class="setInfo">{currentSet.difficultyLabel}</div>
            <div class="setInfo">{`平均音節數：${parseFloat(currentSet.syllablesCount).toFixed(1)}`}</div>
            <div class="setInfo">{`單字難度：${parseFloat(currentSet.wordDifficulty).toFixed(1)}`}</div>
        </div>
    </div>

    <div class="messenger" bind:this={outDiv}>
        {#if isShowContent}
            <div class="currentSetDiv">
                {#each currentSet.sentenceIds as id}
                    {idToRow[id].en}
                    <br>
                    {idToRow[id].ch}
                    <br>
                    <br>
                {/each}
            </div>
        {:else}
            <div class="scrollable" bind:this={inDiv}>
                {#each $comments as comment}
                    <article class={comment.type} transition:fly="{{ y: 20, duration: 300 }}">
                        <span class:hasRubyAnnotation="{comment.text.indexOf('rt') > 0}"
                              class:great="{comment.score >= 80}"
                              class:good="{comment.score < 80 && comment.score >= 60}"
                              class:wrong="{comment.score < 60}"
                        >
                            {@html comment.text + (comment.score != undefined ? ` ${comment.score}分` : '')}
                        </span>
                    </article>
                {/each}
            </div>
        {/if}
    </div>
</div>

<div class="actionButton">
    {#if !$isPlaying}
        <button class="fightButton" on:click={() => { playGame(false); isShowContent = false}} > 挑 戰 </button>
        <button class="fightButton" on:click={() => { playGame(true); isShowContent = false}} > 展 示 </button>
        {#if !isShowContent}
          <button class="fightButton" on:click={() => { isShowContent = true}} > 清 除 </button>
        {/if}
        <div style="width:130px; position: relative;top:-100px;left:330px">
            <span style="border-width:0px;margin: 0 auto">
                <span style="border-width: 0px; padding: 0px;float:left">速度</span>
                <span style="border-width: 0px; padding: 0px;float:right">{$speed + "X"}</span>
                <br>
                <input style="padding: 0px 0px;" type="range" min="0.3" max="1.3" step="0.1" bind:value={$speed}>
            </span>
        </div>
    {:else}
        <button class="fightButton" on:click={() => { isPlaying.set(false)}} > 停 止 </button>
        <div class="gameProgress">{`${Math.ceil($comments.length/2)} / ${currentSet.sentenceIds.length}`}</div>
    {/if}
</div>

{/if}
<style>
    .topBar {
        width: 320px;
        margin: 5px auto;
    }
    .backButton {
        position: relative;
        top: -10px;
        display: inline-block;
        font-size: 36px;
        font-weight: 600;
        width: 40px;
        color: #60a030;
        padding-left: 5px;
    }
    .setBarContainer {
        display: inline-block;
        width: 80%;
    }
    .setTitle {
        display: inline-block;
        font-size: 32px;
    }
    .setInfo {
        position: relative;
        display: inline-block;
        font-size: 12px;
        top: -3px;
        margin: 0 3px;
        background: #eee;
        padding: 3px 5px;
    }
    .backButton:hover {
        background: rgba(96, 144, 48, 0.1);
        cursor: pointer;
    }
    .messenger {
        height: 480px;
        max-width: 320px;
        background: #f8f9fa;
        border: 1px solid #bbb;
        margin: 0px auto 0px;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .currentSetDiv {
        padding: 10px;
    }
    .scrollable {
        margin: 0 0.5em;
        padding-bottom: 300px;
    }

    article {
        margin: 0.6em 0;
    }

    article span {
        max-width: 250px
    }

    span {
        font-size: 16px;
        padding: 0.3em 0.7em;
        display: inline-block;
        border: 1px solid #333;
    }

    .user span.great {
        background-color: #96cf2a;
    }
    .user span.good {
        background-color: #ffc300;
    }
    .user span.wrong {
        background-color: #fe4386;
    }

    .teacher span {
        background-color: #fff;
        border-radius: 1em 1em 1em 0;
    }

    .hasRubyAnnotation {
        padding-top: 0.9em;
    }

    .user, .listening {
        text-align: right;
    }

    .listening span {
        background-color: #aaa;
        border-radius: 1em 1em 0 1em;
    }

    .user span {
        background-color: #0074d9;
        border-radius: 1em 1em 0 1em;
        text-align: left;
    }

    :global(span) > ruby > rb {
        font-size: 16px
    }

    :global(span) > ruby > rt {
        font-size: 10px;
        /* fix chrome font size < 12px issue */
        transform: scale(.8);
    }

    div.actionButton {
        width: 320px;
        margin: 0px auto;
        padding-top: 10px;
        text-align: center;
    }
    .gameProgress {
        position: absolute;
        width: 90px;
        display: inline-block;
        font-size: 24px;
        font-weight: 400;
        margin-left: 40px;
    }
    .fightButton {
        font-size: 20px;
        width: 90px;
        font-weight: 400;
        background: orange;
        border: 1px solid #ce8500;
    }
</style>