<script>
	
    import {items, t} from './store.js';
    export let name = '';
    
    export let upc = '';
    export let price = 0;

    import visible from './Total.svelte'
    import toggleHide from './Total.svelte'
    
    export function count() {
        sold + 1;
        
        
    }
    export function addItem(){
        items.update(item => [...item,{name,upc,price}]);
        
    }
    
    export function clr() {
        items.set([]);
        sold = 0
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
main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }    
section {
        display:block;
        position:absolute;
        top:30%;
	left:0%;
        width:100vw;
        height:100vh;
    }
    .dialog {
        width:75%;
        height:fit-content;
        background: #abca;
        border-radius:10px;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding:10%;
        justify-content: center;
        backdrop-filter:blur(4px);
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
