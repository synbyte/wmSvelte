<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import {items, t} from './store.js';
	const dispatch = createEventDispatcher();
	
	export let name = '';
	export let upc = generateRandomUPC();
	export let price = 0;
	
	let scannerActive = false;
	let scannerInitialized = false;
	let quaggaLoaded = false;
	let scannerElement;
	let cameraPermissionError = false;
	let lastScannedCode = '';

	function generateRandomUPC() {
		// Generate 11 random digits
		let upc = '';
		for (let i = 0; i < 11; i++) {
			upc += Math.floor(Math.random() * 10);
		}
		// Calculate check digit (12th digit)
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
    
    export function count() {
        sold + 1;
    }
    
    export function addItem(){
        items.update(item => [...item,{name,upc,price}]);
    }
    
    export function clr() {
        items.set([]);
        sold = 0;
    }
    
    // Scanner functionality
    async function toggleScanner() {
        if (scannerActive) {
            stopScanner();
        } else {
            try {
                // First check if we have camera permission
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                // If we get here, permission was granted, so close this stream
                stream.getTracks().forEach(track => track.stop());
                // Now start the scanner
                startScanner();
                cameraPermissionError = false;
            } catch (err) {
                console.error("Camera permission denied:", err);
                cameraPermissionError = true;
            }
        }
    }
    
    async function loadQuagga() {
        if (!quaggaLoaded) {
            // Dynamic import for Quagga
            const QuaggaModule = await import('quagga');
            window.Quagga = QuaggaModule.default;
            quaggaLoaded = true;
        }
        return window.Quagga;
    }
    
    async function startScanner() {
        try {
            const Quagga = await loadQuagga();
            
            if (!scannerInitialized) {
                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: scannerElement,
                        constraints: {
                            facingMode: "environment" // Use the rear camera
                        },
                    },
                    locator: {
                        patchSize: "medium",
                        halfSample: true
                    },
                    numOfWorkers: navigator.hardwareConcurrency || 4,
                    decoder: {
                        readers: [
                            "upc_reader",
                            "upc_e_reader",
                            "ean_reader",
                            "ean_8_reader",
                            "code_39_reader",
                            "code_128_reader"
                        ]
                    },
                    locate: true
                }, function(err) {
                    if (err) {
                        console.error("Failed to initialize scanner:", err);
                        return;
                    }
                    scannerInitialized = true;
                    Quagga.start();
                    scannerActive = true;
                });
                
                Quagga.onDetected(handleBarcodeDetected);
                
                // Add processing feedback
                Quagga.onProcessed(function(result) {
                    const drawingCtx = Quagga.canvas.ctx.overlay;
                    const drawingCanvas = Quagga.canvas.dom.overlay;
                    
                    if (result) {
                        if (result.boxes) {
                            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                            result.boxes.filter(function(box) {
                                return box !== result.box;
                            }).forEach(function(box) {
                                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                            });
                        }
                        
                        if (result.box) {
                            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                        }
                        
                        if (result.codeResult && result.codeResult.code) {
                            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                        }
                    }
                });
            } else {
                Quagga.start();
                scannerActive = true;
            }
        } catch (error) {
            console.error("Error starting scanner:", error);
        }
    }
    
    function stopScanner() {
        if (scannerInitialized && window.Quagga) {
            window.Quagga.stop();
            scannerActive = false;
        }
    }
    
    function handleBarcodeDetected(result) {
        if (result && result.codeResult) {
            const code = result.codeResult.code;
            if (code) {
                // Update last scanned code for display
                lastScannedCode = code;
                
                // Update UPC field
                upc = code;
                
                // Optional: Vibrate if device supports it
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }
                
                // Optional: stop scanner after successful scan
                stopScanner();
            }
        }
    }
    
    onMount(async () => {
        // We'll load Quagga when the scanner is first used
    });
    
    onDestroy(() => {
        stopScanner();
    });
</script>

<section>
    <div class="container shadow-2xl dialog">
        <button class="close-button" on:click={handleClose}>×</button>
        <input placeholder="ITEM NAME" bind:value={name} type="text">
        <input placeholder="ITEM UPC" bind:value={upc} type="number">
        <input placeholder="ITEM PRICE" bind:value={price} type="number">
        
        <!-- Scanner container -->
        <div class="scanner-container">
            <button class="scanner-button" on:click={toggleScanner}>
                {scannerActive ? 'Stop Scanner' : 'Scan Barcode'}
            </button>
            
            {#if cameraPermissionError}
                <div class="error-message">
                    Camera access denied. Please allow camera access in your browser settings.
                </div>
            {/if}
            
            {#if scannerActive}
                <div class="scanner-viewport" bind:this={scannerElement}></div>
                <div class="scanner-status">
                    Scanning... Point camera at barcode
                </div>
            {/if}
            
            {#if lastScannedCode}
                <div class="success-message">
                    Scanned: {lastScannedCode}
                </div>
            {/if}
        </div>
        
        <button on:click={addItem}>ADD</button>
        <button on:click={clr}>CLEAR</button>
    </div>
</section>

<style lang="scss">
    @import './styles.scss';
    
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    
    section {
        display: block;
        position: absolute;
        top: 30%;
        left: 0%;
        width: 100vw;
        height: 100vh;
    }
    
    .dialog {
        width: 75%;
        height: fit-content;
        background: #abca;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 10%;
        justify-content: center;
        backdrop-filter: blur(4px);
        position: relative;
    }
    
    input {
        border: 1px solid black;
        border-radius: 10px;
        margin: 5px;
    }
    
    button {
        border: 1px ridge white;
        border-radius: 25px;
        background: #3c3c3c;
        color: white;
        margin: 5px;
    }
    
    .scanner-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;
    }
    
    .scanner-button {
        background: #0071dc;
        font-weight: bold;
        margin-bottom: 10px;
    }
    
    .scanner-viewport {
        width: 100%;
        height: 200px;
        background-color: #000;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 10px;
    }
    
    .scanner-status {
        background: rgba(0, 113, 220, 0.2);
        color: #0071dc;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        margin: 5px 0;
        font-weight: bold;
    }
    
    .error-message {
        background: rgba(220, 53, 69, 0.2);
        color: #dc3545;
        text-align: center;
        padding: 8px;
        border-radius: 5px;
        margin: 5px 0;
        font-weight: bold;
    }
    
    .success-message {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
        text-align: center;
        padding: 8px;
        border-radius: 5px;
        margin: 5px 0;
        font-weight: bold;
    }
    
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
</style>
