<script>
    import Messenger from './Messenger.svelte'
</script>

<style>
    h1 {
        color: green;
        margin: 0px auto;
        text-align: center;
    }
    :global(body) {
        margin: 4% 0;
        background: #999;
    }
</style>

<div>
    <h1>
        <ruby>
            <rb>回音</rb>
            <rt>echo</rt>
            <rb>森林</rb>
            <rt>mori</rt>
        </ruby>
    </h1>
</div>
<Messenger />
