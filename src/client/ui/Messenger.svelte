<script>
    import { comments } from '../model/store.js'
    import { beforeUpdate, afterUpdate } from 'svelte'
    import { fly } from 'svelte/transition';

    let outDiv
    let inDiv
    let autoscroll
    var lastComment = {}

	const unsubscribe = comments.subscribe(array => {
		lastComment = array.length > 0 ? array[array.length - 1] : {}
	});

    afterUpdate(() => {
        autoscroll = inDiv &&
                     lastComment.score != undefined &&
                     (inDiv.offsetHeight - outDiv.scrollTop > outDiv.offsetHeight + 100)
        if (autoscroll) outDiv.scrollTo(0, outDiv.scrollTop + 100)
    })
</script>

<div class="messenger" bind:this={outDiv}>
    <div class="scrollable" bind:this={inDiv}>
        {#each $comments as comment}
            <article class={comment.type} transition:fly="{{ y: 20, duration: 300 }}">
                <span class:hasRubyAnnotation="{comment.text.indexOf('rt') > 0}"
                      class:great="{comment.score >= 80}"
                      class:good="{comment.score < 80 && comment.score >= 60}"
                      class:wrong="{comment.score < 60}"
                >
                    {@html comment.text + (comment.score != undefined ? ` ${comment.score}分` : '')}
                </span>
            </article>
        {/each}
    </div>
</div>

<style>
    .messenger {
        height: 480px;
        max-width: 320px;
        background: #f8f9fa;
        border: 1px solid #bbb;
        margin: 0px auto;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .scrollable {
        margin: 0 0.5em;
        padding-bottom: 200px;
    }

    article {
        margin: 0.3em 0;
    }

    span {
        font-size: 16px;
        padding: 0.3em 0.7em;
        display: inline-block;
        border: 1px solid #333;
    }

    .user span.great {
        background-color: #96cf2a;
    }
    .user span.good {
        background-color: #ffc300;
    }
    .user span.wrong {
        background-color: #fe4386;
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