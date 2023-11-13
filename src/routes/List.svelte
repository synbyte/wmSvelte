<script>
import { select_multiple_value } from 'svelte/internal';
import {fade} from 'svelte/transition'

    import {items, t} from './store';
    $: subtotal = $items.reduce((sum, item) => sum += item.price, 0)
$: tax = subtotal * 0.15
    $: total = subtotal + tax

</script>
<div class="container mx-auto ">
    <div class="row flex mx-auto">
        <ul class="name">
            {#each $items as item }
            <p transition:fade>{item.name}</p>
            {/each}

        </ul>
        <ul class="upc">
            {#each $items as item}
            <p>{item.upc}</p>
            {/each}

        </ul>
        <ul class="price">
            {#each $items as item}
            
            <p>{item.price}</p>
            {/each}
        </ul>
        
        
    </div>
    </div>
    <div class="container ">
        <div class="total  flex mx-auto justify-end">
            <ul class="subtotal ">
                <p>SUBTOTAL {subtotal.toFixed(2)}</p>
                <p>TAX 0.15% {tax.toFixed(2)}</p>
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
    
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width:100vw;
}
.subtotal {
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: end;

}
.total {
    width:80vmin;
    display:flex;

}
.row {
    width:80vmin;
    display:flex;
    justify-content: space-between;
}
ul {
    text-align: start;
}

</style>
