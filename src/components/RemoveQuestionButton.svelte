<script lang="ts">
    import { delete_question } from "../api";
    import { uuid } from "../stores/uuid";
    import { Jumper } from 'svelte-loading-spinners';
    export let onRemoveClick = () => {};
    let clicked = false;
    var waiting = false;
    const onRemove = async () => {
        waiting = true;
        await delete_question($uuid); 
        waiting = false;
        clicked=true;
        onRemoveClick();
    }
</script>

<style>
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

<div>
    <button class={clicked ? "done" : ""} disabled={clicked} on:click={onRemove}>{clicked ? "Removed ;)" : "Remove question?"}
        {#if waiting}
        <Jumper size="30" color="#FFFFFF" unit="px"/>
        {/if}
    </button>
</div>