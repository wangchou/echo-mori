<script>
    import Messenger from './Messenger.svelte'
    import { playGame } from '../gameFlow.js'
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

<Messenger />

<div class="playButton">
    <button on:click={playGame}> Play </button>
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
