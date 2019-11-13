<script>
    import { fly } from 'svelte/transition'
    import { get } from 'svelte/store'
    import { beforeUpdate } from 'svelte'
    import FlexDiv from './components/FlexDiv.svelte'
    import TopBar from './components/TopBar.svelte'
    import { onMount } from 'svelte'
    import { stillWorking } from '../utils/misc.js'

    import {
        messages,
        currentSetId,
        isPlaying,
        isSupportRecognition,
        gameMode,
        displayMode,
        route,
        speed,
    } from '../data/states.js'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { GameMode, DisplayMode, MessageType } from '../data/constants.js'

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
    onMount(async () => {
        playGame()
    })
</script>

<FlexDiv>
    <TopBar
        backRoute={'/levelDetail'}
        title={`${currentSet.tag} - Level ${currentSet.tagIndex}`}
        starCount={3} />
    <div class="messenger" bind:this={outDiv}>
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
    </div>
    <div class="gameStatusOutter">
        <div class="gameStatusInner">
            <div class="progressLine">
                <div
                    style={`position: absolute; left:0px;width:${Math.ceil((Math.ceil($messages.length / 2) * 100) / currentSet.sentenceIds.length)}%; height:100%;background:
                    #c4c4c4;border-radius:24px;z-index: -10`} />
                {Math.ceil($messages.length / 2)}/{currentSet.sentenceIds.length}
            </div>
            <div class="rightCenter clickable" on:click={stillWorking}>
                <i class="fas fa-pause-circle largerIcon" />
            </div>
        </div>
    </div>
</FlexDiv>

<style>
    .messenger {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: scroll;
        scroll-behavior: smooth;
        border: 1px solid black;
        margin: 20px;
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
    }

    .hasRubyAnnotation {
        padding-top: 0.9em;
    }

    .teacher span {
        background-color: #fff;
        border: 1px solid #333;
    }

    .echo {
        text-align: center;
    }

    .echo span {
        color: #666;
        border-color: #666;
        text-align: center;
    }

    .listening span {
        background-color: #aaa;
    }

    .user span {
        background-color: #0074d9;
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

    .gameStatusOutter {
        position: relative;
        width: 100%;
        height: 50px;
        padding: 0px 20px;
        box-sizing: border-box;
    }
    .gameStatusInner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
    }
    .progressLine {
        flex-grow: 1;
        flex-basis: 0;
        margin: 10px 0;
        border-radius: 24px;
        border: 1px solid #c4c4c4;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .rightCenter {
        right: 0px;
        top: 0px;
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .largerIcon {
        width: 30px;
        height: 30px;
    }
</style>
