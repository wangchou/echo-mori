<script>
    import { GameMode } from '../../data/constants.js'
    import { gameMode } from '../../data/states.js'

    var isShadowing = true
    gameMode.subscribe(v => {
        isShadowing = v == GameMode.shadowing
    })
</script>

<div class="outDiv">
    <div class="title">遊戲模式：</div>
    <div
        class={isShadowing ? 'selected' : ''}
        on:click={() => {
            $gameMode = GameMode.shadowing
        }}>
        跟讀
    </div>
    <div
        class={!isShadowing ? 'selected' : ''}
        on:click={() => {
            $gameMode = GameMode.echo
        }}>
        回音
    </div>
</div>

<style>
    .outDiv {
        width: 300px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
    }
    .outDiv div {
        padding: 3px 5px;
        font-size: 16px;
        border: 1px solid #444;
        border-left: 0px;
    }

    .outDiv div.title {
        border-top: 0px;
        border-bottom: 0px;
    }

    .selected {
        background: orange;
    }
</style>
