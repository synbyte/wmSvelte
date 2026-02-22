<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	function handleClick() {
		dispatch('headerClick');
	}
</script>

<header class="bg-blue-600  py-3 px-2" on:click={handleClick}>
	<div class="corner">
	
		<a href="#" >
		<div  id="chevron">‹ Reciept Details</div>	
		
	</div>

	<nav>
		
	</nav>

	
</header>

<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/myriad-pro");
	@import './styles.scss';
	header {
		display: flex;
width:100vw;
		justify-content: space-between;
		background:$wm-blue;
		color:white;
		font-weight:600;
		font-size:1.0em;
		font-family: 'Myriad Pro', monoscpace;
position:fixed;
top:0;
left:0;
z-index: 100;
height: 60px;
align-items: center;
}



</style>
