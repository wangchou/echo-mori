<script>
    import Messenger from './Messenger.svelte'
    import SetList from './SetList.svelte'
    import NotSupportBar from './NotSupportBar.svelte'
    import { currentSetId, isSupportRecognition } from '../model/store.js'
</script>

{#if $currentSetId == undefined}
    <SetList />
{:else}
    <Messenger />
{/if}

<NotSupportBar />
