<script>
    import Messenger from './Messenger.svelte'
    import SentenceEditor from './SentenceEditor.svelte'
    import SetList from './SetList.svelte'
    import { playGame } from '../gameFlow.js'
    import { verifySentences } from '../verifySentencesFlow.js'
    import { speed } from '../model/config.js'
    import { demoSets } from '../model/demoSets.js'
    import { textareaValue } from '../model/store.js'
    import { comments, isPlaying, currentSetId } from '../model/store.js'
    let tab = { isEditing: false };
    function toggle() {
		tab.isEditing = !tab.isEditing;
    }
    function changeSentenceSet(key) {
        console.log(key);
        currentKey=key;
        textareaValue.set(demoSets[key]);
        comments.set([])
    }
    let currentKey = Object.keys(demoSets)[0]
</script>



{#if !$currentSetId}
    <SetList />
{:else}
    <Messenger />

<div class="actionButton">
    {#if !$isPlaying}
        <button class="fightButton" on:click={() => { playGame(false)}} disabled={tab.isEditing}> 挑 戰 </button>
        <button class="fightButton" on:click={() => { playGame(true)}} disabled={tab.isEditing}> 展示模式 </button>
        <div style="width:130px; position: relative;top:-100px;left:330px">
            <span style="border-width:0px;margin: 0 auto">
                <span style="border-width: 0px; padding: 0px;float:left">速度</span>
                <span style="border-width: 0px; padding: 0px;float:right">{$speed + "X"}</span>
                <br>
                <input style="padding: 0px 0px;" type="range" min="0.3" max="1.3" step="0.1" bind:value={$speed}>
            </span>
        </div>
    {/if}
</div>
{/if}


<style>
    :global(body) {
        background: #fff;
    }
    div.actionButton {
        width: 240px;
        margin: 0px auto;
        padding-top: 10px;
        text-align: center;
    }
    div.tags {
        width:130px;
        height: 200px;
        position: relative;
        top:-586px;
        left:330px;
    }
    div.tags button {
        width: 130px;
        color: #666;
    }
    div.tags button.currentSet {
        background: #e49648;
        color: black;
        border: 1px solid #8a5117;
    }
    rt {
        color: black;
        font-weight: 400;
    }
    .fightButton {
        font-size: 20px;
        width: 110px;
        font-weight: 400;
        background: orange;
        border: 1px solid #ce8500;
    }
</style>
