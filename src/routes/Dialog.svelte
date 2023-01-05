<script>
	
    import {items, t} from './store.js';
    export let name = '';
    
    export let upc = '';
    export let price = 0;
    import visible from './Total.svelte'
    import toggleHide from './Total.svelte'
    import iSold from './Total.svelte'
    export function count() {
        sold + 1;
        
        
    }
    export function addItem(){
        items.update(item => [...item,{name,upc,price}]);
        
    }
    
    export function clr() {
        items.set([]);
       
    }
    
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false

    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        alert(`Code matched = ${decodedText}`)
        console.log(decodedResult)
        upc=decodedText
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
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
<reader id="reader"/>
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}    
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
        top:50%;
	left:50%;
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
