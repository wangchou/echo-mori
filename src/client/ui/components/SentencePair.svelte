<script>
    import { get } from 'svelte/store'
    import { idToRow } from '../../data/demoSets.js'
    import { userSaids, speed } from '../../data/states.js'
    import { Voice } from '../../data/constants.js'
    import { say } from '../../core/speechEngine.js'
    import { stillWorking } from '../../utils/misc.js'
    export let sid // sentence id
</script>

<div class="sentenceCard clickable" on:click={() => say(idToRow[sid].en, get(speed), Voice.enF3)}>
    {idToRow[sid].en}
    <br />
    {idToRow[sid].ch}
    <div class="rightCenter">
        <i class="fas fa-volume-up" />
    </div>
</div>
<div class="sentenceCard clickable" on:click={stillWorking}>
    What you said
    <br />
    {#if $userSaids[sid]}{$userSaids[sid]}{:else}...{/if}
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
