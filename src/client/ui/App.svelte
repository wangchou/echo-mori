<script>
    import GamePage from './GamePage.svelte'
    import TopicListPage from './TopicListPage.svelte'
    import LevelListPage from './LevelListPage.svelte'
    import LevelDetailPage from './LevelDetailPage.svelte'
    import GameResultPage from './GameResultPage.svelte'
    import SentencePage from './SentencePage.svelte'
    import BrowserNotSupportBar from './components/BrowserNotSupportBar.svelte'
    import {
        currentSetId,
        user,
        route as _route,
        updateGameRecord,
        gameRecords,
    } from '../data/states.js'
    import { onMount } from 'svelte'
    import { sentenceSets } from '../data/demoSets.js'
    var buttonName = 'Login'
    onMount(async () => {
        const res = await fetch(`/user`)
        const userData = await res.json()
        user.set(userData)
        if (userData.id) {
            const loadedRecords = await fetch('/gameRecord').then(res => res.json())
            gameRecords.set(loadedRecords)
        }
    })
    var route = undefined
    _route.subscribe(value => {
        route = value
    })
</script>

{#if route === '/'}
    <TopicListPage />
{:else if route === '/levels'}
    <LevelListPage />
{:else if route === '/levelDetail'}
    <LevelDetailPage />
{:else if route === '/sentence'}
    <SentencePage />
{:else if route === '/game'}
    <GamePage />
{:else if route === '/gameResult'}
    <GameResultPage />
{/if}

<BrowserNotSupportBar />
