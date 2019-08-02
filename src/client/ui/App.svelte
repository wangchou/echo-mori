<script>
    import Messenger from './Messenger.svelte'
    import SentenceEditor from './SentenceEditor.svelte'
    import { playGame } from '../gameFlow.js'
    import { speed } from '../model/config.js'
    let tab = { isEditing: false };
    function toggle() {
		tab.isEditing = !tab.isEditing;
	}
</script>


<div>
    <h1>
        <ruby>
            <rb>回音</rb>
            <rt>echo</rt>
            <rb>森林</rb>
            <rt>mori</rt>
        </ruby>
    </h1>
</div>

{#if tab.isEditing}
    <SentenceEditor />
{:else}
    <Messenger />
{/if}

<div class="actionButton">
    {#if tab.isEditing}
	    <button on:click={toggle}>結束編輯</button>
    {:else}
        <button on:click={playGame} disabled={tab.isEditing}>遊戲開始</button>
	    <button on:click={toggle}>編輯句子</button>
<div style="width:130px; position: relative;top:-100px;left:400px">
    <span style="border-width:0px;margin: 0 auto">
        <span style="border-width: 0px; padding: 0px;float:left">速度</span>
        <span style="border-width: 0px; padding: 0px;float:right">{$speed + "X"}</span>
        <br>
        <input style="padding: 0px 0px" type="range" min="0.3" max="1.3" step="0.1" bind:value={$speed}>
    </span>
</div>
    {/if}
</div>
<br><br>


<style>
    :global(body) {
        background: #fff;
    }
    h1 {
        color: #60a030;
        margin: 80px auto 0px auto;
        text-align: center;
    }
    div.actionButton {
        width: 240px;
        margin: 0px auto;
        padding-top: 10px;
        text-align: center;
    }
    div.actionButton button {
        height: 40px;
        width: 80px;
        margin-right: 10px;
    }
    rt {
        color: black;
        font-weight: 400;
    }
</style>
