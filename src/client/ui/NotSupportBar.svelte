<script>
    import { get } from 'svelte/store'
    import { isSupportRecognition } from '../data/states.js'
</script>

<style>
    .bottomInfoBar {
        position: absolute;
        bottom: 0;
        padding: 5px 0px;
        width: 100%;
        text-align: center;
        background: #ffa0a0;
    }
</style>

{#if !$isSupportRecognition}
    <div class="bottomInfoBar">
        請安裝 Chrome 瀏覽器，以支援 Google 語音辨識。 (註：iOS 除外。其 Chrome 不支援辨識)
    </div>
{/if}
