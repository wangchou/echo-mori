<script>
    import GamePage from './GamePage.svelte'
    import SentenceSetPage from './SentenceSetPage.svelte'
    import BrowserNotSupportBar from './components/BrowserNotSupportBar.svelte'
    import { currentSetId } from '../data/states.js'
</script>
<a href="/auth/google">Login</a>

{#if $currentSetId == undefined}
    <SentenceSetPage />
{:else}
    <GamePage />
{/if}

<BrowserNotSupportBar />
