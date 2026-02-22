<script>
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	
	const dispatch = createEventDispatcher();
	
	function handleDetailsClick(e) {
		e.stopPropagation();
		dispatch('headerClick');
	}
</script>

<header class="bg-blue-600 py-3 px-2">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="corner" on:click={handleDetailsClick}>
		<div id="chevron">‹ Reciept Details</div>	
	</div>

	<div class="nav">
		<form method="POST" action="/?/logout" use:enhance>
			<button type="submit" class="share-btn" aria-label="Logout" on:click|stopPropagation>
				<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
					<polyline points="16 6 12 2 8 6"></polyline>
					<line x1="12" y1="2" x2="12" y2="15"></line>
				</svg>
			</button>
		</form>
	</div>
</header>

<style lang="scss">
	@import url("https://fonts.cdnfonts.com/css/myriad-pro");
	@import './styles.scss';

	header {
		display: flex;
		width: 100vw;
		justify-content: space-between;
		background: $wm-blue;
		color: white;
		font-weight: 600;
		font-size: 1.0em;
		font-family: 'Myriad Pro', monospace;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		height: 60px;
		align-items: center;
		padding: 0 10px;
	}

	.corner {
		cursor: pointer;
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 5px;
		
		&:hover {
			opacity: 0.8;
		}
	}

	.nav {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.share-btn {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px; /* Larger hit area for mobile */
		margin-right: 5px;
		-webkit-tap-highlight-color: transparent;
		
		svg {
			pointer-events: none; /* Let the button handle the click */
		}
		
		&:hover {
			opacity: 0.8;
		}
		
		&:active {
			transform: scale(0.95);
		}
	}
</style>
