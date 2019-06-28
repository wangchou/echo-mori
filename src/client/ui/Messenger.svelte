<script>
    import { comments } from '../model/store.js'
    import { beforeUpdate, afterUpdate } from 'svelte'
    import { fly } from 'svelte/transition';

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
            <article class={comment.type} in:fly="{{ y: 20, duration: 300 }}" >
                <span class:hasRubyAnnotation="{comment.text.indexOf('rt') > 0}">{@html comment.text}</span>
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
        margin: 0.3em 0;
    }

    span {
        font-size: 16px;
        padding: 0.3em 0.7em;
        display: inline-block;
        border: 1px solid #bbb;
    }

    .teacher span {
        background-color: #fff;
        border-radius: 1em 1em 1em 0;
    }

    .hasRubyAnnotation {
        padding-top: 0.9em;
    }

    .user, .listening {
        text-align: right;
    }

    .listening span {
        background-color: #aaa;
        border-radius: 1em 1em 0 1em;
    }

    .user span {
        background-color: #0074d9;
        color: white;
        border-radius: 1em 1em 0 1em;
    }

    :global(span) > ruby > rb {
        font-size: 16px
    }

    :global(span) > ruby > rt {
        font-size: 10px;
        /* fix chrome font size < 12px issue */
        transform: scale(.8);
    }

</style>