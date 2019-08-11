<script>
    import Messenger from './Messenger.svelte'
    import SetList from './SetList.svelte'
    import { currentSetId} from '../model/store.js'
</script>

{#if !$currentSetId}
    <SetList />
{:else}
    <Messenger />
{/if}