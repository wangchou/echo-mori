
<script>
    import { textareaValue } from '../model/store.js'
</script>

<textarea class="sentenceEditor" bind:value={$textareaValue}></textarea>

<style>
    .sentenceEditor {
        display: flex;
        flex-direction: column;
        height: 480px;
        width: 320px;
        background: #f8f9fa;
        border: 1px solid #bbb;
        margin: 0px auto;
    }
</style>