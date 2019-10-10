<script>
    import { fly } from 'svelte/transition'
    import { get } from 'svelte/store'
    import { beforeUpdate } from 'svelte'
    import GameModeSegment from './components/GameModeSegment.svelte'
    import DisplayModeSegment from './components/DisplayModeSegment.svelte'

    import {
        messages,
        currentSetId,
        isPlaying,
        isSupportRecognition,
        gameMode,
        displayMode,
    } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { GameMode, DisplayMode, MessageType } from '../data/constants.js'
    import { speed } from '../data/states.js'

    import { playGame } from '../core/gameFlow.js'

    let outDiv
    let inDiv
    let autoscroll
    var lastMessage = {}
    var currentSet = {}
    var isShowContent = true
    currentSetId.subscribe(id => {
        currentSet = sentenceSets.filter(set => set.id == id)[0]
    })

    const unsubscribe = messages.subscribe(array => {
        lastMessage = array.length > 0 ? array[array.length - 1] : {}
    })

    // 33px single line
    // 51px double line
    // 66px double line with translation
    function getEachSectionHeight() {
        // baseline is single line ch(33) + double line(51) + 10px margin (10 * 2)
        return 104 +
            (get(displayMode) == DisplayMode.original ? 17 : 0) +
            (get(displayMode) == DisplayMode.both ? 32 : 0) +
            (get(gameMode) == GameMode.echo)
            ? 53
            : 0
    }

    beforeUpdate(() => {
        autoscroll =
            inDiv &&
            lastMessage.type == MessageType.teacher &&
            inDiv.offsetHeight - outDiv.scrollTop > outDiv.offsetHeight + getEachSectionHeight()
        if (autoscroll) outDiv.scrollTo(0, outDiv.scrollTop + 300)
    })
    function backToMain() {
        currentSetId.set(undefined)
        isPlaying.set(false)
    }
</script>

<style>
    .outFlexDiv {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 400px;
        margin: 0px auto;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        background: #f8f9fa;
    }
    .topBar {
        width: 100%;
        margin: 0px auto;
        border-bottom: 1px solid #eee;
        background: white;
    }
    .backButton {
        position: relative;
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
        margin: 0 2px;
        background: #eee;
        padding: 3px 5px;
    }
    .backButton:hover {
        background: rgba(96, 144, 48, 0.1);
        cursor: pointer;
    }
    .messenger {
        width: 100%;
        background: #f8f9fa;
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
        max-width: 300px;
    }

    span {
        font-size: 16px;
        padding: 0.3em 0.7em;
        display: inline-block;
        border: 1px solid #333;
    }

    .hasRubyAnnotation {
        padding-top: 0.9em;
    }

    .teacher span {
        background-color: #fff;
        border-radius: 1em 1em 1em 0;
    }

    .echo {
        text-align: center;
    }

    .echo span {
        color: #666;
        border-color: #666;
        text-align: center;
        border-radius: 1em;
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

    .user,
    .listening {
        text-align: right;
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

    :global(span) > ruby > rb {
        font-size: 16px;
    }

    :global(span) > ruby > rt {
        font-size: 10px;
        /* fix chrome font size < 12px issue */
        transform: scale(0.8);
    }

    div.bottomBarHoldingPosition {
        width: 100%;
        height: 50px;
    }
    div.bottomBar {
        position: absolute;
        bottom: 0px;
        width: 100%;
        max-width: 400px;
        height: 50px;
        margin: 0px auto;
        padding-top: 10px;
        border-top: 1px solid #eee;
        text-align: center;
        background: white;
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
        margin: auto 0px;
        width: 90px;
        font-weight: 400;
        background: orange;
        border: 1px solid #ce8500;
    }
    .fightButton:hover {
        cursor: pointer;
    }
</style>

{#if $currentSetId != undefined}
    <div class="outFlexDiv" transition:fly={{ x: 300, duration: 200 }}>
        <div class="topBar">
            <div class="backButton" on:click={backToMain}>←</div>
            <div class="setBarContainer">
                <div class="setTitle">{`${currentSet.tag} ${currentSet.tagIndex}`}</div>
                <div class="setInfo">{currentSet.difficultyLabel}</div>
                <div class="setInfo">
                    {`音節數：${parseFloat(currentSet.syllablesCount).toFixed(1)}`}
                </div>
                <div class="setInfo">來自 Tatoeba</div>
            </div>
        </div>

        <div class="messenger" bind:this={outDiv}>
            {#if isShowContent}
                <div class="currentSetDiv">
                    {#each currentSet.sentenceIds as id}
                        {idToRow[id].en}
                        <br />
                        {idToRow[id].ch}
                        <br />
                        <br />
                    {/each}
                </div>
            {:else}
                <div class="scrollable" bind:this={inDiv}>
                    {#each $messages as message}
                        <article class={message.type} transition:fly={{ y: 20, duration: 300 }}>
                            <span
                                class:hasRubyAnnotation={message.text.indexOf('rt') > 0}
                                class:great={message.score >= 80}
                                class:good={message.score < 80 && message.score >= 60}
                                class:wrong={message.score < 60}>
                                {@html message.text + (message.score != undefined ? ` ${message.score}分` : '')}
                            </span>
                        </article>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="bottomBarHoldingPosition" />
        <div class="bottomBar">
            {#if !$isPlaying}
                <button
                    class="fightButton"
                    on:click={() => {
                        playGame(false)
                        isShowContent = false
                    }}
                    disabled={!$isSupportRecognition}>
                    挑 戰
                </button>
                <button
                    class="fightButton"
                    on:click={() => {
                        playGame(true)
                        isShowContent = false
                    }}
                    disabled={!$isSupportRecognition}>
                    展 示
                </button>
                {#if !isShowContent}
                    <button
                        class="fightButton"
                        on:click={() => {
                            isShowContent = true
                        }}>
                        清 除
                    </button>
                {/if}
                <div style="width:130px; position: relative;top:-200px;left:430px">
                    <GameModeSegment />
                    <DisplayModeSegment />
                    <span style="border-width:0px;margin: 0 auto">
                        <span style="border-width: 0px; padding: 0px;float:left">速度</span>
                        <span style="border-width: 0px; padding: 0px;float:right">
                            {$speed + 'X'}
                        </span>
                        <br />
                        <input
                            style="padding: 0px 0px;"
                            type="range"
                            min="0.3"
                            max="1.3"
                            step="0.1"
                            bind:value={$speed} />
                    </span>
                </div>
            {:else}
                <button
                    class="fightButton"
                    on:click={() => {
                        isPlaying.set(false)
                    }}>
                    停 止
                </button>
                <div class="gameProgress">
                    {`${Math.ceil($messages.length / 2)} / ${currentSet.sentenceIds.length}`}
                </div>
            {/if}
        </div>
    </div>
{/if}
