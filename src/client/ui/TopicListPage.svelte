<script>
    import { fly } from 'svelte/transition'
    import { sentenceSets, idToRow } from '../data/demoSets.js'
    import { selectedTag, user as _user, route } from '../data/states.js'

    var tagCounts = {}
    var tagSentenceCounts = {}
    sentenceSets.forEach(set => {
        tagCounts[set.tag] = tagCounts[set.tag] ? tagCounts[set.tag] + 1 : 1
        var sentenceCount = set.sentenceIds.length
        tagSentenceCounts[set.tag] = tagSentenceCounts[set.tag]
            ? tagSentenceCounts[set.tag] + sentenceCount
            : sentenceCount
    })
    var tags = Object.keys(tagCounts)
    tags.sort((tag1, tag2) => {
        return tagCounts[tag2] - tagCounts[tag1]
    })

    function gotoTopic(id) {
        selectedTag.set(id)
        route.set('/levels')
    }

    var user = {}
    var isLogin = false
    _user.subscribe(newValue => {
        user = newValue
        isLogin = Object.keys(user).length != 0
    })
</script>

<style>
    .outFlexDiv {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 600px;
        margin: 0px auto;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
    }
    .siteTitle {
        position: relative;
        width: 100%;
        margin: 0 auto;
    }
    .siteTitle div {
        padding: 10px 20px;
        font-size: 20px;
    }
    .loginButton {
        position: absolute;
        top: 0px;
        right: 0px;
    }
    .roundThumbnail {
        border-radius: 50%;
        max-width: 24px;
        max-height: 24px;
        margin-bottom: -5px;
    }

    .cardContainer {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
    }

    .row {
        padding: 10px 20px;
    }
    .card {
        border: 1px solid #cdcdcd;
    }

    .cardTop {
        position: relative;
        height: 160px;
        padding: 12px;
        background: #c4c4c4;
    }

    .cardCategory {
        position: absolute;
        left: 12px;
        bottom: 12px;
    }

    .cardStars {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }

    .cardBottom {
        position: relative;
        height: 40px;
        padding: 12px;
    }
    .cardDetail {
        position: absolute;
        top: 15px;
    }

    .card:hover {
        background: #f6faf3;
        cursor: pointer;
    }
</style>

<div class="outFlexDiv">
    <div class="siteTitle">
        <div>
            {#if isLogin}Hi, {`${user.username}`}{:else}Welcome to EchoMori!{/if}
            <br />
            Select a topic to start your challenge
        </div>
        {#if isLogin}
            <div class="loginButton">
                <a href="/auth/logout">logout</a>
                <img class="roundThumbnail" src={user.thumbnail} alt="thumbnail" />
            </div>
        {:else}
            <div class="loginButton">
                <a href="/auth/google">Login</a>
            </div>
        {/if}
    </div>

    <div class="cardContainer">
        {#each tags as tag}
            <div class="row" on:click={() => gotoTopic(tag)}>
                <div class="card">
                    <div class="cardTop">
                        <div class="cardCategory">{`${tag}`}</div>
                        <div class="cardStars">
                            <i class="fas fa-star" />
                            ??/{`${tagCounts[tag] * 3}`}
                        </div>
                    </div>
                    <div class="cardBottom">
                        <div class="cardDetail">
                            {`${tagCounts[tag]} levels, ${tagSentenceCounts[tag]} sentences`}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
