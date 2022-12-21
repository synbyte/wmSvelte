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
    
   
</script>
<section>
    {#if visible}
    <div class="container">
        <input bind:value={name} type="text">
        <input bind:value={upc} type="number">
        <input bind:value={price} type="number">
        <button on:click={addItem}>add</button>
        <button on:click={toggleHide}>hide</button>
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
</style>