<script lang="ts">
    import { uuid } from "../../stores/uuid";
    import { onMount } from 'svelte';
    import { type Answer, get_answered_questions } from "../../api";
    import { Jumper } from 'svelte-loading-spinners';
    import QandA from "../../components/QandA.svelte";
    import { goAnswer, goAsk } from "../../nav";
    var answered_questions: Answer[];
    var loaded = false;
    onMount(async () => {
        let answers = await get_answered_questions($uuid);
        if(answers != null){
            answered_questions = answers
        }
        loaded = true;
    })
</script>

<style>
    .page{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-family: sans-serif;
    }
    .nav{
        margin-top: 15px;
        border: none;
        @apply bg-blue-300;
        @apply rounded-full;
        @apply text-white;
        @apply font-bold;
        @apply py-2;
        @apply px-4;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .nav:hover{
        @apply bg-blue-400;
    }
</style>

<div class = "page">
    {#if loaded}
    <h1><b>Answered questions</b></h1>
    {#each answered_questions as answer}
	<QandA properties={answer}/>
	{/each}
    <button on:click={goAsk} class="nav">Make a Query</button>
    <button on:click={goAnswer} class="nav">Answer People's Queries</button>
    {:else}
    <Jumper size="100" color="#AAAAAA" unit="px"/>
    {/if}
</div>