<script>
    import {items} from './store';
    export let itemz = [
        { name:"ORBIT PINK S", 
        upc:"08584100751", 
        price:"29.92"},
        
        { name:"JU FLC HOODI", 
        upc:"07461943024", 
        price:"45.99"},
        
        { name:"MBM POTTERY", 
        upc:"00897686432", 
        price:"21.97"}
    ]
</script>
<div class="container">
    <div class="row">
        <ul class="name">
            {#each $items as item }
            <p>{item.name}</p>
            {/each}

        </ul>
        <ul class="upc">
            {#each $items as item}
            <p>{item.upc}</p>
            {/each}

        </ul>
        <ul class="price">
            {#each $items as item}
            <p>{item.price} X</p>
            {/each}
        </ul>
    </div>
</div>
<style lang='scss'>
    @import './styles.scss';
    p{
        font-weight: 600;
    }
.row {
    width:85vw;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.container {
    display: flex;
    margin:auto;
    justify-content: center;
}
</style>