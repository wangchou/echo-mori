<script>
    import { route } from '../../data/states.js'
    import { stillWorking } from '../../utils/misc.js'
    import ThreeStars from './ThreeStars.svelte'
    export let title
    export let backRoute
    export let starCount
    export let totalStarText
    export let closeOnly
    export let isSettingIcon
</script>

<div class="navigationBar">
    {#if closeOnly == true}
        <div
            class="clickable backButton"
            on:click={() => {
                route.set(backRoute)
            }}>
            <i class="fas fa-times" />
        </div>
    {:else}
        <div class="centerTitle">{title}</div>
        <div
            class="clickable backButton"
            on:click={() => {
                route.set(backRoute)
            }}>
            <i class="fas fa-chevron-left" />
        </div>
        <div class="rightInfo" on:click={stillWorking}>
            {#if starCount >= 0}
                <ThreeStars {starCount} />
            {:else if isSettingIcon}
                <i class="fas fa-cog" />
            {:else}
                <i class="fas fa-star" />
                {totalStarText}
            {/if}
        </div>
    {/if}
</div>

<style>
    .navigationBar {
        position: relative;
        width: 100%;
        height: 40px;
        background: #fafafa;
    }
    .backButton {
        position: absolute;
        left: 12px;
        top: 12px;
    }
    .centerTitle {
        position: absolute;
        width: 100%;
        margin: 0px auto;
        top: 12px;
        text-align: center;
    }
    .rightInfo {
        position: absolute;
        top: 12px;
        right: 12px;
    }
</style>
