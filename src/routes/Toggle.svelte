<script>
	export let visible=false;
	function toggleVisible() {
		visible = !visible;
	}

</script>

<section>
    <button on:click={toggleVisible}>|</button>
	{#if visible}<slot></slot>{/if}
</section>
