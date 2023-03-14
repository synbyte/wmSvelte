<script>
	import {fade} from 'svelte/transition'
	import Dialog from './Dialog.svelte'
	import { items,t } from './store.js';
	export let visible = false;
	$: sold = $items.length;
	export function iSold() {
	    sold.push(sold += 1)
	}
	

	let date = new Date();
$: sec = date.getSeconds();
	let year = date.getFullYear()
	let month = date.getMonth()+1;
	let day = date.getDate()
	$: current_time = date.getHours()+":"+date.getMinutes()+":"+ sec;
	let today = month+"/"+day+"/"+year
		export function toggleHide()  {
        visible = !visible
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
	
</div>
<div style="text-align:center;" class="container flex mx-auto">
<p class='py-3' on:click={toggleHide} style="font-size:2em;"># ITEMS SOLD {sold}!</p>
<p style="font-size:1em;">#TC 4736 4859 0048 1259</p>
<img class="pb-3" style="width:80vw; height:50px;" src="https://pngimg.com/uploads/barcode/barcode_PNG4.png"/>

<p>Low Prices You Can Trust Every Day!</p>
<p> {today}  {current_time}</p>
</div>
{#if visible}
<div transition:fade>
<Dialog />
    </div>

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
