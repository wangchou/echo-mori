<script>
    import { DisplayMode as Mode } from '../model/constants.js'
    import { displayMode as mode } from '../model/store.js'
</script>

<div class="outDiv">
    <div class="title">顯示模式：</div>
    <div
        class:selected={$mode == Mode.both}
        on:click={() => {
            $mode = Mode.both
        }}>
        兩者
    </div>
    <div
        class:selected={$mode == Mode.original}
        on:click={() => {
            $mode = Mode.original
        }}>
        英文
    </div>
    <div
        class:selected={$mode == Mode.translation}
        on:click={() => {
            $mode = Mode.translation
        }}>
        中文
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
