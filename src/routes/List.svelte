<script>
    import { select_multiple_value } from 'svelte/internal';
    import {fade} from 'svelte/transition'
    
        import {items, t} from './store';
        $: subtotal = $items.reduce((sum, item) => sum += item.price, 0)
    $: tax = subtotal * 0.088
        $: total = subtotal + tax
    
    </script>
    <div class="container mx-auto  ">
        <div class="row flex mx-auto ">
            <ul class="name">
                {#each $items as item }
                <p class="uppercase" contenteditable="true" transition:fade>{item.name}</p>
                {/each}
    
            </ul>
            <ul class="upc">
                {#each $items as item}
                <p contenteditable="true">{item.upc}</p>
                {/each}
    
            </ul>
            <ul class="price">
                {#each $items as item}
                
                <p contenteditable="true">{item.price.toFixed(2)}</p>
                {/each}
            </ul>
            
            
        </div>
        </div>
        <div class="container ">
            <div class="total  flex mx-auto justify-end">
                <ul class="subtotal ">
                    <p>SUBTOTAL {subtotal.toFixed(2)}</p>
                    <p>TAX   8.800 % {tax.toFixed(2)}</p>
                    <p>TOTAL {total.toFixed(2)}</p>
                    <p>WMP VISA TEND {total.toFixed(2)}</p>
                </ul>
                
    
            </div>
        </div>
    <style lang='scss'>
    
        @import './styles.scss';
        p{
            font-weight: 600;
        
        }
    	.container {
		width: 100%;
		margin: auto;
		display: block;
		align-items: flex-start;
		text-align: start;
		font-size: 1.2rem;
	}
    .subtotal {
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: end;
    
    }
    .total {
        width:100vmin;
        display:flex;
    
    }
    .row {
        width:100vmin;
        display:flex;
        justify-content: space-between;
    }
    ul {
        text-align: start;
    }
    
    </style>
    