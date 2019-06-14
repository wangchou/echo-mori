<script>
    import { onMount } from 'svelte';

    let greeting;

    onMount(async () => {
       greeting = await fetch('/greeting').then(res => res.text())
    })
</script>

<style>
    h1 {
        color: green;
    }
</style>

<h1>{greeting} World!</h1>
