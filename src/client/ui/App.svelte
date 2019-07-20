<script>
    import Messenger from './Messenger.svelte'
    import SentenceEditor from './SentenceEditor.svelte'
    import { playGame } from '../gameFlow.js'
    let tab = { isEditing: false };
    function toggle() {
		tab.isEditing = !tab.isEditing;
	}
</script>

{#if tab.isEditing}
	<button on:click={toggle}>
        挑戰中
	</button>
{:else}
	<button on:click={toggle}>
        編輯句子
	</button>
{/if}

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
    <div class="playButton">
        <button on:click={playGame}> Play </button>
    </div>
{/if}


<style>
    :global(body) {
        background: #fff;
    }
    h1 {
        color: #60a030;
        margin: 80px auto 0px auto;
        text-align: center;
    }
    div.playButton {
        padding-top: 10px;
        text-align: center;
    }
    div.playButton button{
        color: #fff;
        background: #a06030;
        border-color: #000;
        min-width: 100px;
    }
    rt {
        color: black;
        font-weight: 400;
    }
</style>
