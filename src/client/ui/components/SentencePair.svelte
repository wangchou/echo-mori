<script>
    import { idToRow } from '../../data/demoSets.js'
    import { userSaid } from '../../data/states.js'
    export let sid // sentence id
</script>

<div class="sentenceCard clickable">
    {idToRow[sid].en}
    <br />
    {idToRow[sid].ch}
    <div class="rightCenter">
        <i class="fas fa-volume-up" />
    </div>
</div>
<div class="sentenceCard clickable">
    What you said
    <br />
    {#if $userSaid[sid]}{$userSaid[sid]}{:else}...{/if}
    <div class="rightCenter">
        <i class="far fa-play-circle" />
    </div>
</div>

<style>
    .sentenceCard {
        position: relative;
        padding: 10px;
        margin: 20px 20px 20px 20px;
        border: 1px solid #c4c4c4;
        padding-right: 20px;
    }
    .rightCenter {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
