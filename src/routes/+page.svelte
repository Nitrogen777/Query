<script lang="ts">
    import { uuid } from "../stores/uuid";
    import { get_creation_time, insert_new_question } from "../api";
    import { onMount } from "svelte";
    import { Jumper } from 'svelte-loading-spinners';
    import RemoveQuestionButton from "../components/RemoveQuestionButton.svelte";
    import { goAnswer, goHistory } from "../nav";
    var question = "";
    let loaded = false;
    let time_limit: number;
    var waiting = false;
    const get_remaining_time = (miliseconds: number): string => {
        let seconds_total = miliseconds/1000;
        let minutes_total = seconds_total/60;
        let hours = Math.floor(minutes_total/60);
        let minutes = Math.floor(minutes_total)-hours*60;
        let seconds = Math.floor(seconds_total)-(hours*60+minutes)*60;
        let getString = (value: number) => value >= 10 ? `${value}` : `0${value}`;
        return `${getString(hours)}:${getString(minutes)}:${getString(seconds)}`
    }
    onMount(async () => {
        await loadTimer();
    })
    let timer:string | number | NodeJS.Timeout | undefined;
    const loadTimer = async () => {
        var creation_time = await get_creation_time($uuid);
        if(creation_time == 0){
            time_limit = -1;
            return;
        }
        if(timer != undefined){
            clearInterval(timer);
        }
        timer = setInterval(() => {
            let creation = new Date(creation_time);
            creation.setMinutes(creation.getMinutes()+1)
            creation.setSeconds(0);
            time_limit = 12*60*60*1000 - Date.now() + (creation.getTime());
            if(time_limit <= 0){
                clearInterval(timer);
            }
            if(!loaded){
                loaded = true;
            }
        }, 1000);
    }
    const askOnClick = async () => {
        waiting = true;
        await insert_new_question(question, $uuid);
        waiting = false;
        loaded = false;
        await loadTimer();
        question = "";
    }
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
    .form{
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .covered{
        color: #FFFFFF;
        opacity: 0.5;
    }
    h1{
        color: #000000;
    }
    .ask {
        margin-top: 15px;
        border: none;
        @apply bg-gray-300;
        @apply rounded-full;
        @apply text-white;
        @apply font-bold;
        @apply py-2;
        @apply px-4;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .hoverlessask {
        margin-top: 15px;
        border: none;
        @apply bg-gray-300;
        @apply rounded-full;
        @apply text-white;
        @apply font-bold;
        @apply py-2;
        @apply px-4;
    }
    .ask:hover{
        @apply bg-gray-400;
    }
    input{
        border: none;
        width: 50%;
        @apply bg-gray-200;
        @apply rounded-full;
        @apply py-2;
        @apply px-4;
    }
    .info{
        margin-bottom: 0;
        font-family: sans-serif;
    }
    .middle{
        margin-top: 15px;
        font-size: 12px;
    }
    .timer{
        margin-top: 0;
        font-size: 72px;
        font-family: arial;
        font-weight: bold;
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
    <div class = "{time_limit > 0 ? "form covered" : "form"}">
        <h1>Ask a question</h1>
        <input disabled = {time_limit > 0} bind:value={question}/>
        <button disabled = {time_limit > 0} class = {time_limit > 0 ? "hoverlessask" : "ask"} on:click={askOnClick}>Query
            {#if waiting}
            <Jumper size="50" color="#FFFFFF" unit="px"/>
            {/if}
        </button>
    </div>
        {#if time_limit > 0}
        <p class = "info">You can only have one question up at a given time</p>
        <p class = "middle info">You current question will automatically expire in:</p>
        <h2 class = "timer">{get_remaining_time(time_limit)}</h2>
        <p class = "middle info">Or you can remove it now:</p>
        <RemoveQuestionButton onRemoveClick = {async () => {loaded = false; await loadTimer();}}/>
        {/if}
        <button on:click={goAnswer} class="nav">Answer People's Queries</button>
        <button on:click={goHistory} class="nav">Your Answered Queries</button>    
    {:else}
    <Jumper size="100" color="#AAAAAA" unit="px"/>
    {/if}
</div>