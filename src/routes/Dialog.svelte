<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { items, t } from './store.js';
	import { Html5QrcodeScanner } from 'html5-qrcode';

	const dispatch = createEventDispatcher();
	
	export let name = '';
	export let upc = generateRandomUPC();
	export let price = 0;

	let scanner = null;
    let isScanning = false;

	function generateRandomUPC() {
		let upc = '';
		for (let i = 0; i < 11; i++) {
			upc += Math.floor(Math.random() * 10);
		}
		let sum = 0;
		for (let i = 0; i < 11; i++) {
			sum += (i % 2 === 0 ? 3 : 1) * parseInt(upc[i]);
		}
		const checkDigit = (10 - (sum % 10)) % 10;
		return upc + checkDigit;
	}

	function handleClose() {
        stopScanner();
		dispatch('close');
	}
    
    function addItem(){
        items.update(item => [...item,{name,upc,price}]);
        // Reset or close after add if desired
    }
    
    function clr() {
        items.set([]);
    }

    function toggleScanner() {
        if (isScanning) {
            stopScanner();
        } else {
            startScanner();
        }
    }

    function startScanner() {
        isScanning = true;
        // Small delay to ensure the div is rendered
        setTimeout(() => {
            scanner = new Html5QrcodeScanner("reader", { 
                fps: 10, 
                qrbox: {width: 250, height: 150},
                showTorchButtonIfSupported: true
            }, false);
            scanner.render(onScanSuccess, onScanFailure);
        }, 100);
    }

    function stopScanner() {
        if (scanner) {
            scanner.clear().then(() => {
                scanner = null;
                isScanning = false;
            }).catch(error => {
                console.error("Failed to clear scanner", error);
                isScanning = false;
            });
        }
    }

    function onScanSuccess(decodedText, decodedResult) {
        upc = decodedText;
        stopScanner();
    }

    function onScanFailure(error) {
        // console.warn(`Code scan error = ${error}`);
    }

    onDestroy(() => {
        if (scanner) {
            scanner.clear();
        }
    });
</script>

<section>
    <div class="container shadow-2xl dialog">
        <button class="close-button" on:click={handleClose}>×</button>
        
        <div class="form-group">
            <input placeholder="ITEM NAME" bind:value={name} type="text">
            
            <div class="upc-input-wrapper">
                <input placeholder="ITEM UPC" bind:value={upc} type="text">
                <button class="scan-btn" on:click={toggleScanner}>
                    {isScanning ? 'STOP' : 'SCAN'}
                </button>
            </div>

            {#if isScanning}
                <div id="reader"></div>
            {/if}

            <input placeholder="ITEM PRICE" bind:value={price} type="number" step="0.01">
        </div>

        <div class="actions">
            <button class="primary" on:click={addItem}>ADD ITEM</button>
            <button class="secondary" on:click={clr}>CLEAR ALL</button>
        </div>
    </div>
</section>

<style lang="scss">
    @import './styles.scss';

    section {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1001;
        background: rgba(0, 0, 0, 0.2);
        align-items: center;
        justify-content: center;
    }

    .dialog {
        width: 90%;
        max-width: 400px;
        background: white;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        padding: 24px;
        position: relative;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
    }

    .upc-input-wrapper {
        display: flex;
        gap: 8px;
        
        input {
            flex: 1;
            margin: 0;
        }
    }

    #reader {
        width: 100%;
        margin: 10px 0;
        border-radius: 8px;
        overflow: hidden;
    }

    input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;

        &:focus {
            outline: 2px solid $wm-blue;
            border-color: transparent;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 20px;
    }

    button {
        padding: 12px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: opacity 0.2s;

        &:active {
            opacity: 0.8;
        }
    }

    .primary {
        background: $wm-blue;
        color: white;
    }

    .secondary {
        background: #eee;
        color: #333;
    }

    .scan-btn {
        background: #333;
        color: white;
        padding: 0 15px;
    }

    .close-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #f5f5f5;
        font-size: 24px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
    }
</style>

