<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import toggleHide from './Dialog.svelte';
</script>

<header class="bg-blue-600  py-3 px-2">
	<div class="corner">
	
		<a href="https://kit.svelte.dev">
		<div id="chevron">‹ Reciept Details</div>	
		
	</div>

	<nav>
		
	</nav>

	
</header>

<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/myriad-pro");
	@import './styles.scss';
	header {
		display: flex;
		justify-content: space-between;
		background:$wm-blue;
		color:white;
		font-weight:600;
		font-size:1.5em;
		font-family: 'Myriad Pro', monoscpace;
	}



</style>
