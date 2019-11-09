<script>
    import GamePage from './GamePage.svelte'
    import SentenceSetPage from './SentenceSetPage.svelte'
    import BrowserNotSupportBar from './components/BrowserNotSupportBar.svelte'
    import { currentSetId, user } from '../data/states.js'
    import { onMount } from 'svelte'
    var buttonName = 'Login'
    onMount(async () => {
        const res = await fetch(`/user`)
        const userData = await res.json()
        user.set(userData)
    })
</script>

{#if $currentSetId == undefined}
    <SentenceSetPage />
{:else}
    <GamePage />
{/if}

<BrowserNotSupportBar />
