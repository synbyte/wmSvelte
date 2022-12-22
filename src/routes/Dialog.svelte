<script>
    import {items} from './store.js';
    export let name = '';
    export let upc = '';
    export let price = 0;
    import visible from './Total.svelte'
    import toggleHide from './Total.svelte'
    export function addItem() {
        items.update(item => [...item,{name,upc,price}])
    }
    export function clr() {
        items.set([]);
    }
    
   
</script>
<section>
    {#if visible}
    <div class="container shadow-2xl dialog">
        <input placeholder="ITEM NAME" bind:value={name} type="text">
        <input placeholder="ITEM UPC" bind:value={upc} type="number">
        <input placeholder="ITEM PRICE" bind:value={price} type="number">
        <button on:click={addItem}>ADD</button>
        <button on:click={clr}>CLEAR</button>
    </div>
    {/if}
    {#if !visible}
    {/if}
</section>

<style lang="scss">
    @import './styles.scss';
    section {
        display:block;
        position:absolute;
        top:0;
        width:50vw;
        height:50vh
    }
    .dialog {
        width:fit-content;
        height:fit-content;
        background: #2c2c2c;
        border-radius:15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    input {
        border:1px solid black;
        border-radius:10px;
        margin:5px;

    }
    button{
        border:1px ridge white;
        border-radius: 25px;
        background:#3c3c3c;
        color:white;
        margin:5px;
    }
</style>