<script lang="ts">
    import { uuid } from "../stores/uuid.ts";
    import { onMount } from 'svelte';
    import { supabase } from "../client";
    var question = "";
    var answer = "";
    const insert = async () => {
        const { error } = await supabase.rpc('new_question',{question: question, uuid: $uuid})
        question = "";
    }
    interface Question {
        id?: Number,
        question?: String
    }
    interface Answer {
        question: String,
        response: String
    }
    var random_question: Question = {};
    const randomize_question = async () => {
        const { data } = await supabase.rpc('get_random_question', {v_uuid: $uuid})
        random_question = data
    }
    var answered_questions: Answer[] = [];
    const load_answered_questions = async () => {
        const { data } = await supabase.from('responses').select('question,response').eq('uuid', $uuid);
        if(data != null){
            answered_questions = data;
        }
    }
    const answer_random_question = async () => {
        console.log({body: {query_id: random_question.id, answer: answer}})
        const { error } = await supabase.functions.invoke('add_answer', {body: {query_id: random_question.id, answer: answer}})
        console.log(error);
        answer = "";
    }
    var loaded = false;
    onMount(async () => {
        await randomize_question();
        await load_answered_questions();
        loaded = true;
    })
</script>

<style>
    
</style>

<div>
    <p>your uuid is {$uuid}</p>
    <input bind:value={question}/>
    <button on:click={insert}>Y</button>
    {#if loaded}
    <h1>random question:</h1>
    <p1>{random_question.question}</p1>
    <br/>
    <input bind:value={answer}/>
    <button on:click={answer_random_question}>A</button>
    <h1>answered questions:</h1>
    {#each answered_questions as answer}
	<p1>Question: {answer.question}</p1>
    <p1>Answer: {answer.response}</p1>
    <br/><br/>
	{/each}
    {/if}
</div>