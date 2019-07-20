<script>
    import Messenger from './Messenger.svelte'
    import SentenceEditor from './SentenceEditor.svelte'
    import { playGame } from '../gameFlow.js'
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
    {/if}
</div>


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
        padding-top: 10px;
        text-align: center;
    }
    rt {
        color: black;
        font-weight: 400;
    }
</style>
