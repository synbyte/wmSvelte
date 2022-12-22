<script>
	
	import Dialog from './Dialog.svelte'
	import { items } from './store.js';
	export let visible = false;
	export let upc;
	export let price;
	export let name;
	export function toggleHide()  {
        visible = !visible
    }
	export function addItem() {
        items.update(item => [...item,{name,upc,price}])
    }
</script>

<div  class="container">
	<p>WALMART PAY</p>
	<p>ACCOUNT # XXXX XXXX XXXX 4389</p>
	<p>XREF #: 0237877261</p>
	<p>APPROVAL # 3356764</p>

	<p>TRANS ID 64728764763764</p>

	<p>VALIDATION 6RDF7</p>

	<p>* NO SIGNATURE REQUIRED</p>

	<p>TERMINAL # SC0169278</p>
	
	<button on:click={toggleHide}>show</button>
</div>
<div style="text-align:center;" class="container flex mx-auto">
<p style="font-size:2em;"># ITEMS SOLD 1</p>
<p style="font-size:1em;">#TC 4736 4859 0048 1259</p>
<img class="pb-3" style="width:80vw; height:50px;" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F16-163338_barcode-without-numbers-png-clipart-black-and-white.png&sp=1671676488T8ae570b35378dea2437babfd0c98106d90b54889edaae0cc0bb842fadca04991"/>

<p>Low Prices You Can Trust Every Day!</p>
<p> 12/21/22  10:27:15</p>
</div>
{#if visible}
<Dialog />
<!--<div class="dialog shadow-md bg-red-200 "> <input bind:value={name} type="text">
	<input bind:value={upc} type="number">
	<input bind:value={price} type="number">
	<button on:click={addItem}>add</button></div>-->
	{/if}
	{#if !visible}
	<div class="g"></div>
	{/if}
<style lang="scss">
	@import './styles.scss';
	p {
		font-weight: 600;
		display: block;
		font-size:1em;
	}
	.g {
		display:none;
	}
	input {
		border:1px solid black;
	}
	.dialog {
		position:absolute;
		top:0;
		width:100%;
		
		border:1px solid black;
		border-radius: 15px;

		
	}
	.container {
		width: 80vw;
		margin: auto;
		display: block;
		align-items: flex-start;
		text-align: start;
	}
</style>
