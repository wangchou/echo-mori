<script>
    import { comments } from '../model/store.js'
    import { beforeUpdate, afterUpdate } from 'svelte'

    let div
    let autoscroll

    beforeUpdate(() => {
        autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20
    })

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight)
    })
</script>

<div class="messenger">
    <div class="scrollable" bind:this={div}>
        {#each $comments as comment}
            <article class={comment.author}>
                <span>{@html comment.text}</span>
            </article>
        {/each}
    </div>
</div>

<style>
    .messenger {
        display: flex;
        flex-direction: column;
        height: 400px;
        max-width: 400px;
        background: #f8f9fa;
        border: 1px solid #bbb;
        margin: 0px auto;
    }

    .scrollable {
        flex: 1 1 auto;
        margin: 0 0.5em;
        overflow-y: auto;
    }

    article {
        margin: 0.5em 0;
    }

    .student {
        text-align: right;
    }

    span {
        padding: 1em 1em 0.5em 1em;
        display: inline-block;
        border: 1px solid #bbb;
    }

    :global(span) > ruby > rb {
        font-size: 16px
    }

    :global(span) > ruby > rt {
        font-size: 10px;
        /* fix chrome font size < 12px issue */
        transform: scale(.8);
    }

    .teacher span {
        font-size: 16px;
        background-color: #fff;
        border-radius: 1em 1em 1em 0;
    }

    .student span {
        font-size: 16px;
        background-color: #0074d9;
        color: white;
        border-radius: 1em 1em 0 1em;
    }
</style>