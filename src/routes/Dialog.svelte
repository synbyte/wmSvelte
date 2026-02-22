<script>
	import { createEventDispatcher } from 'svelte';
	import {items, t} from './store.js';
	const dispatch = createEventDispatcher();
	
	export let name = '';
	export let upc = generateRandomUPC();
	export let price = 0;

	function generateRandomUPC() {
		// Generate 11 random digits
		let upc = '';
		for (let i = 0; i < 11; i++) {
			upc += Math.floor(Math.random() * 10);
		}
		// Calculate check digit (12th digit)
		let sum = 0;
		for (let i = 0; i < 11; i++) {
			sum += (i % 2 === 0 ? 3 : 1) * parseInt(upc[i]);
		}
		const checkDigit = (10 - (sum % 10)) % 10;
		return upc + checkDigit;
	}

	function handleClose() {
		dispatch('close');
	}
    
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
  
    <div class="container shadow-2xl dialog">
        <button class="close-button" on:click={handleClose}>×</button>
        <input placeholder="ITEM NAME" bind:value={name} type="text">
        <input placeholder="ITEM UPC" bind:value={upc} type="number">
        <input placeholder="ITEM PRICE" bind:value={price} type="number">
        <button on:click={addItem}>ADD</button>
        <button on:click={clr}>CLEAR</button>
        
      
</div>
   
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
        position: relative;
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
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: none;
        font-size: 32px;
        font-weight: 600;
        cursor: pointer;
        color: #131313ff;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
</style>
