<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { items, t } from './store.js';
	import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

	const dispatch = createEventDispatcher();
	
	export let name = '';
	export let upc = generateRandomUPC();
	export let price = null;

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
        const itemPrice = price === null || price === undefined ? 0 : price;
        items.update(item => [...item, { name, upc, price: itemPrice }]);
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
            const config = { 
                fps: 10, 
                qrbox: {width: 250, height: 150},
                showTorchButtonIfSupported: true,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                videoConstraints: {
                    facingMode: "environment"
                }
            };
            scanner = new Html5QrcodeScanner("reader", config, false);
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
            scanner.clear().catch(() => {});
        }
    });
</script>

<section>
    <div class="container shadow-2xl dialog">
        <button class="close-button shadow-md" on:click={handleClose}>×</button>
        
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
            <button class="primary btn-elevated" on:click={addItem}>ADD ITEM</button>
            <button class="secondary btn-elevated" on:click={clr}>CLEAR ALL</button>
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
        margin-top: 30px;
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
        :global(button) {
            /* Style library-generated buttons to look more consistent */
            padding: 8px 16px;
            border-radius: 6px;
            background: #eee;
            border: 1px solid #ccc;
            margin: 5px;
            font-weight: 500;
        }
    }

    input {
        padding: 14px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        background: #fcfcfc;

        &:focus {
            outline: 2px solid $wm-blue;
            border-color: transparent;
            background: white;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 24px;
    }

    button {
        padding: 14px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        border: none;
        transition: transform 0.1s, box-shadow 0.1s;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 0.9rem;

        &:active {
            transform: scale(0.98);
        }
    }

    .btn-elevated {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        
        &:active {
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
    }

    .primary {
        background: $wm-blue;
        color: white;
        &:hover { background: darken($wm-blue, 5%); }
    }

    .secondary {
        background: #f0f0f0;
        color: #333;
        border: 1px solid #ddd;
        &:hover { background: #e8e8e8; }
    }

    .scan-btn {
        background: #333;
        color: white;
        padding: 0 20px;
        &:hover { background: #444; }
    }

    .close-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #ffffffff;
        font-size: 24px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        border: 1px solid #ecececff;
        
        
        &:active {
            background: #eee;
        }
    }
</style>

