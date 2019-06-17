<script>
    import Messenger from './Messenger.svelte'
    import { playGame } from '../gameFlow.js'
</script>

<style>
    h1 {
        color: green;
        margin: 0px auto;
        text-align: center;
    }
    :global(body) {
        margin: 4% 0;
        background: #999;
    }
    div.playButton {
        text-align: center;
    }
</style>

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
    <button on:click={playGame}>Play</button>
</div>
