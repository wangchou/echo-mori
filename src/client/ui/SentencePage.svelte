<script>
    import TopBar from './components/TopBar.svelte'
    import { route } from '../data/states.js'
    import FlexDiv from './components/FlexDiv.svelte'
</script>

<style>

</style>

<FlexDiv>
    <TopBar closeOnly={true} backRoute={'/levelDetail'} />
</FlexDiv>
