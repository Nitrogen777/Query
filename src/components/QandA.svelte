<script lang="ts">
    import { type Answer, delete_question } from "../api";
    import { uuid } from "../stores/uuid";
    import { Jumper } from 'svelte-loading-spinners';
    export let properties: Answer;
    let clicked = false;
    var waiting = false;
    const onRemove = async () => {
        waiting = true;
        await delete_question($uuid); 
        waiting = false;
        clicked=true;
    }
</script>

<style>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        width: 75%;
        @apply bg-gray-200;
        @apply rounded-full;
    }
    .container:hover{
        @apply bg-gray-300;
    }
    p{
        margin: 5px;
    }
    .q{
        margin-top: 10px;
    }
    .a{
        margin-bottom: 10px;
        color: #303030;
        font-weight: bold;
    }
    hr{
        width: 75%;
        background-color: darkgray;
        height: 1px;
        border: none;
    }
    button{
        font-size: 12px;
        @apply bg-red-600;
        @apply py-1;
        @apply px-2;
        border: none;
        margin-bottom: 10px;
        @apply rounded-full;
        @apply text-white;
        @apply font-bold;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    button:hover{
        @apply bg-red-700;
    }

    .done {
        @apply bg-green-500;
    }

    .done:hover {
        @apply bg-green-600;
    }
</style>

<div class="container">
        <p class="q">{properties.question}</p>
        <hr/>
        <p class="a">{properties.response}</p>
        {#if properties.up}
        <button class={clicked ? "done" : ""} disabled={clicked} on:click={onRemove}>{clicked ? "Removed ;)" : "Remove question?"}
            {#if waiting}
            <Jumper size="30" color="#FFFFFF" unit="px"/>
            {/if}
        </button>
        {/if}
</div>