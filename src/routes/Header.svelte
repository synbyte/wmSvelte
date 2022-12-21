<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import toggleHide from './Dialog.svelte';
</script>

<header class="bg-blue-600  py-2 px-2">
	<div class="corner">
	
		<a href="https://kit.svelte.dev">
		<div id="chevron">‹ Reciept Details</div>	
		
	</div>

	<nav>
		
	</nav>

	
</header>

<style lang="scss">
	@import './styles.scss';
	header {
		display: flex;
		justify-content: space-between;
		background:$wm-blue;
		color:white;
		font-weight:100;
		font-size:1.5em;
		font-family: 'Source Sans Pro', monoscpace;
	}



</style>
