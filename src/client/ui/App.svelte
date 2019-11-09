<script>
    import GamePage from './GamePage.svelte'
    import SentenceSetPage from './SentenceSetPage.svelte'
    import BrowserNotSupportBar from './components/BrowserNotSupportBar.svelte'
    import { currentSetId } from '../data/states.js'
    import { onMount } from 'svelte';
    var buttonName = "Login"
    onMount(async () => {
		const res = await fetch(`/user`);
		const user = await res.json();
        console.log(user)
	});
</script>
<a href="/auth/google">Login</a>

{#if $currentSetId == undefined}
    <SentenceSetPage />
{:else}
    <GamePage />
{/if}

<BrowserNotSupportBar />
