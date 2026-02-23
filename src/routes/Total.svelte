<script>
	
	import { items, t } from './store.js';
	export let visible = false;
	$: sold = $items.length;

	let date = new Date();
	let month = String(date.getMonth() + 1).padStart(2, '0');
	let day = String(date.getDate()).padStart(2, '0');
	let year = date.getFullYear();
	$: current_time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(v => String(v).padStart(2, '0')).join(':');
	let today = month + '/' + day + '/' + year;
	export function toggleHide() {
		visible = !visible;
	}
</script>

<div class="container">
	<p>WALMART PAY</p>
	<div class="flex justify-between pr-5"><p>ACCOUNT # </p><p>**** **** **** 4389</p></div>
	<p>XREF #: 0237877261</p>
	<p>APPROVAL # 3356764</p>

	<p>TRANS ID 64728764763764</p>

	<p>VALIDATION 6RDF7</p>

	<p>* NO SIGNATURE REQUIRED</p>

	<p>TERMINAL # SC0169278</p>
</div>
<div style="text-align:center;" class="container flex mx-auto">
	<p
		class="py-3"
		on:click={() => {
			visible = !visible;
		}}
		style="font-size:2rem;"
	>
		# ITEMS SOLD {sold}
	</p>
	<p style="font-size:1.3rem;">#TC 4736 4859 0048 1259</p>
	<img
		class="pb-3"
		style="width:80%; height:50px; margin: 0 auto; display: block;"
		src="https://pngimg.com/uploads/barcode/barcode_PNG4.png"
	/>

	<p>Low Prices You Can Trust Every Day!</p>
	<br/>
	<a href="/admin" style="text-decoration: none; color: inherit;">
		<p>{today} {current_time}</p>
	</a>
</div>


<style lang="scss">
	@import './styles.scss';
	p {
		font-weight: 600;
		display: block;
		font-size: 1em;
	}
	.g {
		display: none;
	}
	input {
		border: 1px solid black;
	}
	.dlog {
		display: flex;
		margin: auto;
		border: 2px solid red;
	}
	.dialog {
		position: absolute;
		top: 0;
		width: 100%;
		padding: 10px;
		border: 1px solid black;
		border-radius: 15px;
	}
	.container {
		width: 100%;
		margin: auto;
		display: block;
		align-items: flex-start;
		font-size: 1.2rem;
	}
</style>
