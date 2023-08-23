<script lang="ts">
    import { uuid } from "../../stores/uuid";
    import { onMount } from 'svelte';
    import { type Question, add_answer, get_random_question } from "../../api";
    import { Jumper } from 'svelte-loading-spinners';
    import { goAsk, goHistory } from "../../nav";
    var answer = "";
    var random_question: Question;
    var loaded = false;
    var waiting = false;
    var no_question: boolean;
    const answerOnClick = async () => {
        waiting = true;
        await add_answer(random_question.id, answer)
        waiting = false;
        answer = "";
    }
    const loadRandomQuestion = async () => {
        random_question = await get_random_question($uuid);
        no_question = random_question.question === null;
    }
    onMount(async () => {
        await loadRandomQuestion()
        loaded = true;
    })
</script>

<style>
    .page{
        height: 95vh;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-family: sans-serif;
    }
    .userButton {
        border: none;
        margin-top: 10px;
        @apply rounded-full;
        @apply text-white;
        @apply font-bold;
    }
    .answer {
        @apply py-2;
        @apply px-4;
        @apply bg-gray-300;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .pass {
        font-size: 12px;
        @apply bg-red-600;
        @apply py-1;
        @apply px-2;
    }
    .answer:hover{
        @apply bg-gray-400;
    }
    .pass:hover{
        @apply bg-red-800;
    }
    input{
        border: none;
        width: 50%;
        @apply bg-gray-200;
        @apply rounded-full;
        @apply py-2;
        @apply px-4;
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
    <h1>Reply to a random query</h1>
    <p1>{no_question ? "There are currently no available queries :(" : random_question.question}</p1>
    <br/>
    <input disabled={no_question} bind:value={answer}/>
    <button disabled={no_question} class="userButton answer" on:click={answerOnClick}>Answer Query
        {#if waiting}
        <Jumper size="50" color="#FFFFFF" unit="px"/>
        {/if}
    </button>
    <button disabled={no_question} class="userButton pass" on:click={loadRandomQuestion}>Pass</button>
    <button on:click={goAsk} class="nav">Make a Query</button>
    <button on:click={goHistory} class="nav">Your Answered Queries</button>
    {:else}
    <Jumper size="100" color="#AAAAAA" unit="px"/>
    {/if}
</div>